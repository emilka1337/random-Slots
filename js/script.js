let VARIANTS = [];

let random = (min, max) => Math.floor(Math.random() * (min, max) + min);

function saveVariants() {
    sessionStorage.setItem("variants", JSON.stringify(VARIANTS));
}

function loadVariants() {
    if (sessionStorage.getItem("variants")) {
        VARIANTS = JSON.parse(sessionStorage.getItem("variants"));
        fillVariants();
    }
}

function fillVariants() {
    document.querySelector('.variants-container > main').innerHTML = null;

    VARIANTS.forEach((variant, index) => {
        let button = document.createElement("button");
        button.className = "variant btn btn-outline-light";
        button.innerHTML = `<span>${variant}</span><span><svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" class="bi bi-x" viewBox="0 0 16 16"><path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" /></svg></span>`;

        button.addEventListener("click", function () {
            VARIANTS.splice(index, 1);
            fillVariants();
        });

        document.querySelector('.variants-container > main').append(button);
    });

    saveVariants();
}

document.querySelector('.clear-variants').addEventListener("click", function() {
    VARIANTS = [];
    fillVariants();
});

document.querySelector('.add-variant').addEventListener("click", function () {
    let variant = prompt("Please, enter your variant:");
    VARIANTS.push(variant);
    fillVariants()
});

document.querySelector('.slot').addEventListener("click", function () {
    document.querySelector('.slot').classList.remove("animated");

    if (VARIANTS.length > 1) {
        for (let i = 0; i < 20; i++) {
            setTimeout(function () {
                document.querySelector('.slot > h1').innerHTML = VARIANTS[random(0, VARIANTS.length)];
            }, i * 100);

            setTimeout(function() {
                document.querySelector('.slot').classList.add("animated");
            }, 100 * 20);
        }
    } else {
        alert("Please, enter at least 2 variants");
    }
});

loadVariants();