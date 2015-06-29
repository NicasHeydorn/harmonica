function addShadow(element, direction) {
	if (direction == 'left') {
		element.style.boxShadow = 'none';
	} else {
		element.style.boxShadow = '0 0 20px #333';
	}
}

window.onload = function() {
	var harmonica = new Harmonica('harmonica', {slideCallback: addShadow});
	window.harmonica_offset = 100

	document.getElementsByClassName('js-addElement')[0].onclick = function() {
		addElement();
	};
	document.getElementsByClassName('js-removeElement')[0].onclick = function() {
		removeElement();
	};
	document.getElementsByClassName('js-increaseWidth')[0].onclick = function() {
		increaseWidth();
	};
	document.getElementsByClassName('js-decreaseWidth')[0].onclick = function() {
		decreaseWidth();
	};
	document.getElementsByClassName('js-increaseOffset')[0].onclick = function() {
		increaseOffset();
	};
	document.getElementsByClassName('js-decreaseOffset')[0].onclick = function() {
		decreaseOffset();
	};
}

function addElement() {
	document.getElementsByClassName('harmonica')[0].innerHTML = document.getElementsByClassName('harmonica')[0].innerHTML + '<div></div>';
	document.getElementsByClassName('harmonica')[0].children[document.getElementsByClassName('harmonica')[0].children.length-1].style.width=window.newWidth;
	harmonica = new Harmonica('harmonica', {slideCallback: addShadow});
}
function removeElement() {
	document.getElementsByClassName('harmonica')[0].innerHTML = document.getElementsByClassName('harmonica')[0].innerHTML.substring(0, document.getElementsByClassName('harmonica')[0].innerHTML.length - 12);
	harmonica = new Harmonica('harmonica', {slideCallback: addShadow});
}
function increaseWidth() {
	elements = document.getElementsByClassName('harmonica')[0]
	elements = elements.children
	for (i=0; i < elements.length; i++) {
		elements[i].style.width = parseInt(elements[i].offsetWidth) + 30 + "px"
		window.newWidth = elements[i].offsetWidth
	}
	harmonica = new Harmonica('harmonica', {slideCallback: addShadow});
}
function decreaseWidth() {
	elements = document.getElementsByClassName('harmonica')[0]
	elements = elements.children
	for (i=0; i < elements.length; i++) {
		elements[i].style.width = parseInt(elements[i].offsetWidth) - 30 + "px"
	}
	harmonica = new Harmonica('harmonica', {slideCallback: addShadow});
}
function increaseOffset() {
	window.harmonica_offset = window.harmonica_offset + 10
	harmonica = new Harmonica('harmonica', {slideCallback: addShadow, offset: window.harmonica_offset});
}
function decreaseOffset() {
	window.harmonica_offset = window.harmonica_offset -10
	harmonica = new Harmonica('harmonica', {slideCallback: addShadow, offset: window.harmonica_offset});
}