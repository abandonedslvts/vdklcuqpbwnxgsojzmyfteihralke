(() => {
  const copyButtons = Array.from(document.querySelectorAll("[data-copy]"));
  for (const btn of copyButtons) {
    btn.addEventListener("click", async () => {
      const value = btn.getAttribute("data-copy") || "";
      try {
        await navigator.clipboard.writeText(value);
        const prev = btn.textContent || "";
        btn.textContent = "Copied!";
        window.setTimeout(() => {
          btn.textContent = prev;
        }, 900);
      } catch {
        alert(value);
      }
    });
  }

  const dl = document.querySelector("[data-download]");
  if (dl) {
    dl.addEventListener("click", (e) => {
      e.preventDefault();
      alert("Add your loader file into /downloads and update this link.");
    });
  }
})();
