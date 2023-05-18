# Images Carousel - Prototypes

## Goal

This 'project' is a set of demos i built to familiarize myself with some CSS properties like:
    - [display](https://developer.mozilla.org/en-US/docs/Web/CSS/display)
    - [position](https://developer.mozilla.org/en-US/docs/Web/CSS/position?v=example)
    - [animation](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Animations/Using_CSS_animations#examples)
I intend to use these trials & errors to help me build CSS focused projects for the 100 days of code challenge, the first one being an images carousel.
I'm also gonna test here JavaScript libraries displaying good synergies with CSS before adding them in projects.
I will build this serie with a slow but steady pace, coming back every time i want to test CSS centered ideas.

## Plan

[X]  Create a demo based on the same layout as the first one but this time displaying images.
[]  Use the [rolly.js](https://mickaelchanrion.github.io/rolly/) library to create a smooth scrolling from demo 1 to 2.
[X]  Instead of using **position:absolute** to hide the images, try to use **opacity** which is a property that can actually be used with **transition**.
[X]  Create a nice transition between displayed image and non displayed ones.
<!-- [] Add a link to: <a target="_blank" href="https://icons8.com/icon/9901/circled-3">Circled 3</a> icon by <a target="_blank" href="https://icons8.com">Icons8</a> -->

## Diary

**18/05/2023**
    - Created a nav bar for the application with a simple layout: five anchors, one icon for each, scrolling to its designated demo below the page.
    - Implementing smooth scrolling when navigating through the navbar & resolve an issue relative to the way the **scroll-behavior** property works. 

## References

- [Animating the display property?](https://css-tricks.com/so-youd-like-to-animate-the-display-property/)
- [CSS transition with visibility not working](https://stackoverflow.com/questions/27900053/css-transition-with-visibility-not-working)
- [Scroll behavior smooth not working at all - Stack Overflow](https://stackoverflow.com/questions/62098093/scroll-behaviour-smooth-not-working-at-all)
- [scroll-behavior - CSS Tricks](https://css-tricks.com/almanac/properties/s/scroll-behavior/)
- [jquery API](https://jquery.com/)
- [slick API](https://kenwheeler.github.io/slick/)