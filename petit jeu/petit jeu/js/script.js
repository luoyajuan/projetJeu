window.onload = main;

let canvas;
let ctx;
let assets;

let niveauCourant = 1;
let score = 0;
let etatJeu = "MenuPrincipal";

// ici on va stocker les objets graphiques du jeu, ennemis, etc.
let tableauDesBalles = [];
let balleChercheuse;

// programme principal
function main() {
  console.log(
    "Page chargée ! DOM ready ! Toutes les resources de la page sont utilisables (videos, images, polices etc."
  );

  loadAssets(startGame);

  // On récupère grace à la "selector API" un pointeur sur le canvas
  canvas = document.querySelector("#myCanvas");
  spanNiveau = document.querySelector("#niveau");
  spanScore = document.querySelector("#score");

  ctx = canvas.getContext("2d");
    
  // on ajoute des écouteurs souris/clavier sur le canvas
  canvas.onmousedown = traiteMouseDown;
  canvas.onmouseup = traiteMouseUp;
  canvas.onmousemove = traiteMouseMove;

  //canvas.addEventListener("mousedown", traiteMouseDown);
  //canvas.addEventListener("mousedown", traiteMouseDown2);

  // le canvas ne peut détecter les touches que si il a le focus (voir mooc)
  // c'est plus simple de mettre l'écouteur sur le document (la page)
  document.onkeydown = traiteKeyDown;
  document.onkeyup = traiteKeyUp;

  // pour dessiner, on a besoin de son "contexte graphique", un objet qui
  // va permettre de dessiner, ou de changer les propriétés du canvas
  // (largeur du trait, couleur, repère, etc.)

  console.log(monstre.donneTonNom());

  creerDesBalles(niveauCourant + 1);

  requestAnimationFrame(animationLoop);
  setInterval(changePositionYeux, 300); // appelle la fonction changeCouleur toutes les n millisecondes
  requestAnimationFrame(mainloop);
}

function startGame(assetsLoaded){
// on peut démarrer le jeu et les assets sont chargés
  image1 = assetsLoaded[0];
  image2 = assetsLoaded[1];
  requestAnimationFrame(animationLoop);
}

function creerDesBalles(nb) {
  let tabCouleurs = ["red", "green", "yellow", "orange", "purple"];

  for (let i = 0; i < nb; i++) {
    let x = Math.random() * canvas.width;
    let y = Math.random() * canvas.height;
    let r = Math.random() * 30;
    let indexCouleur = Math.floor(Math.random() * tabCouleurs.length);
    let couleur = tabCouleurs[indexCouleur];
    let vx = -5 + Math.random() * 10;
    let vy = -5 + Math.random() * 10;

    let b = new BalleAvecVitesseXY(x, y, r, couleur, vx, vy);

    // on ajoute la balle au tableau
    tableauDesBalles.push(b);
  }

  // on ajoute une balle chercheuse dans le tableau
  balleChercheuse = new BalleChercheuse(100, 100, 40, "red", 0, 0);
  tableauDesBalles.push(balleChercheuse);
}

// animation à 60 images/s
function animationLoop() {
  // 1 on efface le canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  afficheInfoJeu(); // scores, niveau etc.

  switch (etatJeu) {
    case "MenuPrincipal":
      ctx.drawImage(image1,0,0, canvas.width*2/3, canvas.height);
      afficheMenuPrincipal();
      break;
    case "JeuEnCours":
      ctx.drawImage(image2,0,0, canvas.width*2/3, canvas.height);
      updateJeu();
      break;
    case "EcranChangementNiveau":
      ctx.drawImage(image1,0,0, canvas.width*2/3, canvas.height);
      spanNiveau.innerHTML = "<i>" + niveauCourant + "</i>";
      afficheEcranChangementNiveau();
    case "GameOver":
      afficheEcranGameOver();
  }

  // 5 On demande au navigateur de rappeler la fonction
  // animationLoop dans 1/60ème de seconde
  requestAnimationFrame(animationLoop);
}


function niveauSuivant() {
  console.log("NIVEAU SUIVANT");
  niveauCourant++;
  creerDesBalles(niveauCourant + 1);
  etatJeu = "JeuEnCours";
}

function updateJeu() {
  monstre.draw(ctx);

  updateBalles();
  // 3 on déplace les objets
  monstre.move();
  //deplacerLesBalles();

  // 4 on peut faire autre chose (par ex: detecter des collisions,
  // ou prendre en compte le clavier, la souris, la manette de jeu)
  traiteCollisionsJoueurAvecBords();

  if (niveauFini()) {
    etatJeu = "EcranChangementNiveau";
  }
}

function niveauFini() {
  return tableauDesBalles.length === 0;
}

function traiteCollisionBalleAvecMonstre(b) {
  if (
    circRectsOverlap(
      monstre.x,
      monstre.y,
      monstre.l,
      monstre.h,
      b.x,
      b.y,
      b.rayon
    )
  ) {
    if (b instanceof BalleChercheuse) {
      console.log("COLLISION AVEC BALLE CHERCHEUSE");
    }

    console.log("COLLISION....");
    // on cherche l'index de la balle dans le tableau des balles
    let index = tableauDesBalles.indexOf(b);

    // pour supprimer un élément : on utilise la méthode splice(index, nbElementsASupprimer) sur le tableau
    tableauDesBalles.splice(index, 1);
    //b.couleur = "pink";

    score = score + 5 ;
    spanScore.innerHTML = "<i>" + score + "</i>";
  }
}

function updateBalles() {
  // utilisation d'un itérateur sur le tableau
  tableauDesBalles.forEach((b) => {
    b.draw(ctx);
    traiteCollisionsBalleAvecBords(b);
    traiteCollisionBalleAvecMonstre(b);

    b.move();
  });
}
