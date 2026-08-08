const logo = document.getElementById("logo-text");

const text = "boytoy.wtf";

let index = 0;
let deleting = false;

function typeWriter() {
    if (!deleting) {
        logo.textContent = text.substring(0, index);
        index++;

        if (index > text.length) {
            deleting = true;

            setTimeout(typeWriter, 1500);
            return;
        }

        setTimeout(typeWriter, 120);
    } else {
        logo.textContent = text.substring(0, index);
        index--;

        if (index < 0) {
            index = 0;
            deleting = false;

            setTimeout(typeWriter, 2000);
            return;
        }

        setTimeout(typeWriter, 70);
    }
}

typeWriter();