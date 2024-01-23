const milisecondsToHoursAndMinutes = (ms) => {
    const hours = Math.floor(ms / 1000 / 60 / 60);
    const minutes = Math.floor(ms / 1000 / 60) - (hours * 60);

    return `${hours}h ${minutes}m`;
};

export { milisecondsToHoursAndMinutes };