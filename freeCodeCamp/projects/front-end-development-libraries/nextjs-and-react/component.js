/**
 * Updating UI using imperative programming
 */

// const example = document.getElementById("example");
// const header = document.createElement("h1");
// const headerContent = document.createTextNode("Linux is awesome! " + String.fromCodePoint(128039));
// header.appendChild(headerContent);
// example.appendChild(header);

/**
 * Updating UI using declarative programming
 */

// const example = document.getElementById("example");
// ReactDOM.render(<h1>Linux is awesome! {String.fromCodePoint(128039)}</h1>, example);

/**
 * Components are functions.
 * Components return UI elements.
 * Components should be capitalized to distinguish them from plain HTML and JavaScript.
 * Components are used with angle brackets, the same way one uses HTML tags.
 * Components can be nested inside each other (like HTML elements).
 */

const example = document.getElementById("example");

function Header() {
    return (<h1>Linux is awesome! {String.fromCodePoint(128039)}</h1>);
}

function Article() {
    return (
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. In possimus error ipsa. Corrupti nostrum nemo nobis quia, fugit ipsa animi vitae aut ullam consequatur rem delectus in reiciendis, accusamus neque.</p>
    );
}

function Section() {
    return (
        <div>
            <Article/>
            <Article/>
            <Article/>
        </div>
    );
}

// Top-level component
function HomePage() {
    return (
        <div>
            <Header />
            <Section />
        </div>
    );
}

ReactDOM.render(<HomePage />, example);
