
const mapRestBoatStateToVmState = (restBoatState) => {
    const { id, arrival_time, departure_time, best_detected_boat_length, best_detected_identifier, payment_status } = restBoatState;
    return {
        'id': id,
        'inflowTime': arrival_time,
        'outflowTime': departure_time,
        'boatNumber': best_detected_identifier,
        'boatLength': best_detected_boat_length,
        'payedState': payment_status,
    };
};

const mapRestBoatStatesToVmStates = (restBoatStates) => {
    return restBoatStates.map(mapRestBoatStateToVmState);
};

export { mapRestBoatStateToVmState, mapRestBoatStatesToVmStates };