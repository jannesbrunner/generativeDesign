class Gui {
    
    
    constructor() {
        this.parameters = createGui('Parameters')
        this.updateGuiPositions();
    }

    updateGuiPositions() {
        this.parameters.setPosition(canvaWidth + 20, 10);
    }
}

