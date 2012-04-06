/* <copyright>
This file contains proprietary software owned by Motorola Mobility, Inc.<br/>
No rights, expressed or implied, whatsoever to this software are provided by Motorola Mobility, Inc. hereunder.<br/>
(c) Copyright 2011 Motorola Mobility, Inc.  All Rights Reserved.
</copyright> */

//BaseDocument Object for all files types and base class for HTML documents.

var Montage = 	require("montage/core/core").Montage,
	Component = require("montage/ui/component").Component;

var TextDocument = exports.TextDocument = Montage.create(Component, {
	
	
	//TODO: Clean up, test
	
	
	
	
	
	////////////////////////////////////////////////////////////////////
	////////////////////////////////////////////////////////////////////
	////////////////////////////////////////////////////////////////////
	////////////////////////////////////////////////////////////////////
	//Taken from text-document, which shouldn't be needed

	// PRIVATE MEMBERS
    _codeEditor: {
        value: {
            "editor": { value: null, enumerable: false }

        }
    },

    _editor: { value: null, enumerable: false },
    _hline: { value: null, enumerable: false },

    _textArea: {value: null, enumerable: false },
	
	_userDocument: {value: null, enumerable: false },
	
    _source: { value: null, enumerable: false},

    source: {
        get: function() { return this._source;},
        set: function(value) { this._source = value;}
    },

    // PUBLIC MEMBERS

    _savedLeftScroll: {value:null},
    _savedTopScroll: {value:null},

    //****************************************//
    //PUBLIC API


    // GETTERS / SETTERS

    savedLeftScroll:{
        get: function() { return this._savedLeftScroll; },
        set: function(value) { this._savedLeftScroll = value}
    },

    savedTopScroll:{
        get: function() { return this._savedTopScroll; },
        set: function(value) { this._savedTopScroll = value}
    },

    textArea: {
        get: function() { return this._textArea; },
        set: function(value) { this._textArea = value; }
    },
    editor: {
        get: function() { return this._editor; },
        set: function(value) { this._editor = value}
    },

    hline: {
        get: function() { return this._hline; },
        set: function(value) {this._hline = value; }
    },

    
    ////////////////////////////////////////////////////////////////////
	//
    initialize: {
    	value: function(file, uuid, textArea, container, callback) {
        	//
			this._userDocument = file;
			//
			this.init(file.name, file.uri, file.extension, container, uuid, callback);
	        //
    	    this.currentView = "code";
        	this.textArea = textArea;
        }
    },
    ////////////////////////////////////////////////////////////////////
    //
	save: {
		enumerable: false,
    	value: function () {
    		//TODO: Improve sequence
    		this.editor.save();
    		return {mode: this._userDocument.extension, document: this._userDocument, content: this.textArea.value};
    	}
	},
	////////////////////////////////////////////////////////////////////
	////////////////////////////////////////////////////////////////////
	////////////////////////////////////////////////////////////////////
	////////////////////////////////////////////////////////////////////
	
	
	
	
	
	
	
	
	
	
    /** Private Members **/
    _name:          { value: null, enumerable: false },
    _uri:           { value: null, enumerable: false },
    _documentType:  { value: null, enumerable: false },
    _container:     { value: null, enumerable: false },
    _uuid:          { value: null, enumerable: false },
    _isActive:      { value: true, enumerable: false },
    _needsSave:     { value: false, enumarable: false },
    _callback:      { value: null, enumerable: false },
    _currentView:   { value: null, enumerable: false},

    /** Getters/Setters **/
    name: {
        get: function() { return this._name; },
        set: function(value) { this._name = value; }
    },

    uri: {
        get: function() { return this._uri; },
        set: function(value) { this._uri = value; }
    },

    documentType: {
        get: function() { return this._documentType; },
        set: function(value) { this._documentType = value;  }
    },

    container: {
        get: function() { return this._container; },
        set: function(value) { this._container = value; }
    },

    uuid: {
        get: function() { return this._uuid; },
        set: function(value) { this._uuid = value; }
    },

    isActive: {
        get: function() { return this._isActive; },
        set: function(value) { this._isActive = value; }
    },

    needsSave: {
        get: function() { return this._needsSave; },
        set: function(value) {
            this._needsSave = value;
        }
    },

    callback: {
        get: function() { return this._callback; },
        set: function(value) { this._callback = value; }
    },

    currentView: {
        get: function() { return this._currentView; },
        set: function(value) { this._currentView = value }
    },

    /** Base Methods **/
    init: {
        value: function(name, uri, type, container, uuid, callback) {
            this.name = name;
            this.uri = uri;
            this.documentType = type;
            this.container = container;
            this.uuid = uuid;
            this.callback = callback;
        }
    },

    loadDocument: {
        value: function() {
            // Have the XHR here?
        }
    }
});