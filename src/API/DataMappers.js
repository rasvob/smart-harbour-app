
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

const mapVmStateToRestBoatState = (vmState) => {
    const { inflowTime, outflowTime, boatNumber, boatLength, payedState } = vmState;
    return {
        'arrival_time': inflowTime,
        'departure_time': outflowTime === '' ? null : outflowTime,
        'best_detected_identifier': boatNumber,
        'best_detected_boat_length': boatLength,
        'payment_status': payedState,
        'time_in_marina': outflowTime === '' ? Math.floor((new Date() - new Date(inflowTime))/60000) : Math.floor((new Date(outflowTime) - new Date(inflowTime))/60000),
        'state_of_boat': 'Kotví',
        'added_manually': true,
        'edit_timestamp': new Date().toISOString(),
    };
};

const mapRestBoatStatesToVmStates = (restBoatStates) => {
    return restBoatStates.map(mapRestBoatStateToVmState);
};

const mapBoatLengthToBackend = (boatLength) => {
    switch (boatLength) {
        case "do 8 m":
            return "pod 8m";
        case "nad 8 m":
            return "nad 8m";
        default:
            return "pod 8m";
    }
};

const mapPayedStateToBackend = (payedState) => {
    switch (payedState) {
        case "Ano":
            return "Zaplaceno";
        case "Ne":
            return "Nezaplaceno";
        case "Neplatí":
            return "Neplatí";
        default:
            return "Nezaplaceno";
    }
};

export { 
    mapRestBoatStateToVmState,
    mapRestBoatStatesToVmStates,
    mapBoatLengthToBackend,
    mapPayedStateToBackend,
    mapVmStateToRestBoatState
};