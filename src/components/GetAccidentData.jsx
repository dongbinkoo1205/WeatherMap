export const GetAccidentData = async () => {
    const AccidentDataKey = import.meta.env.VITE_ACCIDENT_DATA_KEY;

    try {
        const url = `https://apis.data.go.kr/B552468/acdntFreqocZone/getAcdntFreqocZone?ServiceKey=${AccidentDataKey}&pageNo=1&numOfRows=100&dataType=json&signguCode=11`;
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`API 요청 오류: ${response.status}`);
        }
        const data = await response.json();
        return data.response.body.items.item.map((spot) => [
            spot.signguNm,
            spot.centerY,
            spot.centerX,
            spot.freqocZoneNm,
            spot.acdntCo,
            spot.freqocZoneVer,
        ]);
    } catch (error) {
        console.error('데이터 가져오기 실패:', error);
        return [];
    }
};
