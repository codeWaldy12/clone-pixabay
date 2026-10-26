const checkThemeInput = document.querySelector(".checkbox");
const elmntHtml = document.documentElement;

function saveStorage(key, value) {
  localStorage.setItem(key, value);
}

checkThemeInput.addEventListener("change", () => {
  elmntHtml.setAttribute(
    "data-theme",
    checkThemeInput.checked ? "dark" : "light",
  );
  saveStorage("theme", elmntHtml.dataset.theme);
});

function themePreference() {
  const preference = window.matchMedia("(prefers-color-scheme: dark)");
  if (preference.matches) {
    elmntHtml.dataset.theme = "dark";
    checkThemeInput.checked = true;
  } else {
    elmntHtml.dataset.theme = "light";
    checkThemeInput.checked = false;
  }
}

function getTheme(key) {
  const SavedlastTheme = localStorage.getItem(key);
  if (SavedlastTheme !== null) {
    const themeValue = SavedlastTheme;
    elmntHtml.dataset.theme = themeValue;
    checkThemeInput.checked = themeValue === "dark";
  } else {
    themePreference();
  }
}

getTheme("theme");




