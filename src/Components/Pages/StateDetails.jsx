import { useState, useEffect } from "react";
import { useBoatStore } from "../../Data/DataStore";
import { useStateDetailsFilterStore } from "../../Data/FilterStore";
import { StateDetailTable } from "../Tables/StateDetailTable";
import { BoatDataFilterView } from "../Tables/BoatDataFilterView";

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
    const addNewBoat = useBoatStore((state) => state.addNewBoat);

    // useEffect(() => {
    //     resetFilters();
    // }
    // , []);

    return (
        <div className='container mx-auto mt-2'>
            <h1 className='text-4xl'>Přehled stavu přístavu</h1>

            <BoatDataFilterView filters={filters} setOptionValue={setOptionValue} resetFilters={resetFilters} addNewBoat={addNewBoat} />

            <div className="mt-2">
                <StateDetailTable data={data} setPaymentStatus={switchPaymentStatus} setBoatNumber={setBoatNumber} getBoatById={getBoatById} getTableViewData={getTableViewData} getFilteredTableViewData={getFilteredTableViewData} filters={filters} />
            </div>
        </div>
    );
};

export default StateDetails;