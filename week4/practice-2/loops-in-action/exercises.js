// 1
const calculateButton = document.querySelector("#calculator button");

function calculateSum() {
  const userNum = document.getElementById("user-number");
  let sum = 0;
  for (let i = 0; i <= userNum.value; i++) {
    sum += i;
  }
  const result = document.getElementById("calculated-sum");
  result.textContent = sum;
  result.style.display = "block";
}

calculateButton.addEventListener("click", calculateSum);

// 2
const highlightButton = document.querySelector("#highlight-links button");

function highlightLinks() {
  const links = document.querySelectorAll("a");
  for (let link of links) {
    link.classList.add("highlight");
  }
}

highlightButton.addEventListener("click", highlightLinks);

// 3
const showInfoButton = document.querySelector("#user-data button");
const user = {
  name: "John",
  age: 30,
  isAdmin: true,
};

function showInfo() {
  const outputData = document.getElementById("output-user-data");

  for (const key in user) {
    const newUserData = document.createElement("li");
    const outputText = key.toUpperCase() + ": " + user[key];
    newUserData.textContent = outputText;
    outputData.append(newUserData);
  }
}

showInfoButton.addEventListener("click", showInfo);

// 4
const statisticsButton = document.querySelector("#statistics button");

function rollDice() {
  return Math.floor(Math.random() * 6) + 1;
}

function deriveNumberOfDiceRolls() {
  const targetNumber = document.getElementById("user-target-number").value;
  const diceRollsList = document.getElementById("dice-rolls");

  diceRollsList.innerHTML = "";

  let hasRolledTargetNumber = false;
  let numberOfRolls = 0;

  while (!hasRolledTargetNumber) {
    const rolledNumber = rollDice();
    // if(rolledNumber == targetNumber) {
    //   hasRolledTargetNumber = true;
    // }
    numberOfRolls++;
    const newRollList = document.createElement("li");
    const outputText = "Roll " + numberOfRolls + ": " + rolledNumber;
    newRollList.textContent = outputText;
    diceRollsList.append(newRollList);
    hasRolledTargetNumber = rolledNumber == targetNumber;
  }

  const outputTotalRolls = document.getElementById("output-total-rolls");
  const outputTargetNumber = document.getElementById("output-target-number");

  outputTargetNumber.textContent = targetNumber;
  outputTotalRolls.textContent = numberOfRolls;
}

statisticsButton.addEventListener("click", deriveNumberOfDiceRolls);
