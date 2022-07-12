function keyReleased() {
    if (key === "p") {
        settings.isPlaying = !settings.isPlaying;
        settings.isPlaying ? loop() : noLoop();
        settingsGui.setValue("Log", settings.isPlaying ? "⏵︎" : "⏸︎");
    }

    if (key === "f") {
            settings.followPolice = !settings.followPolice;
            settingsGui.setValue("Log", settings.followPolice ? "Follow Police ✅" : "Follow Police ❌");
    }
}

function mouseClicked() { // Spawn Ships in water
    if (mouseButton === LEFT && checkWithinWater(mouseX, mouseY) && availableBoatNames.length > 0) {
        ships.push(new Ship(mouseX, mouseY));
        updateGameGui();
    }
}

function controlPoliceBoat() {
    if (keyIsDown(87))  { //W
        police.accelerate(0, -1);
    } 
 
     if (keyIsDown(65))  { //A
         police.accelerate(-1, 0);
     } 
 
     if (keyIsDown(83))  { //S
        police.accelerate(0, 1);
     } 
 
     if (keyIsDown(68))  { //D
        police.accelerate(1, 0);
     } 
 
     if (keyIsDown(32)) { // SPACE
       
     }
     
     
}