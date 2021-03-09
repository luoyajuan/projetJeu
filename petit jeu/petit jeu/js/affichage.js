function afficheMenuPrincipal() {
    ctx.save();
    ctx.translate(0, 100);
    ctx.fillStyle = "white";
    ctx.font = "20pt Calibri";
    ctx.fillText("MENU PRINCIPAL", 600, 200);
  
    ctx.fillText("Cliquez pour démarrer", 600, 250);
  
    ctx.restore();
}
  
function afficheEcranChangementNiveau() {
    ctx.save();
    ctx.translate(0, 100);
    ctx.fillStyle = "white";
    ctx.font = "20pt Calibri";
    ctx.fillText("Changement niveau", 600, 200);
  
    ctx.fillText("Cliquez pour niveau suivant", 600, 250);
  
    ctx.restore();
}

function afficheInfoJeu() {
    ctx.save();

    ctx.fillStyle = "white";
    ctx.font = "30pt Calibri";
    ctx.fillText("Score : " + score, 1200, 40);
    ctx.fillText("Niveau : " + niveauCourant, 1200, 80);

    ctx.lineWidth = 1;
    ctx.strokeStyle = "red";
    ctx.strokeText("Score : " + score, 1200, 40);
    ctx.strokeText("Niveau : " + niveauCourant, 1200, 80);
  
    ctx.fillText(etatJeu, 1200, 120);
    ctx.restore();
}

function afficheEcranGameOver() {
    console.log("GAME OVER");
}