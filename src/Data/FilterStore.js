import { create } from "zustand";

const stateDetailsFilterTemplates = [
    {
        'attribute': 'inHarbour',
        'type': 'checkbox',
        'label': 'V přístavu',
        'predicate': (item) => item.outflowTime === null,
        'options': [
            {'value': true, 'predicate': (item) => item.outflowTime === null, 'label': 'Ano'},
            {'value': true, 'predicate': (item) => item.outflowTime !== null, 'label': 'Ne'},
        ],
    },
    {
        'attribute': 'boatNumber',
        'type': 'checkbox',
        'label': 'Číslo lodě',
        'predicate': (item) => item.boatNumber && !item.boatNumber.includes('?'),
        'options': [
            {'value': true, 'predicate': (item) => item.boatNumber && !item.boatNumber.includes('?'), 'label': 'Rozpoznané'},
            {'value': true, 'predicate': (item) => !(item.boatNumber && !item.boatNumber.includes('?')), 'label': 'Nerozpoznané'},
        ],
    },
    {
        'attribute': 'payedState',
        'type': 'checkbox',
        'label': 'Stání zaplaceno',
        'predicate': (item) => item.payedState === 'Ano',
        'options': [
            {'value': true, 'predicate': (item) => item.payedState === 'Zaplaceno', 'label': 'Ano'},
            {'value': true, 'predicate': (item) => item.payedState === 'Nezaplaceno', 'label': 'Ne'},
            {'value': true, 'predicate': (item) => item.payedState === 'Neplatí', 'label': 'Neplatí'},
        ],
    },
    {
        'attribute': 'outflowTime',
        'type': 'checkbox',
        'label': 'Doba stání',
        'predicate': (item) => harbourTimeToHours(item.inflowTime, item.outflowTime) < 4.0,
        'options': [
            {'value': true, 'predicate': (item) => {
                // console.log('Do 4 hodin', item.inflowTime, item.outflowTime, harbourTimeToHours(item.inflowTime, item.outflowTime));
                return harbourTimeToHours(item.inflowTime, item.outflowTime) < 4.0;
            }, 'label': 'Do 4 hodin'},
            {'value': true, 'predicate': (item) => { 
                // console.log('Nad 4 hodiny', item.inflowTime, item.outflowTime, harbourTimeToHours(item.inflowTime, item.outflowTime));
                return (harbourTimeToHours(item.inflowTime, item.outflowTime) >= 4.0 && harbourTimeToHours(item.inflowTime, item.outflowTime) <= 24.0) 
            }, 'label': 'Nad 4 hodiny'},
            {'value': true, 'predicate': (item) => {
                // console.log('Více dní', item.inflowTime, item.outflowTime, harbourTimeToHours(item.inflowTime, item.outflowTime));
                return harbourTimeToHours(item.inflowTime, item.outflowTime) > 24.0;
            }, 'label': 'Více dní'},
        ],
    },
    {
        'attribute': 'boatLength',
        'type': 'checkbox',
        'label': 'Délka lodi',
        'predicate': (item) => item.boatLength === 'do 8 m',
        'options': [
            {'value': true, 'predicate': (item) => item.boatLength === 'pod 8m', 'label': 'Do 8 metrů'},
            {'value': true, 'predicate': (item) => item.boatLength === 'nad 8m', 'label': 'Nad 8 metrů'},
        ],
    },
];

const paymentDetailsFilterTemplates = [
    {
        'attribute': 'boatNumber',
        'type': 'checkbox',
        'label': 'Číslo lodě',
        'predicate': (item) => item.boatNumber && !item.boatNumber.includes('?'),
        'options': [
            {'value': true, 'predicate': (item) => item.boatNumber && !item.boatNumber.includes('?'), 'label': 'Rozpoznané'},
            {'value': true, 'predicate': (item) => !(item.boatNumber && !item.boatNumber.includes('?')), 'label': 'Nerozpoznané'},
        ],
    },
    {
        'attribute': 'payedState',
        'type': 'checkbox',
        'label': 'Zaplaceno',
        'predicate': (item) => item.payedState === 'Ano',
        'options': [
            {'value': true, 'predicate': (item) => item.payedState === 'Zaplaceno', 'label': 'Ano'},
            {'value': true, 'predicate': (item) => item.payedState === 'Nezaplaceno', 'label': 'Ne'},
            {'value': true, 'predicate': (item) => item.payedState === 'Neplatí', 'label': 'Neplatí'},
        ],
    },
];


function harbourTimeToHours(inflowTime, outflowTime) {
    if (outflowTime === null) {
        return (new Date() - new Date(inflowTime)) / 1000 / 60 / 60;
    }

    return (new Date(outflowTime) - new Date(inflowTime)) / 1000 / 60 / 60;
}

export const useStateDetailsFilterStore = create((set, get) => ({
    filters: stateDetailsFilterTemplates,
    setOptionValue: (attribute, optionLabel, value) => {
        set((state) => {
            const newFilters = [...state.filters];
            const selectedAttribute = newFilters.find((filter) => filter.attribute === attribute);
            const optionIndex = selectedAttribute.options.find((option) => option.label === optionLabel);
            optionIndex.value = value;
            return { filters: newFilters };
        });
    },
    resetFilters: () => {
        set((state) => {
            const newFilters = [...state.filters];
            newFilters.forEach((filter) => {
                filter.options.forEach((option) => {
                    option.value = true;
                });
            });
            return { filters: newFilters };
        });
    },
}));

export const usePaymentDetailsFilterStore = create((set, get) => ({
    filters: paymentDetailsFilterTemplates,
    setOptionValue: (attribute, optionLabel, value) => {
        set((state) => {
            const newFilters = [...state.filters];
            const selectedAttribute = newFilters.find((filter) => filter.attribute === attribute);
            const optionIndex = selectedAttribute.options.find((option) => option.label === optionLabel);
            optionIndex.value = value;
            return { filters: newFilters };
        });
    },
    resetFilters: () => {
        set((state) => {
            const newFilters = [...state.filters];
            newFilters.forEach((filter) => {
                filter.options.forEach((option) => {
                    option.value = true;
                });
            });
            return { filters: newFilters };
        });
    },
}));