// Fonction qui permet de lire les éléments d'un tableau (nodelist) <li class="l-productgrid__item">
const readArray = (tab) => {
  let observer = new IntersectionObserver(beTouching, options);
  tab.forEach((elem) => {
    // observer les vignettes <li class="l-productgrid__item">
    observer.observe(elem);
  });
};

// Option: Intersection Oserver
let options = {
  threshold: 0.4,
};

//Tableau d'élément <li >
let tab = [];
tab.push(document.querySelectorAll(".l-productgrid__item"));
if (tab !== []) {
  readArray(tab[0]);
}

// Sélection du noeud dont les mutations seront observées: <ul class="l-productgrid__inner"> parent de <li class="l-productgrid__item">
const app = document.getElementById("product-search-results").childNodes[3]
  .childNodes[1];

// Créé une instance de l'observateur lié à la fonction de callback
const obs = new MutationObserver(callback);

// Fonction callback à exécuter quand une mutation est observée: Permet de charger les nouvelles vignettes
function callback(mutations) {
  const item = mutations[0].addedNodes;
  tab = item;
  readArray(tab);
}

//observer le noeud cible : surveiller le chargement des nouvelles vignettes
obs.observe(app, {
  childList: true,
});

// Fonction callback à exécuter quand une vignette entre dans le champ de détection
function beTouching(entries, obs) {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      //Cibler uniquement les vignettes d'articles
      if (entry.target.getAttribute("class") === "l-productgrid__item") {
        if (entry.target.childNodes[9]) {
          //Récupérer les informations sous forme d'un objet JavaScript
          const data = JSON.parse(
            entry.target?.childNodes[9].getAttribute("data-gtmproduct")
          );
          console.log("Nom: " + data?.name + " - Prix :" + data?.discountPrice);
        } else {
          //Cibler le deuxième chargement de produit (12 - 24)
          const data = JSON.parse(
            entry.target?.childNodes[5].getAttribute("data-gtmproduct")
          );
          console.log("Nom: " + data?.name + " - Prix :" + data?.discountPrice);
        }
      }
      obs.unobserve(entry.target);
    }
  });
}
