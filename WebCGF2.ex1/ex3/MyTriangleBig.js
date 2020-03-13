class MyTriangleBig extends CGFobject {
	constructor(scene) {
		super(scene);
		this.initBuffers();
	}
	initBuffers() {
		this.vertices = [
            -2, 0, 0,
            0, 2 ,0,
            2, 0, 0
		];

		//Counter-clockwise reference of vertices
		this.indices = [
			0, 2, 1
		];

		// Generating normals
        this.normals = [];

        for (var i = 0; i < 4; i++) {
            this.normals.push(0, 0, 1);
        }

		//The defined indices (and corresponding vertices)
		//will be read in groups of three to draw triangles
		this.primitiveType = this.scene.gl.TRIANGLES;

		this.initGLBuffers();
	}
}
