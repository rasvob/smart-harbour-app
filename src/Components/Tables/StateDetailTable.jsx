import { useState, useEffect } from "react";
import { PenIcon, PenSquareIcon } from "../Icons/SvgIcons";

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

const PaymentCheckbox = ({id, checked, onChange}) => {
    return (
        <input type="checkbox" checked={checked} onChange={onChange} id={id} className={`checkbox ${checked ? "checkbox-success" : "checkbox-error"}`} />
    );
};

const StateDetailTable = ({data, setPaymentStatus, setBoatNumber}) => {
    const editBoatNumber = (id) => {
        const newBoatNumber = prompt("Zadejte nové číslo lodě:");
        if (newBoatNumber !== null) {
            setBoatNumber(id, newBoatNumber);
        }
    };


    return (
        <div className="overflow-x-auto">
            <table className="table table-lg w-full table-zebra-zebra">
                <thead className="text-lg">
                    <tr>
                        <th className="text-center">V přístavu</th>
                        <th className="text-left">Čas příjezdu</th>
                        <th className="text-left">Čas odjezdu</th>
                        <th className="text-left">Doba stání</th>
                        <th className="text-left">Číslo lodě</th>
                        <th className="text-left">Délka lodě</th>
                        <th className="text-left">Zaplaceno</th>
                    </tr>
                </thead>
                <tbody>
                    {prepareViewData(data).map((item, index) => {
                        return (
                            <tr className="hover group" key={index}>
                                <td>
                                    <div className={`circle-icon ${item.inHarbour ? "bg-success" : "bg-error"} w-4 h-4 mx-auto`}></div>
                                </td>
                                <td>{item.inflowTime}</td>
                                <td>{item.outflowTime}</td>
                                <td>{item.timeInHarbour}</td>
                                <td className="lg:flex lg:place-content-between lg:items-center lg:flex-wrap">
                                    <span className={`${item.boatNumber && item.boatNumber.includes('?') ? "font-bold text-error" : ""}`}>{item.boatNumber}</span>
                                    <span>
                                        <button className="btn btn-sm btn-outline btn-info" onClick={() => editBoatNumber(item.id)}><PenSquareIcon /></button>
                                    </span>
                                    
                                </td>
                                <td>{item.boatLength}</td>
                                <td>
                                    {
                                        item.payedState === "Neplatí" ? item.payedState : <PaymentCheckbox checked={item.payedState === 'Ano'} onChange={(e) => setPaymentStatus(item.id)} />
                                    }
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};

export { StateDetailTable, prepareViewData };