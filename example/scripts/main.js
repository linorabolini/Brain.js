require.config({
	paths: {
		'brain':'brain'
	}
});

require(['brain'], 
	function(Brain) {

	//======================
	// start point
	var brain = new Brain({ 
		numInputs: 2,
	 	numOutputs: 2,
	 	hiddenLayers: 1,
	 	neuronsPerLayer: 3
	}).init();
	console.log(brain);

	var outputs = brain.think([1,0]);
	console.log(outputs);

});