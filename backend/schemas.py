from pydantic import BaseModel
from typing import Optional

class TransactionCreate(BaseModel):
    id: str
    amount: int
    currency: str

class TransactionResponse(BaseModel):
    id: str
    amount: int
    currency: str
    processed: bool
    processed_at: Optional[str]
