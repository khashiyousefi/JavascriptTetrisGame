window.addEventListener('load', ()=>{
  
    let weather = {}
    let long;
    let lat;
    let tempDescription = document.querySelector(".temp-description");
    let tempDegree = document.querySelector(".temp-degree");
    let locationTimeZone = document.querySelector(".location-timezone");
    let switchTemp = document.querySelector("#tempSign");
    let weatherIcon = document.querySelector(".icon");
    let tempSection = document.querySelector(".degree-section");

    if (navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position => {
                long = position.coords.longitude;
                lat = position.coords.latitude;

                //console.log(long);
                //console.log(lat);
                //console.log(position);

                const api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=058219d6e8c3db964a32f813afb04237`;

                fetch(api)
                .then(response =>{

                        let data = response.json();
                        return data;
                })
                .then(data =>{
                    //console.log(data);
                    const temp = data.main.temp;
                    const timezone = data.name;
                    const {description} = data.weather[0];
                    const iconCode = data.weather[0].icon;
                    weather.country = data.sys.country;

                    //Grab weatherIcon
                    //var iconurl = "http://openweathermap.org/img/w/" + iconCode + ".png";

                    UpperCaseDescription = description.toUpperCase();
                    
                    //console.log(iconCode);
                    //console.log(weather);
                   // console.log(temp);
                    //console.log(description);
                    //set DOM element
                    Ftemp = (9/5)*(temp - 273) + 32;

                    tempDegree.textContent = Math.round(Ftemp);
                    tempDescription.textContent = UpperCaseDescription;
                    locationTimeZone.textContent =  weather.country + ", " + timezone;

                    //console.log(tempDescription.textContent.toUpperCase()+ tempDescription.textContent.slice(1));
                    //document.getElementById("myImg").src = iconurl;
                    //weatherIcon.document.images = iconurl;      
                    
                    //console.log(iconCode);
                    //console.log(weatherIcon);
                    
                    setIcons(iconCode, weatherIcon);

                    tempSection.addEventListener('click', () =>{
                        convertDegree();
                        
                    });
                    
                });
        });

        //document.getElementById("tempSign").onclick = function() {convertDegree()};
        //document.getElementsByClassName(".temp-degree").getElementById("tempSign").onclick = function() {convertDegree()};


        //if (switchTemp){
            //document.getElementById("tempSign").innerHTML = "Hello World";
        //}

    }

    function convertDegree(){

        let Ctemp = 0;
        Ctemp = (Ftemp - 32)*(5/9);

        if (switchTemp.textContent === "F"){
        tempDegree.textContent = Math.round(Ctemp);
        switchTemp.textContent = "C";
        }
        else{
            tempDegree.textContent = Math.round(Ftemp);
            switchTemp.textContent = "F";
        }
    }

    function setIcons(icon, iconClass){
        var skycons = new Skycons({"color": "white"});
        //console.log(icon);
        switch(icon){
        
            case "01d":
                var currentIcon = "CLEAR_DAY";
                break;
            case "01n":
                var currentIcon = "CLEAR_NIGHT";
                break;
            case "02d":
                var currentIcon = "PARTLY_CLOUDY_DAY";
                break;
            case "02n":
                var currentIcon = "PARTLY_CLOUDY_NIGHT";
                break;
            case "03n":                                   
            case "03d":{
                var currentIcon = "CLOUDY";
                break;
            }
            case "04d":                                   
                var currentIcon = "PARTLY_CLOUDY_DAY";
                break;
            case "04n":                                   
                var currentIcon = "PARTLY_CLOUDY_NIGHT";
                break;
            case "09n":
            case "09d":{
                var currentIcon = "RAIN";
                break;
            }
            case "11n": 
            case "11d":{                                  
                var currentIcon = "RAIN";
                break;
            }
            case "10n":
            case "10d":{                                 
                var currentIcon = "RAIN";
                break;
            }
            case "13n":  
            case "13d":{                                 
                var currentIcon = "SNOW ";
                break;
            }
            case "50n":
            case "50d":{
                var currentIcon = "WIND";
                break;
            }
            default:
                var currentIcon = "CLOUDY";

        }
            skycons.play();
            //console.log(currentIcon);

            return skycons.set(iconClass, Skycons[currentIcon]);

        }

});