import { GetDate } from './GetDate';

export const GetAccidentDeath = async () => {
    const { year } = GetDate();

    const AccidentDeathKey = import.meta.env.VITE_ACCIDENT_DEATH_KEY;

    try {
        const url = `https://apis.data.go.kr/B552061/AccidentDeath/getRestTrafficAccidentDeath?ServiceKey=${AccidentDeathKey}&searchYear=2024&siDo=1100&guGun=&type=json&numOfRows=10&pageNo=1`;
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`API 요청 오류: ${response.status}`);
        }
        const data = await response.json();
        console.log(data);
        const items = data.items.item || [];

        if (items.length === 0) {
            console.log('데이터가 없습니다.');
            return [];
        }
        // return data.response.body.items.item.map((spot) => [
        //     spot.signguNm,
        //     spot.centerY,
        //     spot.centerX,
        //     spot.freqocZoneNm,
        //     spot.acdntCo,
        //     spot.freqocZoneVer,
        // ]);
    } catch (error) {
        console.error('데이터 가져오기 실패:', error);
        return [];
    }
};
