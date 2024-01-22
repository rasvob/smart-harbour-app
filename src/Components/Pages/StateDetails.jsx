import { useState, useEffect } from "react";
import { useBoatStore } from "../../Data/DataStore";
import { StateDetailTable, prepareViewData } from "../Tables/StateDetailTable";

const StateDetails = () => {
    const data = useBoatStore((state) => state.boatData);

    return (
        <div className='container mx-auto mt-2'>
            <h1 className='text-4xl'>Přehled stavu přístavu</h1>
            <div className="mt-2">
                <StateDetailTable data={data} />
            </div>
        </div>
    );
};

export default StateDetails;