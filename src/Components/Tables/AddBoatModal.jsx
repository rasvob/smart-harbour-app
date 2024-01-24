import { forwardRef, useState } from 'react';
import toast from 'react-hot-toast';

const showModal = (modalRef) => {
    modalRef.current.showModal();
};

const TextInput = ({label, placeholder, value, onChange}) => {
    return (
        <label className="form-control w-full max-w-xs">
            <div className="label">
                <span className="label-text">{label}</span>
            </div>
            <input type="text" placeholder={placeholder} className="input input-bordered w-full max-w-xs" value={value} onChange={onChange} />
        </label>
    );
};

const Combobox = ({label, value, onChange, options}) => {
    return (
        <label className="form-control w-full max-w-xs">
            <div className="label">
                <span className="label-text">{label}</span>
            </div>
            <select className="select select-bordered w-full max-w-xs" value={value} onChange={onChange}>
                {
                    options.map((option) => (
                        <option key={option} value={option}>{option}</option>
                    ))
                }
            </select>
        </label>
    );
};

const DatetimePicker = ({label, value, onChange}) => {
    return (
        <label className="form-control w-full max-w-xs">
            <div className="label">
                <span className="label-text">{label}</span>
            </div>
            <input type="datetime-local" className="input input-bordered w-full max-w-xs" value={value} onChange={onChange} />
        </label>
    );
};

const AddBoatModal = forwardRef(({addNewBoat}, modalRef) => {
    const [inflowTime, setInflowTime] = useState(new Date().toISOString().slice(0, 16));
    const [outflowTime, setOutflowTime] = useState(new Date().toISOString().slice(0, 16));
    const [boatNumber, setBoatNumber] = useState("");
    const [boatLength, setBoatLength] = useState("do 8 m");
    const [payedState, setPayedState] = useState("Ne");

    const resetState = () => {
        setInflowTime(new Date().toISOString().slice(0, 16));
        setOutflowTime(new Date().toISOString().slice(0, 16));
        setBoatNumber("");
        setBoatLength("do 8 m");
        setPayedState("Ne");
    };

    const addBoatHandler = (e) => {
        e.preventDefault();
        addNewBoat({'inflowTime': inflowTime, 'outflowTime': outflowTime, 'boatNumber': boatNumber, 'boatLength': boatLength, 'payedState': payedState });
        resetState();
        modalRef.current.close();
        toast.success("Loď byla úspěšně přidána.");
    };
    
    return (    
        <div>
            <dialog id="addNewBoatModal" className="modal" ref={modalRef}>
                <div className="modal-box">
                    <form method="dialog">
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    </form>
                    <h3 className="font-bold text-lg">Nová loď</h3>
                    
                    <form onSubmit={addBoatHandler}>
                        <DatetimePicker label="Čas příjezdu" value={inflowTime} onChange={(e) => setInflowTime(e.target.value)} />
                        <DatetimePicker label="Čas odjezdu" value={outflowTime} onChange={(e) => setOutflowTime(e.target.value)} />
                        <TextInput label="Číslo lodi" placeholder="např. 4P5 456 - P" value={boatNumber} onChange={(e) => setBoatNumber(e.target.value)} />
                        <Combobox label="Délka lodi" value={boatLength} onChange={(e) => setBoatLength(e.target.value)} options={['do 8 m', 'nad 8 m']} />
                        <Combobox label="Zaplaceno" value={payedState} onChange={(e) => setPayedState(e.target.value)} options={['Ano', 'Ne', 'Neplatí']} />
                        

                    <button className="btn btn-success text-white mt-4" type="submit">Přidat</button>
                    </form>
                </div>
                {/* <form method="dialog" className="modal-backdrop">
                    <button>Close</button>
                </form> */}
            </dialog>
        </div>
    );
});

export { AddBoatModal, showModal };