#ifdef GL_ES
precision highp float;
#endif

varying vec2 vTextureCoord;

uniform sampler2D uSampler;

uniform float nSupplies;

varying vec4 textx;

void main() {
	//vec4 color = texture2D(uSampler, vTextureCoord);
	vec4 color;
	//vec4 filter = texture2D(uSampler2, vec2(0.0,0.1)+vTextureCoord);

	//if (filter.b > 0.5)
	//	color=vec4(0.52, 0.18, 0.11, 1.0);
	//float textx = vTextureCoord[0];
	
	if((textx.x + 0.5) < (nSupplies*0.2)) {
		color = vec4(1.0 - (textx.x + 0.5), textx.x + 0.5, 0, 1.0);
	}
	else {
		color = vec4(0.5, 0.5, 0.5, 1.0);
	}
	
	gl_FragColor = color;
}