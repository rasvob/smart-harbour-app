import { useEffect } from "react";
import { useBoatStore } from "../../Data/DataStore";
import { useAuthStore } from "../../Data/AuthStore";
import { useStateDetailsFilterStore } from "../../Data/FilterStore";
import { getAllStates } from "../../API/RestApi";
import { mapRestBoatStatesToVmStates } from "../../API/DataMappers";
import DetailTableView from "./DetailTableView";
import toast from 'react-hot-toast';

const StateDetails = () => {
    const data = useBoatStore((state) => state.boatData);
    const setBoatData = useBoatStore((state) => state.setBoatData);
    const filters = useStateDetailsFilterStore((state) => state.filters);
    const setOptionValue = useStateDetailsFilterStore((state) => state.setOptionValue);
    const resetFilters = useStateDetailsFilterStore((state) => state.resetFilters);
    const switchPaymentStatus = useBoatStore((state) => state.switchPaymentStatus);
    const setBoatNumber = useBoatStore((state) => state.setBoatNumber);
    const getBoatById = useBoatStore((state) => state.getBoatById);
    const getTableViewData = useBoatStore((state) => state.getTableViewData);
    const getFilteredTableViewData = useBoatStore((state) => state.getFilteredTableViewData);
    const addNewBoat = useBoatStore((state) => state.addNewBoat);
    const token = useAuthStore((state) => state.token);

    const viewHeading = "Přehled stavu přístavu";

    async function fetchData() {
        const dataFromAPI = await getAllStates(token);
        if (dataFromAPI != null) {
            const mappedData = mapRestBoatStatesToVmStates(dataFromAPI);
            setBoatData(mappedData);
            console.log(mappedData);
            toast.success("Data byla úspěšně načtena");
        }
        else {
            toast.error("Nepodařilo se načíst data ze serveru");
        }
    };

    useEffect(() => {
        fetchData();
        // toast.success("Data byla úspěšně načtena");
    }, []);

    return (
        <DetailTableView 
            heading={viewHeading} 
            data={data} 
            switchPaymentStatus={switchPaymentStatus} 
            setBoatNumber={setBoatNumber} 
            getBoatById={getBoatById} 
            getTableViewData={getTableViewData} 
            getFilteredTableViewData={getFilteredTableViewData} 
            filters={filters} 
            setOptionValue={setOptionValue} 
            resetFilters={resetFilters}
            addNewBoat={addNewBoat}
        />
    );
};

export default StateDetails;