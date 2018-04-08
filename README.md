# VinzNet

![Travis](https://img.shields.io/badge/performance-good-green.svg)
![Travis](https://img.shields.io/badge/built%20with-%F0%9F%A7%A0%F0%9F%A7%A0-green.svg)

is a deep learning library aimed to the purpose of understanding the basics of multilyer artificial neural networks.

## super simple to use!
```javascript
//create a new feed forward network
let nn = new NeuralNetwork();

//add an input layer
//dwefault activation function is sigmoid
nn.add_layer(new Layer(2));

//add as many deep layers as you want!
nn.add_layer(new Layer(6));
//use whatever activation function you want
//to make your own activation look at the prototype "ActivationFunction"
nn.add_layer(new Layer(3, Tanh));

//add an output layer
nn.add_layer(new Layer(1));

//set the learning rate, default is 0.1
nn.setLearningRate(0.3);

//train using input data and excpected output, returns the prediction
nn.train(input_array, target_array);

//predict value
let prediction = nn.predict(input_array);

//be happy about ML
```


## Samples 
+ [XOR-Example](https://github.com/GreenPIsoftware/VinzNet/tree/master/Examples/XOR)
... a simple example teaching a network the XOR function
... integrated web-UI for layer visualization and parameter modification
