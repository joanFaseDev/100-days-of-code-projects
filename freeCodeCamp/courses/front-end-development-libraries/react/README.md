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

### Write JavaScript directly in JSX

In the render() method of a component, just before the return statement, one can write JavaScript directly without using curly brackets. Variables and functions created there can then be used in the return statement (where curly brackets are required for JavaScript).

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

### Using 'this' with React component's methods

For a class's method to be able to access properties of a class, one can use the 'this' keyword. To bound 'this' to the class methods,'this' needs to be binded within the class constructor method.
    ```
    class MyComponent extends React.Component {
        constructor(props) {
            super(props);
            this.handleClick = this.handleClick.bind(this);
        }

        handleClick() {
            this.setState({
                status: "Active",
            });
        }

        render() {
            return (
                <MyComponentChildren />
            );
        }
    }
    ```

## Props

Props are properties that can be passed to child components using a custom HTML attribute like this:
    ``` JSX
    <MyComponent name="Jordan" />

    ```
Props can be accessed through stateless functional components like this:
    ``` JSX
    const MyComponent = (props) => <p>Hello, my name is {props.name}!</p>;
    ```
To pass an array to a JSX element, it must be treated as JavaScript and wrapped into curly brackets like so:
    ``` JSX
     <MyComponent arr={["Kaz Brekker", "Inej Ghafa"]} />   
    ```

To access props through ES6 class component, use the 'this' keyword:
    ```
    class MyComponent extends React.Component {
        constructor(props) {
            super(props);
        }

        greeting() {
            return (
                <p>Hi! I'm {this.props.name}</p>
            );
        }
    }

    MyComponent.defaultProps = {
        name: "Jordan",
    };
    ```

### Default Props

It is possible to assign a component default props using the built-in property defaultProps of the component like this:
    ``` JSX
    const myComponent = (props) => {
        return (
            <h1>Hello World! My name is {props.name}</h1>
        );
    };

    myComponent.defaultProps = {
        name: "Jordan",
    };
    ```

### Define specific type for props

It is possible to require a prop to be a certain type using the propTypes built-in property like this:
    ``` JSX
    const User = (props) => {
        return (
            <DisplayUser/>
        );
    };
    User.defaultProps = {
        firstName: "Unknown",
        lastName: "Unknown;
    };
    User.propTypes = { firstName: PropTypes.string.isRequired };
    User.propTypes = { lastName: PropTypes.string.isRequired };
    ```

## State

State consists of any data the user's application needs to know about, that can change over time.
State can be created inside a React component (that is to say created with ES6 class) by declaring a state property inside its constructor. The property must be initialized with a JavaScript object.
    ``` JSX
    class Character extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                firstName: "Jordan",
            };
        }
    }
    ```

State are very important in React because they allows the user to track important data in its app and render a UI in response to changes in this data. When state data updates, React uses a virtual DOM to register the changes and trigger a re-render of the components using that data, including all child components receiving that data. This means users don't have to worry about changing the DOM.

Components aren't aware of other components being stateful or stateless. Each component's state is encapsulated and local to this component.

### Correct way to update State

React provides a method to update a component's state property : setState().
setState can be called within a component class like this:
    ``` JSX
    class myComponent extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                firstName: "Jordan",
                lastName: "Falaise",
            }
        }

        changeFirstName(name) {
            this.setState({
                firstName: name,
            });
        }
    }
    ```

State should never be modified directly. Instead, the setState() method should be privileged.

## Lifecycle methods

React components have special methods that provide opportunities to perform actions at specific points in the lifecycle of a component.

**componentWillMount()**: Is called before the render() method when a component is mounted to the DOM.
**componentDidMount()**: Is called after a component is mounted to the DOM. Any call of setState in this method will trigger a re-rendering of the component.
**shouldComponentUpdate()**: The method takes nextProps & nextState as parameters and returns a boolean value that tells React if the component should be update or not (by default, any component receiving new state or new props is re-rendered).

## Using Inline Styles

Because of the way JSX is transpiled, one cannot set the value of the style attribute to a string. Instead, in React, one set it to an object like this:

    ```
    <MyComponent style={{color: "green", backgroundColor: "red"}}/>
    ```
Also, React doesn't accept kebab-case in the style object because hyphenated word like 'font-size' are invalid syntax for JavaScript object properties. As a rule, any hyphenated style properties are written using camelCase in JSX.

## Terminology

**Stateless functional component**: Function that act like pure function (for predefined intpus, output will always be the same), accepts props and returns JSX.
**Stateless component**: Class that extends React.Component but does not use internal state.
**Statefull component**: Class that extends React.Component but maintains its own internal state. Is usually referred as 'component' or 'React component'. 
**Internal State**: ?
**Unidirectional data flow**: State flows in one direction down the tree of the application's components, from the stateful parent component to child components. The child components only receive the state data they need.