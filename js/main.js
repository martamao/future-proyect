"use strict";

const petVitality = document.querySelector(".js_vitality");
const petStability = document.querySelector(".js_stability");
const petConnection = document.querySelector(".js_connection");

const stimulateBtn = document.querySelector(".js_stimulate");
const doTasksBtn = document.querySelector(".js_doTasks");
const connectBtn = document.querySelector(".js_connect");

let pet = {
  vitality: 100,
  stability: 100,
  connection: 100,
  isAlive: true,
};

const savedPet = localStorage.getItem("pet");
//hay algo guardado con la clave pet?”
if (savedPet) {
  pet = JSON.parse(savedPet);
  //Convierte texto en objeto
}


// actualizar stats
//petvitality.textContent = petvitality.innerHTML -> es lo mismo pero evitará XSS en el futuro
function updateStats() {
  if (pet.stability < 50 || pet.connection < 50) pet.vitality -= 5;
  if (pet.connection < 50) pet.stability -= 5;
  if (pet.stability < 50) pet.connection -= 5;

  pet.vitality =  Math.min(100, Math.max(0, pet.vitality));
  pet.stability =  Math.min(100, Math.max(0, pet.stability));
  pet.connection =  Math.min(100, Math.max(0, pet.connection));

  petVitality.innerHTML = `${pet.vitality}`;
  petStability.innerHTML = `${pet.stability}`;
  petConnection.innerHTML = `${pet.connection}`;
  localStorage.setItem("pet", JSON.stringify(pet));

  if (pet.vitality === 0){
    pet.isAlive = false;
    //alert("Tu criatura ha muerto 💀");
  }
}
function updateBarStats(){
  const total = 100;
  const vitalityBar = (pet.vitality / total) * 100;
  const stabilityBar = (pet.stability / total) * 100;
  const connectionBar  = (pet.connection / total) * 100;
  petVitality.style.width = vitalityBar + '%';
  petStability.style.width = stabilityBar + '%';
  petConnection.style.width = connectionBar + '%';
}
// acciones de los botones
//onClick() o addEventListener???
stimulateBtn.addEventListener("click", () => {
  if (!pet.isAlive) {
    return;
  }
  pet.vitality += 10;
  updateStats();
  updateBarStats();
});

doTasksBtn.addEventListener("click", () => {
  if (!pet.isAlive) {
    return;
  }
  pet.stability += 10;
  updateStats();
  updateBarStats();

});

connectBtn.addEventListener("click", () => {
  if (!pet.isAlive) {
    return;
  }
  pet.connection +=10;
  updateStats();
  updateBarStats();

});

setInterval(() => {
   if (!pet.isAlive) return;
  pet.stability = Math.max(0, pet.stability - 1);
  pet.connection = Math.max(0, pet.connection - 2);
  updateStats();
  updateBarStats();

}, 5000); // cada 5 segundos
updateStats();
updateBarStats();

localStorage.setItem("pet", JSON.stringify(pet)); //guarda 