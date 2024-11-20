// JavaScript to handle button click and update output
document.getElementById('submitBtn').addEventListener('click', function() {
    const inputText = document.getElementById('inputText').value;
    const outputDiv = document.getElementById('outputDiv');

    var tsv = ``;
    tsv = inputText;

    var regex = /:.+:\d+.\s\S+\s\((\d+)\)/;

    var tsvLines = tsv.split('\n');
    var restoreCommands = [];

    for (let tsvLine of tsvLines) {
	var matches = tsvLine.match(regex);
	var command = '$restoreuser ' + matches[1] + ' 1';
	restoreCommands.push(command);
    }

    var restoreLines = restoreCommands.join('\n');

    // console.log(restoreLines);
    outputDiv.innerHTML = restoreLines.replaceAll('\n', "<br>");
});
