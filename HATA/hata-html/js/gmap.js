jQuery(document).ready(function($){

    var marker;
    var map;

    function initialize() {
        var lat = '-37.817314';
        var lng = '144.955431';
        var Latlng = new google.maps.LatLng(lat,lng);
        var mapOptions = {
            zoom: 18,
            center: Latlng
        }
        map = new google.maps.Map(document.getElementById('map-canvas'),
            mapOptions);
        var image = 'images/mapicon.png';
        marker = new google.maps.Marker({
            position: Latlng,
            map: map,
            icon: image,
            animation: google.maps.Animation.DROP,
            draggable: true
        });
        google.maps.event.addListener(marker, 'click', toggleBounce);
    }

    function toggleBounce() {
        if (marker.getAnimation() != null) {
            marker.setAnimation(null);
        } else {
            marker.setAnimation(google.maps.Animation.BOUNCE);
        }
    }

    google.maps.event.addDomListener(window, 'load', initialize);

});