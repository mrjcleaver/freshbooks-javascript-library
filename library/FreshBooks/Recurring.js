FreshBooks_Recurring.prototype = new FreshBooks_BaseInvoice();
FreshBooks_Recurring.prototype.constructor = FreshBooks_Recurring;
FreshBooks_Recurring.superclass = FreshBooks_BaseInvoice.prototype;
/**
 * FreshBooks Recurring Class
 * @copyright  Milan Rukavina, rukavinamilan@gmail.com
 * @version    1.0
 * @extends FreshBooks_BaseInvoice
 * @constructor
 */
function FreshBooks_Recurring() 
{
	this.elementName = "recurring";
	
	this.recurringId = "";
	this.amountOutstanding = "";	
	this.occurrences = "";
	this.frequency = "";
	this.stopped = "";
	this.sendEmail = "";
	this.sendSnailMail = "";
}
	
/**
* return XML content
*/	
FreshBooks_Recurring.prototype.internalXMLContent = function()
{
	var content =
						this.getTagXML("recurring_id",this.recurringId) +
						this.getTagXML("amount_outstanding",this.amountOutstanding) +
						this.getTagXML("occurrences",this.occurrences) +
						this.getTagXML("frequency",this.frequency) +
						this.getTagXML("stopped",this.stopped) +
						this.getTagXML("send_email",this.sendEmail) +
						this.getTagXML("send_snail_mail",this.sendSnailMail) +
						
						FreshBooks_BaseInvoice.prototype.internalXMLContent.call(this);
						
	return content;
	
}

/**
* load obect properties from SimpleXML object
*/	
FreshBooks_Recurring.prototype.internalLoadXML = function(XMLObject)
{
	this.recurringId = this.getXMLElementValue(XMLObject,"recurring_id");		
	this.amountOutstanding = this.getXMLElementValue(XMLObject,"amount_outstanding");
	
	this.occurrences = this.getXMLElementValue(XMLObject,"occurrences");
	this.frequency = this.getXMLElementValue(XMLObject,"frequency");
	this.stopped = this.getXMLElementValue(XMLObject,"stopped");
	this.sendEmail = this.getXMLElementValue(XMLObject,"send_email");
	this.sendSnailMail = this.getXMLElementValue(XMLObject,"send_snail_mail");
	
	FreshBooks_BaseInvoice.prototype.internalLoadXML.call(this,XMLObject);
}

/**
* prepare XML string request for CREATE server method
*/			
FreshBooks_Recurring.prototype.internalCreate = function(responseStatus,XMLObject)
{
	if(responseStatus){
		this.recurringId = this.getXMLElementValue(XMLObject.getElementsByTagName('response')[0],"recurring_id");
	}
}	

/**
* prepare XML string request for GET server method
*/		
FreshBooks_Recurring.prototype.internalPrepareGet = function(id,content)
{
	return this.getTagXML("recurring_id",id);
}

/**
* process XML string response from GET server method
*/		
FreshBooks_Recurring.prototype.internalGet = function(responseStatus,XMLObject)
{
	if(responseStatus)
		this.internalLoadXML(XMLObject.getElementsByTagName('recurring')[0]);
}

/**
* prepare XML string request for DELETE server method
*/		
FreshBooks_Recurring.prototype.internalPrepareDelete = function(content)
{
	return this.getTagXML("recurring_id",this.recurringId);
}

/**
* process XML string response from DELETE server method
*/		
FreshBooks_Recurring.prototype.internalDelete = function(responseStatus,XMLObject)
{
	FreshBooks_BaseInvoice.prototype.internalDelete.call(this,responseStatus,XMLObject);
	if(responseStatus){
		this.recurringId = null;
		this.amountOutstanding = null;
		
		this.occurrences = null;
		this.frequency = null;
		this.stopped = null;
		this.sendEmail = null;
		this.sendSnailMail = null;
	}
}

/**
* prepare XML string request for LIST server method
*/	
FreshBooks_Recurring.prototype.internalPrepareListing = function(filters,content)
{
	var result =	FreshBooks_BaseInvoice.prototype.internalPrepareListing.call(this,filters,content);
	return result;
}

/**
* process XML string response from LIST server method
*/	
FreshBooks_Recurring.prototype.internalListing = function(responseStatus,XMLObject,rows,resultInfo)
{
	var result = Object();
	var resultReccurings = Array();
	if(responseStatus){
		var recurrings = XMLObject.getElementsByTagName('recurring');
		if(recurrings.length > 0){
			resultReccurings.length = recurrings.length;		
			for(var i = 0; i < recurrings.length; i++){
				var thisRecurring = new FreshBooks_Recurring();
				thisRecurring.internalLoadXML(recurrings[i]);
				resultReccurings[i] = thisRecurring;
			}
		}
	}
	var recurringsInfo = XMLObject.getElementsByTagName('recurrings')[0];
	result.page = recurringsInfo.getAttribute('page');
	result.perPage = recurringsInfo.getAttribute('per_page');
	result.pages = recurringsInfo.getAttribute('pages');
	result.total = recurringsInfo.getAttribute('total');
	result.rows = resultReccurings;
	return result;
}

/**
* prepare XML string request for SENDBYEMAIL server method
*/	
FreshBooks_Recurring.prototype.internalPrepareSendByEmail = function(content)
{
	//
}

/**
* process XML string response from SENDBYEMAIL server method
*/	
FreshBooks_Recurring.prototype.internalSendByEmail = function(responseStatus,XMLObject)
{
	//
}

/**
* overrides send email since not supported; returns false
*/	
FreshBooks_Recurring.prototype.sendEmail = function(){
	return false;
}
