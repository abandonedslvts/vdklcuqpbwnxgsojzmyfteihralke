(() => {
  const prefersReducedMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;

  const year = document.querySelector("[data-year]");
  if (year) year.textContent = String(new Date().getFullYear());

  const header = document.querySelector(".site-header");
  const headerInner = header?.querySelector?.(".header-inner");
  const setHeaderHeight = () => {
    if (!header) return;
    const h = (headerInner && headerInner instanceof HTMLElement ? headerInner.offsetHeight : header.offsetHeight) || 76;
    document.documentElement.style.setProperty("--header-h", `${h}px`);
  };
  window.addEventListener("resize", setHeaderHeight, { passive: true });
  setHeaderHeight();

  const onScroll = () => {
    if (!header) return;
    const elevated = window.scrollY > 6;
    header.classList.toggle("is-elevated", elevated);
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  const menuBtn = document.querySelector("[data-menu]");
  const mobile = document.querySelector("[data-mobile]");
  const setMobile = (open) => {
    if (!menuBtn || !mobile) return;
    mobile.hidden = !open;
    menuBtn.setAttribute("aria-expanded", open ? "true" : "false");
    document.body.style.overflow = open ? "hidden" : "";
  };

  if (menuBtn && mobile) {
    setMobile(false);
    menuBtn.addEventListener("click", () => setMobile(mobile.hidden));
    mobile.addEventListener("click", (e) => {
      const target = e.target;
      if (target instanceof HTMLAnchorElement) setMobile(false);
    });
    window.addEventListener("keydown", (e) => {
      if (e.key === "Escape") setMobile(false);
    });
  }

  const isSamePageAnchor = (href) => href?.startsWith?.("#") && href.length > 1;
  document.addEventListener("click", (e) => {
    const target = e.target;
    if (!(target instanceof HTMLAnchorElement)) return;
    const href = target.getAttribute("href") || "";
    if (!isSamePageAnchor(href)) return;
    const el = document.querySelector(href);
    if (!el) return;
    e.preventDefault();
    el.scrollIntoView({ behavior: prefersReducedMotion ? "auto" : "smooth", block: "start" });
    history.pushState(null, "", href);
  });

  const revealEls = Array.from(document.querySelectorAll("[data-reveal]"));
  if (revealEls.length && "IntersectionObserver" in window && !prefersReducedMotion) {
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-in");
            io.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.12 }
    );
    revealEls.forEach((el) => io.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add("is-in"));
  }

  const ensureIndicator = (nav) => {
    let indicator = nav.querySelector(".nav-indicator");
    if (!indicator) {
      indicator = document.createElement("span");
      indicator.className = "nav-indicator";
      indicator.setAttribute("aria-hidden", "true");
      nav.prepend(indicator);
    }
    return indicator;
  };

  const moveIndicatorTo = (link) => {
    const nav = link.closest(".nav");
    if (!nav) return;
    const indicator = ensureIndicator(nav);

    if (!nav.getClientRects().length || !link.getClientRects().length) {
      nav.classList.remove("has-indicator");
      indicator.style.width = "0px";
      return;
    }

    const navRect = nav.getBoundingClientRect();
    const linkRect = link.getBoundingClientRect();
    const x = Math.max(0, linkRect.left - navRect.left);
    const w = Math.max(24, linkRect.width);
    nav.style.setProperty("--ix", `${x}px`);
    nav.style.setProperty("--iw", `${w}px`);
    nav.classList.add("has-indicator");
  };

  const navs = Array.from(document.querySelectorAll(".nav"));
  for (const nav of navs) {
    const links = Array.from(nav.querySelectorAll(".nav-link"));
    if (!links.length) continue;
    ensureIndicator(nav);

    const active = nav.querySelector(".nav-link.is-active") || links[0];
    if (active) requestAnimationFrame(() => moveIndicatorTo(active));

    nav.addEventListener("click", (e) => {
      const target = e.target;
      if (!(target instanceof HTMLAnchorElement)) return;
      if (!target.classList.contains("nav-link")) return;
      for (const a of links) a.classList.remove("is-active");
      target.classList.add("is-active");
      moveIndicatorTo(target);
    });
  }

  window.addEventListener(
    "resize",
    () => {
      for (const nav of navs) {
        const active = nav.querySelector(".nav-link.is-active");
        if (active) moveIndicatorTo(active);
      }
    },
    { passive: true }
  );

  const navLinks = Array.from(document.querySelectorAll(".nav-link")).filter((a) =>
    isSamePageAnchor(a.getAttribute("href") || "")
  );
  const sections = navLinks.map((a) => document.querySelector(a.getAttribute("href") || "")).filter(Boolean);

  if (navLinks.length && sections.length && "IntersectionObserver" in window) {
    const linkById = new Map(navLinks.map((a) => [a.getAttribute("href")?.slice(1), a]));

    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => (b.intersectionRatio || 0) - (a.intersectionRatio || 0))[0];
        if (!visible) return;
        const id = visible.target.id;
        for (const a of navLinks) a.classList.remove("is-active");
        const link = linkById.get(id);
        if (link) {
          link.classList.add("is-active");
          moveIndicatorTo(link);
        }
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: [0.1, 0.25, 0.5] }
    );

    for (const s of sections) io.observe(s);
  }
})();
