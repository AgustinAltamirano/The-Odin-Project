const container = document.querySelector('#container');

const mainParagraph = document.createElement("p");
mainParagraph.textContent = "Hey I'm red";
mainParagraph.style.color = "red";

const subtitle = document.createElement("h3");
subtitle.textContent = "I'm a blue h3!";
subtitle.style.color = "blue";

const content = document.createElement("div");
content.style.border = "3px solid black";
content.style.backgroundColor = "pink";

const innerTitle = document.createElement("h1");
innerTitle.textContent = "I'm in a div"

const secondaryParagraph = document.createElement("p");
secondaryParagraph.textContent = "ME TOO!";

content.appendChild(innerTitle);
content.appendChild(secondaryParagraph);

container.appendChild(mainParagraph);
container.appendChild(subtitle);
container.appendChild(content);