(() => {
  const copy = async (value) => {
    try {
      await navigator.clipboard.writeText(value);
      return true;
    } catch {
      return false;
    }
  };

  const copyButtons = Array.from(document.querySelectorAll("[data-copy]"));
  for (const btn of copyButtons) {
    btn.addEventListener("click", async () => {
      const value = btn.getAttribute("data-copy") || "";
      const ok = await copy(value);
      if (!ok) {
        alert(value);
        return;
      }
      const prev = btn.textContent || "";
      btn.textContent = "Copied!";
      window.setTimeout(() => (btn.textContent = prev), 900);
    });
  }

  const buttons = Array.from(document.querySelectorAll("[data-checkout]"));
  for (const btn of buttons) {
    btn.addEventListener("click", async () => {
      const plan = btn.getAttribute("data-checkout") || "plan";
      const cashApp = "$0x074";
      await copy(cashApp);
      alert(
        `Pay ${plan.toUpperCase()} via Cash App to ${cashApp}.\n\nAfter payment: join Discord, open a ticket, and send proof of payment to receive the client + key.\n\nNo refunds.`
      );
    });
  }
})();
