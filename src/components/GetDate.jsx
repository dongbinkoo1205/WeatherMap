import { getBaseTime } from './getBaseTime';

export function GetDate() {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const date = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');

    const base_time = getBaseTime(hours); // base_time 계산
    const base_date = `${year}${month}${date}`; // base_date 계산

    return { base_date, base_time, now, year, month, date, hours }; // base_date와 base_time 반환
}
