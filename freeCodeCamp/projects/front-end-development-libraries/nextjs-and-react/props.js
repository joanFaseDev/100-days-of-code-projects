/**
 * HTML elements have attributes used to passe pieces of information that change the behavior of theses elements.
 * The same principle apply to Components that can receive pieces of information as properties called 'props'. Props are custom arguments that can be passed to Component to change their behavior and what will be shown on screen when they are rendered.
 */

const example = document.getElementById("example");
const name = `React ${String.fromCodePoint(128303)}`;

/**
 * props is an object so it is possible to use object destructuring here to explicitety name the values of props inside the function parameters.
 */
function Title({name: title}) {
    return (
        // Use curly braces to add JavaScript code within JSX
        <h1>{(title) ? title : "Subject is not known yet!"}</h1>
    );
}

function List() {
    /**
     * In React, each array item needs a key (string or number). It is used to match array item and component even when the array's order is changed.
     */
    const propFeatures = [
        ["Props are custom attributes that can be passed to Components to modify their behavior.", 1],
        ["Props are passed to Components using a syntax similar to HTML attributes.", 2],
        ["Props are objects so it is possible to use ES6 destructuring assignment on them.", 3]
    ];

    return (
        <ul>
            {propFeatures.map((feature) => {
                return <li key={feature[1]}>{feature[0]}</li>
            })}
        </ul>
    );
}

function Header() {
    return (
        <div>
            <Title name="Introduction to React's props."/>
            <Title />
            <List />
        </div>
    );
}

ReactDOM.render(<Header />, example);