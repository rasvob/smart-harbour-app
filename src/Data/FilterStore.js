import { create } from "zustand";

class Filter {
    constructor(attribute, type, label, predicate, options) {
        this.attribute = attribute;
        this.type = type;
        this.label = label;
        this.predicate = predicate;
        this.options = options;
    }
}

export const stateDetailsFilter = new Filter(
    'inHarbour',
    'checkbox',
    'V přístavu',
    (item) => item.outflowTime === null,
    [
        {'value': true, 'predicate': (item) => this.predicate(item), 'label': 'Ano'},
        {'value': true, 'predicate': (item) => !this.predicate(item), 'label': 'Ne'},
    ],
);

const stateDetailsFilterTemplates = [
    {
        'attribute': 'inHarbour',
        'type': 'checkbox',
        'label': 'V přístavu',
        'predicate': (item) => item.outflowTime === null,
        'options': [
            {'value': true, 'predicate': (item) => this.predicate(item), 'label': 'Ano'},
            {'value': true, 'predicate': (item) => !this.predicate(item), 'label': 'Ne'},
        ],
    },
    // {
    //     'attribute': 'boatNumber',
    //     'type': 'checkbox',
    //     'label': 'Číslo lodě',
    //     'predicate': (item) => item.boatNumber && !item.boatNumber.includes('?'),
    //     'options': [
    //         {'value': true, 'predicate': (item) => this.predicate(item), 'label': 'Rozpoznané'},
    //         {'value': true, 'predicate': (item) => !this.predicate(item), 'label': 'Nerozpoznané'},
    //     ],
    // },
    // {
    //     'attribute': 'payedState',
    //     'type': 'checkbox',
    //     'label': 'Zaplaceno',
    //     'predicate': (item) => item.payedState === 'Ano',
    //     'options': [
    //         {'value': true, 'predicate': (item) => item.payedState === 'Ano', 'label': 'Ano'},
    //         {'value': true, 'predicate': (item) => item.payedState === 'Ne', 'label': 'Ne'},
    //         {'value': true, 'predicate': (item) => item.payedState === 'Neplatí', 'label': 'Neplatí'},
    //     ],
    // },
    // {
    //     'attribute': 'outflowTime',
    //     'type': 'checkbox',
    //     'label': 'Doba stání',
    //     'predicate': (item) => harbourTimeToHours(item.inflowTime, item.outflowTime) < 4.0,
    //     'options': [
    //         {'value': true, 'predicate': (item) => this.predicate(item), 'label': 'Do 4 hodin'},
    //         {'value': true, 'predicate': (item) => (harbourTimeToHours(item.inflowTime, item.outflowTime) >= 4.0 && harbourTimeToHours(item.inflowTime, item.outflowTime) <= 24.0), 'label': 'Nad 4 hodiny'},
    //         {'value': true, 'predicate': (item) => harbourTimeToHours(item.inflowTime, item.outflowTime) > 24.0, 'label': 'Více dní'},
    //     ],
    // },
    // {
    //     'attribute': 'boatLength',
    //     'type': 'checkbox',
    //     'label': 'Délka lodi',
    //     'predicate': (item) => item.boatLength === 'do 8 m',
    //     'options': [
    //         {'value': true, 'predicate': (item) => this.predicate(item), 'label': 'Do 8 metrů'},
    //         {'value': true, 'predicate': (item) => !this.predicate(item), 'label': 'Nad 4 hodiny'},
    //     ],
    // },
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
            console.log(newFilters, attribute, optionLabel, value);
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