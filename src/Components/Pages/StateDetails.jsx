import { useState, useEffect } from "react";

const dataset = [
    { 'inflowTime': '2023-05-01 12:00:00', 'outflowTime': '2023-05-01 16:00:00', 'boatNumber': '6P2 6154', 'boatLength': 'nad 8 m', 'payedState': 'Ano' },
    { 'inflowTime': '2023-05-01 13:00:00', 'outflowTime': null, 'boatNumber': null, 'boatLength': 'do 8 m', 'payedState': 'Ne' },
    { 'inflowTime': '2023-05-01 12:30:00', 'outflowTime': '2023-05-01 14:00:00', 'boatNumber': '2X5 4455', 'boatLength': 'nad 8 m', 'payedState': 'Ano' },
    { 'inflowTime': '2023-05-01 11:00:00', 'outflowTime': null, 'boatNumber': '??4 2122', 'boatLength': 'nad 8 m', 'payedState': 'Neplatí' },
];

const StateDetailTable = ({data}) => {
    return (
        <div className="overflow-x-auto">
            <table className="table table-lg w-full table-zebra-zebra">
                <thead className="text-lg">
                    <tr>
                        <th className="text-left">V přístavu</th>
                        <th className="text-left">Čas příjezdu</th>
                        <th className="text-left">Čas odjezdu</th>
                        <th className="text-left">Doba stání</th>
                        <th className="text-left">Číslo lodě</th>
                        <th className="text-left">Délka lodě</th>
                        <th className="text-left">Zaplaceno</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, index) => {
                        return (
                            <tr className="hover" key={index}>
                                <td>{item.inHarbour ? "Ano": "Ne"}</td>
                                <td>{item.inflowTime}</td>
                                <td>{item.outflowTime}</td>
                                <td>{item.timeInHarbour}</td>
                                <td>{item.boatNumber}</td>
                                <td>{item.boatLength}</td>
                                <td>{item.payedState}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};

const StateDetails = () => {
    

    const milisecondsToHoursAndMinutes = (ms) => {
        const hours = Math.floor(ms / 1000 / 60 / 60);
        const minutes = Math.floor(ms / 1000 / 60) - (hours * 60);

        return `${hours}h ${minutes}m`;
    };

    const prepareViewData = (data) => {
        return data.map((item) => {
            return {
                ...item,
                'inHarbour': item.outflowTime === null,
                'timeInHarbour': item.outflowTime === null ? milisecondsToHoursAndMinutes(new Date() - new Date(item.inflowTime)) : milisecondsToHoursAndMinutes(new Date(item.outflowTime) - new Date(item.inflowTime)),
            };
        });
    };

    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    
    useEffect(() => {
        // Repeat dataset 20x
        const repeatedDataset = [];
        for (let i = 0; i < 20; i++) {
            repeatedDataset.push(...dataset);
        }

        setData(repeatedDataset);
        setFilteredData(prepareViewData(repeatedDataset));
    }, []);

    return (
        <div className='container mx-auto mt-2'>
            <h1 className='text-4xl'>Přehled stavu přístavu</h1>
            <div className="mt-2">
                <StateDetailTable data={filteredData} />
            </div>
        </div>
    );
};

export default StateDetails;