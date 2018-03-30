const max_square = (area) => {

    let sq = Math.sqrt(area);
    if(sq % 1 === 0){
        return {w:sq, h:sq};
    }

    for(let i = sq; i--;) {
        if(area % i === 0) {
            return {w:area/i, h:i};
        }
    }
};

export class LayerRenderer {

    constructor(canvas, layer) {

        this.canvas = canvas;
        this.ctx = canvas.getContext("2d");
        this.layer = layer;
    }

    draw() {

        let dimensions = max_square(this.layer.n_nodes);
        let px_w = this.canvas.width / dimensions.w;
        let px_h = this.canvas.height / dimensions.h;

        let pixels = this.layer.get_input().to_array();

        for(let y = 0; y < dimensions.h; y++) {
            for(let x = 0; x < dimensions.w; x++) {
                this.ctx.fillStyle = "rgba(0, 0, 0," + pixels[y*dimensions.w + x] + ")";
                this.ctx.fillRect(x * px_w, y * px_h, px_w, px_h);
            }
        }
    }
}