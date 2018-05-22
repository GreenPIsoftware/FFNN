class Intention {

    constructor(heading,v_x,v_y) {
        this.heading = heading;
        this.v_x = v_x;
        this.v_y = v_y;
    }


    apply(organism) {
        organism.x += organism.v_x;
        organism.y += organism.v_y;

        organism.heading = this.heading;
    }
}