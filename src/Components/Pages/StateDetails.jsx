import { useState, useEffect } from "react";
import { useBoatStore } from "../../Data/DataStore";
import { useStateDetailsFilterStore } from "../../Data/FilterStore";
import { StateDetailTable } from "../Tables/StateDetailTable";

const BoatDataFilterView = ({filters, setOptionValue, resetFilters}) => {
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
        <div className="mt-4 flex space-x-4">
            {filters.map((filter) => (
                <CheckboxFilterItem key={filter.attribute} filter={filter} setOptionValue={setOptionValue} />
            ))}

           <button className="btn btn-lg btn-primary" onClick={resetFilters}>Resetovat filtry</button>
        </div>
    );
};
    


const StateDetails = () => {
    const data = useBoatStore((state) => state.boatData);
    const filters = useStateDetailsFilterStore((state) => state.filters);
    const setOptionValue = useStateDetailsFilterStore((state) => state.setOptionValue);
    const resetFilters = useStateDetailsFilterStore((state) => state.resetFilters);
    const switchPaymentStatus = useBoatStore((state) => state.switchPaymentStatus);
    const setBoatNumber = useBoatStore((state) => state.setBoatNumber);
    const getBoatById = useBoatStore((state) => state.getBoatById);
    const getTableViewData = useBoatStore((state) => state.getTableViewData);
    const getFilteredTableViewData = useBoatStore((state) => state.getFilteredTableViewData);

    return (
        <div className='container mx-auto mt-2'>
            <h1 className='text-4xl'>Přehled stavu přístavu</h1>

            <BoatDataFilterView filters={filters} setOptionValue={setOptionValue} resetFilters={resetFilters} />

            <div className="mt-2">
                <StateDetailTable data={data} setPaymentStatus={switchPaymentStatus} setBoatNumber={setBoatNumber} getBoatById={getBoatById} getTableViewData={getTableViewData} getFilteredTableViewData={getFilteredTableViewData} filters={filters} />
            </div>
        </div>
    );
};

export default StateDetails;