# REACT

## Introduction

React is an open-source library created and maintained by Facebook. It is used to create web and native user interfaces.

## JSX

React use a syntax extension of JavaScript called JSX that let users write HTML-like markups inside JavaScript files.
To write JavaScript code within a JSX file the user have to include the JS code within curly braces.
JSX is no valid JavaScript so it must be compiled into JavaScript code by using a transpiler (e.g. Babel).
Nested JSX must return a single element.
The naming convention for all HTML attributes and event references in JSX is camelCase.
It is not possible to define HTML classes in JSX using 'class' because it is a reserved word in JavaScript. Instead, it is possible to use 'className'.
Any JSX element can be written with a self-closing tag, and every element must be closed.

## ReactDOM

ReactDOM is a rendering API used to render JSX code directly to the HTML DOM. It uses a simple method called ReactDOM.render(componentToRender, targetNode). This method must be called after the JSX element declarations (just like how you must declare variables before using them).
When rendering a JSX element, one uses the identifier of that element.
When rendering a React component (no matter if it is a functionnal or class component), one uses the custom HTML tag syntax.

## Components

React components are reusable UI elements made of HTML markups, CSS and JavaScript. Components can be put together to build complex user interface.
Everything in React is a component. There are two ways to create a React component:
    - Use a JavaScript function to create a stateless functional component (a component that can receives and renders data but cannot registers or manages changes to it). A function dedicated to create component return either null or JSX. It also uses pascal case for its identifiers.

    - Use the ES6 syntax 'class' and extend React.Component. Then use the super() keyword inside the constructor() method to initialized the component properly. 

To render a component as a child of a React component, just include the component name as a custom HTML tag in the JSX file.

### Basic Setup of a React class component

* Define a class using the ES6 class declaration then make it extend the React.Component class.
* Define the class constructor method and make it call the Component constructor method using the super() keyword.
* Define the class render method and makes it return either HTML (from JSX) or null.
* Call the ReactDOM.render() method and passed the component as the first argument (using its identifier nested inside HTML tags) and the DOM's target node as the second one.

## Props

Props are properties that can be passed to child components using a custom HTML attribute like this:
    ``` JSX
    <MyComponent name="Jordan">

    ```
Props can be accessed through stateless functional components like this:
    ``` JSX
    const MyComponent = (props) => <p>Hello, my name is {props.name}!</p>;
    ```