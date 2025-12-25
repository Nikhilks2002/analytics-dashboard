import React, { useState, useEffect } from "react";
import { ChartData } from "../types";

interface Props {
  data: ChartData[];
  onChange: (updated: ChartData[]) => void;
  title: string;
}

const InputCard: React.FC<Props> = ({ data, onChange, title }) => {
  const [localData, setLocalData] = useState<string[]>(data.map(d => d.value.toString()));

  useEffect(() => {
    setLocalData(data.map(d => d.value.toString()));
  }, [data]);

  const handleChange = (index: number, value: string) => {
    const newData = [...localData];
    newData[index] = value;
    setLocalData(newData);

    onChange(newData.map((val, i) => ({
      name: data[i].name,
      value: val === "" ? 0 : parseInt(val)
    })));
  };

  return (
    <div className="card">
      <h3>{title}</h3>
      {localData.map((val, idx) => (
        <div key={data[idx].name} className="input-row">
          <label>{data[idx].name}</label>
          <input
            type="number"
            value={val}
            onChange={e => handleChange(idx, e.target.value)}
          />
        </div>
      ))}
    </div>
  );
};

export default InputCard;
