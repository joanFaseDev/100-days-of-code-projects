# Flickity Library

## To do

[X] Gather enough artworks for five sliders/carousels.
[] Quote the artworks source: [Concept Art World](https://conceptartworld.com/).
[] Check the [Flickity documentation](https://flickity.metafizzy.co/) for interesting features to display on sliders/carousels.
Features to display:
    [X] Different sizes per cells.
    [X] Different sizes per breakpoints.
    [X] Create the third carousel.
    [X] Emphasize the selected cell through the **.is-selected** class.
    [X] Style the sliders and carousels buttons through the dedicated classes.
    [X]  Do the same for dots below each slider/carousel.
    [X] Test the **adaptiveHeight** option which change the carousel's height to fit the selected slide's one.
    [X] Gives each img a proper alt attribute's value.
    [X] Include the fourth and fifth sliders/carousels.
    [X] Create a navbar with 5 anchors nested inside, each pointing on one of the slider/carousel.
    [X] Test giving the anchor either a number as content or the name of the artist whose work is displayed in the targeted slider/carousel.
    [X] Remove any default style for the anchor and give them a rectangular form, background is black, color is white.
    [X] Work on smooth scrolling and give the navbar a sticky behavior.
    [X] Add a JS script to style the link currently active.
    [X] Make the navbar responsive.
    [X]  Add a footer with your name and year of production.

## Left unsolved

[] The style of the section's link displayed on screen doesn't update if user doesn't scroll through the navbar. A solution would be to implement a script listening to the scroll event and retrieving the scrollTop value then dividing this value by the height of a section to know at every moment where the user is on the page and what link to style.