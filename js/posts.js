document.addEventListener("DOMContentLoaded", ()=>{
    const url = 'https://djangoparser.herokuapp.com/api/posts/';
    fetch(url)
            .then(response=>response.json())
            .then(data=>{
              
               console.log(data);
               
            })
    });