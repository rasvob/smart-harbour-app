import { useBoatStore } from "../../Data/DataStore";
import { usePaymentDetailsFilterStore } from "../../Data/FilterStore";
import DetailTableView from "./DetailTableView";

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

    const viewHeading = "Přehled plateb";

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