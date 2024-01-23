import { create } from "zustand";

const dataset = [
    {'id': 1, 'inflowTime': '2023-05-01 12:00:00', 'outflowTime': '2023-05-01 16:00:00', 'boatNumber': '6P2 6154', 'boatLength': 'nad 8 m', 'payedState': 'Ano' },
    {'id': 2, 'inflowTime': '2023-05-01 13:00:00', 'outflowTime': null, 'boatNumber': null, 'boatLength': 'do 8 m', 'payedState': 'Ne' },
    {'id': 3, 'inflowTime': '2023-05-01 12:30:00', 'outflowTime': '2023-05-01 14:00:00', 'boatNumber': '2X5 4455', 'boatLength': 'nad 8 m', 'payedState': 'Ano' },
    {'id': 4, 'inflowTime': '2023-05-01 11:00:00', 'outflowTime': null, 'boatNumber': '??4 2122', 'boatLength': 'nad 8 m', 'payedState': 'Neplatí' },
];

function repeatData(data, nTimes) {
    const newData = [];
    for (let i = 0; i < nTimes; i++) {
        for (let index = 0; index < data.length; index++) {
            newData.push({...data[index], id: i * data.length + index});
        }
    }

    return newData;
}

const repeatedData = repeatData(dataset, 20);

export const useBoatStore = create((set) => ({
    boatData: repeatedData,
    setPaymentStatus: (id, status) => {
        set((state) => {
            const newData = [...state.boatData];
            newData[id].payedState = status;
            return { boatData: newData };
        });
    },
    switchPaymentStatus: (id) => {
        set((state) => {
            const newData = [...state.boatData];
            newData[id].payedState = newData[id].payedState === 'Ano' ? 'Ne' : 'Ano';
            return { boatData: newData };
        });
    },
    setBoatNumber: (id, boatNumber) => {
        set((state) => {
            const newData = [...state.boatData];
            newData[id].boatNumber = boatNumber;
            return { boatData: newData };
        });
    },
    getBoatById: (id) => {
        const boat = repeatedData.find((boat) => boat.id === id);
        return boat;
    },
}));