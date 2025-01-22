import { useState } from 'react';
import './AirConditionInfo.css';

const AirQualityInfo = ({ isToggled }) => {
    const toggledStyle = isToggled
        ? {
              display: 'block',
          }
        : {
              display: 'none',
          };
    // 상태별 정보를 정의
    const infoData = {
        좋음: '통합지수 : 0 ~ 50',
        보통: '통합지수 : 51 ~ 100',
        나쁨: '통합지수 : 101 ~ 150',
        매우나쁨: '통합지수 : 151 ~ 200',
    };

    const [selectedInfo, setSelectedInfo] = useState(null); // 선택된 정보를 저장

    const handleClick = (status) => {
        setSelectedInfo(status === selectedInfo ? null : status); // 같은 상태 클릭 시 닫기
    };

    return (
        <div className="traffic-info" style={toggledStyle}>
            <div className="header">
                <span>미세먼지 환경기준 : 한국환경공단 에어코리아 </span>
            </div>
            <div className="statusWrap">
                <div className="status-item" onClick={() => handleClick('좋음')}>
                    <span className="circle green"></span> 좋음
                </div>
                <div className="status-item" onClick={() => handleClick('보통')}>
                    <span className="circle yellow"></span> 보통
                </div>
                <div className="status-item" onClick={() => handleClick('나쁨')}>
                    <span className="circle orange"></span> 나쁨
                </div>
                <div className="status-item" onClick={() => handleClick('매우나쁨')}>
                    <span className="circle red"></span> 매우나쁨
                </div>
            </div>
            <div className="trafficFooter">
                <p>▶ 등급별 툴팁을 클릭해 상세 정보 확인이 가능합니다.</p>
                <p>▶ 한국환경공단 에어코리아의 실시간 집계를 기준으로 합니다.</p>
            </div>
            {selectedInfo && (
                <div className="info-popup">
                    <h3>{selectedInfo}</h3>
                    <p>{infoData[selectedInfo]}</p>
                </div>
            )}
        </div>
    );
};

export default AirQualityInfo;
