# Sliders

## What i learn

- For the property **object-fit** to work, the **img** element (or any replaced element object-fit is used on) **must have a width and height set**! 
Basically, the **object-fit** property only affects the way the image is displayed **inside** the img boundaries. If no boundaries are defined then **object-fit** is useless.
From what i gathered, when a replaced element is rendered on screen, the browser will first **create a bounding box whose dimensions are the same as the element rendered** (that's why it's necessary to define width and size of the replaced element). Then the browser **fit the replaced element** inside the box. By default, the replaced element will try to match the box's width and height but **by using the object-fit property** one can constraint the replaced element to stretch/squeeze/scale a certain way to its box container.

- **overflow-x** and **overflow-y** properties are useful to define what happens when a content's size exceeds its container. One can create a basic slider just by adding them then creating nice sliding effect through the **scroll-snap-align / scroll-snap-type** and **scroll-behavior** properties.

- **scroll-padding** and **scroll-margin** can be used to prevent part of scrolled elements to be obscured by, for example, a navbar with sticky position.

- The **scrollend** event is not viable currently. Only Firefox supports it at the moment.

- Getting the image actually displayed by the slider can be tricky as all images are considered visible by the browser. One way of doing it is getting the **slider's width** and its **scroll position** through the **offsetWidth** and **leftScroll** properties. Dividing the current scroll position by the length of the slider and rounding the result to the nearest integer gives the index of the current displayed image.

- When using **--webkit--** to style a scrollbar:
    
    * the **::--webkit-scrollbar** pseudo-element indicate that the scrollbar will use a custom style. Webkit will turn off the default styling and use the information provided by CSS.

## Ressources

- [object-fit not affecting images](https://stackoverflow.com/questions/34247337/object-fit-not-affecting-images)
- [object-fit | MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/object-fit)
- [scroll-behavior](https://developer.mozilla.org/en-US/docs/Web/CSS/scroll-behavior)
- [scroll-snap-align](https://developer.mozilla.org/en-US/docs/Web/CSS/scroll-snap-align)
- [scroll-snap-type](https://developer.mozilla.org/en-US/docs/Web/CSS/scroll-snap-type)
- [Concept Art World](https://conceptartworld.com/category/news/#google_vignette)