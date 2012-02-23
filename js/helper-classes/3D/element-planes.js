/* <copyright>
This file contains proprietary software owned by Motorola Mobility, Inc.<br/>
No rights, expressed or implied, whatsoever to this software are provided by Motorola Mobility, Inc. hereunder.<br/>
(c) Copyright 2011 Motorola Mobility, Inc.  All Rights Reserved.
</copyright> */

///////////////////////////////////////////////////////////////////////
// Class ElementPlanes
//      This class represents the 5 planes generated by an element
//      in the world - the face itself, and one plane going back in Z
//      for each side of the element.  Lines drawn will clip against
//      those 5 planes.
///////////////////////////////////////////////////////////////////////
var viewUtils = require("js/helper-classes/3D/view-utils").ViewUtils,
    vecUtils = require("js/helper-classes/3D/vec-utils").VecUtils,
    Rectangle = require("js/helper-classes/3D/rectangle").Rectangle;

var ElementPlanes = exports.ElementPlanes = Object.create(Object.prototype, {
    ///////////////////////////////////////////////////////////////////////
    // Instance variables
    ///////////////////////////////////////////////////////////////////////

    // maintain a back pointer to the original element
    _elt: { value: null, writable: true },

    // the 4 3D boundary points in world space
    _boundaryPts: { value: null, writable: true },

    // the 2D boundary rectangle.  Used for quick rejection tests.
    _rect: { value: null, writable: true },
    _zMin: { value: 0, writable: true },
    _zMax: { value: 0, writable: true },

    // keep a flag indicating that the element is back facing
    _backFacing: { value: false, writable: true },

    // cache the normal
    _planeEq: { value: null, writable: true },

    ///////////////////////////////////////////////////////////////////////
    // Property accessors
    ///////////////////////////////////////////////////////////////////////
    setElement: { value: function( elt )       {  this._elt = elt;             } },
    getElement: { value: function()            {  return this._elt;            } },

    getPlaneEq: { value: function()            {  return this._planeEq.slice(0);  } },
    setPlaneEq: { value: function(p)           {  this._planeEq = p;           } },

    getRectangle: { value: function()            {  return this._rect;           } },
    getBoundaryPoints: { value: function()            {  return this._boundaryPts;    } },
    isBackFacing: { value: function()            {  return this._backFacing;     } },

    getZMin: { value: function()            {  return this._zMin;           } },
    getZMax: { value: function()            {  return this._zMax;           } },

    ///////////////////////////////////////////////////////////////////////
    // Methods
    ///////////////////////////////////////////////////////////////////////
    init: {
        value: function()
        {
            if (this._elt)
            {
                // get the 3D boundary points
                var elt = this._elt;
                this._boundaryPts = viewUtils.getElementViewBounds3D( elt );
                //var mat = viewUtils.getMatrixFromElement( elt );

                var tmpMat = viewUtils.getLocalToGlobalMatrix( elt );
                for (var i=0;  i<4;  i++)
                {
//                this._boundaryPts[i] = viewUtils.localToGlobal(this._boundaryPts[i], elt );
                    this._boundaryPts[i] = viewUtils.localToGlobal2(this._boundaryPts[i], tmpMat);
                }

                // set the backfacing flag based on the direction of the normal
                // for the purposes of stage drawing, we use a left-handed coordinate system
                // (as opposed to the left-handed system used in the browser).  With that
                // assumption, the points are specified counterclockwise on the stage, producing
                // a negative Z for the normal, hence a positive Z implies back facing.
                var nrm = this.computeNormal();
                this._backFacing = false;
                if (nrm[2] > 0)
                    this._backFacing = true;
                else
                    MathUtils.negate( nrm );

                // create the plane equation
                //var d = -( nrm.dot( this._boundaryPts[0]) );
                var d = -vecUtils.vecDot(3, nrm, this._boundaryPts[0]);
                var planeEq = Vector.create( [nrm[0], nrm[1], nrm[2], d] );
                this.setPlaneEq( planeEq );

                // get the 2D rectangle
                var rect = Object.create(Rectangle, {});
                rect.setLeft( this._boundaryPts[0][0] );
                rect.setTop( this._boundaryPts[0][1] );
                rect.setRight( this._boundaryPts[0][0] );
                rect.setBottom( this._boundaryPts[0][1] );
                this._zMin = this._boundaryPts[0][2];
                this._zMax = this._boundaryPts[0][2];
                for (var i=1;  i<4;  i++)
                {
                    rect.unionPoint( this._boundaryPts[i] );
                    var z = this._boundaryPts[i][2];
                    if (z < this._zMin)  this._zMin = z;
                    if (z > this._zMax)  this._zMax = z;
                }
                this._rect = rect;
            }
        }
    },

    computeNormal: {
        value: function()
        {
            var xPts = new Array(),  yPts = new Array(),  zPts = new Array();
            var n = this._boundaryPts.length;
            for (var i=0;  i<n;  i++)
            {
                var pt = this._boundaryPts[i];
                xPts.push( pt[0] );
                yPts.push( pt[1] );
                zPts.push( pt[2] );
            }
            var nrm = MathUtils.getPolygonNormal( n, xPts, yPts, zPts );

            return nrm;
        }
    }

});


