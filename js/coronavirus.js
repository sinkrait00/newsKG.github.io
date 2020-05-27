document.addEventListener("DOMContentLoaded", ()=>{
const url = 'https://api.thevirustracker.com/free-api?countryTotal=KG';
fetch(url)
        .then(response=>response.json())
        .then(data=>{
         console.log(data);
           const dataInfo = data.countrydata[0];
           
        const infoArray = [dataInfo.total_cases,dataInfo.total_new_cases_today,dataInfo.total_recovered,dataInfo.total_deaths];
          const idArray = ['coronaTotal','coronaDay','coronaHealth','coronaDead'];
          for(let i=0;i<4;i++){
            document.getElementById(idArray[i]).innerHTML+=`<span>${infoArray[i]}</span>`;
        }
        })
});
