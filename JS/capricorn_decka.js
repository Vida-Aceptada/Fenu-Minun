let heartImage = new Image(100, 100);
heartImage.src = '../Images/Card Game/card flip life.png';

const game = {};
game.start = false;
game.difficulty = {};
game.difficulty['level 1'] = new Map();
game.difficulty['level 1'].set('limit', 20);
game.difficulty['level 2'] = new Map();
game.difficulty['level 2'].set('limit', 18);
game.difficulty['level 3'] = new Map();
game.difficulty['level 3'].set('limit', 16);
game.difficulty['level 4'] = new Map();
game.difficulty['level 4'].set('limit', 14);
game.difficulty['level 5'] = new Map();
game.difficulty['level 5'].set('limit', 12);
game.difficulty['level 6'] = new Map();
game.difficulty['level 6'].set('limit', 8);
game.difficulty['level 7'] = new Map();
game.difficulty['level 7'].set('limit', 6);
game.difficulty['level 8'] = new Map();
game.difficulty['level 8'].set('limit', 4);
game.level = 1;
game.cardPositions = [];
game.boundedCards = [];
game.cardRevealed = false;
game.currentCard = [0,0,0,''];
game.levelScore = 0;
game.totalScore = 0;
game.attempts = 3;
game.cardNumbers = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16];
game.cards = ['A World', 'A World', 'Crown', 'Crown', 'Eyes Up', 'Eyes Up', 'Grass and Leaf', 'Grass and Leaf', 'Hills', 'Hills', 'Inside Shell', 'Inside Shell', 'Origins', 'Origins', 'The Cell', 'The Cell'];
game.totalRevealed = 0;

function drawBackground(context, j, i, width, height, radius) {
	context.beginPath();
	context.moveTo(j, i + radius);
	context.lineTo(j, i + height - radius);
	context.arcTo(j, i + height, j + radius, i + height, radius);
	context.lineTo(j + width - radius, i + height);
	context.arcTo(j + width, i + height, j + width, i + height - radius, radius);
	context.lineTo(j + width, i + radius);
	context.arcTo(j + width, i, j + width - radius, i, radius);
	context.lineTo(j + radius, i);
	context.arcTo(j, i, j, i + radius, radius);
	context.fill();
}

function toggleSymbol(context, j, i, card, unset = false) {
	let canvas = document.querySelector('#GAME');
	context = canvas.getContext('2d');
	if (unset) {
		context.fillStyle = '#008B8B';
		context.clearRect( j + 20, i + 40, 60, 60);
		context.fillRect( j + 20, i + 40, 60, 60);
	} else {
		let cardImage = new Image();
		cardImage.src = `../Images/Card Game/${card}.png`;
		cardImage.addEventListener('load', function() {
			context.drawImage(cardImage, j + 20, i + 40, 60, 60);
		}, false);
	}
}

function setCards() {
	game.cardPositions.splice(0, game.cardPositions.length);
	let canvas = document.querySelector('#GAME');
	let context = canvas.getContext('2d');
	context.clearRect(0, 0, canvas.width, canvas.height);
	for (let j = 0; j < 640; j += 160) {
		for (let i = 0; i < 800; i += 200) {
			context.fillStyle = '#e0ffff';
			drawBackground(context, i + 60, j + 10, 100, 140, 5);
			context.fillStyle = '#008B8B';
			drawBackground(context, i + 70, j + 20, 80, 120, 5);
			game.cardPositions.push([i + 60, j + 10, 100, 140]);
		}
	}
}

function setCardPosition(x, y) {
	let canvas = document.querySelector('#GAME');
	let context = canvas.getContext('2d');
	let xPos;
	let yPos;
	let card = '';
	let bounded = false;
	game.cardPositions.forEach((el, index) => {
		if ((el[0] < x) && (x < (el[0] + el[2])) && (el[1] < y) && (y < (el[1] + el[3]))) {
			xPos = el[0];
			yPos = el[1];
			card = game.cards[(game.cardNumbers[index] - 1)];
		}
	});
	if (card != '') {
		game.boundedCards.forEach(el => {
			if (el == card) bounded = true;
		});
		if (!bounded) {
			matchCard(xPos, yPos, card);
			if (game.start) toggleSymbol(context, xPos, yPos, card);
		}
	}
}

