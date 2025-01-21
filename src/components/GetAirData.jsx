import { GetDate } from './GetDate';
import { AirRegion } from '../category/AirRegon';

export const GetAirData = async () => {
    const AirDataApi = import.meta.env.VITE_AIR_DATA_API;
    const { year } = GetDate();

    const url = `http://apis.data.go.kr/B552584/UlfptcaAlarmInqireSvc/getUlfptcaAlarmInfo?ServiceKey=${AirDataApi}&returnType=json&year=${year}`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`AirAPI 요청 오류: ${response.status}`);
        }
        const AirData = await response.json();
        return AirData.response.body.items.map((item) => {
            const region = AirRegion.find((region) => region.name === item.districtName);
            return {
                dataDate: item.dataDate,
                issueTime: item.issueTime,
                districtName: item.districtName,
                issueGbn: item.issueGbn,
                issueVal: item.issueVal,
                moveName: item.moveName,
                lat: region ? region.lat : null,
                lng: region ? region.lng : null,
            };
        });
    } catch (error) {
        console.error('데이터 가져오기 실패:', error);
        return [];
    }
};
