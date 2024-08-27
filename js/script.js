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


class FormSubmit {
    constructor(settings) {
        this.settings = settings;
        this.form = document.querySelector(settings.form);
        this.formButton = document.querySelector(settings.button);
        if (this.form) {
            this.url = this.form.getAttribute("action");
        }
        this.sendForm = this.sendForm.bind(this);
    }

    createToast(message, type) {
        const toast = document.createElement("div");
        toast.classList.add("toast", type);

        // Cria o conteúdo do toast com a mensagem e o botão de fechar
        toast.innerHTML = `
        <span>${message}</span>
        <button class="toast-close">&times;</button>
    `;

        document.body.appendChild(toast);

        // Exibe o toast
        setTimeout(() => {
            toast.classList.add("visible");
        }, 100);

        // Fecha o toast após 5 segundos ou ao clicar no "x"
        const removeToast = () => {
            toast.classList.remove("visible");
            setTimeout(() => {
                document.body.removeChild(toast);
            }, 500);
        };

        // Adiciona o evento de clique ao botão de fechar
        toast.querySelector(".toast-close").addEventListener("click", removeToast);

        // Remove automaticamente após 5 segundos
        setTimeout(removeToast, 5000);
    }

    displaySuccess() {
        this.createToast("Mensagem enviada com sucesso!", "success");
    }

    displayError() {
        this.createToast("Erro ao enviar a mensagem.", "error");
    }

    getFormObject() {
        const formObject = {};
        const fields = this.form.querySelectorAll("[name]");
        fields.forEach((field) => {
            formObject[field.getAttribute("name")] = field.value;
        });
        return formObject;
    }

    onSubmission(event) {
        event.preventDefault();
        event.target.disabled = true;
        event.target.innerText = "Enviando...";
    }

    async sendForm(event) {
        try {
            this.onSubmission(event);
            await fetch(this.url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
                body: JSON.stringify(this.getFormObject()),
            });
            this.displaySuccess();
        } catch (error) {
            this.displayError();
            throw new Error(error);
        } finally {
            event.target.disabled = false;
            event.target.innerText = "Enviar";
        }
    }

    init() {
        if (this.form) this.formButton.addEventListener("click", this.sendForm);
        return this;
    }
}

const formSubmit = new FormSubmit({
    form: "[data-form]",
    button: "[data-button]",
    success: "<h1 class='success'>Mensagem enviada!</h1>",
    error: "<h1 class='error'>Não foi possível enviar sua mensagem.</h1>",
});
formSubmit.init();