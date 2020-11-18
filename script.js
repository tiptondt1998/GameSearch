var displayHolder = document.getElementById('gameInfo')
var games = document.getElementById("games");
var display = document.getElementById('gameDisplay')
var recentDisplay = document.getElementById('recentDisplay')
var recentHolder = document.getElementById('recentHolder')
var apiKey = "3f7a082ecdb74b2388222a89923e48d5";
// make selectedYear global to handle when a past year is clicked


// updating the recent list and parsing it. If there is nothing in the list initialize empty array
var recent = JSON.parse(localStorage.getItem('list')) || []
for (let index = 0; index < recent.length; index++) {
  // creating button element that goes in the list to make it easier to add event listeners
  var recentEl = document.createElement('button')
  recentEl.classList.add('nes-btn')
  recentEl.classList.add('btnDisplay')
  recentEl.innerHTML = recent[index]

  recentHolder.appendChild(recentEl)
  recentDisplay.appendChild(displayHolder)
  
}
var getMostPopularGame = function(){
    var t = new Date();
    var year = t.getFullYear();
    var month = (t.getMonth()+1);
    var day = t.getDate();
    var todayDate = year + "-" + month + "-" + day;
    // grabbing value you from what is entered into the field
    var selectedYear = document.getElementById("inline_field").value;
    var regex = /\d{4}/g
    var found = selectedYear.match(regex)
    // check for a bad date. The API only goes back to the 1960 so we have to flush everyhting out
    if(!found || selectedYear > year || selectedYear < 1960){
      // remove existing html that may have persisted
      games.innerHTML = ''
      display.innerHTML = ''
      // create error display
      var badDate = document.createElement('h1')
      badDate.classList.add('nes-text')
      badDate.classList.add('is-error')
      badDate.innerHTML = 'bad date'
      games.appendChild(badDate)
    }else {
      // check if all persistant data is gone
    if (displayHolder.innerHTML != '') {
      displayHolder.innerHTML = ''
    }
    // call function to render the list we created above, created seperate function to keep it neat
    renderList(selectedYear)
    document.getElementById('inline_field').value = ''
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
    // once again removing persistant html
    games.innerHTML = ''
    display.innerHTML = ''
    var gamesArray = [];
    // placing all results into an array to eventually be pushed into buttons 
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
      })

    }

                     
   
   
}
function fetchInfo(id) {
  // simple API call to get the data of a specific button pressed. Used the ID of the button to grab the data
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
  // Creating and displaying the information about each game. Maybe could have made an Object?
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

function renderList(list) {
  // Checks if the list is already in the recent, if it isn't pushes it to localStorage and handles it, if it is, does nothing
  if (!recent.includes(list)) {
    
  // create the list elements and add them to local storage
  recent.push(list)
  localStorage.setItem('list',JSON.stringify(recent))
  var recentEl = document.createElement('button')
  recentEl.classList.add('nes-btn')
  recentEl.classList.add('btnDisplay')
  recentEl.setAttribute('id', list)
  recentEl.innerHTML = list

  recentHolder.appendChild(recentEl)
  recentDisplay.appendChild(displayHolder)
  // place an event listener on each new button element and when clicked, takes advantage of our code above
  // and simply adds the date to the field and calls the function
  // essentially 'clicking' it without actually clicking it.
  recentEl.addEventListener('click', function (params) {
    document.getElementById('inline_field').value = this.id
    getMostPopularGame()
  })
  }
}





// Simple function for clearing out localStorage
function clearHistory () {
  localStorage.clear()
}



document.getElementById("mostAnticipated").addEventListener("click",getMostPopularGame);
document.getElementById("clearHistory").addEventListener("click",clearHistory);