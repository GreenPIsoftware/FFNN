import {LayerRenderer} from "./LayerRenderer.js";

export class NetworkRenderer {

    constructor(neural_network, container, draw_single_column = false, dimensions=null) {
        this.neural_network = neural_network;

        let render_panes = container.getElementsByClassName("canvas");
        if(render_panes.length !== neural_network.layers.length)
            throw console.log("dimension missmatch. every layer needs its own canvas!");

        this.layer_renderers = new Array(render_panes.length).fill().map(
            (elem, i) => new LayerRenderer(render_panes[i], neural_network.layers[i], draw_single_column, dimensions)
        );
    }

    draw() {
        for(let renderer of this.layer_renderers) {
            renderer.draw();
        }
    }
}