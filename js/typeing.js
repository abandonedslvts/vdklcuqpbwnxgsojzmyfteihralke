const textElement = document.getElementById("typing-text");
const texts = ["privatesource", "#########", "Its Nothing...", "There Are Federal Agents Outside My House"];
let textIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeText() {
    const currentText = texts[textIndex];
    if (isDeleting) {
        textElement.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
    } else {
        textElement.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
    }

    if (!isDeleting && charIndex === currentText.length) {
        isDeleting = true;
        setTimeout(typeText, 6000);
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % texts.length;
        setTimeout(typeText, 1000);
    } else {
        setTimeout(typeText, 200);
    }
}

document.addEventListener("DOMContentLoaded", typeText);