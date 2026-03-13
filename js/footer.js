document.addEventListener("DOMContentLoaded", () => {
    const isPages = window.location.pathname.includes("/pages/");
    const footerPath = isPages
        ? "../components/footer.html"
        : "components/footer.html";

    fetch(footerPath)
        .then(res => res.text())
        .then(html => {
            document.body.insertAdjacentHTML("beforeend", html);
        })
        .catch(err => console.error("Erro ao carregar footer:", err));
});