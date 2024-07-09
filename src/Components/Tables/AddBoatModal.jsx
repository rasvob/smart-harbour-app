import { forwardRef, useState } from 'react';
import toast from 'react-hot-toast';
import { mapBoatLengthToBackend, mapPayedStateToBackend, mapVmStateToRestBoatState, mapRestBoatStateToVmState } from '../../API/DataMappers';
import { addNewBoatState } from '../../API/RestApi';
import { useAuthStore } from '../../Data/AuthStore';

const showModal = (modalRef) => {
    modalRef.current.showModal();
};

const TextInput = ({label, placeholder, value, errorText, onChange}) => {
    return (
        <label className="form-control w-full max-w-xs">
            <div className="label">
                <span className="label-text">{label}</span>
            </div>
            <input type="text" placeholder={placeholder} className={`input input-bordered w-full max-w-xs ${errorText === '' ? '' : 'input-error'}`} value={value} onChange={onChange} />
            <div className="label">
                <span className="label-text-alt">{errorText}</span>
            </div>
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

const DatetimePicker = ({label, value, errorText, onChange}) => {
    return (
        <label className="form-control w-full max-w-xs">
            <div className="label">
                <span className="label-text">{label}</span>
            </div>
            <input type="datetime-local" className={`input input-bordered w-full max-w-xs ${errorText === '' ? '' : 'input-error'}`} value={value} onChange={onChange} />
            <div className="label">
                <span className="label-text-alt">{errorText}</span>
            </div>
        </label>
    );
};

const AddBoatModal = forwardRef(({addNewBoat}, modalRef) => {
    const [inflowTime, setInflowTime] = useState(new Date().toISOString().slice(0, 16));
    const [outflowTime, setOutflowTime] = useState(new Date().toISOString().slice(0, 16));
    const [boatNumber, setBoatNumber] = useState("");
    const [boatLength, setBoatLength] = useState("do 8 m");
    const [payedState, setPayedState] = useState("Ne");
    const [inflowTimeError, setInflowTimeError] = useState("");
    const [outflowTimeError, setOutflowTimeError] = useState("");
    const [boatNumberError, setBoatNumberError] = useState("");
    const token = useAuthStore(state => state.token);

    const resetErrors = () => {
        setInflowTimeError("");
        setOutflowTimeError("");
        setBoatNumberError("");
    };

    const resetState = () => {
        setInflowTime(new Date().toISOString().slice(0, 16));
        setOutflowTime(new Date().toISOString().slice(0, 16));
        setBoatNumber("");
        setBoatLength("do 8 m");
        setPayedState("Ne");
        resetErrors();
    };

    const addBoatHandler = async (e) => {
        e.preventDefault();

        let error = false;
        resetErrors();

        if (inflowTime === "") {
            toast.error("Čas příjezdu nesmí být prázdný.");
            setInflowTimeError("Čas příjezdu nesmí být prázdný.");
            error = true;
        }

        if (boatNumber === "") {
            toast.error("Číslo lodi nesmí být prázdné.");
            setBoatNumberError("Číslo lodi nesmí být prázdné.");
            error = true;
        }

        if (error) {
            return;
        }

        const boat = {
            'inflowTime': inflowTime,
            'outflowTime': outflowTime,
            'boatNumber': boatNumber,
            'boatLength': mapBoatLengthToBackend(boatLength),
            'payedState': mapPayedStateToBackend(payedState) 
        };
        const restBoatState = mapVmStateToRestBoatState(boat);
        console.log(restBoatState);

        const response = await addNewBoatState(token, restBoatState);
        
        if (response === null) {
            toast.error("Nepodařilo se přidat loď.");
        } else {
            console.log(response);
            const vmBoatState = mapRestBoatStateToVmState(response);
            console.log(vmBoatState);
            addNewBoat(vmBoatState);
            toast.success("Loď byla úspěšně přidána.");
        }
        
        resetState();
        modalRef.current.close();
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
                        <DatetimePicker label="Čas příjezdu" value={inflowTime} errorText={inflowTimeError} onChange={(e) => setInflowTime(e.target.value)} />
                        <DatetimePicker label="Čas odjezdu" value={outflowTime} errorText={outflowTimeError} onChange={(e) => setOutflowTime(e.target.value)} />
                        <TextInput label="Číslo lodi" placeholder="např. 4P5 456 - P" value={boatNumber} errorText={boatNumberError} onChange={(e) => setBoatNumber(e.target.value)} />
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