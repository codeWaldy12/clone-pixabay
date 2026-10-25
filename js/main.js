const checkThemeInput = document.querySelector(".checkbox");
const elmntHtml = document.documentElement;

if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
  checkThemeInput.checked = true;
}

checkThemeInput.addEventListener("change", () => {
  elmntHtml.setAttribute(
    "data-theme",
    checkThemeInput.checked ? "dark" : "light",
  );
});
