export const EVENT_START_DATE = new Date('2026-06-13T00:00:00');

export const isEventStarted = () => {
    return new Date() >= EVENT_START_DATE;
};
