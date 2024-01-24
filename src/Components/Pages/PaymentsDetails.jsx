import { useState, useEffect } from "react";
import { useBoatStore } from "../../Data/DataStore";
import { StateDetailTable } from "../Tables/StateDetailTable";
import { BoatDataFilterView } from "../Tables/BoatDataFilterView";
import { usePaymentDetailsFilterStore } from "../../Data/FilterStore";

const PaymentsDetails = () => {
    const data = useBoatStore((state) => state.boatData);
    const filters = usePaymentDetailsFilterStore((state) => state.filters);
    const setOptionValue = usePaymentDetailsFilterStore((state) => state.setOptionValue);
    const resetFilters = usePaymentDetailsFilterStore((state) => state.resetFilters);
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
            <h1 className='text-4xl'>Přehled plateb</h1>

            <BoatDataFilterView filters={filters} setOptionValue={setOptionValue} resetFilters={resetFilters} addNewBoat={addNewBoat} />

            <div className="mt-2">
                <StateDetailTable data={data} setPaymentStatus={switchPaymentStatus} setBoatNumber={setBoatNumber} getBoatById={getBoatById} getTableViewData={getTableViewData} getFilteredTableViewData={getFilteredTableViewData} filters={filters} />
            </div>
        </div>
    );
};

export default PaymentsDetails;