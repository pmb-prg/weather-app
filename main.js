const click = document.getElementById("search");
const weatherCity = document.getElementById("weather");
const city = document.getElementById("city");
click.addEventListener("click", add);
const massage = document.getElementById("massage");

function add() {


    //search city
    const cityName = city.value;
    city.value = "";
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=edc228562ac0a8aa3116d41c0687cf56&units=metric`)
        .then(response => response.json())
        .then(json => {
            let { main, name, sys, weather } = json;

            //icons
            const icon = `https://s3-us-west-2.amazonaws.com/s.cdpn.io/162656/${weather[0]["icon"]}.svg`;
            console.log(icon);


            // create tag
            const card = document.createElement("div");
            weatherCity.appendChild(card);
            if (icon === "https://s3-us-west-2.amazonaws.com/s.cdpn.io/162656/01n.svg") {
                card.className = "card city1";
            } else {
                card.className = "card city2";
            }

            const markup = `
            <h2 class= "center" data-name=${name},${sys.country}>
            <span>${name}</span>
            <span id="coun">${sys.country}</span>
            </h2>
            <figure class="center">
            <img class="city-icon center" src="${icon}">
            </figure>
            <h2 class= "center">${Math.round(main.temp)}<span id="coun">c</span></h2>
            <p class = "center">${weather[0].description}</p>
            `
            card.innerHTML = markup;
        })
        //error
        .catch(() => {
            massage.style.display = "flex";
            setTimeout(() => { massage.style.display = "none"; }, 4000);
        })

}