process.stdin.resume();
process.stdin.setEncoding('ascii');

var input_stdin = "";
var input_stdin_array = "";
var input_currentline = 0;

var solutions;

process.stdin.on('data', function (data) {
    input_stdin += data;
});

process.stdin.on('end', function () {
    input_stdin_array = input_stdin.split("\n");
    main();    
});

function readLine() {
    return input_stdin_array[input_currentline++];
}

/////////////// ignore above this line ////////////////////

// Use the main() when running on Node.js
function main() {
    var crossword = [];
    for(var crossword_i = 0; crossword_i < 10; crossword_i++){
       crossword[crossword_i] = readLine();
    }
    var hints = readLine();
    var result = crosswordPuzzle(crossword, hints);
    console.log(result.join("\n"));
}

// Or just directly call crosswordPuzzle() with crossword and hints.
function crosswordPuzzle(crossword, hints) {
    solutions = [];
    solutions.push(crossword);
    // sort hints from large to small
    hints = hints.split(";").sort((a,b) => a.length - b.length);
    while(hints.length) {
        fillPuzzle(hints.pop());
        solutions = solutions.filter(s => s); // remove invalid solutions
    }
    return solutions[0];
}

function fillPuzzle(hint) {
    let regex = generateRegex(hint);
    solutions.forEach((crossword, i) => {
        solve(crossword, hint, regex, false);
        solve(crossword, hint, regex, true);
        delete solutions[i];
    });
}

function solve(crossword, hint, regex, top_down) {
    if(top_down) {
        crossword = transpose(crossword);
    }
    let possibilities = crossword.join("\n").match(regex);
    for(let index=0; index < (possibilities || '').length; index++) {
        let solution = fillAt(crossword, hint, regex, index);
        if(top_down)
            solution = transpose(solution);
        solutions.push(solution);
    }
}

function fillAt(crossword, hint, regex, index) {
    let i=0;
    return crossword.join("\n")
        .replace(regex, function(match, g1, g2) {
            return i++ == index ? g1+hint+g2 : match;
        })
        .split("\n");
}

function generateRegex(hint) {
    let query = "[".concat(hint.split("").join("-][")).concat("-]"),
        pre = "(\\n|^|\\+)",
        post = "(\\n|\\+|$)";
    return new RegExp(pre + query + post, "gm");
}

function transpose(arr) {
	let row, tArr = [];
    for(let i=0; i<arr.length; i++) {
        row="";
        for(let j=0; j<arr[i].length; j++) {
            row+=arr[j].charAt(i);
        }
        tArr.push(row);
    }
    return tArr;
}
