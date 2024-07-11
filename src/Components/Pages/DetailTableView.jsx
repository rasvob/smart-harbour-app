import { StateDetailTable } from "../Tables/StateDetailTable";
import { BoatDataFilterView } from "../Tables/BoatDataFilterView";

const DetailTableView = ({heading, data, switchPaymentStatus, setBoatNumber, getBoatById, getTableViewData, getFilteredTableViewData, filters, setOptionValue, resetFilters, addNewBoat, updatePaymentStatus, updateBoatStateIdentifier, token}) => {
    return (
        <div className='container mx-auto mt-2'>
            <h1 className='text-4xl'>{heading}</h1>

            <BoatDataFilterView filters={filters} setOptionValue={setOptionValue} resetFilters={resetFilters} />

            <div className="mt-2">
                <StateDetailTable 
                    data={data} 
                    switchPaymentStatus={switchPaymentStatus} 
                    setBoatNumber={setBoatNumber} 
                    getBoatById={getBoatById} 
                    getTableViewData={getTableViewData} 
                    getFilteredTableViewData={getFilteredTableViewData} 
                    filters={filters}
                    updatePaymentStatus={updatePaymentStatus}
                    updateBoatStateIdentifier={updateBoatStateIdentifier}
                    token={token}
                />
            </div>
        </div>
    );
};

export default DetailTableView;