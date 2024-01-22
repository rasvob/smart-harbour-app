import { useState, useEffect } from "react";

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

const StateDetailTable = ({data}) => {
    const [viewData, setViewData] = useState(prepareViewData(data));

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
                    {viewData.map((item, index) => {
                        return (
                            <tr className="hover" key={index}>
                                <td>{item.inHarbour ? "Ano": "Ne"} <div className="circle-icon bg-green-50 w-4 h-4"></div> </td>
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

export { StateDetailTable, prepareViewData };