FreshBooks_BaseInvoice.prototype = new FreshBooks_Element();
FreshBooks_BaseInvoice.prototype.constructor = FreshBooks_BaseInvoice;
FreshBooks_BaseInvoice.superclass = FreshBooks_Element.prototype;
/**
 * FreshBooks BaseInvoice Class
 * @copyright  Milan Rukavina, rukavinamilan@gmail.com
 * @version    1.0
 * @extends FreshBooks_Element
 * @constructor
 */
function FreshBooks_BaseInvoice()
{	
	this.clientId = "";
	this.number = "";
	this.amount = "";
	this.status = "";
	this.date = "";
	this.poNumber = "";
	this.discount = "";
	this.notes = "";
	this.terms = "";
	
	this.linkClientView = "";
	this.linkView = "";
	this.linkEdit = "";
	
	this.organization = "";
	this.firstName = "";
	this.lastName = "";

	this.pStreet1 = "";
	this.pStreet2 = "";
	this.pCity = "";
	this.pState = "";
	this.pCountry = "";
	this.pCode = "";

/**
* invoice lines (items)
*/ 	
	this.lines = Array();
}

/**
* generate XML string from common properties
*/ 	
FreshBooks_BaseInvoice.prototype.internalXMLContent = function(){
	var content =
						this.getTagXML("client_id",this.clientId) +
						this.getTagXML("number",this.number) +
						this.getTagXML("amount",this.amount) +
						this.getTagXML("status",this.status) +
						this.getTagXML("date",this.date) +
						this.getTagXML("po_number",this.poNumber) +
						this.getTagXML("discount",this.discount) +
						this.getTagXML("notes",this.notes) +
						this.getTagXML("terms",this.terms) +
						this.linksAsXML() +
						this.getTagXML("organization",this.organization) +
						this.getTagXML("first_name",this.firstName) +
						this.getTagXML("last_name",this.lastName) +
						this.getTagXML("p_street1",this.pStreet1) +
						this.getTagXML("p_street2",this.pStreet2) +
						this.getTagXML("p_city",this.pCity) +
						this.getTagXML("p_state",this.pState) +
						this.getTagXML("p_country",this.pCountry) +
						this.getTagXML("p_code",this.pCode) +
						
						this.linesAsXML();
	return content;		
}

/**
* return XML string
*/	
FreshBooks_BaseInvoice.prototype.asXML = function()
{					
	return this.getTagXML(this.elementName,this.internalXMLContent());	
}

/**
* generate XML output from links properties
*/ 	
FreshBooks_BaseInvoice.prototype.linksAsXML = function(){
	var content  = this.getTagXML("client_view",this.linkClientView)
							 + this.getTagXML("view",this.linkView)
							 + this.getTagXML("edit",this.linkEdit);

	return this.getTagXML("links",content);
}

/**
* generate XML output from lines array
*/ 	
FreshBooks_BaseInvoice.prototype.linesAsXML = function(){
	
	var content = "";
	if(this.lines.length > 0){
		for(var i = 0; i < this.lines.length; i++){
			var linesXML = this.getTagXML("name",this.lines[i]['name'])
								+ this.getTagXML("description",this.lines[i]['description'])
								+ this.getTagXML("unit_cost",this.lines[i]['unitCost'])
								+ this.getTagXML("quantity",this.lines[i]['quantity'])
								+ this.getTagXML("amount",this.lines[i]['amount'])
								+ this.getTagXML("tax1_name",this.lines[i]['tax1Name'])
								+ this.getTagXML("tax2_name",this.lines[i]['tax2Name'])
								+ this.getTagXML("tax1_percent",this.lines[i]['tax1Percent'])
								+ this.getTagXML("tax2_percent",this.lines[i]['tax2Percent']);
			content += this.getTagXML("line",linesXML);
		}	
	}
	return this.getTagXML("lines",content);
}

