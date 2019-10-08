/* exported sectionToggle */
/* exported request */
/* exported dragElement */

const request = new XMLHttpRequest();
let isOpen = false;

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

function sectionToggle(section, scrollSpeed = 'smooth') {
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
		behavior: scrollSpeed
	});
}

function projectViewer(project) {
	let viewer = document.getElementById('VIEWER');
	project = document.getElementById(project);
	let startOpacity;
	let counter;
	if (isOpen) {
		startOpacity = 1.0;
		counter = -1;
	} else {
		startOpacity = 0;
		counter = 1;
		viewer.style.display = 'block';
		project.style.display = 'block';
	}
	let fade = setInterval(() => {
		startOpacity = parseFloat(Number.parseFloat(startOpacity + counter/10).toFixed(1));
		viewer.style.opacity = startOpacity.toString();
		if ((!isOpen && startOpacity >= 1) || (isOpen && startOpacity <= 0)) {
			if (isOpen) {
				viewer.style.display = 'none';
				project.style.display = 'none';
			}
			isOpen = isOpen ? false : true;
			clearInterval(fade);
		}
	}, 30); // the speed of the fade is set here
}