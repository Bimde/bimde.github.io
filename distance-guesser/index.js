function latLng(geocoder, addr) {
    return geocoder
        .geocode({ address: addr })
        .then((response) => {
            if (!response.results[0]) {
                ans.innerHTML = "Lat/Lng not found for " + loc1;
                return;
            }
            return response.results[0].geometry.location
        })
}

async function loadDistance(geocoder, addr1, addr2, ans) {
    let latlng1 = await latLng(geocoder, addr1);
    let latlng2 = await latLng(geocoder, addr2);
    let distance = google.maps.geometry.spherical.computeDistanceBetween(latlng1, latlng2);
    ans.innerHTML = "Distance from " + addr1 + " to " + addr2 + " is " + Math.trunc(distance / 1000) + " km!"
}

function initMap() {
    console.log("Running init map")
    const geocoder = new google.maps.Geocoder();
    document.getElementById("calc-button").onclick = function () {
        let loc1 = document.getElementById("location-1").value
        let loc2 = document.getElementById("location-2").value
        let ans = document.getElementById("distance-answer")
        ans.innerHTML = "Loading distance from " + loc1 + " to " + loc2 + "..."
        loadDistance(geocoder, loc1, loc2, ans)
    }
}
