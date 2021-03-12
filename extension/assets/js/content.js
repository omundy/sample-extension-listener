/**
 *	Content script
 */
console.log("Hello from the content script!");


// create a new observer
var observer = new MutationObserver((mutations, observer) => {
	let date = new Date().toLocaleString();
	// log # of mutations found
	console.log(mutations.length, "new mutations observed", date);
	// loop through each mutation found
	mutations.forEach(function(mutation) {
		// loop through added nodes
		for (const node of mutation.addedNodes) {
			if (!node.tagName) continue; // skip if not an HTML element
			// if this is the right class
			if (node.classList.contains('theClassYouAreLookingFor')) {
				console.log("👀 mutation observed", date);
				// show notification if it is the type of mutation we are looking for
				$.growl({
					title: "👀 mutation observed",
					message: date
				});
			}
		}
	});
});

// observer config
var observerConfig = {
	subtree: true, // watch descendents
	childList: true, // watch additions / deletions
};

// DOM target node - everything in body
var targetNode = document.body;

// call observer method, pass target and config
observer.observe(targetNode, observerConfig);



/**
 *	Add a button to test mutations
 */
(function() {

	// create button string and append it to page
	let btn = "<button class='buttonOnPage'>👀</button>";
	document.body.insertAdjacentHTML('beforeend', btn);

	// add button listener
	document.querySelector(".buttonOnPage").addEventListener('click', () => {
		// create paragraph element
		let p = document.createElement("p");
		// add the class we want to search for
		p.setAttribute("class", "theClassYouAreLookingFor");
		// add the element to the page
		document.body.appendChild(p);
	}, false);

})();
