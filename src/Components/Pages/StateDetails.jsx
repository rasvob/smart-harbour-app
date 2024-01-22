import { useState, useEffect } from "react";
import { useBoatStore } from "../../Data/DataStore";
import { StateDetailTable, prepareViewData } from "../Tables/StateDetailTable";

const StateDetails = () => {
    const data = useBoatStore((state) => state.boatData);
    const switchPaymentStatus = useBoatStore((state) => state.switchPaymentStatus);
    const setBoatNumber = useBoatStore((state) => state.setBoatNumber);

    return (
        <div className='container mx-auto mt-2'>
            <h1 className='text-4xl'>Přehled stavu přístavu</h1>
            <div className="mt-2">
                <StateDetailTable data={data} setPaymentStatus={switchPaymentStatus} setBoatNumber={setBoatNumber} />
            </div>
        </div>
    );
};

export default StateDetails;