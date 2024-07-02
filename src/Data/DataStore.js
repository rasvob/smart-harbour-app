import { create } from "zustand";
import { milisecondsToHoursAndMinutes } from './Misc';

const dataset = [
    {'id': 1, 'inflowTime': '2023-05-01 12:00:00', 'outflowTime': '2023-05-01T16:00:00', 'boatNumber': '6P2 6154', 'boatLength': 'nad 8 m', 'payedState': 'Ano' },
    {'id': 2, 'inflowTime': '2023-05-01 13:00:00', 'outflowTime': null, 'boatNumber': null, 'boatLength': 'do 8 m', 'payedState': 'Ne' },
    {'id': 3, 'inflowTime': '2023-05-01 12:30:00', 'outflowTime': '2023-05-01T14:00:00', 'boatNumber': '2X5 4455', 'boatLength': 'nad 8 m', 'payedState': 'Ano' },
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

const prepareViewData = (data) => {
    return data.map((item) => {
        return {
            ...item,
            'inHarbour': item.outflowTime === null,
            'timeInHarbour': item.outflowTime === null ? milisecondsToHoursAndMinutes(new Date() - new Date(item.inflowTime)) : milisecondsToHoursAndMinutes(new Date(item.outflowTime) - new Date(item.inflowTime)),
        };
    });
};

const repeatedData = repeatData(dataset, 1);

export const useBoatStore = create((set, get) => ({
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
        const boat = get().boatData.find((boat) => boat.id === id);
        return boat;
    },
    getTableViewData: () => {
        return prepareViewData(get().boatData);
    },
    getFilteredTableViewData: (filters) => {
        let filteredData = [...get().boatData];
        for (let index = 0; index < filters.length; index++) {
            const filter = filters[index];
            filteredData = filteredData.filter((item) => {
                for (let optionIndex = 0; optionIndex < filter.options.length; optionIndex++) {
                    const option = filter.options[optionIndex];
                    if (option.value && option.predicate(item)) {
                        return true;
                    }
                }
            });
        }
    
        return prepareViewData(filteredData);
    },
    addNewBoat: (boat) => {
        set((state) => {
            let maxId = state.boatData.reduce((max, item) => Math.max(max, item.id), 0) + 1;
            const newData = [...state.boatData, {...boat, id: maxId}];
            return { boatData: newData };
        });
    },
    setBoatData: (data) => {
        set({ boatData: [...data] });
    }
}));