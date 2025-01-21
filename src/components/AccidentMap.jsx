// AccidentMap.js
import { useContext, useEffect, useState } from 'react';
import { AirConditionCheck } from './AirConditionCheck'; // 대기질구분
import { GetAccidentData } from './GetAccidentData'; // 사고 데이터 api
import { GetAirData } from './GetAirData'; // 미세먼지 데이터 api
import { Mapstyle } from './Mapstyle'; //구글 맵 스타일(컬러)
import { MediaQueryContext } from '../Context/MediaQueryContext';
import googleMapsApiLoader from 'google-maps-api-loader';
import GMap from './GMap';
import LocationSelector from './LocationSelect';
import RegionSearch from './RegionSelect';
import AirContent from './AirContent';
import GetWeatherData from './GetWeatherData';
import AirConditionInfo from './AirConditionInfo';
import MobileBtn from './MobileBtn';

import './AccidentMap.css';
import './scrollBar.css';

// 메인 AccidentMap 컴포넌트

const AccidentMap = () => {
    // 모바일 상태
    const { isMobile } = useContext(MediaQueryContext);
    // 토글 상태
    const [isToggled, setIsToggled] = useState({
        airMap: true,
        weatherData: true,
        airAlert: true,
    });
    // 모바일일 경우 상태 초기화
    useEffect(() => {
        if (isMobile) {
            setIsToggled(() => ({
                airMap: false,
                weatherData: false,
                airAlert: false,
            }));
        }
    }, [isMobile]); // isMobile 값이 변경될 때 실행

    const handleVisibilityToggle = (contentKey) => {
        setIsToggled((prevState) => {
            const isCurrentlyActive = prevState[contentKey]; // 현재 선택한 키의 상태
            return {
                airMap: false,
                weatherData: false,
                airAlert: false,
                [contentKey]: !isCurrentlyActive, // 선택한 키만 토글
            };
        });
    };

    const GoogleApi = 'AIzaSyDXzb85mUAS1ImDMbdnQsM2g1_k97Av4i0';

    const [locations, setLocations] = useState([]); // 사고 데이터
    const [map, setMap] = useState(null); // 맵 객체 저장

    // Google Maps API와 사고 데이터를 불러와 초기화
    useEffect(() => {
        const loadMap = async () => {
            try {
                const google = await googleMapsApiLoader({
                    apiKey: GoogleApi,
                    libraries: ['places'],
                });

                // 사고 데이터 가져오기
                const locationsData = await GetAccidentData();
                setLocations(locationsData);

                // locationsData.forEach((item) => {
                //     console.log(item[5]); // 배열의 6번째 값(인덱스 5)을 출력
                // });

                // console.log(locationsData);
                // 지도 초기화
                const mapInstance = GMap.initMap(google, locationsData, Mapstyle);
                setMap(mapInstance);

                // 미세먼지 데이터를 가져와 지도에 표시
                const airData = await GetAirData();
                airData.forEach((data) => {
                    const color = AirConditionCheck(data.issueVal);

                    new google.maps.Circle({
                        strokeColor: color,
                        strokeOpacity: 0.8,
                        strokeWeight: 2,
                        fillColor: color,
                        fillOpacity: 0.1,
                        map: mapInstance,
                        center: { lat: data.lat, lng: data.lng },
                        radius: 5000,
                    });
                });
            } catch (error) {
                console.error('Google Maps API 로드 실패:', error);
            }
        };

        loadMap();
    }, []);

    // 특정 위치로 이동하는 함수
    const moveToLocation = (lat, lng) => {
        if (map) {
            const location = new google.maps.LatLng(lat, lng);
            map.panTo(location);
            map.setZoom(14);
        }
    };

    return (
        <div className="situationWrap">
            <div className="mainContent">
                <div id="map"></div>
                <div className="mapSearch">
                    <LocationSelector moveToLocation={moveToLocation} />
                    <RegionSearch moveToLocation={moveToLocation} />
                </div>
            </div>
            {isMobile ? (
                <>
                    <GetWeatherData isToggled={isToggled.weatherData} />
                    <AirContent isToggled={isToggled.airAlert} />
                </>
            ) : (
                <>
                    <div className="subContent">
                        <GetWeatherData isToggled={isToggled.weatherData} />
                        <AirContent isToggled={isToggled.airAlert} />
                    </div>
                </>
            )}

            <AirConditionInfo isToggled={isToggled.airMap} />

            {/* 모바일에서만 나오는 MobileBtn */}
            {isMobile ? <MobileBtn handleToggle={handleVisibilityToggle} isToggled={isToggled} /> : null}
        </div>
    );
};

export default AccidentMap;
