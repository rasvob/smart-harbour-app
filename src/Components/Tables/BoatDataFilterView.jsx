import { RefreshIcon } from "../Icons/SvgIcons";
import { useRef } from "react";
import { AddBoatModal, showModal } from "./AddBoatModal";

const BoatDataFilterView = ({filters, setOptionValue, resetFilters, addNewBoat}) => {
    const addBoatRef = useRef(null);

    const CheckboxFilterItem = ({filter, setOptionValue}) => {
        return (
            <div className="bg-slate-50 py-3 px-3">
                <h2 className="font-bold text-lg">{filter.label}</h2>
                {
                    filter.options.map((option) => (
                        <div key={option.label} className="form-control">
                            <label className="cursor-pointer label">
                                <span className="label-text mr-6">{option.label}</span>
                                <input type="checkbox" className="checkbox checkbox-primary" checked={option.value} onChange={() => setOptionValue(filter.attribute, option.label, !option.value)} />
                            </label>
                        </div>
                    ))
                }
            </div>
        );
    };

    return (
        <div className="mt-4 flex flex-wrap gap-4">
            {filters.map((filter) => (
                <CheckboxFilterItem key={filter.attribute} filter={filter} setOptionValue={setOptionValue} />
            ))}

            <div className="flex flex-col justify-between space-y-2">
                <button className="btn btn-lg btn-accent" onClick={resetFilters}><RefreshIcon />Resetovat filtry</button>
                <button className="btn btn-lg btn-success" onClick={() => showModal(addBoatRef)}>Přidat loď</button>
            </div>
           

            <AddBoatModal addNewBoat={addNewBoat} ref={addBoatRef} />
        </div>
    );
};

export { BoatDataFilterView };