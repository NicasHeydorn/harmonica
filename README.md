# Harmonica

##The slim overlap gallery module.

### Info

Harmonica is a javascript module used for creating accordeon-like galleries, with elements overlapping each other. It's lean, fast and written in vanilla JS, so it has no dependencies.
**Please note that this is still WIP. If you have a bug report or a feature request, feel free to contact me**

### How to include

Just include the **harmonica.js** file in your page's head, like so:

`<script src="harmonica.js"></script`

Then, create a new instance of Harmonica, providing a classname as an argument in any javascript file included in your page:

```javascript
var harmonica = new Harmonica('harmonica');
```

You can pass an object containing options as a second argument. The options are as following:


| option        | effect           |
| ------------- |-------------|
| offset      | The distance between stacked elements.
*Default: The remaining space in the container is divided equally between the collapsed elements.* |
| zOffset      | A value that is added to the zIndex of the elements. The elements' z-index increases by 10 per element. 
*Default: 0* |
| slideCallback | A function to call when an element has been slided. The element itself and the direction ('left' / 'right') are passed in as arguments.
*Default: None*      |

### Demo

To see Harmonica in action, see the demo project in the /demo directory.

### Feedback

<<<<<<< HEAD
If you have suggestions, feel free to contact me.
=======
If you have suggestions, feel free to contact me.
>>>>>>> Initial commit
