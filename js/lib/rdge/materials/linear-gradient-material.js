/* <copyright>
 This file contains proprietary software owned by Motorola Mobility, Inc.<br/>
 No rights, expressed or implied, whatsoever to this software are provided by Motorola Mobility, Inc. hereunder.<br/>
 (c) Copyright 2011 Motorola Mobility, Inc.  All Rights Reserved.
 </copyright> */

var MaterialParser = require("js/lib/rdge/materials/material-parser").MaterialParser;
var Material = require("js/lib/rdge/materials/material").Material;

var LinearGradientMaterial = function LinearGradientMaterial() {
    ///////////////////////////////////////////////////////////////////////
    // Instance variables
    ///////////////////////////////////////////////////////////////////////
    this._name = "LinearGradientMaterial";
    this._shaderName = "linearGradient";

    this._color1 = [1, 0, 0, 1];
    this._color2 = [0, 1, 0, 1];
    this._color3 = [0, 0, 1, 1];
    this._color4 = [0, 1, 1, 1];
    this._colorStop1 = 0.0;
    this._colorStop2 = 0.3;
    this._colorStop3 = 0.6;
    this._colorStop4 = 1.0;
    //	this._colorCount	= 4;
    this._angle = 0.0; // the shader takes [cos(a), sin(a)]

    ///////////////////////////////////////////////////////////////////////
    // Property Accessors
    ///////////////////////////////////////////////////////////////////////
    this.getShaderName = function () {
        return this._shaderName;
    };

    this.getName = function () {
        return this._name;
    };

    this.getColor1 = function () {
        return this._color1;
    };

    this.setColor1 = function (c) {
        this._color1 = c.slice();

        if (this._shader && this._shader['default']) {
            this._shader['default'].u_color1.set(c);
        }
    };

    this.getColor2 = function () {
        return this._color2;
    };

    this.setColor2 = function (c) {
        this._color2 = c.slice();

        if (this._shader && this._shader['default']) {
            this._shader['default'].u_color2.set(c);
        }
    };

    this.getColor3 = function () {
        return this._color3;
    };

    this.setColor3 = function (c) {
        this._color3 = c.slice();

        if (this._shader && this._shader['default']) {
            this._shader['default'].u_color3.set(c);
        }
    };

    this.getColor4 = function () {
        return this._color4;
    };

    this.setColor4 = function (c) {
        this._color4 = c.slice();

        if (this._shader && this._shader['default']) {
            this._shader['default'].u_color4.set(c);
        }
    };

    this.getColorStop1 = function () {
        return this._colorStop1;
    };

    this.setColorStop1 = function (s) {
        this._colorStop1 = s;

        if (this._shader && this._shader['default']) {
            this._shader['default'].u_colorStop1.set([s]);
        }
    };

    this.getColorStop2 = function () {
        return this._colorStop2;
    };

    this.setColorStop2 = function (s) {
        this._colorStop2 = s;

        if (this._shader && this._shader['default']) {
            this._shader['default'].u_colorStop2.set([s]);
        }
    };

    this.getColorStop3 = function () {
        return this._colorStop3;
    };

    this.setColorStop3 = function (s) {
        this._colorStop3 = s;

        if (this._shader && this._shader['default']) {
            this._shader['default'].u_colorStop3.set([s]);
        }
    };

    this.getColorStop4 = function () {
        return this._colorStop4;
    };

    this.setColorStop4 = function (s) {
        this._colorStop4 = s;

        if (this._shader && this._shader['default']) {
            this._shader['default'].u_colorStop4.set([s]);
        }
    };

    //	this.getColorCount	= function()	{  return this._colorCount;		};
    //	this.setColorCount	= function(c)	{  this._colorCount = c;
    //												if (this._shader && this._shader['default'])
    //													this._shader['default'].u_colorCount.set([c]);
    //										};

    this.getAngle = function () {
        return this._angle;
    };

    this.setAngle = function (a) {
        this._angle = a;

        if (this._shader && this._shader['default']) {
            this._shader['default'].u_cos_sin_angle.set([Math.cos(a), Math.sin(a)]);
        }
    };

    this.isAnimated = function () {
        return false;
    };

    ///////////////////////////////////////////////////////////////////////
    // Material Property Accessors
    ///////////////////////////////////////////////////////////////////////
    this._propNames = ["color1", "color2", "color3", "color4", "colorStop1", "colorStop2", "colorStop3", "colorStop4", "angle"];
    this._propLabels = ["Color 1", "Color 2", "Color 3", "Color 4", "Color Stop 1", "Color Stop 2", "Color Stop 3", "Color Stop 4", "Angle"];
    this._propTypes = ["color", "color", "color", "color", "float", "float", "float", "float", "float"];
    this._propValues = [];

    this._propValues[this._propNames[0]] = this._color1.slice(0);
    this._propValues[this._propNames[1]] = this._color2.slice(0);
    this._propValues[this._propNames[2]] = this._color3.slice(0);
    this._propValues[this._propNames[3]] = this._color4.slice(0);

    this._propValues[this._propNames[4]] = this._colorStop1;
    this._propValues[this._propNames[5]] = this._colorStop2;
    this._propValues[this._propNames[6]] = this._colorStop3;
    this._propValues[this._propNames[7]] = this._colorStop4;

    this._propValues[this._propNames[8]] = this._angle;

    this.setProperty = function (prop, value) {
        if (prop === "color") prop = "color1";

        // make sure we have legitimate imput
        var ok = this.validateProperty(prop, value);
        if (!ok) {
            console.log("invalid property in Linear Gradient Material" + prop + " : " + value);
        }

        switch (prop) {
            case "color1": this.setColor1(value); break;
            case "color2": this.setColor2(value); break;
            case "color3": this.setColor3(value); break;
            case "color4": this.setColor4(value); break;
            case "colorStop1": this.setColorStop1(value); break;
            case "colorStop2": this.setColorStop2(value); break;
            case "colorStop3": this.setColorStop3(value); break;
            case "colorStop4": this.setColorStop4(value); break;
            case "angle": this.setAngle(value); break;
        }
    };

    ///////////////////////////////////////////////////////////////////////
    // Methods
    ///////////////////////////////////////////////////////////////////////
    // duplcate method requirde
    this.dup = function ()
	{
	     // get the current values;
        var propNames = [], propValues = [], propTypes = [], propLabels = [];
        this.getAllProperties(propNames, propValues, propTypes, propLabels);
        
        // allocate a new material
        var newMat = new LinearGradientMaterial();

		// copy over the current values;
        var n = propNames.length;
        for (var i = 0; i < n; i++)
            newMat.setProperty(propNames[i], propValues[i]);

        return newMat;
	}


    this.init = function (world) {
        this.setWorld(world);

        // set up the shader
        this._shader = new RDGE.jshader();
        this._shader.def = linearGradientMaterialDef;
        this._shader.init();

        // set up the material node
        this._materialNode = RDGE.createMaterialNode(this.getShaderName() + "_" + world.generateUniqueNodeID());
        this._materialNode.setShader(this._shader);

        // send the current values to the shader
        this.updateShaderValues();

        //console.log( "**** LinearGradientMaterial initialized" );
    };

    this.updateShaderValues = function () {
        if (this._shader && this._shader['default']) {
            //this._shader['default'].u_colorCount.set( [4] );

            var c;
            c = this.getColor1();
            this._shader['default'].u_color1.set(c);
            c = this.getColor2();
            this._shader['default'].u_color2.set(c);
            c = this.getColor3();
            this._shader['default'].u_color3.set(c);
            c = this.getColor4();
            this._shader['default'].u_color4.set(c);

            var s;
            s = this.getColorStop1();
            this._shader['default'].u_colorStop1.set([s]);
            s = this.getColorStop2();
            this._shader['default'].u_colorStop2.set([s]);
            s = this.getColorStop3();
            this._shader['default'].u_colorStop3.set([s]);
            s = this.getColorStop4();
            this._shader['default'].u_colorStop4.set([s]);

            this.setAngle(this.getAngle());
        }
    };

    this.exportJSON = function () {
        var jObj =
		{
		    'material': this.getShaderName(),
		    'name': this.getName(),
		    'color1': this.getColor1(),
		    'color2': this.getColor2(),
		    'color3': this.getColor3(),
		    'color4': this.getColor4(),
		    'colorStop1': this.getColorStop1(),
		    'colorStop2': this.getColorStop2(),
		    'colorStop3': this.getColorStop3(),
		    'colorStop4': this.getColorStop4(),
		    'angle': this.getAngle()
		};

        return jObj;
    };

    this.importJSON = function (jObj) {
        if (this.getShaderName() != jObj.material) throw new Error("ill-formed material");
        this.setName(jObj.name);

        try {
            var color1 = jObj.color1,
				color2 = jObj.color2,
				color3 = jObj.color3,
				color4 = jObj.color4,
				colorStop1 = jObj.colorStop1,
				colorStop2 = jObj.colorStop2,
				colorStop3 = jObj.colorStop3,
				colorStop4 = jObj.colorStop4,
				angle = jObj.angle;

            this.setProperty("color1", color1);
            this.setProperty("color2", color2);
            this.setProperty("color3", color3);
            this.setProperty("color4", color4);
            this.setProperty("colorStop1", colorStop1);
            this.setProperty("colorStop2", colorStop2);
            this.setProperty("colorStop3", colorStop3);
            this.setProperty("colorStop4", colorStop4);
            this.setProperty("angle", angle);
        }
        catch (e) {
            throw new Error("could not import material: " + importStr);
        }
    };
};

