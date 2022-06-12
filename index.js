//librairie qui donne les fonctions pour faire du scrapping en js
import puppeteer from "puppeteer-extra";


// permet de passer outre la restriction de scrapping dans les sites bloqueur de strapping
import StealthPlugin from "puppeteer-extra-plugin-stealth";
puppeteer.use(StealthPlugin());

//initialise le paramettre dans l'url pour boucler sur le nombre de page choisi
let nbPage = 0;
//fonction qui s'autoLance pour scrapper les données
(async () => {
  //permet de lancer le browser sans interface visuelle
  const browser = await puppeteer.launch({ headless: true });
  //ouvre une nouvelle page internet
  const page = await browser.newPage();
  
  // boucle tant que le nombre n'est pas atteint
  while(nbPage < 10) {
  // va sur le site demandé et ajoute la valeur de la page dans l'url qui est en lien avec la boucle du dessus
  await page.goto(`https://www.allocine.fr/series/top/?page=${nbPage}`);

  // lance la fonction de scrapping en detail sur la page
  const linkListProduct = await page.evaluate(() => {
  // créer un tableau vide
  let movies = [];
  // récupère tout le contenu du tableau ou se trouve les fiches des films
   const listMovies = document.querySelectorAll("#content-layout div > ul > li > div");
   // boucle dans chaque fiche de film
    for(elem of listMovies){ 
  // créer un objet avec les données choisis de chaque film en les stockants dans une variable     
   movies.push({
          title: elem.querySelector("h2 > a")?.innerText,
          info : elem.querySelector("div.meta-body-item.meta-body-info")?.innerText,
          note : elem.querySelector("div.rating-holder.rating-holder-3 > div > div > div > span")?.innerText,
        });
      };
  // retourne le tableau
       return movies;
    });
    console.log(linkListProduct);
    // ajoute 1 au conteur de page pour changer de page
    nbPage++;
  }
// ferme le browser
  await browser.close();  
})();

// j'ai souhaité récupérer uniquement les titres , infos et notes des films
