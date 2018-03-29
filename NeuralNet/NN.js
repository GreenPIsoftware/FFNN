import {Matrix} from "./NNmath.js";

class ActivationFunction {

    constructor(func, d_func) {
        this.f = func;
        this.df = d_func;
    }
}

export const Sigmoid = new ActivationFunction(
    x => 1 / (1 + Math.exp(-x)),
    y => y * (1 - y)
);

export const Tanh = new ActivationFunction(
    x => Math.tanh(x),
    y => 1 - (y * y)
);

export class Layer {

    constructor(n_nodes, activation_func = Sigmoid) {

        this.n_nodes = n_nodes;
        this.activation_func = activation_func;
        this.next = null;
        this.weights = null;
        this.bias = new Matrix(n_nodes, 1).randomize();
        this.inputs = null;
    }

    connect(next) {
        this.next = next;
        this.weights = new Matrix(next.n_nodes, this.n_nodes).randomize();
    }

    set_input(inputs){
        this.inputs = inputs;
    }

    get_input() {
        return this.inputs;
    }
}

export class NeuralNetwork {

    constructor() {
        this.layers = [];
        this.setLearningRate();
    }

    add_layer(layer) {
        if(this.layers.length > 0) {
            this.layers[this.layers.length - 1].connect(layer);
        }
        this.layers.push(layer);
    }

    predict(input_array) {

        // Generating the Hidden Outputs
        let input_layer = this.layers[0];
        input_layer.set_input(Matrix.from_array(input_array));

        for(let i = 0; i < this.layers.length - 1; i++) {
            let layer = this.layers[i];
            let next = layer.next;
            //output
            next.set_input(Matrix.multiply(layer.weights, layer.get_input()));
            next.get_input().add(next.bias);
            next.get_input().map(next.activation_func.f);
        }

        return this.layers[this.layers.length - 1].get_input();
    }

    setLearningRate(learning_rate = 0.1) {
        this.learning_rate = learning_rate;
    }

    train(input_array, target_array) {

        let targets = Matrix.from_array(target_array);

        let outputs = this.predict(input_array);
        let output_errors = Matrix.sub(targets, outputs);

        //output layer:

        let out_layer = this.layers[this.layers.length - 1];
        let first_hidden = this.layers[this.layers.length - 2];

        let gradient = Matrix.map(out_layer.get_input(), out_layer.activation_func.df);
        gradient.multiply(output_errors);
        gradient.multiply(this.learning_rate);

        let prev_val_T = Matrix.transpose(first_hidden.get_input());
        let connecting_weights_delta = Matrix.multiply(gradient, prev_val_T);

        first_hidden.weights.add(connecting_weights_delta);
        out_layer.bias.add(gradient);

        //--------------------hidden to out adjusted---------------------//

        //backprop hidden layers
        for(let i = this.layers.length - 1; --i;) {

            let layer = this.layers[i];
            let prev_layer = this.layers[i - 1];

            //--------------------------------hidden to out adjusted -----------------------------------//

            // Calculate the hidden layer errors
            let weights_T = Matrix.transpose(layer.weights);
            let hidden_errors = Matrix.multiply(weights_T, output_errors);
            output_errors = hidden_errors; // <<------ an mein zukünftiges Ich: bitte nicht vergessen!

            // Calculate hidden gradient
            let hidden_gradient = Matrix.map(layer.get_input(), layer.activation_func.df);
            hidden_gradient.multiply(hidden_errors);
            hidden_gradient.multiply(this.learning_rate);

            // Calcuate input->hidden deltas
            let inputs_T = Matrix.transpose(prev_layer.get_input());
            let weight_ih_deltas = Matrix.multiply(hidden_gradient, inputs_T);

            prev_layer.weights.add(weight_ih_deltas);
            // Adjust the bias by its deltas (which is just the gradients)
            layer.bias.add(hidden_gradient);
        }
    }

    serialize() {
        return JSON.stringify(this);
    }

    static deserialize(data) {
        if (typeof data === 'string') {
            data = JSON.parse(data);
        }
        let nn = new NeuralNetwork(data.input_nodes, data.hidden_nodes, data.output_nodes);
        nn.weights_ih = Matrix.deserialize(data.weights_ih);
        nn.weights_ho = Matrix.deserialize(data.weights_ho);
        nn.bias_h = Matrix.deserialize(data.bias_h);
        nn.bias_o = Matrix.deserialize(data.bias_o);
        nn.learning_rate = data.learning_rate;
        return nn;
    }
}