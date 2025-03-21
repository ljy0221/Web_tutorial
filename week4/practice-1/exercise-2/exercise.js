// Practice what you learned!

// 1) Select the two <button> elements and store them in two different variables.
//    - Select the first button without adding or using any "id"
let btnRemove = document.querySelector("button");
//    - Select the second button by using an "id"
let btnBackground = document.getElementById("btn-background");
// 2) Add "click" event listener to both buttons (with two different functions).
//    The functions should "console.dir()" the clicked buttons.
//    - Output the first button by using the variable in which it's stored
// function remove(event) {
//   console.dir(btnRemove);
// }
// btnRemove.addEventListener("click", remove);
// //    - Output the second button WITHOUT using the variable in which it's stored
// function background(event) {
//   console.dir(event.target);
// }
// btnBackground.addEventListener("click", background);
// 3) Now select and store the paragraphs mentioned in the text you see on the page
//    (first and third paragraph)
//    - Select BOTH paragraphs by drilling into the document and "navigating" to the
//      mentioned elements
//    - If you struggle with DOM drilling, use "ids" instead but watch the solution!
let firstParagraph = document.body.children[2].children[1];
let thirdParagraph = document.body.children[2].children[3];
// 4) Change the functions from (2) such that:
//    - The first button removes the third paragraph (i.e. the <p> prior to it)
function remove(event) {
  thirdParagraph.remove();
}
btnRemove.addEventListener("click", remove);
//    - The second button changes the background color of the first paragraph to blue
function background(event) {
  //   firstParagraph.style.backgroundColor = "blue";
  //   firstParagraph.className = "bg-blue";
  firstParagraph.classList.add("bg-blue");
}
btnBackground.addEventListener("click", background);
// 5) Solve (4) both by changing the "inline styles" as well as by adding CSS classes
//    Note: You'll have to add those classes to the styles.css file first!
