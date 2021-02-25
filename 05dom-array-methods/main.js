"use strict";

const main = document.querySelector("#main");
const addUserBtn = document.querySelector("#add-user");
const doubleBtn = document.querySelector("#double");
const showMillionaireBtn = document.querySelector("#show-millionaire");
const sortBtn = document.querySelector("#sort");
const calculateWealthBtn = document.querySelector("#calculate-wealth");

let data = []; // put all of the peaople

getRandomUser();
getRandomUser();
getRandomUser();

//fetch random user and add money
async function getRandomUser() {
  const res = await fetch("https://randomuser.me/api");
  const data = await res.json();

  const user = data.results[0];
  const newUser = {
    name: `${user.name.first} ${user.name.last}`,
    money: Math.floor(Math.random() * 1000000),
  };
  addData(newUser);
}

function doubleMoney() {
  data = data.map((user) => {
    return { ...user, money: user.money * 2 };
  });
  updateDOM();
}

function sortByRichest() {
  data.sort((a, b) => b.money - a.money);
  updateDOM();
}

function showMillonaire() {
  data = data.filter((user) => user.money > 1000000);
  updateDOM();
}

function calculateWealth() {
  const total = data.reduce((acc, user) => (acc += user.money), 0);
  const wealthEl = document.createElement("div");
  wealthEl.innerHTML = `<h3>Total Wealth : <strong>${formatMoney(
    total
  )}</strong></h3>`;
  main.appendChild(wealthEl);
}

// add new obj to data arr
function addData(obj) {
  data.push(obj);

  updateDOM();
}

// update DOM
function updateDOM(providedData = data) {
  main.innerHTML = "<h2><strong>Person</strong>Wealth</h2>";

  providedData.forEach((person) => {
    const element = document.createElement("div");
    element.classList.add("person");
    element.innerHTML = `<strong>${person.name}</strong> 
        ${formatMoney(person.money)}`;
    main.appendChild(element);
  });
}

//Formant number as money -
function formatMoney(number) {
  return "$" + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,");
}

//Event Listener  - add
addUserBtn.addEventListener("click", getRandomUser);
//Event Listener - double
doubleBtn.addEventListener("click", doubleMoney);
//Event Lister - sort
sortBtn.addEventListener("click", sortByRichest);
//Event Lister - filter
showMillionaireBtn.addEventListener("click", showMillonaire);
//Event Lister - reduce
calculateWealthBtn.addEventListener("click", calculateWealth);
