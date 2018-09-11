
// 4. Przygotowanie konstruktora dla Furry'ego i monety

var Furry = function() {
  this.x = 0;
  this.y = 0;
  this.direction = "right";
}

var Coin = function() {
  this.x = Math.floor(Math.random() * 10);
  this.y = Math.floor(Math.random() * 10);
}

// 5. Przygotowanie obiektu zarządzającego grą. 6. Obliczanie pozycji. 7. Rysowanie stanu planszy. 8. Start 9. Czyszczenie widoku - usuwanie niepotrzebnych klas. 10. Obsługa klawiatury.

var Game = function() {

  this.board = document.querySelectorAll("#board div");
  this.furry = new Furry();
  this.coin = new Coin();
  this.score = 0;

  this.index = function(x,y) {
  return x + (y * 10);
  };

  this.showFurry = function() {

    this.board[ this.index(this.furry.x, this.furry.y) ].classList.add('furry');
  };

  this.hideVisibleFurry = function() {
    var visibleFurry = document.querySelector('.furry');
    visibleFurry.classList.remove('furry');
  };

  this.showCoin = function() {
    this.board[ this.index(this.coin.x, this.coin.y) ].classList.add('coin');
  };

  this.startGame = function() {
    this.idSetInterval = setInterval(function() {
      self.moveFurry()
    }, 250);
    self.showCoin();
    self.showFurry();
    self.gameOver();

  };

  var self = this;

  this.moveFurry = function() {

  this.hideVisibleFurry();

  if(this.furry.direction === "right") {
  this.furry.x = this.furry.x + 1;
} else if (this.furry.direction === "left") {
  this.furry.x = this.furry.x - 1;
} else if (this.furry.direction === "up") {
  this.furry.y = this.furry.y - 1;
} else if (this.furry.direction === "down") {
  this.furry.y = this.furry.y + 1;
}

this.gameOver();
this.checkCoinCollision();
this.showFurry();
this.turnFurry();


};

this.turnFurry = function() {

  switch (event.which) {
  case 37:
  this.furry.direction = 'left';
  break;
  case 38:
  this.furry.direction = 'up';
  break;
  case 39:
  this.furry.direction = 'right';
  break;
  case 40:
  this.furry.direction = 'down';
  break;

};
};

// w opisie zadania wartości klawiszy są pomylone (góra i prawo)

document.addEventListener('keydown', function(event) {
  self.turnFurry(event);
});

this.checkCoinCollision = function() {
  var result = document.querySelector("#score strong");
  var self = this;

  if ((this.furry.x === this.coin.x) && (this.furry.y === this.coin.y)) {
    document.querySelector(".coin").classList.remove("coin");
    score = ++this.score;
    result.innerText = parseInt(score);
    this.coin = new Coin();
    this.showCoin();
  }
};

this.gameOver = function() {
  if (this.furry.x < 0 || this.furry.x > 9 || this.furry.y < 0 || this.furry.y > 9) {
    clearInterval(this.idSetInterval);
    alert("GAME OVER, your score is " + this.score);
    this.hideVisibleFurry();
  }
}

this.startGame();

};

var game = new Game();
