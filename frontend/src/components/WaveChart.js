import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
const WaveChart = ({ data, color }) => {
    return (_jsx(ResponsiveContainer, { width: "100%", height: 250, children: _jsxs(LineChart, { data: data, children: [_jsx(XAxis, { dataKey: "name" }), _jsx(YAxis, {}), _jsx(Tooltip, {}), _jsx(Line, { type: "monotone", dataKey: "value", stroke: color, strokeWidth: 3 })] }) }));
};
export default WaveChart;
