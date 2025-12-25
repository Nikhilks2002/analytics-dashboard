import React from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { ChartData } from "../types";

interface Props {
  data: ChartData[];
  color: string;
}

const WaveChart: React.FC<Props> = ({ data, color }) => {
  return (
    <ResponsiveContainer width="100%" height={250}>
      <LineChart data={data}>
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="value" stroke={color} strokeWidth={3} />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default WaveChart;
