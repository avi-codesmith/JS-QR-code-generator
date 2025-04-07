"use strict";

const input = document.querySelector("input");
const label = document.querySelector("label");
const img = document.querySelector("img");
const btn = document.querySelector("button");
const imgW = document.querySelector(".img-wrapper");

const loader = document.createElement("div");
loader.classList.add("loader");
loader.style.margin = "10px 0";

const downloadBtn = document.querySelector(".download");
const copyBtn = document.querySelector(".copy");

let sound = new Audio("errorSound.mp3");

const add = () => {
  label.classList.add("toggle");
  input.focus();
};

const qrGen = () => {
  const value = input.value.trim();

  if (value !== "") {
    imgW.style.display = "block";
    imgW.appendChild(loader);

    img.src = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(
      value
    )}`;

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

copyBtn.addEventListener("click", () => {
  if (img.src) {
    navigator.clipboard.writeText(img.src);
    const icon = copyBtn.querySelector("svg");
    const originalSVG = icon.outerHTML;

    icon.outerHTML = `
      <svg class="logo" xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#fff" viewBox="0 0 24 24">
        <path d="M20.285 6.709l-11.27 11.27-5.3-5.3 1.414-1.414 3.885 3.885 9.856-9.856z"/>
      </svg>
    `;

    setTimeout(() => {
      copyBtn.querySelector("svg").outerHTML = originalSVG;
    }, 1500);
  }
});

downloadBtn.addEventListener("click", () => {
  if (img.src) {
    const a = document.createElement("a");
    a.href = img.src;
    a.download = "qr-code.png";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }
});

input.addEventListener("click", add);
label.addEventListener("click", add);
btn.addEventListener("click", qrGen);
input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    qrGen();
  }
});
