const WATER_RESISTANCE = 0.01;

function getPerlinNoiseForce(x, y) {
    x = x / settings.perlinNoise.xyfac;
    y = y / settings.perlinNoise.xyfac;
    let z = frameCount / settings.perlinNoise.zfac;
    let force_x = map(noise(x, y, z), 0, 1, -1, 1);
    let force_y = map(noise(x + 1000, y + 1000, z), 0, 1, -1, 1);
    return createVector(force_x, force_y);
}
    

// flux of water determined by normal map
function getDirectionForce(x, y) {
    // get the index of the current pixel in p5.Image 
    let index = (x + y * width) * 4;
    // get the vector of the current pixel
    let r = normalMap.pixels[index]; // red channel of the pixel
    let g = normalMap.pixels[index + 1]; // green channel of the pixel

    let force_x = map(r, 0, 255, -1, 1);
    let force_y = map(g, 0, 255, -1, 1);

    if (force_x < 0.005 && force_x > -0.005 && force_y < 0.005 && force_y > -0.005) {
        force_x = 0;
        force_y = 0;
    }

    return createVector(force_x, force_y);
}

function getWaterResistance(acceleration) {
    let resistance = acceleration.copy();
    resistance.mult(-1);
    resistance.normalize();
    resistance.mult(0.1);
    return resistance;
}
