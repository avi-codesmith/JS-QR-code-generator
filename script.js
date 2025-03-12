"use strict";

const input = document.querySelector("input");
const label = document.querySelector("label");
const img = document.querySelector("img");
const btn = document.querySelector("button");
const imgW = document.querySelector(".img-wrapper");
const loadingText = document.createElement("p");

loadingText.textContent = "Loading...";
loadingText.style.color = "gray";
loadingText.style.margin = "10px 0";

const add = () => {
  label.classList.add("toggle");
  input.focus();
};

const qrGen = () => {
  if (input.value !== "") {
    imgW.style.display = "block";
    imgW.appendChild(loadingText);

    img.src =
      `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=` +
      encodeURIComponent(input.value);

    img.onload = () => {
      loadingText.textContent = "";
    };
  } else {
    alert("Enter text or URL");
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
