import { useState, useEffect } from "react";
import { useBoatStore } from "../../Data/DataStore";
import { StateDetailTable } from "../Tables/StateDetailTable";

const PaymentsDetails = () => {
    const data = useBoatStore((state) => state.boatData);
    const switchPaymentStatus = useBoatStore((state) => state.switchPaymentStatus);
    
    return (
        <div className='container mx-auto mt-2'>
            <h1 className='text-4xl'>Přehled plateb</h1>
            <div className="mt-2">
            <StateDetailTable data={data} setPaymentStatus={switchPaymentStatus} />
            </div>
        </div>
    );
};

export default PaymentsDetails;