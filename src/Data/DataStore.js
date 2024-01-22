import { create } from "zustand";

const dataset = [
    { 'inflowTime': '2023-05-01 12:00:00', 'outflowTime': '2023-05-01 16:00:00', 'boatNumber': '6P2 6154', 'boatLength': 'nad 8 m', 'payedState': 'Ano' },
    { 'inflowTime': '2023-05-01 13:00:00', 'outflowTime': null, 'boatNumber': null, 'boatLength': 'do 8 m', 'payedState': 'Ne' },
    { 'inflowTime': '2023-05-01 12:30:00', 'outflowTime': '2023-05-01 14:00:00', 'boatNumber': '2X5 4455', 'boatLength': 'nad 8 m', 'payedState': 'Ano' },
    { 'inflowTime': '2023-05-01 11:00:00', 'outflowTime': null, 'boatNumber': '??4 2122', 'boatLength': 'nad 8 m', 'payedState': 'Neplatí' },
];

function repeatData(data, nTimes) {
    const newData = [];
    for (let i = 0; i < nTimes; i++) {
        newData.push(...data);
    }
    return newData;
}

const repeatedData = repeatData(dataset, 20);

export const useBoatStore = create((set) => ({
    boatData: repeatedData,
}));