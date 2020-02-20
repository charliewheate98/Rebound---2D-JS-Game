/*
    Level.js | 
    --------
    This class handles creating and updating the level/gameplay flow
*/

class Level 
{
    // initialise the level
    init(scene) 
    {
        // determines whether the movement is locked
        this.lock_movement = false;

        // materials 
        var platform_material = new BABYLON.StandardMaterial("myMaterial", scene);
        platform_material.diffuseColor = new BABYLON.Color3(1, 0, 1);
        platform_material.emissiveColor = new BABYLON.Color3(1, 1, 1);

        // player/platform
        this.platform = BABYLON.MeshBuilder.CreateSphere("mySphere", {diameter: 32, diameterX: 32}, scene);
        this.platform.position.y = -325;
        this.platform.material = platform_material;

        // edge blockers
        var left = BABYLON.MeshBuilder.CreatePlane("left_blocker", {width: 64, height:900}, scene);
        left.position.x = -258;
        left.position.y = 0;
        var right = BABYLON.MeshBuilder.CreatePlane("right_blocker", {width: 64, height:900}, scene);
        right.position.x = 258;
        right.position.y = 0;
        var top = BABYLON.MeshBuilder.CreatePlane("top_blocker", {width: 500, height:64}, scene);
        top.position.y = 475;
    
        // make the edge blocks physics objects with 0 mass
        left.physicsImpostor = new BABYLON.PhysicsImpostor(left, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 0.9 }, scene);
        right.physicsImpostor = new BABYLON.PhysicsImpostor(right, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 0.9 }, scene);
        top.physicsImpostor = new BABYLON.PhysicsImpostor(top, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 1.5 }, scene);

        // make the player/platform a physics object with 0 mass so it has collision but doesnt fall 
        this.platform.physicsImpostor = new BABYLON.PhysicsImpostor(this.platform, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 0.9 }, scene);
    }

    // update the level every frame
    update() {
        if((map["a"] || map["A"]) && this.lock_movement == false) this.platform.position.x -= 8.0;
        else if((map["d"] || map["D"]) && this.lock_movement == false) this.platform.position.x += 8.0;
    }
}