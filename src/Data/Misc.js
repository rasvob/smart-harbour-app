const milisecondsToHoursAndMinutes = (ms) => {
    const hours = Math.floor(ms / 1000 / 60 / 60);
    const minutes = Math.floor(ms / 1000 / 60) - (hours * 60);

    return `${hours}h ${minutes}m`;
};

const getValueFromLocalStorage = (key) => {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : null;
};

const setValueToLocalStorage = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
};




export { milisecondsToHoursAndMinutes, getValueFromLocalStorage, setValueToLocalStorage };