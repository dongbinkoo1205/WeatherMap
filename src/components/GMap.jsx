// Map.js
const GMap = {
    initMap: (google, locations, style) => {
        if (locations.length === 0) return;

        const map = new google.maps.Map(document.getElementById('map'), {
            zoom: 11,
            center: new google.maps.LatLng(locations[0][1], locations[0][2]),
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            gestureHandling: 'greedy', // 스크롤만으로 줌 제어
            styles: style,
        });

        const infowindow = new google.maps.InfoWindow();

        locations.forEach((location) => {
            const markerColor = location[4] >= 5 ? 'red' : 'blue';
            const marker = new google.maps.Marker({
                position: new google.maps.LatLng(location[1], location[2]),
                map: map,
                icon: {
                    path: google.maps.SymbolPath.CIRCLE,
                    scale: 10,
                    fillColor: markerColor,
                    fillOpacity: 0.8,
                    strokeColor: 'white',
                    strokeWeight: 3,
                },
            });

            marker.addListener('click', () => {
                map.panTo(marker.getPosition());
                infowindow.setContent(`
                    <div class="custom-infowindow"">
                        <h3>${location[0]}</h3>
                         <div class="content">
                            <p><strong>사고 발생 지역:</strong> ${location[3]}</p>
                            <p><strong>사고 발생 건수:</strong> ${location[4]}</p>
                            <p><strong>사고 발생 일자:</strong> ${location[5]}</p>
                         </div>
                    </div>
                    
                `);
                map.setZoom(17);
                infowindow.open(map, marker);
            });
        });

        return map;
    },
};

export default GMap;
