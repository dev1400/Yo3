/*!
 * SAP UI development toolkit for HTML5 (SAPUI5/OpenUI5)
 * (c) Copyright 2009-2014 SAP AG or an SAP affiliate company. 
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */

/* ----------------------------------------------------------------------------------
 * Hint: This is a derived (generated) file. Changes should be done in the underlying 
 * source files only (*.control, *.js) or they will be lost after the next generation.
 * ---------------------------------------------------------------------------------- */

// Provides control sap.ui.layout.form.ResponsiveLayout.
jQuery.sap.declare("sap.ui.layout.form.ResponsiveLayout");
jQuery.sap.require("sap.ui.layout.library");
jQuery.sap.require("sap.ui.layout.form.FormLayout");


/**
 * Constructor for a new form/ResponsiveLayout.
 * 
 * Accepts an object literal <code>mSettings</code> that defines initial 
 * property values, aggregated and associated objects as well as event handlers. 
 * 
 * If the name of a setting is ambiguous (e.g. a property has the same name as an event), 
 * then the framework assumes property, aggregation, association, event in that order. 
 * To override this automatic resolution, one of the prefixes "aggregation:", "association:" 
 * or "event:" can be added to the name of the setting (such a prefixed name must be
 * enclosed in single or double quotes).
 *
 * The supported settings are:
 * <ul>
 * <li>Properties
 * <ul></ul>
 * </li>
 * <li>Aggregations
 * <ul></ul>
 * </li>
 * <li>Associations
 * <ul></ul>
 * </li>
 * <li>Events
 * <ul></ul>
 * </li>
 * </ul> 
 *
 * 
 * In addition, all settings applicable to the base type {@link sap.ui.layout.form.FormLayout#constructor sap.ui.layout.form.FormLayout}
 * can be used as well.
 *
 * @param {string} [sId] id for the new control, generated automatically if no id is given 
 * @param {object} [mSettings] initial settings for the new control
 *
 * @class
 * Renders a form with responsive layout. Internally the ResponsiveFlowLayout is used.
 * @extends sap.ui.layout.form.FormLayout
 *
 * @author SAP AG 
 * @version 1.22.7
 *
 * @constructor   
 * @public
 * @since 1.16.0
 * @name sap.ui.layout.form.ResponsiveLayout
 */
sap.ui.layout.form.FormLayout.extend("sap.ui.layout.form.ResponsiveLayout", { metadata : {

	// ---- object ----

	// ---- control specific ----
	library : "sap.ui.layout"
}});


/**
 * Creates a new subclass of class sap.ui.layout.form.ResponsiveLayout with name <code>sClassName</code> 
 * and enriches it with the information contained in <code>oClassInfo</code>.
 * 
 * <code>oClassInfo</code> might contain the same kind of informations as described in {@link sap.ui.core.Element.extend Element.extend}.
 *   
 * @param {string} sClassName name of the class to be created
 * @param {object} [oClassInfo] object literal with informations about the class  
 * @param {function} [FNMetaImpl] constructor function for the metadata object. If not given, it defaults to sap.ui.core.ElementMetadata.
 * @return {function} the created class / constructor function
 * @public
 * @static
 * @name sap.ui.layout.form.ResponsiveLayout.extend
 * @function
 */


// Start of sap\ui\layout\form\ResponsiveLayout.js
/**
 * This file defines behavior for the control,
 */

jQuery.sap.require("sap.ui.layout.ResponsiveFlowLayout");
jQuery.sap.require("sap.ui.layout.ResponsiveFlowLayoutData");

