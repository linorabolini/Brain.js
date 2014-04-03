(function () {

	var defaults = {
		bias: -1,
		activationRespose: 1
	}

	/* class def */
	var Neuron = function (numInputs) {
		this.numInputs = numInputs;
		this.weights = [];
		for(var i=0; i<numInputs; ++i) {
			this.weights.push(RandomClamped());
		}
	};

	/* class def */
	var NeuronLayer = function (numNeurons, numInputs) {
		this.numNeurons = numNeurons;
		this.numInputs = numInputs;
		this.neurons = [];
		for(var i=0; i<numNeurons; ++i) {
			this.neurons.push(new Neuron(numInputs));
		}
	};


	/* class def */
	var NeuralNet = function(params, config) {

		// private:

		// default params
		params = params || {};

		// default configs
		config = config || defaults;

		var numInputs = params.numInputs;

		var numOutputs = params.numOutputs;

		var hiddenLayers = params.hiddenLayers;

		var neuronsPerHiddenLayer = params.neuronsPerLayer;

		var layers = [];

 		// inits the algorithm
 		this.init = function() {
 			//create the layers of the network
			if (hiddenLayers > 0)
			{
				//create first hidden layer
			  layers.push(new NeuronLayer(neuronsPerHiddenLayer, numInputs));
		    
		    for (var i=0; i<hiddenLayers-1; ++i)
		    {

				layers.push(new NeuronLayer(neuronsPerHiddenLayer,
		                                    neuronsPerHiddenLayer));
		    }

		    //create output layer
			  layers.push(new NeuronLayer(numOutputs, neuronsPerHiddenLayer));
			}

		  	else
		 	{
			 	 //create output layer
			 	 layers.push(new NeuronLayer(numOutputs, numInputs));
		 	}

 			return this;
 		};

 		this.getWeights = function() {
 			//this will hold the weights
			var weights = [];
	
			//for each layer
			for (var i=0; i<hiddenLayers + 1; ++i) {

				//for each neuron
				for (var j=0; j<layers[i].numNeurons; ++j) {
					//for each weight
					for (var k=0; k<layers[i].neurons[j].numInputs; ++k) {
						weights.push(layers[i].neurons[j].weights[k]);
					}
				}
			}

			return weights;
 		}

 		this.putWeigths = function(weights) {
 			var cWeight = 0;
	
			//for each layer
			for (var i=0; i<hiddenLayers + 1; ++i) {

				//for each neuron
				for (var j=0; j<layers[i].numNeurons; ++j) {
					//for each weight
					for (var k=0; k<layers[i].neurons[j].numInputs; ++k) {
						layers[i].neurons[j].weights[k] = weights[cWeight++];
					}
				}
			}

			return;
 		}

 		this.getNumberOfWeights = function() {
 			var weights = 0;
	
			//for each layer
			for (var i=0; i<hiddenLayers + 1; ++i) {

				//for each neuron
				for (var j=0; j<layers[i].numNeurons; ++j) {
					//for each weight
					for (var k=0; k<layers[i].neurons[j].numInputs; ++k)					
						weights++;
				}
			}

			return weights;
 		}

 		this.think = function(inputs) {
		 	
			if (inputs.length != numInputs) 
		  		throw "Error: Incorrect number of inputs!"
						
			//For each layer....
			for (var i=0; i<hiddenLayers + 1; ++i)
			{		
				if ( i > 0 ) 
					inputs = outputs;

				outputs = [];
				
				var cWeight = 0;
				
				for (var j=0; j<layers[i].numNeurons; ++j)
				{
					var netinput = 0;

					var	numImps = layers[i].neurons[j].numInputs;
					
					//for each weight
					for (var k=0; k<numImps - 1; ++k)
					{
						//sum the weights x inputs
						netinput += layers[i].neurons[j].weights[k] * 
		                    inputs[cWeight++];
					}

					//add in the bias
					netinput += layers[i].neurons[j].weights[numImps-1] * 
		                  config.bias;

				 	//we can store the outputs from each layer as we generate them. 
			     	//The combined activation is first filtered through the sigmoid 
			     	//function
					outputs.push(this.sigmoid(netinput, config.activationRespose));

					cWeight = 0;
				}
			}

			return outputs;
 		}

 		this.sigmoid = function(netinput, response) {
			return ( 1 / ( 1 + Math.exp(-netinput / response)));
		}
	};

	function RandomClamped() {
		return RandomFloat() - RandomFloat();
	};

	function RandomFloat() {
		return Math.random();
	};

	function RandomInt(a, b) {
		return Math.floor(RandomFloat()*(b-a+1)+a);
	};

	// export module for requireJS
	define(function(){ return NeuralNet; });
}());

	



