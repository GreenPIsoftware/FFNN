
class Organsim {

    constructor(x, y, v_x, v_y, heading, brain) {
        this.x = x;
        this.y = y;
        this.heading = heading;
        this.sensation = new Sensation();
        this.intention = new Intention(heading,v_x,v_y);
        this.brain = brain;
    }


    sensate(sensation) {
        this.sensation = sensation;
    }


    think() {
        this.intention = this.brain.predict(this.sensation);
    }


    update() {
        this.intention.apply(this);
    }







}