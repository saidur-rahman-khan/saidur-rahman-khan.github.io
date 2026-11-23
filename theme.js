const root = document.documentElement;
const themeKey = "srk-color-theme";
const systemTheme = window.matchMedia("(prefers-color-scheme: dark)");
let preferredTheme;
try {
  preferredTheme = localStorage.getItem(themeKey);
} catch {
  // The theme remains usable if storage is disabled.
}

function updateTheme() {
  const dark = preferredTheme === "dark" || (!preferredTheme && systemTheme.matches);
  root.dataset.theme = dark ? "dark" : "light";
  const button = document.getElementById("theme-toggle");
  if (button) {
    const label = dark ? "Switch to light mode" : "Switch to dark mode";
    button.setAttribute("aria-label", label);
    button.title = label;
    button.firstElementChild.textContent = dark ? "☀" : "☾";
    button.hidden = false;
  }
}

updateTheme();
systemTheme.addEventListener("change", updateTheme);
document.addEventListener("DOMContentLoaded", () => {
  const button = document.getElementById("theme-toggle");
  updateTheme();
  button.addEventListener("click", () => {
    preferredTheme = root.dataset.theme === "dark" ? "light" : "dark";
    try {
      localStorage.setItem(themeKey, preferredTheme);
    } catch {
      // Apply the selection for the current page without storage.
    }
    updateTheme();
  });
});
