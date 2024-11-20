// JavaScript to handle button click and update output
document.getElementById('submitBtn').addEventListener('click', function() {
    const inputText = document.getElementById('inputText').value;
    const outputDiv = document.getElementById('outputDiv');

    // Output of $mmn+
    var notes = ``;
    notes = inputText;

    var regex = /(.+) \| (.+)/;
    var notesArr = notes.split("\n");
    var allNotes = [];
    var notesCommands = [];

    // Separate unique notes
    for (let note of notesArr) {
	var match = note.match(regex)
	const found = notesCommands.findIndex((element) => element.endsWith(match[2]));
	if (found !== -1) {
	    notesCommands[found] = match[1] + " $ " + notesCommands[found];
	} else {
  	    notesCommands.push(match[1] + " $ " + match[2])
	}
    }

    var commandsStr = notesCommands.join("\n$n ")
    // console.log("$n " + commandsStr)
    outputDiv.innerHTML = "$n " + commandsStr.replaceAll('\n', "<br>");
});
