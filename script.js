"use strict";

const input = document.querySelector("input");
const label = document.querySelector("label");
const img = document.querySelector("img");
const btn = document.querySelector("button");
const imgW = document.querySelector(".img-wrapper");
const loader = document.createElement("div");

let sound = new Audio("errorSound.mp3");
console.log(sound);

loader.classList.add("loader");
loader.style.margin = "10px 0";

const add = () => {
  label.classList.add("toggle");
  input.focus();
};

const qrGen = () => {
  if (input.value !== "") {
    imgW.style.display = "block";
    imgW.appendChild(loader);

    img.src =
      `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=` +
      encodeURIComponent(input.value);

    img.onload = () => {
      loader.style.display = "none";
    };
  } else {
    sound.play();

    input.classList.add("move");
    setTimeout(() => {
      input.classList.remove("move");
    }, 200);

    label.classList.add("move");
    setTimeout(() => {
      label.classList.remove("move");
    }, 200);
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
