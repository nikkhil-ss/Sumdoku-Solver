const puzzleboard = document.querySelector('#puzzle');
const solveButton = document.querySelector('#solvebutton');
const squares = 81;
const submissions = []

// let  input = [["5","3",".",".","7",".",".",".","."],["6",".",".","1","9","5",".",".","."],[".","9","8",".",".",".",".","6","."],["8",".",".",".","6",".",".",".","3"],["4",".",".","8",".","3",".",".","1"],["7",".",".",".","2",".",".",".","6"],[".","6",".",".",".",".","2","8","."],[".",".",".","4","1","9",".",".","5"],[".",".",".",".","8",".",".","7","9"]]
const input=[];

function numberFilter(obj){
    let x = obj.value;
    if (x === "") return true;
    let last = x[x.length-1];

    obj.value = "";
    if (!Number.isNaN(parseInt(last))) {
        obj.value = last;

    }
    else
        obj.value = x.slice(0, x.length-1);
    return true;
}

for (let i = 0; i < squares; i++) {
    const inputElement = document.createElement('input');
    inputElement.setAttribute('type', 'text');
    inputElement.setAttribute('min','1');
    inputElement.setAttribute('oninput', 'numberFilter(this)')
    puzzleboard.appendChild(inputElement)
}

function addBorder(){
    let inputs = document.querySelectorAll('input')
    for( let i=0;i<squares;i=i+9){
            inputs[i+2].style.borderRight="4px solid #000"
            inputs[i+5].style.borderRight="4px solid #000"
        // console.log(input[i]);
    }
    for( let i=18;i<squares-27;i=i+27){
        for(let j=i;j<i+9;j++){
            inputs[j].style.borderBottom="4px solid #000"
        }
    }

}
addBorder()
function joinValue() {
    // console.log("clicked");/

    input.length = 0;

    let inputs = document.querySelectorAll('input')
    inputs.forEach(input => {
    
        if (input.value) {
            submissions.push(parseInt(input.value));
        }
        else {
            submissions.push('.');
        }

    });
    
    while (submissions.length) {
        input.push(submissions.splice(0, 9));
    }
    
    
}

function cheeckunique(input){
    /**
     * @type {Array} row 
    */
    let row;
    for(row of input){
        row = row.filter(value => value !== ".")
        let hasDuplicates = new Set(row).size != row.length;
        if (hasDuplicates) {
            // alert("Found duplicates in row"); 
            return false;
        }
        

    }
    return true;
}


function solves(submitted) {
    for (let i = 0; i < submitted.length; i++) {

        for (let j = 0; j < submitted[0].length; j++) {
            
            if (submitted[i][j] == '.') {

                for (let c = '1'; c <= '9'; c++) {
                    if (isValid(submitted, i, j, c)) {
                        submitted[i][j] = c;
                        if (solves(submitted) == true)
                            return true;
                        else {
                            submitted[i][j] = '.';
                        }
                    }
                }
                return false;
            }
        }
    }
    return true;
}

function isValid(input, row, col, c) {
    for (let i = 0; i <9; i++) {
        if (input[row][i] == c)
            return false;
        if (input[i][col] == c)
            return false;
        let x=Math.floor(row/3)*3 + Math.floor(i/3);
        let y=Math.floor(col/3)*3 + Math.floor(i%3);
        if (input[x][y]==c){
            return false;
        }
    }
    return true;
}

//function to fill the solution element to the sudoku
function populateValues(solution) {
    let inputs = document.querySelectorAll('input');
    if (input) {
        inputs.forEach((input, i) => {
            input.value = solution[i];
        });
    }
}



// console.log("igiy")

function finalfun() {
    joinValue();
    // console.log(cheeckunique(input))
    if(cheeckunique(input) && solves(input)){
        // console.log("final fun", input);
        const solution =input.flat();
        // console.log("1d array",solution)
        populateValues(solution);
    }
    else{
        alert("Invalid Sudoku")
        event.preventDefault();
    }
}

solveButton.addEventListener('click', finalfun)
