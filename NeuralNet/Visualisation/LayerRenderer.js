const max_square = (area) => {

    let sq = Math.sqrt(area);
    if(sq % 1 === 0){
        return {w:sq, h:sq};
    }

    sq = sq - (sq % 1);
    for(let i = sq; i > 0; i--) {
        console.log(i);
        if(area % i === 0) {
            return {w:area/i, h:i};
        }
    }
};

export class LayerRenderer {

    constructor(canvas, layer, draw_single_column = false, dimensions=null) {

        this.canvas = canvas;
        this.ctx = canvas.getContext("2d");
        this.layer = layer;
        if(draw_single_column) {
            this.dimensions = {w:1, h:layer.n_nodes};
        } else if(dimensions != null) {
            if(dimensions.w * dimensions.h !== layer.n_nodes){
                throw "dimension mismatch! can't fit neurons inside";
            }
            this.dimensions = dimensions;
        } else {
            this.dimensions = max_square(this.layer.n_nodes);
        }
    }

    draw() {

        let px_w = this.canvas.width / this.dimensions.w;
        let px_h = this.canvas.height / this.dimensions.h;

        let pixels = this.layer.get_input().to_array();

        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        for(let y = 0; y < this.dimensions.h; y++) {
            for(let x = 0; x < this.dimensions.w; x++) {
                this.ctx.fillStyle = "rgba(0, 0, 0," + pixels[y*this.dimensions.w + x] + ")";
                this.ctx.fillRect(x * px_w, y * px_h, px_w, px_h);
            }
        }
    }
}