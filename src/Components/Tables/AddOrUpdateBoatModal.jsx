import { forwardRef, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { mapBoatLengthToBackend, mapPayedStateToBackend, mapVmStateToRestBoatState, mapRestBoatStateToVmState, mapBoatLengthToVm, mapPayedStateToVm } from '../../API/DataMappers';
import { addNewBoatState, updateBoatState } from '../../API/RestApi';
import { useAuthStore } from '../../Data/AuthStore';
import { useBoatStore } from '../../Data/DataStore';

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

const AddOrUpdateBoatModal = forwardRef(({selectedBoatId, actionButtonText, titleText, forAdding}, modalRef) => {
    const [inflowTime, setInflowTime] = useState(new Date().toISOString().slice(0, 16));
    const [outflowTime, setOutflowTime] = useState(new Date().toISOString().slice(0, 16));
    const [boatNumber, setBoatNumber] = useState("");
    const [boatLength, setBoatLength] = useState("do 8 m");
    const [payedState, setPayedState] = useState("Ne");
    const [stateId, setStateId] = useState(0);
    const [inflowTimeError, setInflowTimeError] = useState("");
    const [outflowTimeError, setOutflowTimeError] = useState("");
    const [boatNumberError, setBoatNumberError] = useState("");
    const token = useAuthStore(state => state.token);
    const addNewBoat = useBoatStore((state) => state.addNewBoat);
    const getBoatById = useBoatStore((state) => state.getBoatById);
    const updateBoatStateZustand = useBoatStore((state) => state.updateBoatState);

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

    const handleErrors = () => {
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
        return error;
    };


    const addBoatHandler = async (e) => {
        e.preventDefault();

        let error = handleErrors();

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

        const response = await addNewBoatState(token, restBoatState);
        
        if (response === null) {
            toast.error("Nepodařilo se přidat loď.");
        } else {
            const vmBoatState = mapRestBoatStateToVmState(response);
            addNewBoat(vmBoatState);
            toast.success("Loď byla úspěšně přidána.");
        }
        
        resetState();
        modalRef.current.close();
    };

    const updateBoatHandler = async (e) => {
        e.preventDefault();

        let error = handleErrors();

        if (error) {
            return;
        }

        const boat = {
            'id': selectedBoatId,
            'inflowTime': inflowTime,
            'outflowTime': outflowTime,
            'boatNumber': boatNumber,
            'boatLength': mapBoatLengthToBackend(boatLength),
            'payedState': mapPayedStateToBackend(payedState) 
        };
        const restBoatState = mapVmStateToRestBoatState(boat);

        const response = await updateBoatState(token, restBoatState);
        
        if (response === null) {
            toast.error("Nepodařilo se aktualizovat záznam.");
        } else {
            const vmBoatState = mapRestBoatStateToVmState(response);
            updateBoatStateZustand(vmBoatState);
            toast.success("Záznam byl úspěšně aktualizován.");
        }
        
        resetState();
        modalRef.current.close();
    };

    useEffect(() => {
        if (selectedBoatId && selectedBoatId !== null) {
            const boat = getBoatById(selectedBoatId);
            setStateId(boat.id);
            setInflowTime(boat.inflowTime);
            setOutflowTime(boat.outflowTime || '');
            setBoatNumber(boat.boatNumber);
            setBoatLength(mapBoatLengthToVm(boat.boatLength));
            setPayedState(mapPayedStateToVm(boat.payedState));
        }
    }, [selectedBoatId]);
    
    return (    
        <div>
            <dialog id="addNewBoatModal" className="modal" ref={modalRef}>
                <div className="modal-box">
                    <form method="dialog">
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    </form>
                    <h3 className="font-bold text-lg">{titleText}</h3>
                    
                    <form onSubmit={forAdding ? addBoatHandler : updateBoatHandler}>
                        <DatetimePicker label="Čas příjezdu" value={inflowTime} errorText={inflowTimeError} onChange={(e) => setInflowTime(e.target.value)} />
                        <DatetimePicker label="Čas odjezdu" value={outflowTime} errorText={outflowTimeError} onChange={(e) => setOutflowTime(e.target.value)} />
                        <TextInput label="Číslo lodi" placeholder="např. 4P5 456 - P" value={boatNumber} errorText={boatNumberError} onChange={(e) => setBoatNumber(e.target.value)} />
                        <Combobox label="Délka lodi" value={boatLength} onChange={(e) => setBoatLength(e.target.value)} options={['do 8 m', 'nad 8 m']} />
                        <Combobox label="Zaplaceno" value={payedState} onChange={(e) => setPayedState(e.target.value)} options={['Ano', 'Ne', 'Neplatí']} />
                        

                    <button className="btn btn-success text-white mt-4" type="submit">{actionButtonText}</button>
                    </form>
                </div>
                {/* <form method="dialog" className="modal-backdrop">
                    <button>Close</button>
                </form> */}
            </dialog>
        </div>
    );
});

export { AddOrUpdateBoatModal, showModal };