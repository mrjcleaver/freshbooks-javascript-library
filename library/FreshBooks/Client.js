FreshBooks_Client.prototype = new FreshBooks_Element;
FreshBooks_Client.prototype.constructor = FreshBooks_Client;
FreshBooks_Client.superclass = FreshBooks_Element.prototype;
/**
 * FreshBooks Client Class
 * @copyright  Milan Rukavina, rukavinamilan@gmail.com
 * @version    1.0
 * @extends FreshBooks_Element
 * @constructor
 */
function FreshBooks_Client()
{
	this.elementName = "client";
	
	this.clientId = "";
	this.firstName = "";
	this.lastName = "";
	this.organization = "";
	this.email = "";
	this.username = "";
	this.password = "";
	this.workPhone = "";
	this.homePhone = "";
	this.mobile = "";
	this.fax = "";
	this.notes = "";
	
	this.pStreet1 = "";
	this.pStreet2 = "";
	this.pCity = "";
	this.pState = "";
	this.pCountry = "";
	this.pCode = "";
	
	this.sStreet1 = "";
	this.sStreet2 = "";
	this.sCity = "";
	this.sState = "";
	this.sCountry = "";
	this.sCode = "";

	this.linkClientView = "";
	this.linkView = "";
}
	
/**
 * return XML string
 */ 	
FreshBooks_Client.prototype.asXML = function()
{
	var content =
						this.getTagXML("client_id",this.clientId) +
						this.getTagXML("first_name",this.firstName) +
						this.getTagXML("last_name",this.lastName) +
						this.getTagXML("organization",this.organization) +
						this.getTagXML("email",this.email) +
						this.getTagXML("username",this.username) +
						this.getTagXML("password",this.password) +
						this.getTagXML("work_phone",this.workPhone) +
						this.getTagXML("home_phone",this.homePhone) +
						this.getTagXML("mobile",this.mobile) +
						this.getTagXML("fax",this.fax) +
						this.getTagXML("notes",this.notes) +
						this.getTagXML("p_street1",this.pStreet1) +
						this.getTagXML("p_street2",this.pStreet2) +
						this.getTagXML("p_city",this.pCity) +
						this.getTagXML("p_state",this.pState) +
						this.getTagXML("p_country",this.pCountry) +
						this.getTagXML("p_code",this.pCode) +
						this.getTagXML("s_street1",this.sStreet1) +
						this.getTagXML("s_street2",this.sStreet2) +
						this.getTagXML("s_city",this.sCity) +
						this.getTagXML("s_state",this.sState) +
						this.getTagXML("s_country",this.sCountry) +
						this.getTagXML("s_code",this.sCode);
	return this.getTagXML("client",content);
}

/**
* load obect properties from SimpleXML object
*/ 	
FreshBooks_Client.prototype.internalLoadXML = function(XMLObject)
{
	this.clientId = this.getXMLElementValue(XMLObject,"client_id");
	this.firstName = this.getXMLElementValue(XMLObject,"first_name");
	this.lastName = this.getXMLElementValue(XMLObject,"last_name");
	this.organization = this.getXMLElementValue(XMLObject,"organization");
	this.email = this.getXMLElementValue(XMLObject,"email");		
	this.username = this.getXMLElementValue(XMLObject,"username");
	this.password = this.getXMLElementValue(XMLObject,"password");
	this.workPhone = this.getXMLElementValue(XMLObject,"work_phone");
	this.homePhone = this.getXMLElementValue(XMLObject,"home_phone");
	this.mobile = this.getXMLElementValue(XMLObject,"mobile");
	this.fax = this.getXMLElementValue(XMLObject,"fax");
	this.notes = this.getXMLElementValue(XMLObject,"notes");
	
	this.pStreet1 = this.getXMLElementValue(XMLObject,"p_street1");
	this.pStreet2 = this.getXMLElementValue(XMLObject,"p_street2");
	this.pCity = this.getXMLElementValue(XMLObject,"p_city");
	this.pState = this.getXMLElementValue(XMLObject,"p_state");
	this.pCountry = this.getXMLElementValue(XMLObject,"p_country");
	this.pCode = this.getXMLElementValue(XMLObject,"p_code");
	
	this.sStreet1 = this.getXMLElementValue(XMLObject,"s_street1");
	this.sStreet2 = this.getXMLElementValue(XMLObject,"s_street2");
	this.sCity = this.getXMLElementValue(XMLObject,"s_city");
	this.sState = this.getXMLElementValue(XMLObject,"s_state");
	this.sCountry = this.getXMLElementValue(XMLObject,"s_country");
	this.sCode = this.getXMLElementValue(XMLObject,"s_code");

	var links = this.getXMLNode(XMLObject, "links");
	if(links != null){
		this.linkClientView = this.getXMLElementValue(links, "client_view");
		this.linkView = this.getXMLElementValue(links, "view");
	}
}

