class Camera {
    constructor(scene, canvas) 
    {
        this.camera = new BABYLON.FreeCamera("game_camera", new BABYLON.Vector3(0, 5, -15), scene);
        this.camera.mode = BABYLON.Camera.ORTHOGRAPHIC_CAMERA;
        var ratio = window.innerWidth / window.innerHeight;
        var zoom = this.camera.orthoTop;
        var newWidth = zoom * ratio;
        this.camera.orthoTop = newWidth;
        this.camera.orthoLeft = -Math.abs(zoom);
        this.camera.orthoRight = newWidth;
        this.camera.orthoBottom = -Math.abs(zoom);
        this.camera.attachControl(canvas, true);
        this.camera.inputs.clear();
    }

    setFov(fov_val) {
        this.camera.fov = fov_val;
    }
}