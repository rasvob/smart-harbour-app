import { useState, useEffect, useRef } from "react";
import { PenIcon, PenSquareIcon } from "../Icons/SvgIcons";

// const milisecondsToHoursAndMinutes = (ms) => {
//     const hours = Math.floor(ms / 1000 / 60 / 60);
//     const minutes = Math.floor(ms / 1000 / 60) - (hours * 60);

//     return `${hours}h ${minutes}m`;
// };

// const prepareViewData = (data) => {
//     return data.map((item) => {
//         return {
//             ...item,
//             'inHarbour': item.outflowTime === null,
//             'timeInHarbour': item.outflowTime === null ? milisecondsToHoursAndMinutes(new Date() - new Date(item.inflowTime)) : milisecondsToHoursAndMinutes(new Date(item.outflowTime) - new Date(item.inflowTime)),
//         };
//     });
// };

const PaymentCheckbox = ({id, checked, onChange}) => {
    return (
        <input type="checkbox" checked={checked} onChange={onChange} id={id} className={`checkbox ${checked ? "checkbox-success" : "checkbox-error"}`} />
    );
};

const StateDetailTable = ({data, setPaymentStatus, setBoatNumber, getBoatById, getTableViewData, filters, getFilteredTableViewData}) => {
    const [selectedId, setSelectedId] = useState(0);
    const [newBoatNumber, setNewBoatNumber] = useState(1);
    const editBoatNumberModalRef = useRef(null);

    const editBoatNumber = (id) => {
        setSelectedId(id);
        const currentBoatNumber = getBoatById(id).boatNumber || "";
        setNewBoatNumber(currentBoatNumber);
        editBoatNumberModalRef.current.showModal();
    };

    const submitBoatNumberChange = (e) => {
        e.preventDefault();
        if (newBoatNumber !== null) {
            setBoatNumber(selectedId, newBoatNumber);
            editBoatNumberModalRef.current.close();
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
                    {getFilteredTableViewData(filters).map((item, index) => {
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
                                    {/* {item.boatNumber === null || item.boatNumber.includes('?') ? <button className="btn btn-sm btn-outline btn-info" onClick={() => editBoatNumber(item.id)}><PenSquareIcon /></button> : null} */}
                                    <button className="btn btn-sm btn-outline btn-info" onClick={() => editBoatNumber(item.id)}><PenSquareIcon /></button>
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

            <dialog id="editBoatNumberModal" className="modal" ref={editBoatNumberModalRef}>
                <div className="modal-box">
                    <form method="dialog">
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    </form>
                    <h3 className="font-bold text-lg">Current boat number: {selectedId && getBoatById(selectedId).boatNumber}</h3>
                    
                    <form onSubmit={submitBoatNumberChange} >
                    <label className="form-control w-full max-w-xs">
                        <div className="label">
                            <span className="label-text">Change boat number</span>
                        </div>
                        <input type="text" placeholder="e.g. 4P5 456 - P" className="input input-bordered w-full max-w-xs" value={newBoatNumber} onChange={(e) => setNewBoatNumber(e.target.value)} />
                    </label>
                    <button className="btn btn-success text-white mt-4" type="submit">Submit</button>
                    </form>
                </div>
                {/* <form method="dialog" className="modal-backdrop">
                    <button>Close</button>
                </form> */}
            </dialog>
        </div>
    );
};

export { StateDetailTable };