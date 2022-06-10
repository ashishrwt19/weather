
window.addEventListener('load', () => {
    var temperatureDetails = document.querySelector(".temperature-details");
    var currentLocation = document.querySelector(".location");
    var temperatureDegree = document.querySelector(".temperature-degree");
    var tempType = document.querySelector(".temperature-type");
    var changeTemp = document.querySelector(".change");
    var container = document.querySelector(".container");
    var setIcon = document.querySelector('.icon')

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            console.log(position);
            let lat = position.coords.latitude;
            let long = position.coords.longitude;

            lat = 28.4089;
            long =77.3178;

            const api = `http://api.weatherapi.com/v1/current.json?key= 7329d06e068844879ec93712222605&q= ${lat},${long}`

            fetch(api)
                .then(response => {
                    return response.json()
                })
                .then(data => {
                    console.log(data);

                    const { temp_c, temp_f, condition } = data.current;
                    const { region, country, name } = data.location;
                    temperatureDegree.innerText = temp_c;
                    temperatureDetails.innerText = condition.text;
                    currentLocation.innerText = name+ " / " + country;
                    setIcon.innerHTML = "<img src='"+condition.icon+"' alt='icon'>";

                    if (condition.text == "Partly cloudy" || condition.text == "Cloudy") {
                        container.classList.add('cloudy');
                    } else if (condition.text == "Thundery outbreaks possible" || condition.text == "Patchy rain possible   " ||condition.text == "Patchy light drizzle" || condition.text == "Light drizzle" || condition.text == "Light rain" || condition.text == "Heavy rain") {
                        container.classList.add('rainy');
                    } else if(condition.text == "Mist"){
                        container.classList.add('misty');
                    } else {
                        container.classList.add("sunny");
                    }


                    changeTemp.addEventListener('click', function () {
                        if (tempType.innerText === "°C") {
                            temperatureDegree.innerText = temp_f;
                            tempType.innerText = "°F";
                        } else {
                            temperatureDegree.innerText = temp_c;
                            tempType.innerText = "°C";
                        }
                    })


                })

            // var xhr = new XMLHttpRequest();
            // xhr.open('post', api);
            
            // xhr.onreadystatechange = function(){
            //     if(xhr.status == 200){
            //         console.log(JSON.parse(xhr.responseText));
            //     }
            //     else{
            //         console.log("error",xhr.status, xhr.statusText);
            //     }
            // }
            // xhr.send();
        })
    }
})
