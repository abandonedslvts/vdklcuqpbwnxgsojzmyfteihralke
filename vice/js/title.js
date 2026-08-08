const titles = [
    'boytoy.wtf',
    'ambition',
    '/stellar',
    'sorrow',
];

const TYPING_SPEED_MS = 120;
const DELETING_SPEED_MS = 60;
const HOLD_FULL_MS = 1000;
const HOLD_EMPTY_MS = 250;

let currentTitleIndex = 0;
let charIndex = 0;
let isDeleting = false;

function tick() {
    const fullText = titles[currentTitleIndex];

    if (!isDeleting) {
        charIndex = Math.min(charIndex + 1, fullText.length);
        document.title = fullText.slice(0, charIndex);

        if (charIndex === fullText.length) {
            isDeleting = true;
            setTimeout(tick, HOLD_FULL_MS);
            return;
        }

        setTimeout(tick, TYPING_SPEED_MS);
        return;
    }

    charIndex = Math.max(charIndex - 1, 0);
    document.title = fullText.slice(0, charIndex);

    if (charIndex === 0) {
        isDeleting = false;
        currentTitleIndex = (currentTitleIndex + 1) % titles.length;
        setTimeout(tick, HOLD_EMPTY_MS);
        return;
    }

    setTimeout(tick, DELETING_SPEED_MS);
}

tick();
