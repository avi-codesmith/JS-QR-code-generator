"use strict";

const input = document.querySelector("input");
const label = document.querySelector("label");
const img = document.querySelector("img");
const btn = document.querySelector("button");
const imgW = document.querySelector(".img-wrapper");
const loader = document.createElement("div");
const isValidDomain = (url) => {
  return /\.(com|in|app|uk|org|net|info|co|io|gov|edu|me|xyz)$/i.test(url);
};

let sound = new Audio("errorSound.mp3");

loader.classList.add("loader");
loader.style.margin = "10px 0";

const add = () => {
  label.classList.add("toggle");
  input.focus();
};

const qrGen = () => {
  const value = input.value.trim();

  if (value !== "") {
    if (!isValidDomain(value)) {
      sound.play();
      input.classList.add("move");
      label.textContent = "Enter valid domain";

      setTimeout(() => {
        input.classList.remove("move");
      }, 300);

      return;
    } else {
      label.textContent = "Enter text or URL";
    }

    imgW.style.display = "block";
    imgW.appendChild(loader);

    img.src =
      `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=` +
      encodeURIComponent(value);

    img.onload = () => {
      loader.style.display = "none";
    };
  } else {
    sound.play();
    input.classList.add("move");
    label.style.color = "red";

    setTimeout(() => {
      label.style.color = "#888";
      input.classList.remove("move");
    }, 300);
  }
};

input.addEventListener("click", add);
label.addEventListener("click", add);
btn.addEventListener("click", qrGen);
input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    qrGen();
  }
});