///////////////////////////////////////////////////////////////////////////////////////
// RDGE shader
 
// shader spec (can also be loaded from a .JSON file, or constructed at runtime)
var linearGradientMaterialDef =
{'shaders': 
	{
			// shader file
			'defaultVShader':"assets/shaders/linearGradient.vert.glsl",
			'defaultFShader':"assets/shaders/linearGradient.frag.glsl",
				        
			// this shader is inline
			'dirLightVShader': "\
				uniform mat4 u_mvMatrix;\
				uniform mat4 u_normalMatrix;\
				uniform mat4 u_projMatrix;\
				uniform mat4 u_worldMatrix;\
				attribute vec3	a_pos;\
				attribute vec3	a_nrm;\
				varying vec3 vNormal;\
				varying vec3 vPos;\
				void main() {\
					vNormal.xyz = (u_normalMatrix*vec4(a_nrm, 0.0)).xyz;\
					gl_Position = u_projMatrix * u_mvMatrix * vec4(a_pos,1.0);\
					vPos = (u_worldMatrix * vec4(a_pos,1.0)).xyz;\
				}",				
			'dirLightFShader': "\
				precision highp float;\
				uniform vec4 u_light1Diff;\
				uniform vec3 u_light1Pos;\
				uniform vec4 u_light2Diff;\
				uniform vec3 u_light2Pos;\
				varying vec3 vNormal;\
				varying vec3 vPos;\
				void main() {\
					vec3 light1 = vec3(u_light1Pos.x - vPos.x, u_light1Pos.y - vPos.y, u_light1Pos.z - vPos.z);\
					vec3 light2 = vec3(u_light2Pos.x - vPos.x, u_light2Pos.y - vPos.y, u_light2Pos.z - vPos.z);\
					float t = 0.75;\
					float range = t*t;\
					float alpha1 = max(0.0, 1.0 - ( (light1.x*light1.x)/range + (light1.y*light1.y)/range + (light1.z*light1.z)/range));\
					float alpha2 = max(0.0, 1.0 - ( (light2.x*light2.x)/range + (light2.y*light2.y)/range + (light2.z*light2.z)/range));\
					gl_FragColor = vec4((u_light2Diff*alpha2 + u_light1Diff*alpha1).rgb, 1.0);\
				}"
		},
		'techniques':
		{ 
			'default':
			[
				{
					'vshader' : 'defaultVShader',
					'fshader' : 'defaultFShader',
					// attributes
					'attributes' :
					{
						'vert'	:	{ 'type' : 'vec3' },
						'normal' :	{ 'type' : 'vec3' },
						'texcoord'	:	{ 'type' : 'vec2' }
					},
					// parameters
					'params' : 
					{
						'u_color1' :		{ 'type' : 'vec4' },									
						'u_color2' :		{ 'type' : 'vec4' },									
						'u_color3' :		{ 'type' : 'vec4' },									
						'u_color4' :		{ 'type' : 'vec4' },
						'u_colorStop1':		{ 'type' : 'float' },									
						'u_colorStop2':		{ 'type' : 'float' },									
						'u_colorStop3':		{ 'type' : 'float' },									
						'u_colorStop4':		{ 'type' : 'float' },									
						'u_cos_sin_angle' : { 'type' : 'vec2' }
						//'u_colorCount':		{'type' : 'int' }

					},

					// render states
					'states' : 
					{
						'depthEnable' : true,
						'offset':[1.0, 0.1]
					}
				},
				{	// light pass
					'vshader' : 'dirLightVShader',
					'fshader' : 'dirLightFShader',
					// attributes
					'attributes' :
					{
						'a_pos'	:	{ 'type' : 'vec3' },
						'a_nrm'	:	{ 'type' : 'vec3' }
					},
					// parameters
					'params' : 
					{
					},

					// render states
					'states' : 
					{
						'depthEnable' : true,
						"blendEnable" : true,
						"srcBlend" : "SRC_ALPHA",
						"dstBlend" : "DST_ALPHA"
					}
				}
			]
		}
};

LinearGradientMaterial.prototype = new Material();

if (typeof exports === "object") {
    exports.LinearGradientMaterial = LinearGradientMaterial;
}




