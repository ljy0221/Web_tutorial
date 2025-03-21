let remaining = document.getElementById("remaining-chars");
let input = document.getElementById("product-name");

// function updateRemaining() {
//   let remainingChars = 60 - input.value.length;
//   remaining.textContent = remainingChars;

//   if (remainingChars < 10) {
//     form.backgroundColor = "red";
//   } else {
//     form.backgroundColor = "yellow";
//   }
//   console.log(remainingChars);
// }

let maxLength = input.maxLength;

function updateRemainingCharacters(event) {
  let endteredText = event.target.value;
  let endteredTextLength = endteredText.length;
  let remainingCharacters = maxLength - endteredTextLength;
  remaining.textContent = remainingCharacters;

  if (remainingCharacters === 0) {
    remaining.classList.add("error");
    input.classList.add("error");
  } else if (remainingCharacters <= 10) {
    remaining.classList.add("warning");
    input.classList.add("warning");
    remaining.classList.remove("error");
    input.classList.remove("error");
  } else {
    remaining.classList.remove("warning");
    input.classList.remove("warning");
  }
}

input.addEventListener("input", updateRemainingCharacters);
