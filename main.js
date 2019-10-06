/* exported sectionToggle */
/* exported request */
/* exported dragElement */

const request = new XMLHttpRequest();

function fullHeight(el) {
	el = window.getComputedStyle(document.querySelectorAll(el)[0]);
	let height = el.height;
	let marginBottom = el.marginBottom;
	let marginTop = el.marginTop;
	let paddingBottom = el.paddingBottom;
	let paddingTop = el.paddingTop;
	return cssToInt(height) + cssToInt(marginBottom) + cssToInt(marginTop) + cssToInt(paddingBottom) + cssToInt(paddingTop);
}

function cssToInt(el) {
	return parseInt(el.substring(0, el.length -2));
}

function sectionToggle(section) {
	let aboutHeight = fullHeight('h1') + fullHeight('nav') + fullHeight('#ABOUT');
	let projectsHeight = fullHeight('#PROJECTS')
	let totalHeight;
	switch(section) {
		case 'PROJECTS':
			totalHeight = aboutHeight;
			break;
		case 'CONTACT':
			totalHeight = aboutHeight + projectsHeight;
			break;
		default:
			totalHeight = 0;
			break;
	}
	window.scroll({
		top: totalHeight,
		left: 0,
		behavior: 'smooth'
	});
}

/* safekeeping
let targetEl;

window.addEventListener('DOMContentLoaded', () => {
	targetEl = document.getElementById('ABOUT'); // select the current visible pseudo page
});

function sectionToggle(section) {
	targetEl.style.opacity = "1"; // give current pseudo page an opacity value in case it's missing
	let el2 = document.getElementById(section); // select the new pseudo page we want to make visible
	if (targetEl != el2) { // allow the toggle animation only if we're navigating to a different pseudo page
		el2.style.opacity = "0"; // give new pseudo page an opacity value in case it's missing
		let startOpacity = 1;
		let setEl = targetEl;
		let counter = -1;
		let reverse = true;
		let fade = setInterval(() => {
			startOpacity += counter/10;
			setEl.style.opacity = startOpacity.toString();
			console.log(startOpacity);
			if (reverse && startOpacity < 0) {
				counter = 1;
				reverse = false;
				targetEl.style.display = 'none';
				el2.style.display = 'block';
				setEl = el2;
				console.log('Complete');
			}
			else if (startOpacity > 1) {
				clearInterval(fade);
				targetEl = el2;
			}
		}, 30); // the speed of the fade is set here
	}
}
*/


function dragElement(elmnt) {
	let pos1 = 0,
		pos2 = 0,
		pos3 = 0,
		pos4 = 0;
	
	if (document.getElementById('DRAG_BAR')) {
		document.getElementById('DRAG_BAR').onmousedown = dragMouseDown;
	} else {
		elmnt.onmousedown = dragMouseDown;
	}
	
	function dragMouseDown(e) {
		e = e || window.event;
		e.preventDefault();
		// get the mouse cursor position at startup:
		pos3 = e.clientX;
		pos4 = e.clientY;
		document.onmouseup = closeDragElement;
		// call a function whenever the cursor moves:
		document.onmousemove = elementDrag;
	}
	
	function elementDrag(e) {
		e = e || window.event;
		e.preventDefault();
		// calculate the new cursor position:
		pos1 = pos3 - e.clientX;
		pos2 = pos4 - e.clientY;
		pos3 = e.clientX;
		pos4 = e.clientY;
		// set the element's new position:
		elmnt.style.top = `${elmnt.offsetTop - pos2}px`;
		elmnt.style.left = `${elmnt.offsetLeft - pos1}px`;
	}
	
	function closeDragElement() {
		// stop moving when mouse button is released:
		document.onmouseup = null;
		document.onmousemove = null;
	}
}