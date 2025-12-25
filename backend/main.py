from fastapi import FastAPI, BackgroundTasks, HTTPException
from datetime import datetime
from database import transactions_collection
from schemas import TransactionCreate, TransactionResponse
import time

app = FastAPI(title="Payment Processing API (MongoDB)")

@app.get("/")
def health_check():
    return {"status": "HEALTHY", "time": datetime.utcnow()}

def process_transaction(transaction_id: str):
    # Simulate delay
    time.sleep(30)
    transactions_collection.update_one(
        {"id": transaction_id},
        {"$set": {"processed": True, "processed_at": datetime.utcnow().isoformat()}}
    )

@app.post("/v1/webhooks/transactions", status_code=202)
def receive_transaction(transaction: TransactionCreate, background_tasks: BackgroundTasks):
    existing_tx = transactions_collection.find_one({"id": transaction.id})
    if existing_tx:
        return {"message": "Transaction already exists, skipping."}

    transactions_collection.insert_one({
        "id": transaction.id,
        "amount": transaction.amount,
        "currency": transaction.currency,
        "processed": False,
        "created_at": datetime.utcnow().isoformat(),
        "processed_at": None
    })

    background_tasks.add_task(process_transaction, transaction.id)
    return {"message": "Transaction received. Processing in background."}

@app.get("/v1/transactions/{transaction_id}", response_model=TransactionResponse)
def get_transaction_status(transaction_id: str):
    tx = transactions_collection.find_one({"id": transaction_id})
    if not tx:
        raise HTTPException(status_code=404, detail="Transaction not found")
    return TransactionResponse(
        id=tx["id"],
        amount=tx["amount"],
        currency=tx["currency"],
        processed=tx["processed"],
        processed_at=tx["processed_at"]
    )

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
