## Usage

For a basic modal, create a new Modal object with some content passed in:

````
    var modal = new Modal(dom_el, options)
````

For an image modal:

````
    var modal = new Modal('http://my_image.jpg', options)
````

By default, this will give you a modal that is 50% the width of your browser window and 50% tall with a close button and some very basic styling. You can customize a few handy properties of your modal by passing in an options hash. Available options are:

* **width** *(default: '50%')* — the width of the modal with its unit
* **height** *(default: '50%')* — the height of the modal with its unit
* **customClassName** *(default: undefined)* — an additional class name to place on the modal wrapper
* **screenClickCloses** *(default: false)* — whether or not clicking on the "screen" behind the modal closes the modal
* **contentClickCloses** *(default: false)* — whether or not clicking on the modal content itself closes the modal

## Compatability

Modal was designed to be a vanilla-JS, drop-in anywhere plugin. To accomplish this with ease means supporting the latest browsers. Modal is functional on all modern browsers, IE10+.

Modal depends on **zero** external libraries or plugins.

Having spent a lot of time in CoffeeScript with jQuery, Underscore, and Backbone by my side, I went with a vanilla JS library for the challenge of it. I'm happy with how lean it is.

# What documentation, websites, papers, etc. did you consult in doing this exercise?

Getting a good lightweight dev environment setup was important to me. I spent more time than I should getting a decent gulp environment that also served my code up and running. Code for that borrowed from [here](https://github.com/gulpjs/gulp/tree/master/docs/recipes).

# How might you integrate your library idiomatically into an application built on your framework of choice (Ember, Angular, Backbone, React, etc.)? How would the library interface need to change to support this, if at all?

If this were a Backbone project, I would have simply extended the Backbone.View class and had some of the boilerplate code taken care of for me. It would have made for tighter code (less Modal.prototype.xyz).

# How long did you spend on this exercise? If you had unlimited more time to spend on this, how would you spend it and how would you prioritize each item?

4-5 hours.

If I had unlimited time I would make some enhancements that would improve the experience for end users first, then developers:

* Throw an exception for when a string is passed that isn't an image.
* Throw in a baseline media query to have nicer styles for small screens out of the box.
* Add some 'on' and 'off' classes along with some animation timing for nicer transitions.
* Make better use of the custom class by interpolating additional class names on the elements for the sake of styling.

And for developers, I would make sure this conforms to [UMD](https://github.com/umdjs/umd) for easy importing into one's environment.

# If you were to critique your code, what would you have to say about it?

While my code is knowingly sussinct, it's not unreadable. Some JSdoc-style comments would help us understand what's going on.