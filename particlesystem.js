/*
    ParticleSystem.js | 
    --------
    This class handles the initialise and simulation of particle systems
*/

class ParticleSystem 
{
    // constructer | initialise particle system
    constructor(name, num_particles, scene) 
    {
        // initialise variables
        this.numParticles = num_particles;

        // setup particle system
        this.particleSystem = new BABYLON.ParticleSystem(name, this.numParticles, scene);
        this.particleSystem.blendMode = BABYLON.ParticleSystem.BLENDMODE_ONEONE;
        this.particleSystem.gravity = new BABYLON.Vector3(0, -9.81, 0);
        this.particleSystem.direction1 = new BABYLON.Vector3(-7, 8, 3);
        this.particleSystem.direction2 = new BABYLON.Vector3(7, 8, -3);
        this.particleSystem.minAngularSpeed = 0;
        this.particleSystem.maxAngularSpeed = Math.PI;
    }

    // set the rate of particle emission
    setEmissionRate(rate) {
        this.particleSystem.emitRate = rate;
    }

    // set the speed in which the particles emit
    setSpeed(speed) {
        this.particleSystem.minEmitPower = 1;
        this.particleSystem.maxEmitPower = 3;
        this.particleSystem.updateSpeed = speed; 
    }

    // set the minimum and maximum lifetime of the particle system
    setLifetime(min, max) {
        this.particleSystem.minLifeTime = min;
        this.particleSystem.maxLifeTime = max;
    }

    // set the minimum and maximum size of the particles
    setMinMaxSize(min, max) {
        this.particleSystem.minSize = min;
        this.particleSystem.maxSize = max;
    }

    // choose a obj or location to emit the particles from
    EmitFrom(obj) {
        this.particleSystem.emitter = obj; 
        this.particleSystem.minEmitBox = new BABYLON.Vector3(-1, 0, 0); 
        this.particleSystem.maxEmitBox = new BABYLON.Vector3(1, 0, 0);
    }

    // load in the particle texture
    loadParticleTexture(url, scene) {
        this.particleSystem.particleTexture = new BABYLON.Texture(url, scene);
    }

    // simulate the particles
    simulate() { this.particleSystem.start(); }
}