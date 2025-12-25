import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from "react";
const InputCard = ({ data, onChange, title }) => {
    const [localData, setLocalData] = useState(data.map(d => d.value.toString()));
    useEffect(() => {
        setLocalData(data.map(d => d.value.toString()));
    }, [data]);
    const handleChange = (index, value) => {
        const newData = [...localData];
        newData[index] = value;
        setLocalData(newData);
        onChange(newData.map((val, i) => ({
            name: data[i].name,
            value: val === "" ? 0 : parseInt(val)
        })));
    };
    return (_jsxs("div", { className: "card", children: [_jsx("h3", { children: title }), localData.map((val, idx) => (_jsxs("div", { className: "input-row", children: [_jsx("label", { children: data[idx].name }), _jsx("input", { type: "number", value: val, onChange: e => handleChange(idx, e.target.value) })] }, data[idx].name)))] }));
};
export default InputCard;
