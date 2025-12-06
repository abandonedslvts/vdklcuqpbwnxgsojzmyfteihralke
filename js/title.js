const baseWord = 'privatesource';
const glitchChars = ['#', '�'];

function getGlitchedFrame() {
    const frameChars = ['�', '#', '�'];

    const glitchCount = Math.floor(Math.random() * 2) + 1;
    const indices = new Set();
    while (indices.size < glitchCount) {
        indices.add(Math.floor(Math.random() * frameChars.length));
    }

    for (let i of indices) {
        frameChars[i] = glitchChars[Math.floor(Math.random() * glitchChars.length)];
    }

    return frameChars.join('');
}

function getGlitchedTitle() {
    let chars = baseWord.split('');

    const glitchCount = Math.floor(Math.random() * 3) + 1;
    const indices = new Set();

    while (indices.size < glitchCount) {
        indices.add(Math.floor(Math.random() * chars.length));
    }

    for (let i of indices) {
        chars[i] = glitchChars[Math.floor(Math.random() * glitchChars.length)];
    }

    const frame = getGlitchedFrame();

    return `${frame} ${chars.join('')} ${frame}`;
}

function changeTitle() {
    document.title = getGlitchedTitle();
}

setInterval(changeTitle, 300);
