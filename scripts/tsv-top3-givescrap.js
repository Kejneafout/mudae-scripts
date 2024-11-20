// JavaScript to handle button click and update output
document.getElementById('submitBtn').addEventListener('click', function() {
    const inputText = document.getElementById('inputText').value;
    const totalText = document.getElementById('totalText');
    const outputDiv = document.getElementById('outputDiv');

    var tsv = ``;
    tsv = inputText;

    var tsvLines = tsv.split('\n');
    var scrap = 0;
    var regex = /:.+:\d+.\s\S+\s\((\d+)\)  - (\d+)/;
    var givescrapCommands = [];
    var percentages = [50,30,20];

    // Calculate total scrap
    tsvLines.forEach(function (tsvLine, index) {
	var match = tsvLine.match(regex);
	scrap += parseInt(match[2]);
    });

    // Split scrap towards top 3 players
    tsvLines.forEach(function (tsvLine, index) {
	if (index > 2)
  	    return ;
	var match = tsvLine.match(regex);
	var amount = Math.round((percentages[index] / 100) * scrap);
	var command = '$givescrap <@' + match[1] + '> ' + amount;
	givescrapCommands.push(command);
    });

    var givescrapLines = givescrapCommands.join('\n');

    // console.log("Total:", scrap);
    // console.log(givescrapLines);
    totalText.textContent = "Total: " + scrap;
    outputDiv.innerHTML = givescrapLines.replaceAll('\n', "<br>");
});
