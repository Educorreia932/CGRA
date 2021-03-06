
const SupplyStates = {
		INACTIVE: 0,
		FALLING: 1,
		LANDED: 2
};

class MySupply extends CGFobject {

	constructor(scene) {
		super(scene);
		this.quad = new MyQuad(scene);

		this.state = SupplyStates.INACTIVE;

		this.pos = vec3.fromValues(0.0,0.0,0.0);

		this.speed = 0.0;

		this.timeCount = 0.0;

		this.oldTime = 0.0;

		this.orientation = 0.0;

		
		this.materialSide = new CGFappearance(this.scene);
		this.materialSide.setAmbient(0.1, 0.1, 0.1, 1);
        this.materialSide.setDiffuse(0.9, 0.9, 0.9, 1);
        this.materialSide.setSpecular(0.1, 0.1, 0.1, 1);
        this.materialSide.setShininess(10.0);
		this.materialSide.loadTexture('images/bigmac2.png');		
		
		this.materialTop = new CGFappearance(this.scene);
		this.materialTop.setAmbient(0.1, 0.1, 0.1, 1);
        this.materialTop.setDiffuse(0.9, 0.9, 0.9, 1);
        this.materialTop.setSpecular(0.1, 0.1, 0.1, 1);
        this.materialTop.setShininess(10.0);
		this.materialTop.loadTexture('images/bigmac2.png');	

		this.materialBottom = new CGFappearance(this.scene);
		this.materialBottom.setAmbient(0.1, 0.1, 0.1, 1);
        this.materialBottom.setDiffuse(0.9, 0.9, 0.9, 1);
        this.materialBottom.setSpecular(0.1, 0.1, 0.1, 1);
        this.materialBottom.setShininess(10.0);
		this.materialBottom.loadTexture('images/bigmac2.png');	
	}

	drop(dropPosition, orient) {
		this.orientation = orient;
		this.pos = dropPosition;
		this.speed = (this.pos[1] - 0.01) / 3.0;
		this.state = SupplyStates.FALLING;
		this.oldTime = new Date().getTime();
	}

	update(t) {
		var x = this.pos[0];
		
		var z = this.pos[2];

		var tSeconds = (t/1000.0) - (this.oldTime/1000.0);
		var left = 0;
		
		if(this.state == SupplyStates.FALLING) {
			this.timeCount += tSeconds;

			
			if(this.timeCount >= 3.0) {
				left = this.timeCount - 3.0;
				this.timeCount = 3.0;
				this.land();
			}
			var y = this.pos[1];
			y -= (tSeconds-left) * this.speed;
			this.pos = vec3.fromValues(x, y, z);
				
		}
		this.oldTime = t;	
	}

	land() {
		if(this.pos[1] <= 0.1) {
			//random small offset so the boxes don't clip on each other
			this.pos = vec3.fromValues(this.pos[0], this.pos[1] + (Math.random()/100.0), this.pos[2]);
			this.state = SupplyStates.LANDED;
		}
	}

	reset() {
		this.pos = vec3.fromValues(0.0, 0.0, 0.0);
		this.speed = 0.0;
		this.state = SupplyStates.INACTIVE;
		this.timeCount = 0.0;
	}

	display() {
		if(this.state == SupplyStates.FALLING) 
			this.displayFall();
		else if(this.state == SupplyStates.LANDED) 
			this.displayLand();
	}

	displayFall() {
		this.scene.pushMatrix();
		this.scene.translate(this.pos[0], this.pos[1], this.pos[2]);
		this.scene.rotate(this.orientation, 0, 1, 0);

		this.scene.pushMatrix(); 
		this.scene.rotate(-Math.PI/2, 1, 0, 0);
		this.scene.translate(0, 0, 0.5);
		this.materialTop.apply();
		this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
		this.quad.display();
		this.scene.popMatrix();

		this.scene.pushMatrix(); 
		this.scene.translate(0, 0, 0.5);
		this.materialSide.apply();
		this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
		this.quad.display();
		this.scene.popMatrix();

		this.scene.pushMatrix(); 
		this.scene.rotate(Math.PI/2, 1, 0, 0);
		this.scene.translate(0, 0, 0.5);
		this.materialBottom.apply();
		this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
		this.quad.display();
		this.scene.popMatrix();

		this.scene.pushMatrix(); 
		this.scene.rotate(Math.PI, 0, 1, 0);
		this.scene.translate(0, 0, 0.5);
		this.materialSide.apply();
		this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
		this.quad.display();
		this.scene.popMatrix();

		this.scene.pushMatrix(); 
		this.scene.rotate(Math.PI/2, 0, 1, 0);
		this.scene.translate(0, 0, 0.5);
		this.materialSide.apply();
		this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
		this.quad.display();
		this.scene.popMatrix();

		this.scene.pushMatrix(); 
		this.scene.rotate(-Math.PI/2, 0, 1, 0);
		this.scene.translate(0, 0, 0.5);
		this.materialSide.apply();
		this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
		this.quad.display();
		this.scene.popMatrix();

		this.scene.popMatrix();
	}

	displayLand() {
		this.scene.pushMatrix();
		this.scene.translate(this.pos[0], this.pos[1], this.pos[2]);
		this.scene.rotate(this.orientation, 0, 1, 0);

		this.scene.pushMatrix();
		this.scene.translate(2, 0, 0);
		this.scene.rotate(Math.PI/2, 1, 0, 0);
		this.materialTop.apply();
		this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
		this.quad.display();
		this.scene.popMatrix();

		this.scene.pushMatrix(); 
		this.scene.translate(-1, 0, 0);
		this.scene.rotate(Math.PI/2, 0, 0, 1);
		this.scene.rotate(Math.PI/2, 0, 1, 0);
		this.materialSide.apply();
		this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
		this.quad.display();
		this.scene.popMatrix();

		this.scene.pushMatrix(); 
		this.scene.translate(0, 0, 0);
		this.scene.rotate(Math.PI/2, 1, 0, 0);
		this.materialBottom.apply();
		this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
		this.quad.display();
		this.scene.popMatrix();

		this.scene.pushMatrix(); 
		this.scene.translate(1, 0, 0);
		this.scene.rotate(-Math.PI/2, 0, 0, 1);
		this.scene.rotate(Math.PI/2, 0, 1, 0);
		this.materialSide.apply();
		this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
		this.quad.display();
		this.scene.popMatrix();

		this.scene.pushMatrix(); 
		this.scene.translate(0, 0, -1);
		this.scene.rotate(-Math.PI/2, 1, 0, 0);
		this.materialSide.apply();
		this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
		this.quad.display();
		this.scene.popMatrix();

		this.scene.pushMatrix(); 
		this.scene.translate(0, 0, 1);
		this.scene.rotate(Math.PI/2, 1, 0, 0);
		this.materialSide.apply();
		this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
		this.quad.display();
		this.scene.popMatrix();

		this.scene.popMatrix();
	}
	
	
}

