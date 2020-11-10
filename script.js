var displayHolder = document.getElementById('gameInfo')
var gameDet = document.getElementById('gameName')
var gameScore = document.getElementById('gameRating')
var gameRel = document.getElementById('gameRelease')
var gameDesc = document.getElementById('gameDesc')

var apiKey = "3f7a082ecdb74b2388222a89923e48d5";
var getMostPopularGame = function(){
    var t = new Date();
    var year = t.getFullYear();
    var month = (t.getMonth()+1);
    var day = t.getDate();
    var todayDate = year + "-" + month + "-" + day;

    var selectedYear = document.getElementById("inline_field").value;

    var apiUrl = " https://api.rawg.io/api/games?dates="+selectedYear+"-01-01,"+selectedYear+"-12-31&ordering=-added";
    //make a request to the url
    fetch(apiUrl)
    .then(function(response) {
      // request was successful
      if (response.ok) {
        response.json().then(function(data) {
          displayMostPopularGames(data);
        });
      } else {
        alert("Error: " + response.statusText);
      }
    });
}

var displayMostPopularGames = function(data){
    console.log(data);
    var games = document.getElementById("games");
    games.innerHTML = ''
    gameDet.innerHTML = ''
    gameScore.innerHTML = ''
    gameRel.innerHTML = ''
    gameDesc.innerHTML = ''
    var gamesArray = [];
    for(let i = 0; i<data.results.length; i++){
    gamesArray.push(data.results[i]);
    }
    for(let i = 0; i<gamesArray.length; i++){
      var holder = gamesArray[i];
      // create an element every time that holds the value and the append it to the body of the 
      // project which is 'games' you can also add a class by doing
      // gameholder.classList.add(classNameHere)
      var gameHolder = document.createElement('button')
      gameHolder.setAttribute('id',holder.id)
      gameHolder.classList.add('nes-btn')
      gameHolder.classList.add('btnDisplay')
      gameHolder.innerHTML = holder.name;
      games.appendChild(gameHolder)	
      gameHolder.addEventListener('click',function (params) {
        fetchInfo(this.id)
        gameDesc.scrollIntoView()
      })

    }

                     
   
   
}
function fetchInfo(id) {
  fetch('https://api.rawg.io/api/games/' + id)
  .then(function(nameReturned) {
    // request was successful
    if (nameReturned.ok) {
      nameReturned.json().then(function(data) {
        displayInfo(data);
      });
    } else {
      alert("Error: " + nameReturned.statusText);
    }
  });
}

function displayInfo(game) {
  

  gameDet.innerHTML = 'Game Name = '+ game.name
  gameScore.innerHTML = 'Rating = ' + game.rating
  gameRel.innerHTML = 'Release Date = ' + game.released
  gameDesc.innerHTML = game.description
}
document.getElementById("mostAnticipated").addEventListener("click",getMostPopularGame);