export interface ChartData {
  name: string;
  value: number;
}

export const callDataSample: ChartData[] = [
  { name: "Call 1", value: 5 },
  { name: "Call 2", value: 8 },
  { name: "Call 3", value: 3 },
  { name: "Call 4", value: 7 }
];

export const sadDataSample: ChartData[] = [
  { name: "Verbal Aggression", value: 3 },
  { name: "Customer Hostility", value: 2 },
  { name: "Assistant Do Not Speak French", value: 1 },
  { name: "Unsupported Language", value: 2 },
  { name: "Assistant Do Not Speak Spanish", value: 1 },
  { name: "Incorrect Caller Identity", value: 4 },
  { name: "User Refused to Confirm Identity", value: 1 }
];
