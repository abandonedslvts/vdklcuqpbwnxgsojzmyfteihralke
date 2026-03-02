function createStars() {
    const starsContainer = document.querySelector('.stars');
    const starCount = 130;

    for (let i = 0; i < starCount; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        star.style.left = `${Math.random() * 100}%`;
        star.style.top = `${Math.random() * 180}%`;
        star.style.animationDelay = `${Math.random() * 2.5}s`;
        star.style.animationDuration = `${14 + Math.random() * 22}s`;
        star.style.opacity = (Math.random() * 0.6 + 0.2).toString();
        starsContainer.appendChild(star);
    }
}

document.addEventListener('dragstart', (event) => {
    if (event.target.tagName === 'IMG') {
        event.preventDefault();
    }
});

createStars();