/*
 * The ResponsiveLayout for forms inside is using ResponsiveFlowLayouts to render the form.
 * There is no own rendering for FormContainers or FormElements.
 * The whole Layout has a Responsive FlowLayout inside to make the FormContainers responsive.
 * Only if there is only one FormContainer inside the Form there is no ResponsiveFlowLayout
 * for the whole layout.
 * A FormContainer is rendered as a Panel if it has a title or an expander. Inside the panel there
 * is a ResponsiveFlowLayout for the single FormElements. If the FormContainer has no title or
 * expander, just the ResponsiveFlowLayout is rendered.
 * A FormElement is rendered as ResponsiveFlowLayout to make the label and the fields responsive.
 * If the Element has a label and more than 1 Field a ResponsiveFlowLayout including the fields is rendered.
 * The Panels and ResponsiveFlowLayouts are stored in object this.mContainers. This has the following
 * structure:
 * - For each FormContainer there is an entry inside the object. (this.mContainers[FormContainerId])
 * - For each FormContainer there is an array with 3 entries:
 *   - [0]: The Panel that renders the Container (undefined if no panel is used)
 *          - It's not the standard Panel, is an special panel defined for the ResponsiveLayout
 *   - [1]: The ResponsiveFlowLayout that holds the Containers content
 *          - the getLayoutData function of this ResponsiveFlowLayouts is overwritten to get the LayoutData of the FormContainer
 *            (If no panel is used)
 *   - [2]: An object that holds the ResponsiveFlowLayouts for the FormElements:
 *          - For each FormElement there is an entry inside the object. (this.mContainers[FormElementId])
 *          - Each object includes an array with 2 entries:
 *            - [0]: The ResponsiveFlowLayout for the FormElement
 *            - [1]: If more than 1 Field and a label, here the ResponsiveFlowLayout for the fields is stored
 *          - the getContent function of this ResponsiveFlowLayouts is overwritten to get the content of the FormElement
 *          - the getLayoutData function of this ResponsiveFlowLayouts is overwritten to get the LayoutData of the FormElement
 *
 * It must be made sure to hold this object up to date. So it is filled onBeforeRendering. Entries no longer used are deleted
 *
 * In this._mainRFLayout the ResponsiveFlowLayout of the whole layout is stored. (If more than one Container.)
 */

/*
 * as the panel can not be used in mobile environment a own internal control is needed to render the containers
 * use FormContainer as association to have access to it's content directly. So no mapping of properties and aggregations needed
 */
sap.ui.core.Control.extend("sap.ui.layout.form.ResponsiveLayoutPanel", {

	metadata : {
		aggregations: {
			"content"   : {type: "sap.ui.layout.ResponsiveFlowLayout", multiple: false}
		},
		associations: {
			"container" : {type: "sap.ui.layout.form.FormContainer", multiple: false},
			"layout"    : {type: "sap.ui.layout.form.ResponsiveLayout", multiple: false}
		}
	},

	getLayoutData :  function(){

		// only ResponsiveFlowLayoutData are interesting
		var oContainer = sap.ui.getCore().byId(this.getContainer());
		var oLayout    = sap.ui.getCore().byId(this.getLayout());
		var oLD;
		if (oLayout && oContainer) {
			oLD = oLayout.getLayoutDataForElement(oContainer, "sap.ui.layout.ResponsiveFlowLayoutData");
		}
		return oLD;

	},

	getCustomData :  function(){

		var oContainer = sap.ui.getCore().byId(this.getContainer());
		if (oContainer) {
			return oContainer.getCustomData();
		}

	},

	refreshExpanded :  function(){

		var oContainer = sap.ui.getCore().byId(this.getContainer());
		if (oContainer) {
			if (oContainer.getExpanded()) {
				this.$().removeClass("sapUiRLContainerColl");
			}else {
				this.$().addClass("sapUiRLContainerColl");
			}
		}
	},

	renderer : function(oRm, oPanel) {

		var oContainer = sap.ui.getCore().byId(oPanel.getContainer());
		var oLayout    = sap.ui.getCore().byId(oPanel.getLayout());
		var oContent   = oPanel.getContent();

		if (!oContainer || !oLayout) {
			// Container might be removed, but ResponsiveFlowLayout still calls a rerendering with old content
			return;
		}

		var bExpandable = oContainer.getExpandable();
		var sTooltip = oContainer.getTooltip_AsString();

		oRm.write("<div");
		oRm.writeControlData(oPanel);
		oRm.addClass("sapUiRLContainer");
		if (bExpandable && !oContainer.getExpanded()) {
			oRm.addClass("sapUiRLContainerColl");
		}

		if (sTooltip) {
			oRm.writeAttributeEscaped('title', sTooltip);
		}
		oRm.writeClasses();
		oRm.write(">");

		// container header
		if (oContainer.getTitle()) {
			oLayout.getRenderer().renderTitle(oRm, oContainer.getTitle(), oContainer._oExpandButton, bExpandable, false, oContainer.getId());
		}

		if (oContent) {
			oRm.write("<div");
			oRm.addClass("sapUiRLContainerCont");
			oRm.writeClasses();
			oRm.write(">");
			// container is not expandable or is expanded -> render elements
			oRm.renderControl(oContent);
			oRm.write("</div>");
		}

		oRm.write("</div>");
	}

});

