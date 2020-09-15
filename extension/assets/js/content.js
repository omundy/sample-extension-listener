/**
 *	Content script
 */
console.log("Hello from the content script!");


// create a new observer
var observer = new MutationObserver((mutations, observer) => {
	// loop through each mutation found
	mutations.forEach(function(mutation) {
		// loop through added nodes
		for (const node of mutation.addedNodes) {
			if (!node.tagName) continue; // not an element
			// if this is the right class
			if (node.classList.contains('theClassYouAreLookingFor')) {
				let date = new Date().toLocaleString();
				console.log("🐥 mutation observed", date);
				// show notification
				if (Math.random() > 0.5) {
					$.growl({
						title: "🐥 mutation observed",
						message: date
					});
				} else {
					$.growl.warning({
						message: "🐥 mutation observed " + date
					});
				}

			}
		}
	});
});

// observer config
var observerConfig = {
	subtree: true, // watch descendents
	childList: true, // watch additions / deletions
};

// DOM target node - everything
var targetNode = document.body;

// call observer method, pass target and config
observer.observe(targetNode, observerConfig);



/**
 *	Test mutations
 */
(function() {

	// create button string
	let btn = "<button class='sampleButton'>🐥</button>";

	// append button
	document.body.insertAdjacentHTML('beforeend', btn);

	// add button listener
	document.querySelector(".sampleButton")
		.addEventListener('click', () => {
			addNode();
		}, false);


	function addNode() {
		// create new node
		let p = document.createElement("p");
		p.setAttribute("class", "theClassYouAreLookingFor");
		// and add it
		document.body.appendChild(p);
	}

})();
