const example = document.getElementById("example");
const header = document.createElement("h1");
const headerContent = document.createTextNode("Linux is awesome! " + String.fromCodePoint(128039));
header.appendChild(headerContent);
example.appendChild(header);
