FreshBooks_Payment.prototype = new FreshBooks_Element();
FreshBooks_Payment.prototype.constructor = FreshBooks_Payment;
FreshBooks_Payment.superclass = FreshBooks_Element.prototype;
/**
 * FreshBooks Payment Class
 * @copyright  Milan Rukavina, rukavinamilan@gmail.com
 * @version    1.0
 * @extends FreshBooks_Element
 * @constructor
 */
function FreshBooks_Payment()
{
	this.elementName = "payment";
	
	this.paymentId = "";
	this.clientId = "";
	this.invoiceId = "";
	this.date = "";
	this.amount = "";
	this.type = "";
	this.notes = "";
	this.status = "";
}
		
/**
* return XML string
*/		
FreshBooks_Payment.prototype.asXML = function()
{
	var content =
						this.getTagXML("payment_id",this.paymentId) +
						this.getTagXML("client_id",this.clientId) +
						this.getTagXML("invoice_id",this.invoiceId) +
						this.getTagXML("amount",this.amount) +
						this.getTagXML("date",this.date) +
						this.getTagXML("notes",this.notes) +
						this.getTagXML("type",this.type);
						
	return this.getTagXML("payment",content);
	
}

/**
* load obect properties from SimpleXML object
*/ 	
FreshBooks_Payment.prototype.internalLoadXML = function(XMLObject)
{
	this.paymentId = this.getXMLElementValue(XMLObject,"payment_id");
	this.clientId = this.getXMLElementValue(XMLObject,"client_id");
	this.invoiceId = this.getXMLElementValue(XMLObject,"invoice_id");		
	this.amount = this.getXMLElementValue(XMLObject,"amount");
	this.date = this.getXMLElementValue(XMLObject,"date");
	this.notes = this.getXMLElementValue(XMLObject,"notes");
	this.type = this.getXMLElementValue(XMLObject,"type");
}

/**
* prepare XML string request for CREATE server method
*/	
FreshBooks_Payment.prototype.internalPrepareCreate = function(content)
{
	return this.asXML();
}

/**
* process XML string response from CREATE server method
*/		
FreshBooks_Payment.prototype.internalCreate = function(responseStatus,XMLObject)
{
	if(responseStatus){
		this.paymentId = this.getXMLElementValue(XMLObject.getElementsByTagName('response')[0],"payment_id");
	}
}

/**
* prepare XML string request for UPDATE server method
*/ 	
FreshBooks_Payment.prototype.internalPrepareUpdate = function(content)
{
	return this.asXML();
}

/**
* process XML string response from UPDATE server method
*/		
FreshBooks_Payment.prototype.internalUpdate = function(responseStatus,XMLObject)
{
	//
}

/**
* prepare XML string request for GET server method
*/ 	
FreshBooks_Payment.prototype.internalPrepareGet = function(id,content)
{
	return this.getTagXML("payment_id",id);
}

/**
* process XML string response from GET server method
*/	
FreshBooks_Payment.prototype.internalGet = function(responseStatus,XMLObject)
{
	if(responseStatus)
		this.internalLoadXML(XMLObject.getElementsByTagName('payment')[0]);
}

/**
* prepare XML string request for DELETE server method
*/		
FreshBooks_Payment.prototype.internalPrepareDelete = function(content)
{
	return this.getTagXML("payment_id",this.paymentId);
}

/**
* process XML string response from DELETE server method
*/	
FreshBooks_Payment.prototype.internalDelete = function(responseStatus,XMLObject)
{
	if(responseStatus){
		this.paymentId = null;
		this.invoiceId = null;
		this.clientId = null;
		this.amount = null;
		this.date = null;
		this.notes = null;
		this.type = null;
	}
}

/**
* prepare XML string request for LIST server method
*/	
FreshBooks_Payment.prototype.internalPrepareListing = function(filters,content)
{
		var result = this.getTagXML("client_id",filters['clientId'])
							 + this.getTagXML("invoice_id",filters['invoiceId'])
							 + this.getTagXML("status",filters['status'])
							 + this.getTagXML("date_from",filters['dateFrom'])
							 + this.getTagXML("date_to",filters['dateTo']);
}

/**
* process XML string response from LIST server method
*/	
FreshBooks_Payment.prototype.internalListing = function(responseStatus,XMLObject)
{
	var result = Object();
	var resultPayments = Array();
	if(responseStatus){
		var payments = XMLObject.getElementsByTagName('payment');
		if(payments.length > 0){
			resultPayments.length = payments.length;		
			for(var i = 0; i < payments.length; i++){
				var thisPayment = new FreshBooks_Payment();
				thisPayment.internalLoadXML(clients[i]);
				resultPayments[i] = thisPayment;
			}
		}
	}
	var paymentsInfo = XMLObject.getElementsByTagName('payments')[0];
	result.page = paymentsInfo.getAttribute('page');
	result.perPage = paymentsInfo.getAttribute('per_page');
	result.pages = paymentsInfo.getAttribute('pages');
	result.total = paymentsInfo.getAttribute('total');
	result.rows = resultPayments;
	return result;
}
