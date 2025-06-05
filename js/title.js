const titles = [
    'killsec.lol',
    'ambition',
    'syvora',
    'gorestars',
];
let currentTitleIndex = 0;

function changeTitle() {
    document.title = titles[currentTitleIndex];
    currentTitleIndex = (currentTitleIndex + 1) % titles.length;
}

setInterval(changeTitle, 300);
