/*
    Main.js | 
    --------
    This class handles the initialise and compilation of the game itself.
    All classes get filtered into the main.
*/

// Immediately-Invoked Function Expression
$(function() { 
    var canvas = document.getElementById("glCanvas");
    var engine = new BABYLON.Engine(canvas, true);

    // variables
    var player_score = 0;
    var game_speed = 4;

    // initialise the game (create the scene, menu, play audio, etc)
    var initialiseGame = function() 
    {
        // initialise the scene
        var scene = new BABYLON.Scene(engine);
        scene.clearColor = new BABYLON.Color3(1.0, 0.69, 0.35);
        let gravityVector = new BABYLON.Vector3(0,-9.81, 0);
        let physicsPlugin = new BABYLON.CannonJSPlugin();
        scene.enablePhysics(gravityVector, physicsPlugin);
        scene.getPhysicsEngine().setTimeStep(1 / game_speed);

        // audio
        let music = new BABYLON.Sound("Music", "audio/bgm.wav", scene, null, { loop: true, autoplay: true });
        music.setVolume(0.1);

        // input
        handleInput(scene);

        // initialise camera
        let camera = new Camera(scene, canvas);

        // materials
        let ball_material = new BABYLON.StandardMaterial("myMaterial", scene);
        ball_material.diffuseColor = new BABYLON.Color3(1, 0, 1);
        ball_material.emissiveColor = new BABYLON.Color3(1, 1, 1);

        // ball 
        let ball = BABYLON.MeshBuilder.CreateSphere("mySphere", {diameter: 32, diameterX: 32}, scene);
        ball.material = ball_material;
        ball.position.y = 200;
        ball.physicsImpostor = new BABYLON.PhysicsImpostor(ball, BABYLON.PhysicsImpostor.SphereImpostor, { mass: 1, restitution: 0.9 }, scene);

        // the trail for the ball
        let trail = new ParticleSystem("trail", 2000, scene);
        trail.loadParticleTexture("textures/flare.png", scene);
        trail.EmitFrom(ball);
        trail.setMinMaxSize(5.0, 50.0);
        trail.setLifetime(0.03, 0.08);
        trail.setEmissionRate(1500);
        trail.setSpeed(0.005);
        trail.simulate();

        // initialise the level
        let lvl = new Level();
        lvl.init();
        
        // create the UI
        let ui_interface = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI");
        let scoretxt = new BABYLON.GUI.TextBlock();
        scoretxt.text = "" + player_score;
        scoretxt.color = "white";
        scoretxt.fontSize = 100;
        scoretxt.alpha = 0.3;            
        ui_interface.addControl(scoretxt);
 
        // update level and check for intersections
        scene.registerBeforeRender(function () {
            lvl.update();
 
            if(ball.intersectsMesh(lvl.platform)) {        
                 ball.physicsImpostor.applyImpulse(new BABYLON.Vector3(Math.floor(BABYLON.Scalar.RandomRange(-5, 5)), 70, 0), ball.getAbsolutePosition());
                 player_score++;   
                 scoretxt.text = "" + player_score;
            }
            if(ball.position.y <= -875) {
                lvl.lock_movement = true;
                scoretxt.fontSize = 350;
            }
        });

        // return the scene
        return scene;
    }

    // call the initialiseGame function
    var scene = initialiseGame();

    // render the scene
    engine.runRenderLoop(function() {
        scene.render();
    });

    // listen for resizing events
    window.addEventListener("resize", function() {
        engine.resize();
    });
});