var characters = ['naruto', 'sasuke', 'sakura', 'hinata', 'choji', 'kakashi', ];
var favs = [];
var add; 
var gifs = [];
var limit = 30;
var favGifs = [];
// end global variables
if(sessionStorage.length == 1) {
    favs = JSON.parse(sessionStorage.fav);
    characters = JSON.parse(sessionStorage.fav);
}
$(document).ready(function(event){
    buttonPop();
    console.log(sessionStorage);    
});// end on ready function
$(document).on("click", ".pop", function(event) {
    add = $(this)[0].textContent.split(" ").join("+");
    getGiph();
});// pulls value then runs ajax
$(document).on("click", "#add", function(event) {
    event.preventDefault();
    var a = JSON.stringify($("input#input").val().trim());
    console.log(a.length);
    if (a.length > 2) {
        characters.push($("input#input").val().trim());
        favs.push($("input#input").val().trim());
        newBtnGen();
        $("input#input").val('');
        sessionStorage.fav = JSON.stringify(favs).trim();
    } // ends if statment - working
    $("input#input").val('');
});// on click that runs newbutton function also stores session data
$(document).on("click", ".gif", function(event) {
    var state = $(this).attr("data-state");
    if (state === "still") {
      $(this).attr("src", $(this).attr("data-animate"));
      $(this).attr("data-state", "animate");
    } else {
      $(this).attr("src", $(this).attr("data-still"));
      $(this).attr("data-state", "still");
    }
});// function/click event playing/pausing gif
// end on clicks and doc ready's start functions 
function buttonPop() {
    for(x=0; x<characters.length; x++) {
        $(".btnArea").append($("<button>").attr("class", "pop").text(characters[x]));
    }// end for loop
};// end button populator function
function newBtnGen() { // still need to figure out how to restrict input
    var newBtn = $("<button>").text($("input#input").val()).attr("class","pop");
    $(".btnArea").append(newBtn);
    
};// generates new button called from submit
function getGiph() {
    var aKey = '&api_key=92vKLfVYVZ51WHhYfCVLwPZbuJurXFc1&limit=';
    var url = 'https://api.giphy.com/v1/gifs/search?q=';
    $.ajax({
        url: url + add + aKey + limit,
        method: "GET"
    }).then(function(giph){
        for (i = 0; i < 30; i ++) {gifs[i] = giph.data[i];}
        setTimeout(create(),200);
        setTimeout(create2(),200);
        setTimeout(create3(),200);
        console.log(gifs);
    });// end then function 
};// runs ajax function stores into array 
function create() {
    var newDivR = $("<div>").attr("class","row");
    $("#giphsA").empty();
    for (i = 0; i < 3; i ++ ) {
        var a = $("<img>").attr({
            class: 'gif',
            src: gifs[i].images.original_still.url, 
            "data-still":gifs[i].images.original_still.url,
            "data-animate":gifs[i].images.original.url,
            "data-state": "still",
            id: gifs[i].id,
            alt: gifs[i].title,
            align: "middle"
        });
        var b = $("<h5>").html("rating: " + gifs[i].rating);
        var c = $("<div>").append(b);
        c.append(a);
        newDivR.append(c);
    }  // end for loop
    $("#giphsA").append(newDivR);
};// end create and populate giph function 1
function create2() {
    var newDivR = $("<div>").attr("class","row");
    for (i = 3; i < 7; i ++ ) {
        var a = $("<img>").attr({
            class: 'gif',
            src: gifs[i].images.original_still.url, 
            "data-still":gifs[i].images.original_still.url,
            "data-animate":gifs[i].images.original.url,
            "data-state": "still"
        });
        var b = $("<h5>").html("rating: " + gifs[i].rating);
        var c = $("<div>").html(b);
        c.append(a);
        newDivR.append(c);
    }// end for loop
    $("#giphsA").append(newDivR);
};// end create and populate giph function 2
function create3() {
    var newDivR = $("<div>").attr("class","row");
    for (i = 7; i < 10; i ++ ) {
        var a = $("<img>").attr({
            class: 'gif',
            src: gifs[i].images.original_still.url, 
            "data-still":gifs[i].images.original_still.url,
            "data-animate":gifs[i].images.original.url,
            "data-state": "still"
        });
        var b = $("<h5>").html("rating: " + gifs[i].rating);
        var c = $("<div>").html(b);
        c.append(a);
        newDivR.append(c);
    }   // end for loop
    $("#giphsA").append(newDivR);
}// end create and populate giph function 3