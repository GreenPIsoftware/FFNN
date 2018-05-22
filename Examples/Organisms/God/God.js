class God {
    constructor() {
        this.allCells = [];
    }


    tick() {
        this.notifyAll();
        this.updateAll();
    }


    notifyAll() {
        for (let cell of this.allCells) {
            light_length = 0.0;

            for (let cur_cell of this.allCells) {
                if (cell===cur_cell) {
                    continue;
                }

                light_length += this.approximateLight(cell,cur_cell)

                antenna1 =
                antenna2 =
                antenna3 =

            }


            let sensation = new Sensation(light_length);

        }

    }

    approximateLight(cell,cur_cell) {
        length += (
            Math.cur_cell.x - cell.x
        )

    }

    static distanceTo(x1,y1,x2,y2) {

    }


    updateAll() {
        for (let cell of this.allCells) {

        }
    }
}