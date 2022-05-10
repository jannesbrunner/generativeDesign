class Gui {
    
    elements = [];
    buttons = [];
    panel;
    
    constructor() {
        this.panel = QuickSettings.create(canvasWidth, 20, "Settings");
        this.updateGuiPositions();
    }

    get panel() {
        return this.panel;
    }

    updateGuiPositions() {
        
    }
}

