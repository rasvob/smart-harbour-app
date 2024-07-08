import { useBoatStore } from "../../Data/DataStore";
import { usePaymentDetailsFilterStore } from "../../Data/FilterStore";
import DetailTableView from "./DetailTableView";
import { useEffect } from "react";
import { getAllStates } from "../../API/RestApi";
import { mapRestBoatStatesToVmStates } from "../../API/DataMappers";
import toast from 'react-hot-toast';
import { useAuthStore } from "../../Data/AuthStore";

const PaymentsDetails = () => {
    const data = useBoatStore((state) => state.boatData);
    const filters = usePaymentDetailsFilterStore((state) => state.filters);
    const setOptionValue = usePaymentDetailsFilterStore((state) => state.setOptionValue);
    const resetFilters = usePaymentDetailsFilterStore((state) => state.resetFilters);
    const switchPaymentStatus = useBoatStore((state) => state.switchPaymentStatus);
    const setBoatData = useBoatStore((state) => state.setBoatData);
    const setBoatNumber = useBoatStore((state) => state.setBoatNumber);
    const getBoatById = useBoatStore((state) => state.getBoatById);
    const getTableViewData = useBoatStore((state) => state.getTableViewData);
    const getFilteredTableViewData = useBoatStore((state) => state.getFilteredTableViewData);
    const addNewBoat = useBoatStore((state) => state.addNewBoat);
    const token = useAuthStore((state) => state.token);

    const viewHeading = "Přehled plateb";

    async function fetchData() {
        const dataFromAPI = await getAllStates(token);
        if (dataFromAPI != null) {
            const mappedData = mapRestBoatStatesToVmStates(dataFromAPI);
            setBoatData(mappedData);
            toast.success("Data byla úspěšně načtena");
        }
        else {
            toast.error("Nepodařilo se načíst data ze serveru");
        }
    };

    useEffect(() => {
        fetchData();
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

export default PaymentsDetails;