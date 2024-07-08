
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

export { mapRestBoatStateToVmState, mapRestBoatStatesToVmStates, mapBoatLengthToBackend, mapPayedStateToBackend};