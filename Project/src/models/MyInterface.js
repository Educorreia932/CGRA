/**
* MyInterface
* @constructor
*/
class MyInterface extends CGFinterface {
    constructor() {
        super();
    }

    init(application) {
        // call CGFinterface init
        super.init(application);
        // init GUI. For more information on the methods, check:
        // http://workshop.chromeexperiments.com/examples/gui
        this.gui = new dat.GUI();
        
        var obj = this;

        //Checkbox element in GUI
        this.gui.add(this.scene, 'displayAxis').name('Display Axis');

        this.gui.add(this.scene.vehicle, 'vehicleFriction').name('Apply Friction');

        this.gui.add(this.scene.vehicle, 'speedFactor', 0.1, 3.0).name('Speed Factor');
        this.gui.add(this.scene, 'vehicleScaleFactor', 0.1, 3.0).name('Vehicle Scale');

        this.gui.add(this.scene, 'numSlices').name('Number of Slices').onChange(this.scene.updateComplexity.bind(this.scene));
        this.gui.add(this.scene, 'selectedCube', this.scene.cubeIds).name('Selected Cube texture').onChange(this.scene.updateCubeTexture.bind(this.scene));
        this.gui.add(this.scene, 'selectedObject', this.scene.objectList).name('Selected Object');

        this.initKeys();

        return true;
    }

    initKeys() {
        // create reference from the scene to the GUI
        this.scene.gui=this;
        // disable the processKeyboard function
        this.processKeyboard=function(){};
        // create a named array to store which keys are being pressed
        this.activeKeys={};
    }

    processKeyDown(event) {
        // called when a key is pressed down
        // mark it as active in the array
        this.activeKeys[event.code]=true;
    };
    
    processKeyUp(event) {
        // called when a key is released, mark it as inactive in the array
        this.activeKeys[event.code]=false;
    };
        
    isKeyPressed(keyCode) {
        // returns true if a key is marked as pressed, false otherwise
        return this.activeKeys[keyCode] || false;
    }
        
        
}