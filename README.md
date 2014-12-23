# Modal Problem *Solutionized*

First off, I'm sorry I called the main class it creates Modal and the primary files it generates named `overlay.*`. That was poor planning.

## Usage

For a basic modal, create a new Modal object with some content passed in:

````
    var modal = new Modal(dom_el, options)
````

By default, this will give you a modal that is 50% the width of your browser window and 50% tall with a close button and some very basic styling. You can customize a few handy properties of your modal by passing in an options hash. Available options are:

* **width** *(default: '50%')* — the width of the modal with its unit
* **height** *(default: '50%')* — the height of the modal with its unit
* **customClassName** *(default: undefined)* — an additional class name to place on the modal wrapper
* **screenClickCloses** *(default: false)* — whether or not clicking on the "screen" behind the modal closes the modal
* **contentClickCloses** *(default: false)* — whether or not clicking on the modal content itself closes the modal

What browsers is your library compatible with? Why?
What documentation, websites, papers, etc. did you consult in doing this exercise?
What third-party libraries or other tools does your library use?
How might you integrate your library idiomatically into an application built on your framework of choice (Ember, Angular, Backbone, React, etc.)? How would the library interface need to change to support this, if at all?
How long did you spend on this exercise? If you had unlimited more time to spend on this, how would you spend it and how would you prioritize each item?
If you were to critique your code, what would you have to say about it?