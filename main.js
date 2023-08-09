let container = document.querySelector('.container');
let dropdown = document.querySelector('.dropdown');
let body = document.querySelector('body');

// Helpers
let newArr = [];

createGrid();

let allCubes = document.querySelectorAll('.cube');

allCubes.forEach(cube => {
    cube.addEventListener('click', selectCube);
});

function selectCube() {
    let cube = this;

    if(cube.getAttribute('class') === "cube active") {
        pushCubeToDropDown(cube);
    }    
}

function removeAllClicks() {
    let allNonActiveCubes = document.querySelectorAll('.active');

    allNonActiveCubes.forEach(cube => {
        cube.removeEventListener('click', selectCube);
    });
}

function pushCubeToDropDown(cube) {
    dropdown.appendChild(cube);

    selecetedLastCube();

    removeThreeNumbers();

    checkIfDropdownIsFull();
}

function checkIfDropdownIsFull() {
    if(dropdown.childElementCount === 10) {
        displayYouLose()
    }
}

function displayYouLose() {
    // body.classList.add('color');
    removeAllClicks()
    body.innerHTML = `
    <div class="popup">
        <h2>YOU LOSE</h2>
        <button class="playAgain">Play Again</button>
    </div>
    `;

    let playAgain = document.querySelector('.playAgain');

    playAgain.addEventListener('click', playAgainGame);
}

function playAgainGame() {
    location.reload();
}

function removeThreeNumbers() {
    let cubes = dropdown.querySelectorAll('.cube');
    let cubeValues = [];
  
    cubes.forEach((cube) => {
      cubeValues.push(parseInt(cube.innerHTML));
    });
  
    for (let i = 0; i < cubeValues.length; i++) {
      let currentValue = cubeValues[i];
      let count = 0;
  
      for (let j = 0; j < cubeValues.length; j++) {
        if (cubeValues[j] === currentValue) {
          count++;
        }
      }
  
      if (count >= 3) {
        let cubesToRemove = dropdown.querySelectorAll(`.cube[data-id="${currentValue}"]`);
        
        cubesToRemove.forEach((cube) => {
            cube.style.backgroundColor = '#444';
            setTimeout(() => {
              cube.remove();
            }, 500);
        });
      }
    }
}

function createGrid() {
    let body = ``;

    for (let i = 0; i < 10; i++) {
        body += `
            <div id="column${i}" class="column">${columnGrid()}</div>
        `.trim();
    }

    container.innerHTML = body;

    selecetedLastCube();
}

function columnGrid() {
    let column = ``;

    for(let i = 0; i < 10; i++) {
        let rand = Math.floor(Math.random() * 6) + 1;
        column += `
                <div data-id="${rand}"  class="cube">${rand}</div>
        `.trim();
    }

    return column;
}

function selecetedLastCube() {
    let arr = [];

    for(let i = 0; i < 10; i++) {
        let lastChild = document.getElementById(`column${i}`).lastChild;
        arr.push(lastChild);
        lastChild.classList.add('active');
        lastChild.style.backgroundColor = "#FF634A";
    }
}