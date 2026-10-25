document.addEventListener('DOMContentLoaded', () => {
    let snow2 = 0x0;
    const glitchChars = ['#', '�'];
    function snowflake() {
        if (snow2 < 0xa) {
            const snow = document.createElement("div");
            snow.innerHTML = glitchChars[Math.floor(Math.random() * glitchChars.length)];
            snow.classList.add('snowflake');
            snow.style.position = 'fixed';
            snow.style.top = "-10px";
            snow.style.left = Math.random() * 0x64 + 'vw';
            snow.style.color = "#fff";
            snow.style.fontSize = Math.random() * 5 + 0xa + 'px';
            snow.style.zIndex = "9999";
            snow.style.pointerEvents = "none";
            document.body.appendChild(snow);
            const mathrnd = Math.random() * 0x2710 + 0x1388;
            snow.animate([{
                'transform': "translateY(-10px) rotateZ(" + Math.random() * 0x168 + 'deg)'
            }, {
                'transform': "translateY(100vh) rotateZ(" + Math.random() * 0x2d0 + "deg)"
            }], {
                'duration': mathrnd,
                'iterations': Infinity
            });
            snow.addEventListener('animationiteration', () => {
                snow.style.left = Math.random() * 0x64 + 'vw';
            });
            snow.addEventListener("animationend", () => {
                snow.remove();
                snow2--;
            });
            snow2++;
        }
    }
    setInterval(snowflake, 0x1f4);
});