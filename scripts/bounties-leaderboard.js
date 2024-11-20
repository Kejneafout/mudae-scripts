// JavaScript to handle button click and update output
document.getElementById('submitBtn').addEventListener('click', function() {
    const inputText = document.getElementById('inputText').value;
    const outputDiv = document.getElementById('outputDiv');

    // Input data
    // Format: Character, wheel/fixed (notes), amount, claimed by
    var claimed = ``;
    claimed = inputText;
    // Global variables
    var claimedArr = claimed.split('\n');
    var regex = /(.+), (.+), (.+), (.+)/;
    var total = {
	claimed: 0,
	kakera: 0,
	debt: 0,
	perPlayer: []
    };

    // Helper function to check if match exists in object
    function exists(object, match) {
	for (i = 0; i < object.length; i++) {
	    if (object[i].name == match)
		return true;
	}
	return false;
    }

    // Initialize object and count total values
    for (let claim of claimedArr) {
	var match = claim.match(regex);
	if (match) {
	    var found = exists(total.perPlayer, match[4]);
	    if (!found)
		total.perPlayer.push({
		    name: match[4],
		    claimed: 0,
		    kakera: 0,
		    debt: 0
		});
	    var amount = parseInt(match[3].replaceAll('k', "000"));
	    total.claimed++;
	    total.kakera += amount;
	    var debt = match[2].includes("DEBT");
	    if (debt) {
		total.debt += amount;
	    }
	}
    }

    // Calculate gains and losses for each player
    for (let claim of claimedArr) {
	var match = claim.match(regex);
	if (match) {
	    var result = total.perPlayer.find(t => t.name === match[4]);
	    var amount = parseInt(match[3].replaceAll('k', "000"));
	    result.claimed++;
	    result.kakera += amount;
	    var debt = match[2].includes("DEBT");
	    if (debt) {
		result.debt += amount;
	    }
	}
    }

    // Sort claimed descending
    var totalClaimedDesc = total.perPlayer.toSorted((a, b) => (b.claimed) - (a.claimed));
    // Sort kakera descending
    var totalKakeraDesc = total.perPlayer.toSorted((a, b) => (b.kakera) - (a.kakera));
    // Sort DEBT ascending
    var totalDebtDesc = total.perPlayer.toSorted((a, b) => (a.debt) - (b.debt));

    var output = [];

    // Adding data to array data in a more human readable format
    output.push(`## Total characters claimed: ${total.claimed}`);
    output.push(`## Total kakera earned: ${total.kakera}`);
    output.push(`## Total DEBT paid: ${total.debt}`);

    output.push('## Most bounties claimed');
    totalClaimedDesc.forEach((value, index) => {
	output.push(`- ${index + 1} - ${value.name} : ${value.claimed}`);
    });
    output.push('## Most kakera earned')
    totalKakeraDesc.forEach((value, index) => {
	output.push(`- ${index + 1} - ${value.name} : ${value.kakera}`);
    });
    output.push('## Most DEBT paid')
    totalDebtDesc.forEach((value, index) => {
	output.push(`- ${index + 1} - ${value.name} : ${value.debt}`);
    });

    // Joining array with newlines and printing final output
    var outputString = output.join('\n');
    // console.log(outputString);
    outputDiv.innerHTML = outputString.replaceAll('\n', "<br>");
});
