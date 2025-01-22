<<<<<<< HEAD
// Map.js
=======
import './GMap.css';
>>>>>>> 6dc7ce0 (Fix: Update : userLocation)
const GMap = {
    initMap: (google, locations, style) => {
        if (locations.length === 0) return;

<<<<<<< HEAD
=======
        // 지도 초기화
>>>>>>> 6dc7ce0 (Fix: Update : userLocation)
        const map = new google.maps.Map(document.getElementById('map'), {
            zoom: 11,
            center: new google.maps.LatLng(locations[0][1], locations[0][2]),
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            gestureHandling: 'greedy', // 스크롤만으로 줌 제어
            styles: style,
        });

        const infowindow = new google.maps.InfoWindow();

<<<<<<< HEAD
        locations.forEach((location) => {
            const markerColor = location[4] >= 5 ? 'red' : 'blue';
=======
        // 사고 지역 마커 생성
        locations.forEach((location) => {
            const markerColor = location[4] >= 5 ? 'Yellow' : 'purple';
>>>>>>> 6dc7ce0 (Fix: Update : userLocation)
            const marker = new google.maps.Marker({
                position: new google.maps.LatLng(location[1], location[2]),
                map: map,
                icon: {
                    path: google.maps.SymbolPath.CIRCLE,
                    scale: 10,
                    fillColor: markerColor,
                    fillOpacity: 0.8,
                    strokeColor: 'white',
<<<<<<< HEAD
                    strokeWeight: 3,
=======
                    strokeWeight: 2,
>>>>>>> 6dc7ce0 (Fix: Update : userLocation)
                },
            });

            marker.addListener('click', () => {
                map.panTo(marker.getPosition());
                infowindow.setContent(`
<<<<<<< HEAD
                    <div class="custom-infowindow"">
                        <h3>${location[0]}</h3>
                         <div class="content">
                            <p><strong>사고 발생 지역:</strong> ${location[3]}</p>
                            <p><strong>사고 발생 건수:</strong> ${location[4]}</p>
                            <p><strong>사고 발생 일자:</strong> ${location[5]}</p>
                         </div>
                    </div>
                    
=======
                    <div class="custom-infowindow">
                        <h3>${location[0]}</h3>
                        <div class="content">
                            <p><strong>사고 발생 지역:</strong> ${location[3]}</p>
                            <p><strong>사고 발생 건수:</strong> ${location[4]}</p>
                            <p><strong>사고 발생 일자:</strong> ${location[5]}</p>
                        </div>
                    </div>
>>>>>>> 6dc7ce0 (Fix: Update : userLocation)
                `);
                map.setZoom(17);
                infowindow.open(map, marker);
            });
        });

<<<<<<< HEAD
=======
        // 사용자 위치 가져오기 및 버튼 추가
        const addUserLocationButton = () => {
            const buttonDiv = document.createElement('div');
            buttonDiv.className = 'user-location-button';
            buttonDiv.innerHTML = `<button></button>`;

            map.controls[google.maps.ControlPosition.BOTTOM_RIGHT].push(buttonDiv);

            buttonDiv.querySelector('button').addEventListener('click', () => {
                buttonDiv.classList.add('cl');
                if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition(
                        (position) => {
                            const { latitude, longitude } = position.coords;
                            const userMarker = new google.maps.Marker({
                                position: new google.maps.LatLng(latitude, longitude),
                                map: map,
                                icon: {
                                    path: google.maps.SymbolPath.CIRCLE,
                                    scale: 12,
                                    fillColor: 'blue',
                                    fillOpacity: 0.8,
                                    strokeColor: 'white',
                                    strokeWeight: 2,
                                },
                                title: 'Your Location',
                            });

                            map.setCenter(userMarker.getPosition());
                            map.setZoom(18);

                            infowindow.setContent(`
                                <div class="custom-infowindow">
                                    <h3 class="userLocation">현재 사용자 위치</h3>
                                </div>
                            `);
                            infowindow.open(map, userMarker);
                        },
                        (error) => {
                            console.error('사용자 위치를 가져올 수 없습니다:', error);
                            alert('위치 정보를 가져올 수 없습니다. 위치 서비스를 허용해주세요.');
                        }
                    );
                } else {
                    alert('이 브라우저는 위치 서비스를 지원하지 않습니다.');
                }
            });
        };

        addUserLocationButton(); // 버튼 추가

>>>>>>> 6dc7ce0 (Fix: Update : userLocation)
        return map;
    },
};

export default GMap;
