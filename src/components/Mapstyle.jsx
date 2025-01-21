export const Mapstyle = [
    // 지도 배경 (부드럽고 밝은 그레이 톤)
    {
        elementType: 'geometry',
        stylers: [
            { color: '#f8f9fa' }, // 밝은 크림 톤 배경
        ],
    },
    // 텍스트 색상 (중간 회색)
    {
        elementType: 'labels.text.fill',
        stylers: [
            { color: '#495057' }, // 어두운 그레이 텍스트
        ],
    },
    {
        elementType: 'labels.text.stroke',
        stylers: [
            { color: '#ffffff' }, // 흰색 외곽선으로 텍스트 강조
        ],
    },
    // 경계선 (미니멀한 얇은 그레이)
    {
        featureType: 'administrative',
        elementType: 'geometry',
        stylers: [
            { color: '#dee2e6' }, // 연한 회색 경계선
        ],
    },
    {
        featureType: 'administrative.land_parcel',
        stylers: [
            { visibility: 'off' }, // 소규모 경계선 숨김
        ],
    },
    // 공원 (자연스러운 연초록색)
    {
        featureType: 'poi.park',
        elementType: 'geometry',
        stylers: [
            { color: '#d8f3dc' }, // 부드러운 연초록 공원
        ],
    },
    {
        featureType: 'poi.park',
        elementType: 'labels.text.fill',
        stylers: [
            { color: '#6c757d' }, // 공원 텍스트 색상
        ],
    },
    // 도로 스타일
    {
        featureType: 'road',
        elementType: 'geometry',
        stylers: [
            { color: '#ffffff' }, // 도로: 깨끗한 흰색
        ],
    },
    {
        featureType: 'road.arterial',
        elementType: 'geometry',
        stylers: [
            { color: '#e9ecef' }, // 주요 도로: 연한 회색
        ],
    },
    {
        featureType: 'road.highway',
        elementType: 'geometry',
        stylers: [
            { color: '#ffe066' }, // 고속도로: 부드러운 노란색으로 강조
        ],
    },
    {
        featureType: 'road.highway',
        elementType: 'geometry.stroke',
        stylers: [
            { color: '#fab005' }, // 고속도로 외곽선: 조금 더 진한 노란색
        ],
    },
    // 물 영역 (차분한 블루 톤)
    {
        featureType: 'water',
        elementType: 'geometry',
        stylers: [
            { color: '#ade8f4' }, // 부드러운 하늘색
        ],
    },
    {
        featureType: 'water',
        elementType: 'labels.text.fill',
        stylers: [
            { color: '#0077b6' }, // 물 텍스트: 차분한 블루
        ],
    },
    // 대중교통 정보 숨기기
    {
        featureType: 'transit',
        stylers: [
            { visibility: 'off' }, // 대중교통 정보 숨김
        ],
    },
];
