import { StateDetailTable } from "../Tables/StateDetailTable";
import { BoatDataFilterView } from "../Tables/BoatDataFilterView";

const DetailTableView = ({heading, data, switchPaymentStatus, setBoatNumber, getBoatById, getTableViewData, getFilteredTableViewData, filters, setOptionValue, resetFilters, addNewBoat}) => {
    return (
        <div className='container mx-auto mt-2'>
            <h1 className='text-4xl'>{heading}</h1>

            <BoatDataFilterView filters={filters} setOptionValue={setOptionValue} resetFilters={resetFilters} addNewBoat={addNewBoat} />

            <div className="mt-2">
                <StateDetailTable data={data} setPaymentStatus={switchPaymentStatus} setBoatNumber={setBoatNumber} getBoatById={getBoatById} getTableViewData={getTableViewData} getFilteredTableViewData={getFilteredTableViewData} filters={filters} />
            </div>
        </div>
    );
};

export default DetailTableView;