var displayHolder = document.getElementById('gameInfo')
var games = document.getElementById("games");
var display = document.getElementById('gameDisplay')

var apiKey = "3f7a082ecdb74b2388222a89923e48d5";
var getMostPopularGame = function(){
    var t = new Date();
    var year = t.getFullYear();
    var month = (t.getMonth()+1);
    var day = t.getDate();
    var todayDate = year + "-" + month + "-" + day;

    var selectedYear = document.getElementById("inline_field").value;
    var regex = /\d{4}/g
    var found = selectedYear.match(regex)
    
    if(!found || selectedYear > year || selectedYear < 1960){
      console.log('bad year')
      games.innerHTML = ''
      display.innerHTML = ''
      var badDate = document.createElement('h1')
      badDate.classList.add('nes-text')
      badDate.classList.add('is-error')
      badDate.innerHTML = 'bad date'
      games.appendChild(badDate)
    }else {
    if (displayHolder.innerHTML != '') {
      displayHolder.innerHTML = ''
    }
    var apiUrl = "https://api.rawg.io/api/games?dates="+selectedYear+"-01-01,"+selectedYear+"-12-31&ordering=-added";
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
}

var displayMostPopularGames = function(data){
    console.log(data);
    
    console.log('most popular games')
    games.innerHTML = ''
    display.innerHTML = ''
    var gamesArray = [];
    for(let i = 0; i<data.results.length; i++){
    gamesArray.push(data.results[i]);
    if(gamesArray.length === 10){
      break;
    }
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
      })

    }

                     
   
   
}
function fetchInfo(id) {
  console.log('fetching game')
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
  console.log('displaying')
  if (displayHolder.innerHTML != '') {
    displayHolder.innerHTML = ''
  }
  var gameDetails = document.createElement('div')
  gameDetails.classList.add('nes-text')
  gameDetails.classList.add('is-primary')
  gameDetails.innerHTML = 'Game Name = '+ game.name

  displayHolder.appendChild(gameDetails)

  var gameScore = document.createElement('div')
  gameScore.classList.add('nes-text')
  gameScore.classList.add('is-primary')
  gameScore.innerHTML = 'Rating = ' + game.rating

  displayHolder.appendChild(gameScore)

  var releaseDate = document.createElement('div')
  releaseDate.classList.add('nes-text')
  releaseDate.classList.add('is-primary')
  releaseDate.innerHTML = 'Release Date = ' + game.released

  displayHolder.appendChild(releaseDate)

  var gameDesc = document.createElement('div')
  gameDesc.classList.add('nes-text')
  gameDesc.classList.add('is-primary')
  gameDesc.innerHTML = game.description

  displayHolder.appendChild(gameDesc)

  display.appendChild(displayHolder)

}
document.getElementById("mostAnticipated").addEventListener("click",getMostPopularGame);