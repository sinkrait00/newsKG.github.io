document.addEventListener("DOMContentLoaded", ()=>{
    let date = new Date();
    dateDays = ['Понедельник', 'Вторник', "Среда","Четверг","Пятница","Суббота","Воскресенье"];
    const locs = [1528334,7649203,1538652,1538652,1527590,1527590,1527534,1528735]
    .forEach((item)=>{
        fetch(`https://api.openweathermap.org/data/2.5/weather?id=${item}&lang=ru&appid=075aeeba34dc04671a8965e434cb8778`)
        .then(response=>response.json())
        .then(data=>{
            console.log(data);
            weatherBlock(data.name,date.getDay(),data.main.temp,data.wind.speed,data.main.humidity,data.weather[0].main);
        })
    });
    const weatherBlock = (city,day,temp,wind,humidity,weather)=>{
        const classesArray = ['city','day','temp','wind','humidity'];
        const infoArray = [city,dateDays[day-1],`${Math.round(temp-273)}°C`,wind,humidity];
        let parentDiv = document.createElement('div');
        parentDiv.className = 'weather_block';
        for(let i=0;i<=4;i++){
            let div = document.createElement('div');
            div.className=`weather_${classesArray[i]}`;
            if(classesArray[i]=='wind'){
                div.textContent = `Скорость ветра: ${infoArray[i]}м/c`;
            }else if(classesArray[i]=='humidity'){
                div.textContent = `Влажность: ${infoArray[i]}%`;
            }else{
                div.textContent = infoArray[i];
            }
            if(classesArray[i]=='temp'){
            div.appendChild(img(weather));
            }
            parentDiv.appendChild(div);
        }

        document.getElementById('days_weather').appendChild(parentDiv);
}
const img = (weath)=>{
    const img= document.createElement('img');
    img.className= 'weather_temp_icon';
    img.src = iconChooser(weath);
    return img;
}
    const iconChooser = (weath)=>{
        switch(weath){
            case 'Clear':
                return 'img/icons/icons8-sun-100.png';
            case 'Rain':
                return 'img/icons/icons8-rain-100.png';
            case 'Clouds':
                return 'img/icons/icons8-cloud-100.png';
            case 'Snow':
                return 'img/icons/icons8-snow-100.png';
        }
    }
});
