// JavaScript to handle button click and update output
document.getElementById('submitBtn').addEventListener('click', function() {
    const inputText = document.getElementById('inputText').value;
    const outputDiv1 = document.getElementById('outputDiv1');
    const outputDiv2 = document.getElementById('outputDiv2');

    // Paste your output of $wlo or $qwo or $qw2o here
    var wishes = ``;
    wishes = inputText;

    // Create empty arrays for request and return commands
    var requestCommands = [];
    var returnCommands = [];

    // Remove raw emojis
    wishes = wishes.replaceAll('✅', '');
    wishes = wishes.replaceAll('❌', '');
    wishes = wishes.replaceAll('⭐', '');
    wishes = wishes.replaceAll('🔒', '');
    wishes = wishes.replaceAll('🔐', '');

    // Split lines into an array
    var lines = wishes.split('\n');

    // Loop through the lines and create the commands for each Storage
    for (let line of lines) {
	let sides = line.split(' => ');
	sides[1] = sides[1].trim();
	if (sides[1].startsWith('storage')) {
	    let command = '@' + sides[1] + ' r';
	    let exists = requestCommands.includes(command);
	    if (exists)
		continue;
	    else
		requestCommands.push(command);
	}
    }

    // Loop through the lines again and add the characters to the commands
    for (let line of lines) {
	let sides = line.split(' => ');
	sides[1] = sides[1].trim();
	let index = requestCommands.findIndex((element) => element.includes(sides[1]));
	requestCommands[index] += ' $ ' + sides[0];
    }

    for (let requestLine of requestCommands) {
	requestLine = requestLine.replace('r $ ', '');
	let returnCommand = '$give ' + requestLine;
	returnCommands.push(returnCommand);
    }

    // Turn the request commands array into a multi-line string
    var requestLines = requestCommands.join('\n');
    // Turn the return commands array into a multi-line string
    var returnLines = returnCommands.join('\n');

    // Display both command sets
    // console.log(requestLines);
    // console.log(returnLines);
    outputDiv1.innerHTML = requestLines.replaceAll('\n', "<br>");
    outputDiv2.innerHTML = returnLines.replaceAll('\n', "<br>");
});
