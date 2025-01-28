
const mapRestBoatStateToVmState = (restBoatState) => {
    const { id, arrival_time, departure_time, best_detected_boat_length, best_detected_identifier, payment_status } = restBoatState;
    return {
        'id': id,
        'inflowTime': arrival_time !== null ? arrival_time.toLocaleString('cs-CZ').slice(0, 19) : null,
        'outflowTime': departure_time !== null ? departure_time.toLocaleString('cs-CZ').slice(0, 19) : null,
        'boatNumber': best_detected_identifier,
        'boatLength': best_detected_boat_length,
        'payedState': payment_status,
    };
};

const mapVmStateToRestBoatState = (vmState) => {
    const { inflowTime, outflowTime, boatNumber, boatLength, payedState, id } = vmState;
    return {
        'id': id,
        'arrival_time': inflowTime === '' ? null : inflowTime,
        'departure_time': outflowTime === '' ? null : outflowTime,
        'best_detected_identifier': boatNumber,
        'best_detected_boat_length': boatLength,
        'payment_status': payedState,
        'time_in_marina': outflowTime === '' ? Math.floor((new Date() - new Date(inflowTime))/60000) : (inflowTime === '' ? Math.floor((new Date(outflowTime) - new Date())/60000) : Math.floor((new Date(outflowTime) - new Date(inflowTime))/60000)),
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

const mapBoatLengthToVm = (boatLength) => {
    switch (boatLength) {
        case "pod 8m":
            return "do 8 m";
        case "nad 8m":
            return "nad 8 m";
        default:
            return "do 8 m";
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

const mapPayedStateToVm = (payedState) => {
    switch (payedState) {
        case "Zaplaceno":
            return "Ano";
        case "Nezaplaceno":
            return "Ne";
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
    mapVmStateToRestBoatState,
    mapBoatLengthToVm,
    mapPayedStateToVm
};