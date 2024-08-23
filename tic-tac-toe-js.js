// tic-tac-toe-js.js

// Écouteur d'événement qui s'exécute lorsque le DOM est entièrement chargé.
document.addEventListener("DOMContentLoaded", () => {
    // Sélection de tous les éléments de cellule dans le plateau de jeu.
    const cells = document.querySelectorAll(".cell");
    // Sélection de l'élément de texte pour afficher le statut du jeu.
    const statusText = document.getElementById("status");
    // Sélection du bouton pour réinitialiser le jeu.
    const resetButton = document.getElementById("reset-button");
    // Sélection du bouton pour commencer le jeu après la configuration.
    const startButton = document.getElementById("start-button");
    // Sélection des champs de saisie des pseudos des joueurs.
    const player1Input = document.getElementById("player1");
    const player2Input = document.getElementById("player2");
    // Sélection des options de symbole des joueurs.
    const player1SymbolSelect = document.getElementById("player1Symbol");
    const player2SymbolSelect = document.getElementById("player2Symbol");
    // Sélection du plateau de jeu.
    const board = document.getElementById("board");
  
    // Variables pour stocker les noms des joueurs.
    let player1 = "";
    let player2 = "";
    // Variables pour stocker les symboles choisis par les joueurs.
    let player1Symbol = "X";
    let player2Symbol = "O";
    // Variable pour garder le symbole du joueur actuel.
    let currentPlayer = "X";
    // Variable pour stocker le nom du joueur actuel.
    let currentPlayerName = "";
    // Tableau représentant l'état du plateau de jeu, initialisé vide.
    let gameBoard = ["", "", "", "", "", "", "", "", ""];
    // Variable pour indiquer si le jeu est actif ou non.
    let isGameActive = false;
  
    // Conditions gagnantes définies par les indices des cellules sur le plateau.
    const winningConditions = [
      [0, 1, 2], // Ligne du haut.
      [3, 4, 5], // Ligne du milieu.
      [6, 7, 8], // Ligne du bas.
      [0, 3, 6], // Colonne de gauche.
      [1, 4, 7], // Colonne du milieu.
      [2, 5, 8], // Colonne de droite.
      [0, 4, 8], // Diagonale de haut-gauche à bas-droite.
      [2, 4, 6]  // Diagonale de haut-droite à bas-gauche.
    ];
  
    // Fonction qui gère le clic sur une cellule du plateau de jeu.
    const handleCellClick = (event) => {
      // Récupère la cellule cliquée à partir de l'événement de clic.
      const clickedCell = event.target;
      // Récupère l'index de la cellule cliquée.
      const clickedCellIndex = parseInt(clickedCell.getAttribute("data-index"));
  
      // Vérifie si la cellule est déjà remplie ou si le jeu est inactif.
      if (gameBoard[clickedCellIndex] !== "" || !isGameActive) {
        return; // Si oui, sort de la fonction sans rien faire.
      }
  
      // Met à jour la cellule cliquée avec le symbole du joueur actuel.
      updateCell(clickedCell, clickedCellIndex);
      // Vérifie s'il y a un gagnant après ce mouvement.
      checkForWinner();
    };
  
    // Fonction qui met à jour la cellule cliquée et l'état du plateau de jeu.
    const updateCell = (cell, index) => {
      gameBoard[index] = currentPlayer; // Met à jour l'état du tableau de jeu.
      cell.textContent = currentPlayer; // Met à jour l'affichage de la cellule.
    };
  
    // Fonction qui vérifie s'il y a un gagnant ou un match nul.
    const checkForWinner = () => {
      let roundWon = false; // Initialise la variable de victoire à "faux".
  
      // Parcourt toutes les conditions gagnantes pour vérifier une victoire.
      for (let i = 0; i < winningConditions.length; i++) {
        const condition = winningConditions[i]; // Récupère la condition gagnante actuelle.
        const cellA = gameBoard[condition[0]]; // Première cellule de la condition gagnante.
        const cellB = gameBoard[condition[1]]; // Deuxième cellule de la condition gagnante.
        const cellC = gameBoard[condition[2]]; // Troisième cellule de la condition gagnante.
  
        // Si une des cellules de la condition gagnante est vide, continue à la prochaine condition.
        if (cellA === "" || cellB === "" || cellC === "") {
          continue;
        }
  
        // Si les trois cellules de la condition gagnante sont identiques, on a une victoire.
        if (cellA === cellB && cellB === cellC) {
          roundWon = true; // Met la victoire à "vrai".
          break; // Arrête la boucle car une victoire a été trouvée.
        }
      }
  
      // Si une victoire est détectée.
      if (roundWon) {
        statusText.textContent = `${currentPlayerName} (${currentPlayer}) a gagné !`; // Affiche le message de victoire avec le nom du joueur.
        isGameActive = false; // Désactive le jeu.
        return;
      }
  
      // Si toutes les cellules sont remplies et qu'il n'y a pas de gagnant.
      if (!gameBoard.includes("")) {
        statusText.textContent = "Match nul!"; // Affiche "Match nul".
        isGameActive = false; // Désactive le jeu.
        return;
      }
  
      // Si aucune condition de victoire ou de match nul n'est remplie, passe au joueur suivant.
      switchPlayer();
    };
  
    // Fonction pour changer de joueur.
    const switchPlayer = () => {
      // Si le joueur actuel est le joueur 1, passe au joueur 2.
      if (currentPlayer === player1Symbol) {
        currentPlayer = player2Symbol;
        currentPlayerName = player2;
      } else {
        // Sinon, passe au joueur 1.
        currentPlayer = player1Symbol;
        currentPlayerName = player1;
      }
  
      // Met à jour le texte du statut avec le tour du joueur suivant.
      statusText.textContent = `C'est au tour de ${currentPlayerName} (${currentPlayer})`;
    };
  
    // Fonction pour réinitialiser le jeu à l'état initial.
    const resetGame = () => {
      currentPlayer = player1Symbol; // Réinitialise le joueur actuel au symbole du joueur 1.
      currentPlayerName = player1; // Réinitialise le nom du joueur actuel au joueur 1.
      gameBoard = ["", "", "", "", "", "", "", "", ""]; // Réinitialise l'état du plateau de jeu.
      isGameActive = true; // Réactive le jeu.
      statusText.textContent = `C'est au tour de ${currentPlayerName} (${currentPlayer})`; // Réinitialise le texte de statut.
      cells.forEach(cell => (cell.textContent = "")); // Vide le contenu de chaque cellule.
    };
  
    // Fonction pour démarrer le jeu après la configuration des joueurs.
    const startGame = () => {
      // Récupère les pseudos des joueurs depuis les champs de saisie.
      player1 = player1Input.value || "Joueur 1";
      player2 = player2Input.value || "Joueur 2";
      // Récupère les symboles choisis par les joueurs.
      player1Symbol = player1SymbolSelect.value;
      player2Symbol = player2SymbolSelect.value;
  
      // Vérifie si les deux joueurs ont choisi le même symbole.
      if (player1Symbol === player2Symbol) {
        alert("Les joueurs ne peuvent pas avoir le même symbole !"); // Affiche un message d'alerte.
        return; // Sort de la fonction sans démarrer le jeu.
      }
  
      // Initialise le joueur actuel au symbole du joueur 1 et son nom.
      currentPlayer = player1Symbol;
      currentPlayerName = player1;
      gameBoard = ["", "", "", "", "", "", "", "", ""]; // Réinitialise l'état du plateau de jeu.
      isGameActive = true; // Active le jeu.
      statusText.textContent = `C'est au tour de ${currentPlayerName} (${currentPlayer})`; // Met à jour le texte de statut.
      
      board.classList.remove("hidden"); // Affiche le plateau de jeu.
      resetButton.classList.remove("hidden"); // Affiche le bouton de réinitialisation.
    };
  
    // Ajoute des écouteurs d'événements pour chaque cellule du plateau pour gérer les clics.
    cells.forEach(cell => cell.addEventListener("click", handleCellClick));
    // Ajoute un écouteur d'événement au bouton de réinitialisation pour réinitialiser le jeu.
    resetButton.addEventListener("click", resetGame);
    // Ajoute un écouteur d'événement au bouton de démarrage pour commencer le jeu.
    startButton.addEventListener("click", startGame);
  });
  