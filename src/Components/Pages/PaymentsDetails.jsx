import { useState, useEffect } from "react";
import { useBoatStore } from "../../Data/DataStore";
import { StateDetailTable, prepareViewData } from "../Tables/StateDetailTable";

const PaymentsDetails = () => {
    const data = useBoatStore((state) => state.boatData);
    
    return (
        <div className='container mx-auto mt-2'>
            <h1 className='text-4xl'>Přehled plateb</h1>
            <div className="mt-2">
                <StateDetailTable data={data} />
            </div>
        </div>
    );
};

export default PaymentsDetails;