function getMousePosition(canvas, event) {
	let canvPos = canvas.getBoundingClientRect();
	let x = event.clientX - canvPos.left;
	let y = event.clientY - canvPos.top;
	if (game.attempts > 0) setCardPosition(x, y);
}

function cardShuffle() {
	for (i = 15; i > 0; i--) {
		let j = Math.floor(Math.random() * (i + 1));
		let oldNum = game.cardNumbers[i];
		game.cardNumbers[i] = game.cardNumbers[j];
		game.cardNumbers[j] = oldNum;
	}
}

function matchCard(xPos, yPos, card) {
	let canvas = document.querySelector('#GAME');
	let context = canvas.getContext('2d');
	if (game.attempts > 0) {
		if (game.cardRevealed) {
			if ((card == game.currentCard[2]) && (game.attempts > 0)) {
				game.levelScore += 125;
				game.cardRevealed = false;
				game.boundedCards.push(card);
				game.totalRevealed += 1;
				if ((game.totalRevealed * 2) == 16) {
					game.levelScore += 125 * game.attempts;
					scoreScreen();
					if (game.level < 8) game.level += 1;
					game.totalRevealed = 0;
				}
			} else {
				game.attempts -= 1;
				if (game.attempts == 0) {
					scoreScreen();
				} else {
					let delay;
					delay = window.setTimeout(() => {
						toggleSymbol(context, game.currentCard[0], game.currentCard[1], card, true);
						toggleSymbol(context, xPos, yPos, card, true);
					}, 1000);
					game.cardRevealed = false;
					context.clearRect( 400, 8, 50, 40);
					context.font = '40px monospace';
					context.fillStyle = '#008B8B';
					context.fillText(game.attempts, 400, 48);
				}
			}
		} else {
			game.currentCard[0] = xPos;
			game.currentCard[1] = yPos;
			game.currentCard[2] = card;
			game.cardRevealed = true;
		}
	}
}

function startGame() {
	let canvas = document.querySelector('#GAME');
	let context = canvas.getContext('2d');
	context.fillStyle = '#000';
	context.clearRect( 0, 0, 800, 640);
	context.fillRect( 0, 0, 800, 640);
	setCards();
	cardShuffle();
	game.attempts = game.difficulty[`level ${game.level}`].get('limit');
	context.font = '40px monospace';
	context.fillStyle = '#008B8B';
	context.fillText(game.attempts, 400, 48);
	context.drawImage(heartImage, 370, 20, 30, 30);
}

function scoreScreen() {
	game.boundedCards.splice(0, game.boundedCards.length);
	game.start = false;
	game.totalScore += game.levelScore;
	let canvas = document.querySelector('#GAME');
	let context = canvas.getContext('2d');
	context.fillStyle = '#000';
	context.clearRect( 0, 0, 800, 640);
	context.fillRect( 0, 0, 800, 640);
	context.font = '40px dejavu sans mono';
	context.fillStyle = '#fff';
	context.fillText(`Level Score: ${game.levelScore}`, 200, 260);
	context.fillText(`Total Score: ${game.totalScore}`, 200, 360);
	context.fillText('Click To Continue', 200, 460);
	game.levelScore = 0;
	
}

function main() {
	let canvas = document.querySelector('#GAME');
	let context = canvas.getContext('2d');
	context.font = '60px dejavu sans mono';
	context.fillStyle = '#66d';
	context.fillText('Capricorn Decka', 120, 300);
	context.font = '40px dejavu sans mono';
	context.fillStyle = '#e0ffff';
	context.fillText('A Card Matching Game', 160, 360);
	context.font = '30px dejavu sans mono';
	context.fillStyle = '#fff';
	context.fillText('Click To Play', 280, 500);
	canvas.addEventListener('mousedown', (e) => {
		if (game.start) {
			console.log(getMousePosition(canvas, e));
		} else {
			game.start = true;
			startGame();
		}
	});
}

window.addEventListener('DOMContentLoaded', () => {
    main();
});