import { useBoatStore } from "../../Data/DataStore";
import { useStateDetailsFilterStore } from "../../Data/FilterStore";
import DetailTableView from "./DetailTableView";

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

    const viewHeading = "Přehled stavu přístavu";

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