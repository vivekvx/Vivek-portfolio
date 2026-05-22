const root = document.documentElement;
const storedTheme = localStorage.getItem("portfolio-theme");

if (storedTheme === "light") {
  root.classList.add("light");
}

document.getElementById("theme-toggle").addEventListener("click", () => {
  root.classList.toggle("light");
  localStorage.setItem(
    "portfolio-theme",
    root.classList.contains("light") ? "light" : "dark",
  );
});

document.querySelectorAll(".project-head").forEach((button) => {
  button.addEventListener("click", () => {
    const card = button.closest(".project-card");
    const isOpen = card.classList.toggle("open");
    button.setAttribute("aria-expanded", String(isOpen));
  });
});