/**
* load obect properties from SimpleXML object
*/ 	
FreshBooks_BaseInvoice.prototype.internalLoadXML = function(XMLObject)
{
	this.clientId = this.getXMLElementValue(XMLObject,"client_id");
	this.number = this.getXMLElementValue(XMLObject,"number");
	this.amount = this.getXMLElementValue(XMLObject,"amount");
	this.status = this.getXMLElementValue(XMLObject,"status");
	this.date = this.getXMLElementValue(XMLObject,"date");
	this.poNumber = this.getXMLElementValue(XMLObject,"po_number");
	this.discount = this.getXMLElementValue(XMLObject,"discount");
	this.notes = this.getXMLElementValue(XMLObject,"notes");
	this.terms = this.getXMLElementValue(XMLObject,"terms");

	var links = this.getXMLNode(XMLObject,"links");
	if(links != null){
		this.linkClientView = this.getXMLElementValue(links,"client_view");
		this.linkView = this.getXMLElementValue(links,"view");
		this.linkEdit = this.getXMLElementValue(links,"edit");
	}
	this.organization = this.getXMLElementValue(XMLObject,"organization");
	this.firstName = this.getXMLElementValue(XMLObject,"first_name");
	this.lastName = this.getXMLElementValue(XMLObject,"last_name");
	this.pStreet1 = this.getXMLElementValue(XMLObject,"p_street1");
	this.pStreet2 = this.getXMLElementValue(XMLObject,"p_street2");
	this.pCity = this.getXMLElementValue(XMLObject,"p_city");
	this.pState = this.getXMLElementValue(XMLObject,"p_state");
	this.pCountry = this.getXMLElementValue(XMLObject,"p_country");
	this.pCode = this.getXMLElementValue(XMLObject,"p_code");
	
	this.loadLines(XMLObject);		
}

/**
* load lines array from XML object
*/ 	
FreshBooks_BaseInvoice.prototype.loadLines = function(XMLObject){
	this.lines = Array();
	
	var lines = this.getXMLNode(XMLObject,"lines");
	if(!lines){
		return;
	}
	
	var children=lines.childNodes;
	
	for (var i = 0; i < children.length; i++){
		var child = children[i];
		if(child.nodeName == "line"){
			var j = this.lines.length;
			this.lines.length = j + 1;
			var line = Object();
			line["name"] = this.getXMLElementValue(child,"name");
			line["description"] = this.getXMLElementValue(child,"description");
			line["unitCost"] = this.getXMLElementValue(child,"unit_cost");
			line["quantity"] = this.getXMLElementValue(child,"quantity");
			line["amount"] = this.getXMLElementValue(child,"amount");
			line["tax1Name"] = this.getXMLElementValue(child,"tax1_name");
			line["tax2Name"] = this.getXMLElementValue(child,"tax2_name");
			line["tax1Percent"] = this.getXMLElementValue(child,"tax1_percent");
			line["tax2Percent"] = this.getXMLElementValue(child,"tax2_percent");
			this.lines[j] = line;
		}
	}
}

/**
* prepare XML string request for CREATE server method
*/ 	
FreshBooks_BaseInvoice.prototype.internalPrepareCreate = function(content)
{
	return this.asXML();
}

/**
* prepare XML string request for UPDATE server method
*/		
FreshBooks_BaseInvoice.prototype.internalPrepareUpdate = function(content)
{
	return this.asXML();
}

/**
* process XML string response from UPDATE server method
*/	
FreshBooks_BaseInvoice.prototype.internalUpdate = function(responseStatus,XMLObject)
{
	//
}

/**
* prepare XML string request for DELETE server method
*/		
FreshBooks_BaseInvoice.prototype.internalDelete = function(responseStatus,XMLObject)
{
	if(responseStatus){
		this.clientId = null;
		this.number = null;
		this.amount = null;
		this.status = null;
		this.date = null;
		this.poNumber = null;
		this.discount = null;
		this.notes = null;
		this.terms = null;
		this.linkClientView = null;
		this.linkView = null;
		this.linkEdit = null;
		this.organization = null;
		this.firstName = null;
		this.lastName = null;
		this.pStreet1 = null;
		this.pStreet2 = null;
		this.pCity = null;
		this.pState = null;
		this.pCountry = null;
		this.pCode = null;
		this.lines = null;
	}
}

/**
* prepare XML string request for LIST server method
*/		
FreshBooks_BaseInvoice.prototype.internalPrepareListing = function(filters,content)
{
		var result = this.getTagXML("client_id",filters['clientId'])
							 + this.getTagXML("status",filters['status'])
							 + this.getTagXML("date_from",filters['dateFrom'])
							 + this.getTagXML("date_to",filters['dateTo']);
		return result;
}

/**
* internal hook to be implemented in child classes with particular logic to generate request for sendByEmail method
*/
FreshBooks_BaseInvoice.prototype.internalPrepareSendByEmail = function(content){}
/**
* internal hook to be implemented in child classes with particular logic to process response XML from sendByEmail method
*/
FreshBooks_BaseInvoice.prototype.internalSendByEmail = function(responseStatus,XMLObject){}

/**
* send invoice by email
*/ 	
FreshBooks_BaseInvoice.prototype.sendByEmail = function(){
	var content = "";
	content = this.internalPrepareSendByEmail(content);
	var responseXML = this.sendRequest(content,"sendByEmail");
	var responseStatus = this.processCreateResponse(responseXML);
	this.internalSendByEmail(responseStatus,responseXML);
	return responseStatus;
}
