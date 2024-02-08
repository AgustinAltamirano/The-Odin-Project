const OPACITY_INCREMENT = 0.1;

function main(){
  const sizeSelector = document.querySelector("#sizeSelector");
  const opacitySelector = document.querySelector("#opacitySelector");
  const buttonNewSketchpad = document.querySelector("#buttonNewSketchpad");
  const content = document.querySelector(".content");
  
  let sketchpad = document.querySelector(".sketchpad");
  let sketchpadSize;
  let opacityMode = false;
  sizeSelector.value = "";  

  buttonNewSketchpad.addEventListener("click", function () {
    sketchpadSize = parseInt(sizeSelector.value);
    if (!sketchpadSize || sketchpadSize < 2 || sketchpadSize > 100) {
      alert("ERROR: Invalid sketchpad size value");
      sizeSelector.value = "";
      return;
    }
    opacityMode = opacitySelector.checked;
    content.removeChild(sketchpad);
    sketchpad = newSketchpad(sketchpadSize, opacityMode);
    content.appendChild(sketchpad);
  });

}

function newSketchpad(size, opacityMode) {
  const sketchpad = document.createElement("div");

  for (let i = 0; i < size; i++) {
    let sketchpadRow = document.createElement("div");
    sketchpadRow.classList.add("sketchpadRow");
    for (let j = 0; j < size; j++) {
      let sketchpadCell = document.createElement("div");
      sketchpadCell.classList.add("sketchpadCell");
      sketchpadRow.appendChild(sketchpadCell);
      sketchpadCell.addEventListener("mouseover", function () {
        if (opacityMode) {
          // Get background color opacity value
          let rgbaString = getComputedStyle(sketchpadCell)
            .getPropertyValue("background-color");
          
          const rgbaValues = rgbaString.match(/[\d.]+/g);

          // If opacity is not there (alpha = 1), return
          if (rgbaValues.length === 3) {
            return;
          }
          let newOpacity = parseFloat(rgbaValues[3]) + OPACITY_INCREMENT;
          if (newOpacity > 1) {
            newOpacity = 1;
          }
          sketchpadCell.style.backgroundColor = `rgb(20, 20, 20, ${newOpacity})`;
        } else {
          sketchpadCell.style.backgroundColor = "rgb(20, 20, 20, 1)";
        }
      });
    }
    sketchpad.appendChild(sketchpadRow);
  }

  sketchpad.classList.add("sketchpad");
  sketchpad.style.visibility = "visible";
  return sketchpad;
}

main();