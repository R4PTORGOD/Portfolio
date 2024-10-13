// Recherche des éléments du DOM
const darkModeBtn = document.getElementById("sun-btn");
const textChien = document.getElementById("dog-fact-p");
const imgChien = document.getElementById('img-chien');
const mode = localStorage.getItem('mode');

// Application du Dark-mode si il est présent dans le local storage
if (mode) {
    document.body.classList.toggle('dark-mode');
}

// Fonction de nombre aléatoire
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Fonction utilisant l'API pour demander un fait aléatoire sur les chiens
async function RandomDogFacts(NbAlea) {
    try {
        let response = await fetch(`https://api.allorigins.win/raw?url=https://dog-api.kinduff.com/api/facts?number=${NbAlea}`); // utilisation d'un proxy publique pour faire marcher l'api → problèmes de CORS / si ca ne marche pas utilisez l'extension google allow CORS
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
// Initialisation du texte au chargement de la page
RandomDogFacts(getRandomInt(1, 100));

// Écouteur d'événements pour le bouton dark mode
darkModeBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    if (document.body.classList.contains('dark-mode')) {
        localStorage.setItem('mode', 'dark-mode');
    }
    else {
        localStorage.removeItem("mode");
    }
    
})

// Écouteur d'événements pour le bouton refresh de l'api
imgChien.addEventListener('click', function() {
    let NbRand = getRandomInt(1, 100);
    RandomDogFacts(NbRand);
});