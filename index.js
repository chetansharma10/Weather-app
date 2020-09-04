console.log("Working")
var nav=document.querySelector('.nav');
var first=document.querySelector('.first');
var second=document.querySelector('.second');

//DOM variables
var place=document.getElementById('place');
var img1=document.getElementById('img1');
var weatherone=document.getElementById('weatherone');
var weathertwo=document.getElementById('weathertwo');
var topTemperature=document.getElementById('two');
var dateSetups=document.getElementById('timeone')
var feels=document.getElementById('extraone');
var windSpeed=document.getElementById('extratwo');
var visible=document.getElementById('extrathree');
var minTemp=document.getElementById('min-temp');
var maxTemp=document.getElementById('max-temp');
var pressure=document.getElementById('pressure');
var humidity=document.getElementById('humidity')
var ground=document.getElementById('ground');
var sea=document.getElementById('sea');
var third=document.querySelector('.third');

//date setup
var date=new Date();
if(date.getMinutes().toString().length>=2){
  dateSetups.innerHTML="Updated as of "+(date.getHours()-12)+":"+date.getMinutes()

}
else{
  dateSetups.innerHTML="Updated as of "+(date.getHours()-12)+":"+0+date.getMinutes()

}

function changes(){
  first.style.display="flex";
  second.style.display="flex";
  nav.style.height=10+"%";
  first.style.opacity=1;
  second.style.opacity=1;
  first.style.transition="2s ease"
  nav.style.transition="2s ease"
  second.style.transition="2s ease"
  third.style.display="block"
  

}




let map;
let lati;
let longi;

function initMap(lati,longi) {
  map = new google.maps.Map(document.getElementById("map"), {
    center: {
      lat: lati,
      lng: longi
    },
    zoom: 8
  });
}











var locationPermission=document.getElementById('location');
var lat;
var long;
locationPermission.addEventListener('click',()=>{
  
  changes();
  navigator.geolocation.getCurrentPosition(locationData=>{
   lat= locationData.coords.latitude;
   long=locationData.coords.longitude;
   lati=parseFloat(lat.toFixed(2));
   longi=parseFloat(long.toFixed(2));

   initMap(lati,longi)

   console.log(lat,long)
   url="http://api.openweathermap.org/data/2.5/weather?lat="+lat+"&lon="+long+"&appid=4ffaf54fc4841e1c1cbace1e7772d0e9&units=metric"
   fetch(url).then(response =>{

       
   return response.json()

   }).then(data=>{
            //weather
            var weather=data.weather[0];
            img1.src=`http://openweathermap.org/img/wn/${weather.icon}@2x.png`;
            weatherone.innerHTML=weather.main+",";
            weathertwo.innerHTML=weather.description;
            
            //place
            place.innerHTML=data.name+","+data.sys.country;

            //visiblity
            visible.innerHTML= `<i class="fa fa-bars" aria-hidden="true"></i>Visibility ${data.visibility/1000}KM`;

            //temp
            var mainData=data.main;
            topTemperature.innerHTML=mainData.temp;
            feels.innerHTML=`<i class="fas fa-temperature-high "></i>Feels like ${mainData.feels_like}<sup>o</sup>`
            pressure.innerHTML=mainData.pressure;
            humidity.innerHTML=mainData.humidity+"%";
            sea.innerHTML=mainData.sea_level;
            ground.innerHTML=mainData.grnd_level;
            //wind
            var windData=data.wind;
            console.log(windData.speed);
            windSpeed.innerHTML=`<i class="fas fa-wind "></i> Wind ${windData.speed}KM/H`

   })



  })
});




//By city name
var val=""
var info;
var txt=document.getElementById('txt');
var search=document.getElementById('search');
search.addEventListener('click',()=>{

   changes();

    val=txt.value;
    if(val.length==0){
        console.log("Empty")
    }
    else{
        
        console.log("value is:",val)
        url="http://api.openweathermap.org/data/2.5/weather?q="+val+",IN&appid=4ffaf54fc4841e1c1cbace1e7772d0e9&units=metric&cnt=7"
        fetch(url).then(response =>{

            
        return response.json()

        }).then(data=>{
            
            console.log(data)
            var longi=data.coord.lon;
            var lati=data.coord.lat;
            initMap(lati,longi)

            //weather
            var weather=data.weather[0];
            img1.src=`http://openweathermap.org/img/wn/${weather.icon}@2x.png`;
            weatherone.innerHTML=weather.main+",";
            weathertwo.innerHTML=weather.description;
            
            //place
            place.innerHTML=data.name+","+data.sys.country;

            //visiblity
            visible.innerHTML= `<i class="fa fa-bars" aria-hidden="true"></i>Visibility ${data.visibility/1000}KM`;

            //temp
            var mainData=data.main;
            topTemperature.innerHTML=mainData.temp;
            feels.innerHTML=`<i class="fas fa-temperature-high "></i>Feels like ${mainData.feels_like}<sup>o</sup>`
            pressure.innerHTML=mainData.pressure;
            humidity.innerHTML=mainData.humidity+"%";
            sea.innerHTML=mainData.sea_level;
            ground.innerHTML=mainData.grnd_level;
            //wind
            var windData=data.wind;
            console.log(windData.speed);
            windSpeed.innerHTML=`<i class="fas fa-wind "></i> Wind ${windData.speed}KM/H`



        






            
        })

    }
    
});

