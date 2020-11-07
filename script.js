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
    var gamesArray = [];
    for(let i = 0; i<data.results.length; i++){
    gamesArray.push(data.results[i].name);
    }
    for(let i = 0; i<gamesArray.length; i++){
      var holder = gamesArray[i];
      // create an element every time that holds the value and the append it to the body of the 
      // project which is 'games' you can also add a class by doing
      // gameholder.classList.add(classNameHere)
      var gameHolder = document.createElement('div')
      gameHolder.innerHTML = holder;
      games.appendChild(gameHolder)	
    }
    console.log(gamesArray);
                     
   
   
}

document.getElementById("mostAnticipated").addEventListener("click",getMostPopularGame);