FreshBooks_Invoice.prototype = new FreshBooks_BaseInvoice();
FreshBooks_Invoice.prototype.constructor = FreshBooks_Invoice;
FreshBooks_Invoice.superclass = FreshBooks_BaseInvoice.prototype;
/**
 * FreshBooks Invoice Class
 * @copyright  Milan Rukavina, rukavinamilan@gmail.com
 * @version    1.0
 * @extends FreshBooks_BaseInvoice
 * @constructor
 */
function FreshBooks_Invoice() 
{
	this.elementName = "invoice";
	
	this.invoiceId = "";
	this.amountOutstanding = "";	
	this.recurringId = "";
}
	
/**
* return XML content
*/		
FreshBooks_Invoice.prototype.internalXMLContent = function()
{
	var content =
						this.getTagXML("invoice_id",this.invoiceId) +
						this.getTagXML("amount_outstanding",this.amountOutstanding) +
						this.getTagXML("recurring_id",this.recurringId) +
						
						FreshBooks_BaseInvoice.prototype.internalXMLContent.call(this);
						
	return content;
	
}

/**
* load obect properties from SimpleXML object
*/	
FreshBooks_Invoice.prototype.internalLoadXML = function(XMLObject)
{
	this.invoiceId = this.getXMLElementValue(XMLObject,"invoice_id");		
	this.amountOutstanding = this.getXMLElementValue(XMLObject,"amount_outstanding");
	this.recurringId = this.getXMLElementValue(XMLObject,"recurring_id");
	
	FreshBooks_BaseInvoice.prototype.internalLoadXML.call(this,XMLObject);
}
	
/**
* prepare XML string request for CREATE server method
*/			
FreshBooks_Invoice.prototype.internalCreate = function(responseStatus,XMLObject)
{
	if(responseStatus){
		this.invoiceId = this.getXMLElementValue(XMLObject.getElementsByTagName('response')[0],"invoice_id");
	}
}	

/**
* prepare XML string request for GET server method
*/	
FreshBooks_Invoice.prototype.internalPrepareGet = function(id,content)
{
	return this.getTagXML("invoice_id",id);
}

/**
* process XML string response from GET server method
*/		
FreshBooks_Invoice.prototype.internalGet = function(responseStatus,XMLObject)
{
	if(responseStatus)
		this.internalLoadXML(XMLObject.getElementsByTagName('invoice')[0]);
}

/**
* prepare XML string request for DELETE server method
*/		
FreshBooks_Invoice.prototype.internalPrepareDelete = function(content)
{
	return this.getTagXML("invoice_id",this.invoiceId);
}

/**
* process XML string response from DELETE server method
*/		
FreshBooks_Invoice.prototype.internalDelete = function(responseStatus,XMLObject)
{
	FreshBooks_BaseInvoice.prototype.internalDelete.call(this,responseStatus,XMLObject);
	if(responseStatus){
		this.invoiceId = null;
		this.amountOutstanding = null;
		this.recurringId = null;
	}
}

/**
* prepare XML string request for LIST server method
*/	 
FreshBooks_Invoice.prototype.internalPrepareListing = function(filters,content)
{
	var result =	FreshBooks_BaseInvoice.prototype.internalPrepareListing.call(this,filters,content)
						 +  this.getTagXML("recurring_id",filters['recurringId']);
	return result;
}

/**
* process XML string response from LIST server method
*/	
FreshBooks_Invoice.prototype.internalListing = function(responseStatus,XMLObject)
{
	var result = Object();
	var resultInvoices = Array();
	if(responseStatus){
		var invoices = XMLObject.getElementsByTagName('invoice');
		if(invoices.length > 0){
			resultInvoices.length = invoices.length;		
			for(var i = 0; i < invoices.length; i++){
				var thisInvoice = new FreshBooks_Invoice();
				thisInvoice.internalLoadXML(invoices[i]);
				resultInvoices[i] = thisInvoice;
			}
		}
	}
	var invoicesInfo = XMLObject.getElementsByTagName('invoices')[0];
	result.page = invoicesInfo.getAttribute('page');
	result.perPage = invoicesInfo.getAttribute('per_page');
	result.pages = invoicesInfo.getAttribute('pages');
	result.total = invoicesInfo.getAttribute('total');
	result.rows = resultInvoices;
	return result;
}

/**
* prepare XML string request for SENDBYEMAIL server method
*/	
FreshBooks_Invoice.prototype.internalPrepareSendByEmail = function(content)
{
	return this.getTagXML("invoice_id",this.invoiceId);
}

/**
* process XML string response from SENDBYEMAIL server method
*/	
FreshBooks_Invoice.prototype.internalSendByEmail = function(responseStatus,XMLObject)
{
	//
}

/**
* send invoice by snail mail
*/ 	
FreshBooks_Invoice.prototype.sendBySnailMail = function(){
	var content = this.getTagXML("invoice_id",this.invoiceId);
	var responseXML = this.sendRequest(content,"sendBySnailMail");
	var responseStatus = this.processResponse(responseXML);
	return responseStatus;
}
