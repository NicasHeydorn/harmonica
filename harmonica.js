var Harmonica = function(container, options) {

	/*
	 * harmonica - Nicas Kilian Heydorn - June 2015
	 * Container with slideable Elements that overlap each other.
	 * options:
	 * 	* offset - Distance between overlapping elements. Default: First element is fully visible, Remaining Container space is sliced equally.
	 *	* slideCallback - A function to call when an element has slided. The element and the direction are passed as arguments.
	 *	* zOffset - An integer value to add upon the z-index of the Elements, to prevent collision with surrounding elements.
	 */

	var container, elements, elementCount, positions, offset, zOffset, slideCallback;

	/*
	 * Compatibility IE8
	 */
	if (!Array.prototype.indexOf) {
		Array.prototype.indexOf = function(obj, start) {
		     for (var i = (start || 0), j = this.length; i < j; i++) {
		         if (this[i] === obj) { return i; }
		     }
		     return -1;
		}
	}
	var eventListener = function(element, eventToBind, functionToCall) {
		if (element.addEventListener) {
		    element.addEventListener(eventToBind, functionToCall, false);
		}
		else {
			eventToBind = "on" + eventToBind; //Bypass event names. Should work for most events
		    element.attachEvent(eventToBind, functionToCall);
		}
	}

	Array.prototype.contains = function(obj) {
	    var i = this.length;
	    while (i--) {
	        if (this[i] === obj) {
	            return true;
	        }
	    }
	    return false;
	}

	/*
	 * Initialize the Elements and bind events
	 */
	var init = function(options) {
		container = document.querySelectorAll(container)[0];
		elements = container.children;
		elementCount = elements.length;

		//Apply options
		options = (typeof options !== 'undefined') ? options : {};
		offset = (typeof options.offset !== 'undefined') ? options.offset : (container.offsetWidth - (elements[0].offsetWidth)) / (elementCount-1);
		zOffset = (typeof options.zOffset !== 'undefined') ? options.zOffset : 0;
		slideCallback = (typeof options.slideCallback !== 'undefined') ? options.slideCallback : function(element){};

		initialPosition();
		bind();
	};


	/*
	 * Bind Events
	 */
	var bind = function() {
			for (i=0; i < elementCount; i++) {
				eventListener(elements[i], "click", function(ev) {
					var target = ev.target || ev.srcElement; //IE8 Compatibility
						slideHandler(target);
				});
			}
		};


	/*
	 * Sets the initial positions of all elements and setup positions object.
	 * Also, adjusts the z-index of elements, so they overlap correctly.
	 */
	var initialPosition = function() {
		positions = {'left': [], 'right': []}
		for (i=0; i<elementCount; i++) {
			var self = elements[i];
			var leftOffset;
			if (i != 0) {
				positions.right.push(self);
				var negativeIndex = elementCount - i;
				leftOffset = container.offsetWidth - (negativeIndex * offset);
			} else {
				leftOffset = 0;
				positions.left.push(self);
			}
			self.style.left = parseInt(leftOffset) + "px";
			self.style.zIndex = (10*i) + zOffset;
		}
		positions.right = invertSortOrder(positions.right);
	};


	/*
	 * Decide, which elements to move where
	 */
	var slideHandler = function(element) {
		var _elementsToMove, _origin, _direction, _limit;
		if (positions.left.indexOf(element) != -1) {
			_origin = 'left';
			_direction = 'right';
			_limit = 1;
		} else {
			_origin = 'right';
			_direction = 'left';
			_limit = 0;
		}
		_elementsToMove = positions[_origin].slice(positions[_origin].indexOf(element), positions[_origin].length);
		for (i=_elementsToMove.length-1; i >= 0; i--) {
			if (positions[_origin].length > _limit && !(_direction == 'right' && i == 0)) {
				slideElement(_elementsToMove[i], _direction);
				positions[_direction].push(positions[_origin].pop());
			}
		}
	};


	/*
	 * Slide an element to to the given direction.
	 */
	var slideElement = function(element, direction) {
		var _origin;
		var _leftOffset = positions[direction].length * offset;
		if (direction == 'right') {
			_origin = 'left';
			_leftOffset = container.offsetWidth - _leftOffset - offset;
		} else {
			_origin = 'right';
		}
		element.style.left = parseInt(_leftOffset) + "px";
		slideCallback(element, direction);
	};


	/*
	 * Returns the inverted version of the input array
	 */
	var invertSortOrder = function(array) {
		if (!(array instanceof Array)) {
			return false
		} else {
			var inverted = new Array;
			for (i=array.length-1; i >= 0; i--) {
				inverted.push(array[i]);
			}
			return inverted;
		}
	};

	init(options);
}