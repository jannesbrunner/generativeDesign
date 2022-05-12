class Gui {
    
    elements = [];
    buttons = [];
    panel;
    
    constructor() {
        this.panel = QuickSettings.create(width -300, 20, "Settings");
        this.updateGuiPositions();
        this.panel.setKey("g");
    }

    get panel() {
        return this.panel;
    }

    updateGuiPositions() {
        
    }
}