(function() {

	sap.ui.layout.form.ResponsiveLayout.prototype.init = function(){

		this.mContainers = {}; //association of container to panel and ResponsiveFlowLayout
		this._defaultLayoutData = new sap.ui.layout.ResponsiveFlowLayoutData({margin: false});

	};

	sap.ui.layout.form.ResponsiveLayout.prototype.exit = function(){

		var that = this;

		// clear panels
		for ( var sContainerId in this.mContainers) {
			_cleanContainer(that, sContainerId);
		}

		// clear ResponsiveFlowLayouts
		if (this._mainRFLayout) {
			this._mainRFLayout.destroy();
			delete this._mainRFLayout;
		}

		this._defaultLayoutData.destroy();
		delete this._defaultLayoutData;

	};

	sap.ui.layout.form.ResponsiveLayout.prototype.onBeforeRendering = function( oEvent ){

		var oForm = this.getParent();
		if (!oForm || !(oForm instanceof sap.ui.layout.form.Form)) {
			// layout not assigned to form - nothing to do
			return;
		}

		var that = this;
		_createPanels(that, oForm);
		_createMainResponsiveFlowLayout(that, oForm);

	};

	/*
	 * If onAfterRendering of a field is processed the width must be set to 100% (if no other width set)
	 */
	sap.ui.layout.form.ResponsiveLayout.prototype.contentOnAfterRendering = function(oFormElement, oControl){

		sap.ui.layout.form.FormLayout.prototype.contentOnAfterRendering.apply(this, arguments);

		if (oControl.getWidth && ( !oControl.getWidth() || oControl.getWidth() == "auto" ) && oControl.getMetadata().getName() != "sap.ui.commons.Image") {
			oControl.$().css("width", "100%");
		}

	};

	sap.ui.layout.form.ResponsiveLayout.prototype.toggleContainerExpanded = function(oContainer){

		//adapt the corresponding panel
		var bExpanded = oContainer.getExpanded();
		var sContainerId = oContainer.getId();
		if (this.mContainers[sContainerId] && this.mContainers[sContainerId][0]) {
			var oPanel = this.mContainers[sContainerId][0];
			oPanel.refreshExpanded();
		}

	};

	sap.ui.layout.form.ResponsiveLayout.prototype.onLayoutDataChange = function(oEvent){

		var oSource = oEvent.srcControl;

		// if layoutData changed for a Container, Element, or Field call the
		// onLayoutDataChange function of the parent ResponsiveFlowLayout

		if (oSource instanceof sap.ui.layout.form.FormContainer) {
			if (this._mainRFLayout) {
				this._mainRFLayout.onLayoutDataChange(oEvent);
			}
		}else if (oSource instanceof sap.ui.layout.form.FormElement) {
			var sContainerId = oSource.getParent().getId();
			if (this.mContainers[sContainerId] && this.mContainers[sContainerId][1]) {
				this.mContainers[sContainerId][1].onLayoutDataChange(oEvent);
			}
		}else{
			var oParent = oSource.getParent();
			if (oParent instanceof sap.ui.layout.form.FormElement) {
				var oContainer = oParent.getParent();
				var sContainerId = oContainer.getId();
				var sElementId = oParent.getId();
				if (this.mContainers[sContainerId] && this.mContainers[sContainerId][2] &&
					this.mContainers[sContainerId][2][sElementId]) {
					this.mContainers[sContainerId][2][sElementId][0].onLayoutDataChange(oEvent);
				}
			}
		}

	};

	sap.ui.layout.form.ResponsiveLayout.prototype.onsapup = function(oEvent){
		this.onsapleft(oEvent);
	};

	sap.ui.layout.form.ResponsiveLayout.prototype.onsapdown = function(oEvent){
		this.onsapright(oEvent);
	};

	var _createPanels = function( oLayout, oForm ) {

		var aContainers = oForm.getFormContainers();
		var iLength = aContainers.length;
		var iVisibleContainers = 0;
		for ( var i = 0; i < iLength; i++) {
			var oContainer = aContainers[i];
			oContainer._checkProperties();
			if (oContainer.getVisible()) {
				iVisibleContainers++;
				var sContainerId = oContainer.getId();
				var oPanel = undefined;
				var oRFLayout = undefined;
				if (oLayout.mContainers[sContainerId] && oLayout.mContainers[sContainerId][1]) {
					// ResponsiveFlowLayout already created
					oRFLayout = oLayout.mContainers[sContainerId][1];
				}else{
					oRFLayout = _createResponsiveFlowLayout(oLayout, oContainer, undefined);
				}

				var oTitle = oContainer.getTitle();
				if (oTitle || oContainer.getExpandable()) {
					// only if container has a title a panel is used
					if (oLayout.mContainers[sContainerId] && oLayout.mContainers[sContainerId][0]) {
						// Panel already created
						oPanel = oLayout.mContainers[sContainerId][0];
					}else{
						oPanel = _createPanel(oLayout, oContainer, oRFLayout);
						_changeGetLayoutDataOfResponsiveFlowLayout(oRFLayout, true);
					}
				}else{
					// panel not longer needed
					if (oLayout.mContainers[sContainerId] && oLayout.mContainers[sContainerId][0]) {
						_deletePanel(oLayout.mContainers[sContainerId][0]);
						_changeGetLayoutDataOfResponsiveFlowLayout(oRFLayout, false);
					}
				}

				var mContent = _createContent(oLayout, oContainer, oRFLayout);

				oLayout.mContainers[sContainerId] = [oPanel, oRFLayout, mContent];
			}
		}

		var iObjectLength = _objectLength(oLayout.mContainers);
		if (iVisibleContainers < iObjectLength) {
			// delete old containers panels
			for ( var sContainerId in oLayout.mContainers) {
				var bFound = false;
				for ( var i = 0; i < iLength; i++) {
					var oContainer = aContainers[i];
					if (sContainerId == oContainer.getId() && oContainer.getVisible()) {
						bFound = true;
						break;
					}
				}
				if (!bFound) {
					_cleanContainer(oLayout, sContainerId);
				}
			}
		}

	};

	var _createPanel = function( oLayout, oContainer, oRFLayout ) {

		var sContainerId = oContainer.getId();
		var oPanel = new sap.ui.layout.form.ResponsiveLayoutPanel(sContainerId+"--Panel", {
			container: oContainer,
			layout   : oLayout,
			content : oRFLayout
		});

		return oPanel;

	};

	/*
	 * clear variables before delete it
	 */
	var _deletePanel = function( oPanel ) {

		oPanel.setContent("");
		oPanel.setLayout("");
		oPanel.setContainer("");
		oPanel.destroy();
		delete oPanel;

	};

	var _createContent = function( oLayout, oContainer, oContainerLayout ) {

		var sContainerId = oContainer.getId();
		var aElements = oContainer.getFormElements();
		var iLength = aElements.length;
		var iVisibleElements = 0;
		var mRFLayouts = {};
		if (oLayout.mContainers[sContainerId] && oLayout.mContainers[sContainerId][2]) {
			mRFLayouts = oLayout.mContainers[sContainerId][2];
		}

		var oRFLayout;
		var oFieldsRFLayout;
		var iLastIndex = -1;
		for (var i = 0; i < iLength; i++) {
			var oElement = aElements[i];
			if (oElement.getVisible()) {
				var sElementId = oElement.getId();
				_checkElementMoved(oLayout, oContainer, oElement, mRFLayouts, oContainerLayout, i);
				if (mRFLayouts[sElementId]) {
					// ResponsiveFlowLayout already created
					oRFLayout = mRFLayouts[sElementId][0];
					iLastIndex = oContainerLayout.indexOfContent(oRFLayout);
				}else{
					oRFLayout = _createResponsiveFlowLayout(oLayout, oContainer, oElement);
					oRFLayout.addStyleClass("sapUiRLElement");
					if (oElement.getLabel()) {
						oRFLayout.addStyleClass("sapUiRLElementWithLabel");
					}
					mRFLayouts[sElementId] = [oRFLayout, undefined];
					iLastIndex++;
					oContainerLayout.insertContent(oRFLayout, iLastIndex);
				}

				// if more fields after a label put the fields in an additional ResponsiveFlowLayout
				var aFields = oElement.getFields();
				if (oElement.getLabel() && aFields.length > 1) {
					if (mRFLayouts[sElementId][1]) {
						oFieldsRFLayout = mRFLayouts[sElementId][1];
					} else {
						oFieldsRFLayout = _createResponsiveFlowLayout(oLayout, oContainer, oElement, true);
						oFieldsRFLayout.addStyleClass("sapUiRLElementFields");
						mRFLayouts[sElementId][1] = oFieldsRFLayout;
					}
					_updateLayoutDataOfContentResponsiveFlowLayout(oLayout, oFieldsRFLayout, aFields);
				} else {
					if (mRFLayouts[sElementId][1]) {
						// ResponsiveFlowLayout for fields not longer needed
						oFieldsRFLayout = mRFLayouts[sElementId][1];
						_deleteResponsiveFlowLayout(oFieldsRFLayout);
						mRFLayouts[sElementId][1] = undefined;
					}
				}
				iVisibleElements++;
			}
		}

		var iObjectLength = _objectLength(mRFLayouts);
		if (iVisibleElements < iObjectLength) {
			// delete old elements RFLayouts
			for ( var sElementId in mRFLayouts) {
				var bFound = false;
				for ( var i = 0; i < iLength; i++) {
					var oElement = aElements[i];
					if (sElementId == oElement.getId() && oElement.getVisible()) {
						bFound = true;
						break;
					}
				}
				if (!bFound) {
					if (mRFLayouts[sElementId][1]) {
						// ResponsiveFlowLayout for fields not longer needed
						oFieldsRFLayout = mRFLayouts[sElementId][1];
						_deleteResponsiveFlowLayout(oFieldsRFLayout);
					}
					oRFLayout = mRFLayouts[sElementId][0];
					oContainerLayout.removeContent(oRFLayout);
					_deleteResponsiveFlowLayout(oRFLayout);
					delete mRFLayouts[sElementId];
				}
			}
		}

		return mRFLayouts;

	};

	var _createResponsiveFlowLayout = function( oLayout, oContainer, oElement, bElementContent ) {

		var sId;
		if (oElement && !bElementContent) {
			sId = oElement.getId()+"--RFLayout";
		} else if (oElement && bElementContent) {
			sId = oElement.getId()+"--content--RFLayout";
		} else if (oContainer) {
			sId = oContainer.getId()+"--RFLayout";
		} else{
			return;
		}

		var oRFLayout = new sap.ui.layout.ResponsiveFlowLayout(sId);
		oRFLayout.__myParentLayout = oLayout;
		oRFLayout.__myParentContainerId = oContainer.getId();

		if (oElement) {
			oRFLayout.__myParentElementId = oElement.getId();
			// assign Elements content -> overwrite getContent function of responsiveFlowLayout
			// to not change parent assignment of controls
			if (!bElementContent) {
				oRFLayout.getContent = function(){
					var oElement = sap.ui.getCore().byId(this.__myParentElementId);
					if (oElement) {
						var aContent = new Array();
						var oLabel = oElement.getLabelControl();
						var aFields = oElement.getFields();
						if (!oLabel || aFields.length <= 1) {
							var aContent = aFields;
							if (oLabel) {
								aContent.unshift(oLabel);
							}
						}else{
							// more than one field -> put in the content RFLayout
							var oLayout = this.__myParentLayout;
							var sContainerId = this.__myParentContainerId;
							var sElementId = oElement.getId();
							if (oLabel) {
								aContent.push(oLabel);
							}
							if(oLayout.mContainers[sContainerId] && oLayout.mContainers[sContainerId][2] &&
									oLayout.mContainers[sContainerId][2][sElementId] &&
									oLayout.mContainers[sContainerId][2][sElementId][1]){
								aContent.push(oLayout.mContainers[sContainerId][2][sElementId][1]);
							}
						}

						return aContent;
					}else{
						return false;
					}
				}
			}else{
				oRFLayout.getContent = function(){
					var oElement = sap.ui.getCore().byId(this.__myParentElementId);
					if (oElement) {
						return oElement.getFields();
					}else{
						return false;
					}
				}
			}
		}

		if ((oElement && !bElementContent) || (!oElement && !oContainer.getTitle() && !oContainer.getExpandable())) {
			// use LayoutData of container only if no panel is used
			_changeGetLayoutDataOfResponsiveFlowLayout(oRFLayout, false);
		}else{
			// create LayoutData to disable margins
			oRFLayout.setLayoutData(new sap.ui.layout.ResponsiveFlowLayoutData({margin: false}));
		}

		return oRFLayout;

	};

	var _changeGetLayoutDataOfResponsiveFlowLayout = function( oRFLayout, bOriginal ) {
		// only ResponsiveFlowLayoutData are from interest
		// if none maintained use default one to disable margins

		if (bOriginal) {
			if (oRFLayout.__originalGetLayoutData) {
				oRFLayout.getLayoutData = oRFLayout.__originalGetLayoutData;
				delete oRFLayout.__originalGetLayoutData;
			}
		}else if(!oRFLayout.__originalGetLayoutData){
			oRFLayout.__originalGetLayoutData = oRFLayout.getLayoutData;
			oRFLayout.getLayoutData = function(){
				var oLayout = this.__myParentLayout;
				var oContainer = sap.ui.getCore().byId(this.__myParentContainerId);
				var oElement = sap.ui.getCore().byId(this.__myParentElementId);

				var oLD;
				if (oElement) {
					oLD = oLayout.getLayoutDataForElement(oElement, "sap.ui.layout.ResponsiveFlowLayoutData");
				}else if (oContainer) {
					oLD = oLayout.getLayoutDataForElement(oContainer, "sap.ui.layout.ResponsiveFlowLayoutData");
				}

				if (oLD) {
					return oLD;
				}else {
					return oLayout._defaultLayoutData;
				}
			};
		}

	};

	/*
	 * If a ResponsiveFlowLayout for the fields of an FormElement is used it must get the weight
	 * of all fields to have the right weight relative to the label.
	 */
	var _updateLayoutDataOfContentResponsiveFlowLayout = function( oLayout, oRFLayout, aFields ) {

		var oLD;
		var iWeight = 0;
		for ( var i = 0; i < aFields.length; i++) {
			var oField = aFields[i];
			oLD = oLayout.getLayoutDataForElement(oField, "sap.ui.layout.ResponsiveFlowLayoutData");
			if (oLD) {
				iWeight = iWeight + oLD.getWeight();
			} else {
				iWeight++;
			}
		}

		oLD = oRFLayout.getLayoutData();
		if (oLD) {
			oLD.setWeight(iWeight);
		} else {
			oRFLayout.setLayoutData(
					new sap.ui.layout.ResponsiveFlowLayoutData({weight: iWeight})
			);
		}

	};

	/*
	 * clear variables before delete it
	 */
	var _deleteResponsiveFlowLayout = function( oRFLayout ) {

		if (oRFLayout.__myParentContainerId) {
			oRFLayout.__myParentContainerId = undefined;
		}
		if (oRFLayout.__myParentElementId) {
			oRFLayout.__myParentElementId = undefined;
		}
		oRFLayout.__myParentLayout = undefined;

		oRFLayout.destroy();
		delete oRFLayout;

	};

	var _cleanContainer = function( oLayout, sContainerId ) {

		var aContainerContent = oLayout.mContainers[sContainerId];
		var oRFLayout;

		//delete Elements Content
		var oElementRFLayouts = aContainerContent[2];
		if (oElementRFLayouts) {
			for ( var sElementId in oElementRFLayouts) {
				if (oElementRFLayouts[sElementId][1]) {
					// ResponsiveFlowLayout for fields not longer needed
					_deleteResponsiveFlowLayout(oElementRFLayouts[sElementId][1]);
				}
				oRFLayout = oElementRFLayouts[sElementId][0];
				_deleteResponsiveFlowLayout(oRFLayout);
				delete oElementRFLayouts[sElementId];
			}
		}

		//delete ResponsiveFlowLayout
		oRFLayout = aContainerContent[1]
		if (oRFLayout) {
			oRFLayout.removeAllContent();
			_deleteResponsiveFlowLayout(oRFLayout);
		}

		//delete panel
		var oPanel = aContainerContent[0];
		if (oPanel) {
			_deletePanel(oPanel);
		}

		delete oLayout.mContainers[sContainerId];

	};

	var _checkElementMoved = function(oLayout, oContainer, oElement, mRFLayouts, oContainerLayout, iIndex){

		// if a Element is just moved from one Container to an other this is not recognized
		// so the ResponsiveFlowLayouts must be updated and the control object must be adjusted
		var sElementId = oElement.getId();
		var sId = sElementId+"--RFLayout";
		var oRFLayout = sap.ui.getCore().byId(sId);

		if (!mRFLayouts[sElementId] && oRFLayout) {
			// Element not maintained in control object of container but already has a RFLayout
			// find old container id
			var sOldContainerId = oRFLayout.__myParentContainerId;

			// move to new containers control object
			mRFLayouts[sElementId] = oLayout.mContainers[sOldContainerId][2][sElementId];
			oContainerLayout.insertContent(oRFLayout, iIndex);
			oRFLayout.__myParentContainerId = oContainer.getId();
			if (mRFLayouts[sElementId][1]) {
				mRFLayouts[sElementId][1].__myParentContainerId = oContainer.getId();
			}

			// delete from old container in control object
			delete oLayout.mContainers[sOldContainerId][2][sElementId];
		}

	};

	var _createMainResponsiveFlowLayout = function( oLayout, oForm ) {

		var aContainers = oForm.getFormContainers();
		var iLength = 0;
		var iContentLenght = 0;

		// count only visible containers
		for ( var i = 0; i < aContainers.length; i++) {
			var oContainer = aContainers[i];
			if (oContainer.getVisible()) {
				iLength++;
			}
		}

		// special case: only one container -> do not render an outer ResponsiveFlowLayout
		if (iLength > 1) {
			if (!oLayout._mainRFLayout) {
				oLayout._mainRFLayout = new sap.ui.layout.ResponsiveFlowLayout(oForm.getId()+"--RFLayout").setParent(oLayout);
			}else{
				// update containers
				var aLayoutContent = oLayout._mainRFLayout.getContent();
				iContentLenght = aLayoutContent.length;
				var bExchangeContent = false;
				// check if content has changed
				for ( var i = 0; i < iContentLenght; i++) {
					var oContentElement = aLayoutContent[i];
					var oContainer = undefined;
					if (oContentElement.getContainer) {
						// it's a panel
						oContainer = sap.ui.getCore().byId(oContentElement.getContainer());
					} else {
						// it's a RFLayout
						oContainer = sap.ui.getCore().byId(oContentElement.__myParentContainerId);
					}
					if (oContainer && oContainer.getVisible()) {
						var aContainerContent = oLayout.mContainers[oContainer.getId()];
						if (aContainerContent[0] && aContainerContent[0] != oContentElement) {
							// container uses panel but panel not the same element in content
							bExchangeContent = true;
							break;
						}
						if (!aContainerContent[0] && aContainerContent[1] && aContainerContent[1] != oContentElement) {
							// container uses no panel but RFLayout not the same element in content
							bExchangeContent = true;
							break;
						}
					}else{
						// no container exits for content -> just remove this content
						oLayout._mainRFLayout.removeContent(oContentElement);
					}
				}
				if (bExchangeContent) {
					// remove all content and add it new.
					oLayout._mainRFLayout.removeAllContent();
					iContentLenght = 0;
				}
			}
			if (iContentLenght < iLength) {
				// new containers added
				for ( var i = 0; i < aContainers.length; i++) {
					var oContainer = aContainers[i];
					if (oContainer.getVisible()) {
						var sContainerId = oContainer.getId();
						if (oLayout.mContainers[sContainerId]) {
							if (oLayout.mContainers[sContainerId][0]) {
								// panel used
								oLayout._mainRFLayout.addContent(oLayout.mContainers[sContainerId][0]);
							} else if (oLayout.mContainers[sContainerId][1]){
								// no panel - used ResponsiveFlowLayot directly
								oLayout._mainRFLayout.addContent(oLayout.mContainers[sContainerId][1]);
							}
						}
					}
				}
			}
		}

	};

	var _objectLength = function(oObject){

		var iLength = 0;

		if (!Object.keys) {
			jQuery.each(oObject, function(){iLength++});
		} else {
			iLength = Object.keys(oObject).length;
		}

		return iLength;

	}

}());
