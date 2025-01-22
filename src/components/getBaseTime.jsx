import { AvailableTimes } from '../category/AvailableTimes';

export function getBaseTime(hours) {
    const currentHour = parseInt(hours);
    let closestTime = '0000';
    for (let time of AvailableTimes) {
        if (currentHour >= parseInt(time.substring(0, 2))) {
            closestTime = time;
        } else {
            break;
        }
    }
    return closestTime;
}
