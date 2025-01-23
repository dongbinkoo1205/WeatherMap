import { useState, useEffect } from 'react';
import { regionName } from '../category/regionName';
import { GetDate } from './GetDate';
import { weatherCategory, categorySymbols } from '../category/weatherCategory';
import { WeatherImage } from '../category/WeatherImage';
import close from '../../public/close.png';

import './GetWeatherData.css';

const GetWeatherData = ({ isToggled, setIsToggled }) => {
    const toggledStyle = isToggled ? { display: 'block' } : { display: 'none' };

    const handleToggle = () => {
        setIsToggled((prev) => !prev); // 부모 상태 변경 요청
    };
    const [selectedRegion, setSelectedRegion] = useState('서울'); // 초기값은 "서울"
    const [weatherData, setWeatherData] = useState([]);
    const [matchingData, setMatchingData] = useState(null); // 조건에 맞는 데이터 상태
    const [weatherImage, setWeatherImage] = useState(null); // 날씨 이미지 상태
    const [weatherClass, setWeatherClass] = useState(''); // 날씨 이미지 상태
    const { base_date, base_time, month, date, hours } = GetDate();

    useEffect(() => {
        const fetchWeatherData = async () => {
            const WeatherDataApi = import.meta.env.VITE_WEATHER_DATA_API;

            // 선택된 지역의 nx와 ny를 찾기
            const selectedRegionData = regionName.find((region) => region.regionName === selectedRegion);

            // 좌표값 추출
            const { nx, ny } = selectedRegionData;

            // 날씨 데이터 요청 API
            const url = `https://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getUltraSrtNcst?ServiceKey=${WeatherDataApi}&pageNo=1&numOfRows=10&dataType=JSON&base_date=${base_date}&base_time=${base_time}&nx=${nx}&ny=${ny}`;

            try {
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error(`API 요청 오류: ${response.status}`);
                }

                const WeatherData = await response.json();

                const formattedData = WeatherData.response.body.items.item.map((item) => ({
                    baseDate: item.baseDate,
                    baseTime: item.baseTime,
                    category: weatherCategory[item.category] || item.category,
                    obsrValue: item.obsrValue,
                }));
                setWeatherData(formattedData); // 상태 업데이트
            } catch (error) {
                console.error('데이터 가져오기 실패:', error);
            }
        };
        fetchWeatherData();
    }, [selectedRegion]); // selectedRegion 상태가 변경될 때마다 호출

    // 날씨데이터의 값을 확인해서 텍스트 반환
    const getCustomMessage = (category, obsrValue) => {
        if (category === '강수형태' && Number(obsrValue) === 0) {
            return '비가 내리지 않았습니다.';
        }
        if (category === '기온' && Number(obsrValue) > 25) {
            return '오늘은 매우 더운 날씨입니다';
        }
        if (category === '습도' && Number(obsrValue) > 80) {
            return '습도가 높습니다. 불쾌지수를 주의하세요.';
        }
        // 기본적으로 obsrValue와 단위 반환
        return `${obsrValue} ${categorySymbols[category] || ''}`;
    };

    // 조건에 맞는 데이터를 찾아 상태로 저장
    useEffect(() => {
        const data = weatherData.find(
            (item) =>
                (item.category === '강수형태' && Number(item.obsrValue) > 0) || // 비 조건
                (item.category === '강수형태' && Number(item.obsrValue) === 0 && Number(hours) < 16) || // 해 조건
                (item.category === '강수형태' && item.obsrValue === '0' && Number(hours) >= 16 && Number(hours) < 18) || // 구름 조건
                (item.category === '강수형태' && item.obsrValue === '0' && Number(hours) >= 18) // 밤 조건
        );

        setMatchingData(data); // matchingData 상태 업데이트

        // 날씨 이미지 계산 후 상태로 저장
        if (data) {
            const getWeatherImage = (data, hours) => {
                const isRain = Number(data.obsrValue) > 0;
                const isDay = Number(hours) < 16;
                const isCloud = Number(hours) >= 16 && Number(hours) < 18;
                const isNight = Number(hours) >= 18;

                if (isRain) return { image: WeatherImage.rainImage, className: 'rainy' }; // 비
                if (isDay) return { image: WeatherImage.sunImage, className: 'sunny' }; // 해
                if (isCloud) return { image: WeatherImage.cloudImage, className: 'cloudy' }; // 구름
                if (isNight) return { image: WeatherImage.nightImage, className: 'night' }; // 밤

                return { image: WeatherImage.sunImage, className: 'sunny' }; // 기본값
            };
            const { image, className } = getWeatherImage(data, hours);
            setWeatherImage(image); // 이미지 상태 설정
            setWeatherClass(className); // 클래스 상태 설정
        } else {
            setWeatherImage(null);
            setWeatherClass(''); // 조건에 맞는 데이터가 없을 때 기본값
        }
    }, [weatherData, hours]);

    return (
        <div className={`WeatherData_${weatherClass} WeatherData`} style={toggledStyle}>
            <div onClick={handleToggle} className="BtnClose">
                <img src={close} alt="" />
            </div>
            {matchingData ? (
                <div className="WeatherImage">
                    <h1 className="TopRegion">{selectedRegion}의 날씨</h1>
                    <p>
                        {month}/{date}일 {hours}시 기준
                    </p>
                    <img src={weatherImage} alt={matchingData.category} />
                </div>
            ) : (
                <p>일일 API 호출 횟수를 초과했습니다. 죄송합니다</p>
            )}

            <ul className="MainTemperature">
                {weatherData
                    .filter((item) => item.category === '기온' || item.category === '강수형태')
                    .map((item, index) => (
                        <li key={index}>{getCustomMessage(item.category, item.obsrValue)}</li>
                    ))}
            </ul>
            <div className="DataWrap">
                <h2>지역을 선택하시겠어요?</h2>
                <select value={selectedRegion} onChange={(e) => setSelectedRegion(e.target.value)}>
                    {regionName.map((region) => (
                        <option key={region.regionName} value={region.regionName}>
                            {region.regionName}
                        </option>
                    ))}
                </select>
                <div className="weather-info">
                    <ul>
                        {weatherData.map((item, index) => (
                            <li key={index} className="weather-item">
                                <span className="weather-category">{item.category}</span>
                                <span className="weather-value">{getCustomMessage(item.category, item.obsrValue)}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            <div className="info-text">▶ 각 지역별 실시간 데이터를 집계하여 제공합니다.</div>
        </div>
    );
};

export default GetWeatherData;
