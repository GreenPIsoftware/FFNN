class Brain {
    constructor(nn) {
        this.nn = nn;
    }

    /**
     * @return intention
     * @param sensation
     */
    predict(sensation) {
        let inputs = sensation.values();
        let outputs = this.nn.predict(inputs);

        let intention = new Intention();
        // TODO: Implement
    }
}