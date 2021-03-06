function guiSetup() {
    settingsGui = QuickSettings.create(519, 380, "Settings");
    settingsGui.setKey("g");
    settingsGui.addHTML("Info", `
    Play Pause:   <b>p</b><br/>
    Toggle Gui:   <b>g</b><br/>
    Spawn Boat:   <b>Mouse Left</b><br/>
    Delete Boat:  <b>Mouse Right</b><br/>
    Select Boat:  <b>Mouse Hover</b><br/>
    Escort Boat:  <b>f (toggle)</b><br/>
    `);
    settingsGui.addText("Log", "⏵︎");
    settingsGui.addBoolean("Show Labels", settings.showLabels, () => {  settings.showLabels = !settings.showLabels; });
    settingsGui.addDropDown("Spawn Boat Type", shipTypes, ({ value }) => { 
        currentShipType = value;
    });
    settingsGui.addBoolean("Police Boat", settings.hasPolice, (v) => {
        settings.hasPolice = v;
        if (settings.hasPolice) {
            police = new Police();
        } else {
            police = null;
        }
    });
    
    settingsGui.addBoolean("Show Flow Field", settings.showEdgeField, () => {
        settings.showEdgeField = !settings.showEdgeField;
    });
    settingsGui.addBoolean("Ships flee from mouse", settings.scaryMouse, () => {
        settings.scaryMouse = !settings.scaryMouse;
    });
    settingsGui.addHTML("Perlin Noise Settings", `(Only applied in lakes)`);
    settingsGui.addRange("XYFac", 30, 800, settings.perlinNoise.xyfac, 1, (v) => {  settings.perlinNoise.xyfac = v; });
    settingsGui.addRange("ZFac", 100, 1000, settings.perlinNoise.zfac, 1, (v) => {  settings.perlinNoise.zfac = v; });

    gameGui = QuickSettings.create(750, 380, "Ship Information System");
    gameGui.addHTML("Police Boat", "No Police");
    gameGui.addProgressBar("No of Ships", assets.boatNames.length, assets.boatNames.length - availableBoatNames.length, "");

}

function policeBoatInfo() {
    if (police) {
        gameGui.setValue("Police Boat", `
        Position X: ${police.pos.x.toFixed(0)} Y: ${police.pos.y.toFixed(0)}<br/>
        Course: ${police.vel.heading().toFixed(2)} °<br/>
        Speed: ${police.vel.mag().toFixed(2)}<br/>
        Acceleration: ${policeAccelerationGui}<br/>
        `);
    } else {
        gameGui.setValue("Police Boat", "No Police");
    }
}

function currentBoatInfo() {
    if (currentBoat) {
        gameGui.setValue("Info", `
        Name: <strong>${currentBoat.name}</strong><br/>
        Position X: ${currentBoat.pos.x.toFixed(0)} Y: ${currentBoat.pos.y.toFixed(0)}<br/>
        Course: ${currentBoat.vel.heading().toFixed(2)} °<br/>
        Speed: ${currentBoat.vel.mag().toFixed(2)}<br/>
        Acceleration: ${currentPoliceBoatAcceleration}<br/>
        `);
    } 
}

// shows the Edge flowField if desired
function drawEdgeField() {
    edgeFieldBuffer = createGraphics(width, height);
    for (let y = 0; y < height; y=y+5) {
        for (let x = 0; x < width; x=x+5) {
            edgeFieldBuffer.stroke("red");
            edgeFieldBuffer.push();
            edgeFieldBuffer.translate(x, y);
            edgeFieldBuffer.strokeWeight(1);
            let force = getDirectionForce(x, y);
            edgeFieldBuffer.line(0, 0, force.x * 10, force.y * 10);
            edgeFieldBuffer.stroke("blue")
            edgeFieldBuffer.point(force.x * 10, force.y * 10);
            edgeFieldBuffer.pop();
        }
    }
}

function updateGameGui(selected = null) {
    let currentBoats = [];
    if (selected) {
        ships.filter(s => s.name !== selected).forEach(s => currentBoats.push(s.name));
        currentBoats.unshift(selected);
    } else {
        ships.forEach(s => {
            currentBoats.unshift(s.name);
        })
    }
    // WORKAROUND
    if (ships.length >= 0) {
        gameGui.removeControl("Info");
        gameGui.removeControl("Selected Boat")
    }
    // END WORKAROUND
    gameGui.addDropDown("Selected Boat", currentBoats, ({ value }) => {
        newShip = ships.find(s => s.name === value);
        if (newShip) {
            currentBoat = newShip;
        }
    });
    gameGui.addHTML("Info", ``);
    gameGui.setValue("No of Ships", assets.boatNames.length - availableBoatNames.length);
}

