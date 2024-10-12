let textChien = document.getElementById("dog-fact-p");
let imgChien = document.getElementById('img-chien');

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

async function RandomDogFacts(NbAlea) {
    try {
        let response = await fetch(`https://api.allorigins.win/raw?url=https://dog-api.kinduff.com/api/facts?number=${NbAlea}`);
        if (!response.ok) {
            throw new Error(`Erreur HTTP, code de l\'erreur: ${response.status}`);
        }
        let data = await response.json();
        textChien.innerText = await data.facts[0];
    }
    catch (e) {
        console.log("Erreur :", e);
    }
}



imgChien.addEventListener('click', function() {
    let NbRand = getRandomInt(1, 100);
    RandomDogFacts(NbRand);
});