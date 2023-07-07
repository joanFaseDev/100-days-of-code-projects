const example = document.getElementById("example");

function List() {
    const componentFeatures = [
        {
            title: "Components are the basic building blocs of React.",
            id: 1,
        },
        {
            title: "Components are used to build self-contained and reusable snippets of code.",
            id: 2,
        },
        {
            title: "Components can be grouped to build complex UI.",
            id: 3,
        },
    ];

    return (
        <ul>
            {componentFeatures.map(feature => {
                return <li key={feature.id}>{feature.title}</li>
            })}
        </ul>
    );
}

ReactDOM.render(<List />, example);