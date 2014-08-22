/*!
 * SAP UI development toolkit for HTML5 (SAPUI5/OpenUI5)
 * (c) Copyright 2009-2014 SAP AG or an SAP affiliate company. 
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */

// Provides default renderer for control sap.ui.commons.HorizontalDivider
jQuery.sap.declare("sap.ui.commons.HorizontalDividerRenderer");

/**
 * @class HorizontalDivider renderer.
 * @static
 */
sap.ui.commons.HorizontalDividerRenderer = {
};


/**
 * Renders the HTML for the given control, using the provided {@link sap.ui.fw.RenderManager}.
 *
 * @param {sap.ui.fw.RenderManager} oRenderManager The RenderManager that can be used for writing to the Render-Output-Buffer
 * @param {sap.ui.fw.Control} oControl An object representation of the control that should be rendered
 */
sap.ui.commons.HorizontalDividerRenderer.render = function(oRenderManager, oControl){
	var rm = oRenderManager;

	// return immediately if control is invisible
	if(!oControl.getVisible()){
		return;
	}

	rm.write("<hr");
	rm.writeControlData(oControl);
	rm.writeAttribute("role", "separator"); //ARIA
	if(oControl.getWidth()) {
		rm.writeAttribute("style", "width:"+oControl.getWidth()+";");
	}
	rm.addClass("sapUiCommonsHoriDiv");
	rm.addClass(oControl.getType() == "Page" ? "sapUiCommonsHoriDivTypePage" : "sapUiCommonsHoriDivTypeArea");
	switch(oControl.getHeight()){
		case "Ruleheight":
			rm.addClass("sapUiCommonsHoriDivHeightR");
			break;
		case "Small":
			rm.addClass("sapUiCommonsHoriDivHeightS");
			break;
		case "Large":
			rm.addClass("sapUiCommonsHoriDivHeightL");
			break;
		default:
			rm.addClass("sapUiCommonsHoriDivHeightM");
	}
	rm.writeClasses();
	rm.write("/>");
};
