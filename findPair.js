var backPath = "images\\cards\\card_back.png"
var showen = 0;
var values = [];
var cards = [];

var gameOn = false;

var maxCards = 5;

function generateRandomCards(){
	while(values.length<maxCards)
	{
		var num = random(1, 10);
		if(values.includes(num) === false)
		{
			values.push(num);
			values.push(num);
		}
	}
}

function run(){

	if(gameOn){
		alert("Please refresh the page");
		return;
	}

	if($("#maxCards").val() > maxCards){
		alert("MAX CARDS IS " + maxCards);
		return;
	} else {
		maxCards = $("#maxCards").val()*2;
	}

	generateTable();

	generateRandomCards();

	shuffle(values);

	for(var i=0;i<values.length;i++){
		var newCard = new card(values[i], i, "images\\cards\\" + values[i] + "_of_diamonds.png");
		cards.push(newCard);
	}

	$("[name=cards]").click(function(){
		if(showen<2){
			cards[$(this).attr("id")].flipUp();
		} 
		if(showen === 2) {
			flipDownAllCards();
		}
	});

	gameOn = true;
}



function flipDownAllCards(){
	var showenCards = [];
	for(var i=0;i<values.length;i++){
		if(cards[i].faceUp === true)
		{
			showenCards.push(cards[i]);
		}
	}
	if(showenCards[0].value == showenCards[1].value){
		cards[showenCards[0].id].clickable = false
		cards[showenCards[1].id].clickable = false
		cards[showenCards[0].id].faceUp = false
		cards[showenCards[1].id].faceUp = false
		showen = 0;
	} else {
		function flipWTF(){
			cards[showenCards[0].id].flipDown();
			cards[showenCards[1].id].flipDown();
		}
		setTimeout(flipWTF, 1000);
	}
	if(checkWin()){
		alert("YOU WON!");
	}
}

function checkWin(){
	var win = true;
	for(var i=0;i<values.length;i++){
		if(cards[i].clickable==true)
			win=false;
	}
	return win;
}

function card(value, id, srcPath){
	this.value = value;
	this.id = id;
	this.src = srcPath;
	this.clickable = true;
	this.faceUp = false;
	this.flipUp = function(){
		if(this.faceUp == false && this.clickable == true)
		{
			changeSrc(this.id, this.src);
			this.faceUp = true;
			showen++;
		} else if(this.faceUp == true && this.clickable == true)
			this.flipDown();
	};
	this.flipDown = function(){
		if(this.faceUp){
			changeSrc(this.id, backPath);
			this.faceUp = false;
			showen--;
		}
	};
	changeSrc(this.id, backPath);
}

function changeSrc(id, srcPath){
	$("#" + id).attr('src', srcPath);
}

function generateTable(){
	//$("#main").append("<table>");
	for(var i=0;i<2;i++){
		$("#main").append("<tr>");
		var id = i;
		for(var j=0;j<maxCards/2;j++){
			$("#main").append("<td><img src='' width=180 height=246 id='"+ (i*(maxCards/2)+j) +"' name='cards'></td>");
		}
		$("#main").append("</tr>");
	}
	//$("#main").append("</table>");
}

function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;
  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}
