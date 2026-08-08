const glitchContainer = document.createElement("div");
glitchContainer.className = "glitch-container";
document.body.appendChild(glitchContainer);

function createGlitch() {
    const glitch = document.createElement("div");

    const width = Math.random() * 35 + 5;
    const height = Math.random() < 0.85
        ? Math.random() * 2 + 1
        : Math.random() * 8 + 2;

    glitch.className = "glitch-line";

    glitch.style.top = `${Math.random() * 100}vh`;
    glitch.style.left = `${Math.random() * 100}vw`;
    glitch.style.width = `${width}px`;
    glitch.style.height = `${height}px`;

    glitch.style.background =
        Math.random() < 0.25 ? "#ff0000" : "#ffffff";

    glitch.style.opacity = `${Math.random() * 0.5 + 0.2}`;

    glitch.style.transform =
        `translateX(${(Math.random() - 0.5) * 40}px)`;

    glitchContainer.appendChild(glitch);

    setTimeout(() => {
        glitch.remove();
    }, Math.random() * 150 + 50);
}

function createGlitchBurst() {
    const amount = Math.floor(Math.random() * 5) + 2;

    for (let i = 0; i < amount; i++) {
        setTimeout(createGlitch, Math.random() * 100);
    }
}

setInterval(() => {
    if (Math.random() < 0.45) {
        createGlitch();
    }
}, 80);

setInterval(() => {
    if (Math.random() < 0.15) {
        createGlitchBurst();
    }
}, 50);