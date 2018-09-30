var characters = ['naruto', 'sasuke', 'sakura', 'hinata', 'choji', 'kakashi','death note' ];
var favs = [];
var add; 
var gifs = [];
var limit = 30;
var favGifs = [];
// end global variables
$(document).ready(function(event){
    $(".favs").hide();
    if(sessionStorage.length >= 1) {
        if(sessionStorage.fav) {
            console.log('fav exists')
            favs = JSON.parse(sessionStorage.fav);
            for (i = 0; i < favs.length; i ++ ) {
            characters.push(favs[i]);} // = JSON.parse(sessionStorage.fav);
        }
        if(sessionStorage.favGifs) {
            console.log('favGifs exists');
            favGifs = JSON.parse(sessionStorage.favGifs);
            createFavs(favGifs);
        }
    }
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
$(document).on("click", ".favorite", function(event) {
    var newF = JSON.parse($(this).attr("data"));
    var a = JSON.stringify(favGifs);
    if(a.includes(newF.id)) {
        console.log('already there');
    }
    else {
    var newObj = { src: newF.images.original_still.url, 
        "data-still":newF.images.original_still.url,
        "data-animate":newF.images.original.url,
        "data-state": "still",
        "data-rating": newF.rating,
        id: newF.id,
        alt: newF.title}
        favGifs.push(newObj);
        console.log(favGifs);
       setInterval(createFavs(favGifs),1000);
    }
});// end on click to favorite gif
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
            align: "middle"});// end image var
        var b = $("<h5>").html("rating: " + gifs[i].rating);
        var c = $("<div>").append(b);
        var d = $("<button>").attr({
                    class: 'favorite',
                    data: JSON.stringify(gifs[i]),
                    style: 'bottom: 1px;'}).text('^Fav^');//end fav button
        var e = $("<button>").attr({
                class: 'like',
                data: JSON.stringify(gifs[i]),
                style: 'bottom: 1px;'}).text('^like^');// end like button
        c.append(a);
        c.append("<br>");
        c.append(d);
        c.append(e);
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
            "data-state": "still",
            id: gifs[i].id,
            alt: gifs[i].title,
            align: "middle"});// end image var
        var b = $("<h5>").html("rating: " + gifs[i].rating);
        var c = $("<div>").append(b);
        var d = $("<button>").attr({
                    class: 'favorite',
                    data: JSON.stringify(gifs[i]),
                    style: 'bottom: 1px;'}).text('^Fav^');//end fav button
        var e = $("<button>").attr({
                class: 'like',
                data: JSON.stringify(gifs[i]),
                style: 'bottom: 1px;'}).text('^like^');// end like button
        c.append(a);
        c.append("<br>");
        c.append(d);
        c.append(e);
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
            "data-state": "still",
            id: gifs[i].id,
            alt: gifs[i].title,
            align: "middle"});// end image var
        var b = $("<h5>").html("rating: " + gifs[i].rating);
        var c = $("<div>").append(b);
        var d = $("<button>").attr({
                    class: 'favorite',
                    data: JSON.stringify(gifs[i]),
                    style: 'bottom: 1px;'}).text('^Fav^');//end fav button
        var e = $("<button>").attr({
                class: 'like',
                data: JSON.stringify(gifs[i]),
                style: 'bottom: 1px;'}).text('^like^');// end like button
        c.append(a);
        c.append("<br>");
        c.append(d);
        c.append(e);
        newDivR.append(c);
    }   // end for loop
    $("#giphsA").append(newDivR);
}// end create and populate giph function 3
function createFavs(favGifs) {
    var newDivR = $("<div>").attr("class","row");
    $(".favs").show();
    $("#favGifArea").empty();
    for (i = 0; i < favGifs.length; i ++ ) {
        var a = $("<img>").attr({
            class: 'gif',
            src: favGifs[i].src, 
            "data-still":favGifs[i]["data-still"],
            "data-animate":favGifs[i]["data-animate"],
            "data-state": "still",
            id: favGifs[i].id,
            alt: favGifs[i].alt,
            align: "middle"});// end image var
        var b = $("<h5>").html("rating: " + favGifs[i]["data-rating"]);
        var c = $("<div>").append(b);
        c.append(a);
        newDivR.append(c);
    }  // end for loop
    $("#favGifArea").append(newDivR);
    sessionStorage.favGifs =JSON.stringify(favGifs).trim();
};// end create and populate giph function 1