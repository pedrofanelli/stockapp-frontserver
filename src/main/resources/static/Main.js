/**
 * 
 */

console.log("buenas tardes");

document.addEventListener("DOMContentLoaded", function() {
  // Your logic to be executed after the DOM is loaded
  
  	const inputElement = document.getElementById("myInput");
	inputElement.addEventListener("click", handleSubmit);

  	
  
  
});


function handleSubmit(event) {
	event.preventDefault();
	console.log("holis");
	let selector = document.getElementById("ticker");
	console.log(selector.value);
	
	
	
}