/* =====================================================================
   AstrOs Setup Docs — navigation
   Single source of truth for the sidebar. To grow the docs later, just add
   items (or a whole new group) to NAV below — every page picks it up.
   ===================================================================== */
(function () {
  // Ordered list used for the sidebar AND for prev/next footer links.
  const NAV = [
    {
      title: "Setup Guide",
      items: [
        { num: "00", title: "Overview",          file: "index.html" },
        { num: "01", title: "Hardware & Wiring",  file: "hardware.html" },
        { num: "02", title: "Flashing Firmware",  file: "firmware.html" },
        { num: "03", title: "Server Setup",       file: "server.html" },
        { num: "04", title: "Pairing Nodes",      file: "pairing.html" },
      ],
    },
    {
      title: "Using AstrOs",
      soon: true,
      note: "Scripting, playlists & remote — coming soon",
      items: [],
    },
  ];

  const WORDMARK =
    '<span class="wordmark"><span class="wm-big">A</span><span class="wm-sm">str</span>' +
    '<span class="wm-big">O</span><span class="wm-sm">s</span></span>';

  function currentFile() {
    const p = location.pathname.split("/").pop();
    return p && p.length ? p : "index.html";
  }

  function buildSidebar() {
    const here = currentFile();
    let groups = "";
    NAV.forEach((g) => {
      let items = g.items
        .map((it) => {
          const active = it.file === here ? " active" : "";
          return (
            '<a class="sb-item' + active + '" href="' + it.file + '">' +
            '<span class="sb-num">' + it.num + "</span>" +
            "<span>" + it.title + "</span></a>"
          );
        })
        .join("");
      if (g.soon && g.note) items += '<div class="sb-soon">' + g.note + "</div>";
      groups +=
        '<div class="sb-group' + (g.soon ? " is-soon" : "") + '">' +
        '<div class="sb-group-title">' + g.title + "</div>" +
        '<nav class="sb-nav">' + items + "</nav></div>";
    });

    return (
      '<a class="sb-brand" href="index.html">' +
      '<img src="assets/favicon.svg" alt="AstrOs" />' + WORDMARK + "</a>" +
      '<div class="sb-tagline">Setup &amp; Assembly Guide</div>' +
      groups +
      '<div class="sb-foot">Open source astromech OS · GPL-3.0<br/>' +
      '<a href="https://github.com/battlesloth" target="_blank" rel="noopener">github.com/battlesloth</a></div>'
    );
  }

  function buildPrevNext() {
    const flat = [];
    NAV.forEach((g) => g.items.forEach((it) => flat.push(it)));
    const here = currentFile();
    const i = flat.findIndex((it) => it.file === here);
    if (i < 0) return "";
    const prev = flat[i - 1];
    const next = flat[i + 1];
    const prevHtml = prev
      ? '<a class="pf-link prev" href="' + prev.file + '"><div class="pf-dir">← Previous</div>' +
        '<div class="pf-title">' + prev.title + "</div></a>"
      : '<span class="pf-link prev disabled"></span>';
    const nextHtml = next
      ? '<a class="pf-link next" href="' + next.file + '"><div class="pf-dir">Next →</div>' +
        '<div class="pf-title">' + next.title + "</div></a>"
      : '<span class="pf-link next disabled"></span>';
    return prevHtml + nextHtml;
  }

  function wireMobile() {
    const btn = document.querySelector(".menu-btn");
    const scrim = document.querySelector(".nav-scrim");
    if (btn) btn.addEventListener("click", () => document.body.classList.toggle("nav-open"));
    if (scrim) scrim.addEventListener("click", () => document.body.classList.remove("nav-open"));
    document.querySelectorAll(".sb-item").forEach((a) =>
      a.addEventListener("click", () => document.body.classList.remove("nav-open"))
    );
  }

  function wireCopy() {
    document.querySelectorAll(".code-copy").forEach((btn) => {
      btn.addEventListener("click", () => {
        const pre = btn.closest(".code").querySelector("pre");
        const text = pre ? pre.innerText : "";
        navigator.clipboard && navigator.clipboard.writeText(text);
        const old = btn.textContent;
        btn.textContent = "copied ✓";
        setTimeout(() => (btn.textContent = old), 1400);
      });
    });
  }

  document.addEventListener("DOMContentLoaded", () => {
    const sb = document.getElementById("sidebar");
    if (sb) sb.innerHTML = buildSidebar();
    const pn = document.getElementById("page-foot");
    if (pn) pn.innerHTML = buildPrevNext();
    wireMobile();
    wireCopy();
  });
})();
