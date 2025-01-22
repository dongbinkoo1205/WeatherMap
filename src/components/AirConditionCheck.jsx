export const AirConditionCheck = (concentration) => {
    if (concentration > 150) return '#ff0000'; // 매우 나쁨 (빨간색)
    if (concentration > 100) return '#ff8c00'; // 나쁨 (주황색)
    if (concentration > 50) return '#ffff00'; // 보통 (노란색)
    return '#00ff00'; // 좋음 (초록색)
};
