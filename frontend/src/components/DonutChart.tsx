import React, { useEffect, useMemo, useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import "../donut.css";

interface Props {
  data: { name: string; value: number }[];
}

const COLORS = [
  "#22D3EE",
  "#6366F1",
  "#FACC15",
  "#FB7185",
  "#A78BFA",
];

const DonutChart: React.FC<Props> = ({ data }) => {
  // ✅ Final total
  const total = useMemo(
    () => data.reduce((sum, item) => sum + item.value, 0),
    [data]
  );

  // ✅ Animated value
  const [animatedValue, setAnimatedValue] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 1000; 
    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      const value = Math.floor(progress * total);
      setAnimatedValue(value);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setAnimatedValue(total); // ensure exact final value
      }
    };

    requestAnimationFrame(animate);
  }, [total]);

  return (
    <div className="donut-wrapper">
      <ResponsiveContainer width="100%" height={360}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            cx="50%"
            cy="50%"
            innerRadius={90}
            outerRadius={140}
            startAngle={90}
            endAngle={-270}
            animationDuration={1200}
            animationEasing="ease-in-out"
          >
            {data.map((_, index) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>

          {/* ✅ ANIMATED CENTER NUMBER */}
          <text
            x="50%"
            y="50%"
            textAnchor="middle"
            dominantBaseline="middle"
            className="donut-center-text"
          >
            {animatedValue}
          </text>

          <Tooltip
            contentStyle={{
              background: "rgba(15, 23, 42, 0.95)",
              borderRadius: 12,
              border: "1px solid rgba(255,255,255,0.15)",
              color: "#ffffff",
              fontStyle: "italic",
              fontWeight: 600,
            }}
            itemStyle={{
              color: "#ffffff",
              fontStyle: "italic",
              fontWeight: 600,
            }}
            labelStyle={{
              color: "#38BDF8",
              fontStyle: "italic",
              fontWeight: 700,
            }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default DonutChart;
