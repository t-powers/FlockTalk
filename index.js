import { flockData } from "./data.js";

const flockInput = document.getElementById("flock-input");
const flockBtn = document.getElementById("flock-btn");

flockBtn.addEventListener("click", () => {
  console.log(flockInput.value);
});
