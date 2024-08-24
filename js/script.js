document.addEventListener("DOMContentLoaded", function () {
    const myObservert = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("show");
            } else {
                entry.target.classList.remove("show");
            }
        });
    });

    const elements = document.querySelectorAll(".hidden");

    elements.forEach((element) => myObservert.observe(element));
});

document.addEventListener("DOMContentLoaded", function () {
    let menuIcon = document.querySelector("#menu-icon");
    let navbar = document.querySelector(".navbar");

    menuIcon.onclick = () => {
        menuIcon.classList.toggle("bx-x");
        navbar.classList.toggle("active");
    };
});

document.addEventListener("DOMContentLoaded", function () {
    var fullText = document.getElementById("about-text").innerHTML;
    var truncatedText = fullText.substring(0, 200) + "...";
    var isTruncated = true;
    var btn = document.getElementById("read-more-btn");
    var paragraph = document.getElementById("about-text");

    // Initially show truncated text
    paragraph.innerHTML = truncatedText;

    btn.addEventListener("click", function (event) {
        event.preventDefault();
        if (isTruncated) {
            paragraph.innerHTML = fullText;
            btn.textContent = "Leia Menos";
        } else {
            paragraph.innerHTML = truncatedText;
            btn.textContent = "Leia Mais";
        }
        isTruncated = !isTruncated;
    });
});

document.addEventListener("DOMContentLoaded", function () {
    let minhaMask = document.querySelector(".telefone-mask");
    if (minhaMask) {
        // Aplica a máscara
        $(minhaMask).mask("(00) 00000-0000");

        // Limita o número de caracteres
        minhaMask.addEventListener("input", function () {
            const maxLength = 15; // Incluindo parênteses, espaço e hífen
            if (this.value.length > maxLength) {
                this.value = this.value.slice(0, maxLength);
            }
        });
    } else {
        console.error("Elemento com a classe 'telefone-mask' não foi encontrado.");
    }
});