/**
* prepare XML string request for CREATE server method
*/ 	
FreshBooks_Client.prototype.internalPrepareCreate = function(content)
{
	return this.asXML();
}

/**
* process XML string response from CREATE server method
*/	
FreshBooks_Client.prototype.internalCreate = function(responseStatus,XMLObject)
{
	if(responseStatus){
		this.clientId = this.getXMLElementValue(XMLObject.getElementsByTagName('response')[0],"client_id");
	}
}

/**
* prepare XML string request for UPDATE server method
*/ 	
FreshBooks_Client.prototype.internalPrepareUpdate = function(content)
{
	return this.asXML();
}

/**
* process XML string response from UPDATE server method
*/		
FreshBooks_Client.prototype.internalUpdate = function(responseStatus,XMLObject)
{
	//
}

/**
* prepare XML string request for GET server method
*/ 	
FreshBooks_Client.prototype.internalPrepareGet = function(id,content)
{
	return this.getTagXML("client_id",id);
}

/**
* process XML string response from GET server method
*/	
FreshBooks_Client.prototype.internalGet = function(responseStatus,XMLObject)
{
	if(responseStatus){
		this.internalLoadXML(XMLObject.getElementsByTagName('client')[0]);
	}
}

/**
* prepare XML string request for DELETE server method
*/	
FreshBooks_Client.prototype.internalPrepareDelete = function(content)
{
	return this.getTagXML("client_id",this.clientId);
}

/**
* process XML string response from DELETE server method
*/	
FreshBooks_Client.prototype.internalDelete = function(responseStatus,XMLObject)
{
	if(responseStatus){
		this.clientId = null;
		this.firstName = null;
		this.lastName = null;
		this.organization = null;
		this.email = null;		
		this.username = null;
		this.password = null;
		this.workPhone = null;
		this.homePhone = null;
		this.mobile = null;
		this.fax = null;
		this.notes = null;
		
		this.pStreet1 = null;
		this.pStreet2 = null;
		this.pCity = null;
		this.pState = null;
		this.pCountry = null;
		this.pCode = null;
		
		this.sStreet1 = null;
		this.sStreet2 = null;
		this.sCity = null;
		this.sState = null;
		this.sCountry = null;
		this.sCode = null;
	}
}

/**
* prepare XML string request for LIST server method
*/		
FreshBooks_Client.prototype.internalPrepareListing = function(filters,content)
{
	var result = this.getTagXML("email",filters['email']) + this.getTagXML("username",filters['username']);
	return result;
}

/**
* process XML string response from LIST server method
*/		
FreshBooks_Client.prototype.internalListing = function(responseStatus,XMLObject)
{
	var result = Object();
	var resultClients = Array();
	if(responseStatus){
		var clients = XMLObject.getElementsByTagName('client');
		if(clients.length > 0){
			resultClients.length = clients.length;		
			for(var i = 0; i < clients.length; i++){
				var thisClient = new FreshBooks_Client();
				thisClient.internalLoadXML(clients[i]);
				resultClients[i] = thisClient;
			}
		}
	}
	var clientsInfo = XMLObject.getElementsByTagName('clients')[0];
	result.page = clientsInfo.getAttribute('page');
	result.perPage = clientsInfo.getAttribute('per_page');
	result.pages = clientsInfo.getAttribute('pages');
	result.total = clientsInfo.getAttribute('total');
	result.rows = resultClients;
	return result;
}
