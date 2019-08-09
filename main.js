/* exported sectionToggle */
/* exported request */
/* exported dragElement */

const request = new XMLHttpRequest();
let targetEl;

window.addEventListener('DOMContentLoaded', () => {
	targetEl = document.getElementById('ABOUT');
});

function sectionToggle(section) {
	targetEl.style.opacity = "1";
	let el2 = document.getElementById(section);
	el2.style.opacity = "0";
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
	}, 10); // the speed of the fade is set here
}

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