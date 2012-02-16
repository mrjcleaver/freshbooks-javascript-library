FreshBooks_Estimate.prototype = new FreshBooks_BaseInvoice();
FreshBooks_Estimate.prototype.constructor = FreshBooks_Estimate;
FreshBooks_Estimate.superclass = FreshBooks_BaseInvoice.prototype;
/**
 * FreshBooks Estimate Class
 * @copyright  Milan Rukavina, rukavinamilan@gmail.com
 * @version    1.0
 * @extends FreshBooks_BaseInvoice
 * @constructor
 */
function FreshBooks_Estimate() 
{
	this.elementName = "estimate";
	this.estimateId = "";
}

/**
* return XML content
*/	
FreshBooks_Estimate.prototype.internalXMLContent = function()
{
	var content =
						this.getTagXML("estimate_id",this.estimateId) +							
						FreshBooks_BaseInvoice.prototype.internalXMLContent.call(this);
						
	return content;
}

/**
* load obect properties from SimpleXML object
*/	
FreshBooks_Estimate.prototype.internalLoadXML = function(XMLObject)
{
	this.estimateId = this.getXMLElementValue(XMLObject,"estimate_id");		
	
	FreshBooks_BaseInvoice.prototype.internalLoadXML.call(this,XMLObject);
}
	
/**
* prepare XML string request for CREATE server method
*/		
FreshBooks_Estimate.prototype.internalCreate = function(responseStatus,XMLObject)
{
	if(responseStatus){
		this.estimateId = this.getXMLElementValue(XMLObject.getElementsByTagName('response')[0],"estimate_id");
	}
}	

/**
* prepare XML string request for GET server method
*/ 	
FreshBooks_Estimate.prototype.internalPrepareGet = function(id,content)
{
	return this.getTagXML("estimate_id",id);
}

/**
* process XML string response from GET server method
*/		
FreshBooks_Estimate.prototype.internalGet = function(responseStatus,XMLObject)
{
	if(responseStatus)
		this.internalLoadXML(XMLObject.getElementsByTagName('estimate')[0]);
}

/**
* prepare XML string request for DELETE server method
*/			
FreshBooks_Estimate.prototype.internalPrepareDelete = function(content)
{
	return this.getTagXML("estimate_id",this.estimateId);
}

/**
* process XML string response from DELETE server method
*/	
FreshBooks_Estimate.prototype.internalDelete = function(responseStatus,XMLObject)
{
	FreshBooks_BaseInvoice.prototype.internalDelete.call(this,responseStatus,XMLObject);
	if(responseStatus){
		this.estimateId = null;
	}
}

/**
* process XML string response from LIST server method
*/	 	
FreshBooks_Estimate.prototype.internalListing = function(responseStatus,XMLObject)
{
	var result = Object();
	var resultEstimates = Array();
	if(responseStatus){
		var estimates = XMLObject.getElementsByTagName('estimate');
		if(estimates.length > 0){
			resultEstimates.length = estimates.length;		
			for(var i = 0; i < estimates.length; i++){
				var thisEstimate = new FreshBooks_Estimate();
				thisEstimate.internalLoadXML(estimates[i]);
				resultEstimates[i] = thisEstimate;
			}
		}
	}
	var estimatesInfo = XMLObject.getElementsByTagName('estimates')[0];
	result.page = estimatesInfo.getAttribute('page');
	result.perPage = estimatesInfo.getAttribute('per_page');
	result.pages = estimatesInfo.getAttribute('pages');
	result.total = estimatesInfo.getAttribute('total');
	result.rows = resultEstimates;
	return result;
}

/**
* prepare XML string request for SENDBYEMAIL server method
*/		
FreshBooks_Estimate.prototype.internalPrepareSendByEmail = function(content)
{
	return this.getTagXML("estimate_id",this.estimateId);
}

/**
* process XML string response from SENDBYEMAIL server method
*/		
FreshBooks_Estimate.prototype.internalSendByEmail = function(responseStatus,XMLObject)
{
	//
}
