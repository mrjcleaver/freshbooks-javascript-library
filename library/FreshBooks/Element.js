/**
 * FreshBooks Element Class
 * @copyright  Milan Rukavina, rukavinamilan@gmail.com
 * @version    1.0
 * @constructor
 */
function FreshBooks_Element()
{
	this.elementName = "";
	this.lastError = "";
}	
	
/**
* loads XML string
*/ 	
FreshBooks_Element.prototype.loadXML = function(XMLObject){
	this.internalLoadXML(XMLObject);
}

/**
* internal hook to be implemented in child classes with particular logic how to populate object properties from xml
*/ 	
FreshBooks_Element.prototype.internalLoadXML = function(XMLObject){}	
	
/**
* construct simple xml element
*/ 	
FreshBooks_Element.prototype.getTagXML = function(tag,value){
	if(value == "" || value == null)
		return "";
		
	var result = "<" + tag + ">" + value + "</" + tag + ">";
	return result;
}

/**
* get xml dom node friendly value
*/
FreshBooks_Element.prototype.getXMLElementValue = function(XMLObject,element){
	
	if(!XMLObject)
		return "";
	var nodes=XMLObject.childNodes;
	for (var i = 0; i < nodes.length; i++){
		if(nodes[i].nodeName == element){
			
			if(nodes[i].firstChild){
				var result = nodes[i].firstChild.nodeValue;
				return result;
			}
			else
				return "";
		}
	}
	return "";
}

/**
* get xml dom node 
*/
FreshBooks_Element.prototype.getXMLNode = function(XMLObject,element){
	
	var nodes=XMLObject.childNodes;
	for (var i = 0; i < nodes.length; i++){
		if(nodes[i].nodeName == element){
			return nodes[i];
		}
	}
	return null;
}

/**
* add common tags to a request 
*/  	
FreshBooks_Element.prototype.requestEnvelope = function(content,methodName){
	var result = '<?xml version="1.0" encoding="utf-8"?><request method="' + this.elementName + '.' + methodName + '">' + content + '</request>';
	return result;
}

/**
* send request to the server
*/ 	
FreshBooks_Element.prototype.sendRequest = function(content,methodName){
	this.lastError = "";
	var requestXML = this.requestEnvelope(content,methodName);
	return httpClient.send(requestXML); 
}

/**
* processes response xml
*/ 	
FreshBooks_Element.prototype.processResponse = function(XMLObject){
	if(!XMLObject){
		this.lastError = "Connection error";
		return false;
	}
	var response = XMLObject.getElementsByTagName("response");
	if(response != null && response.length)
		var result = XMLObject.getElementsByTagName("response")[0].getAttribute("status") == "ok";
	else{
		this.lastError = "Parse error";
		return false;
	}
	
	if(!result){
		this.lastError = XMLObject.getElementsByTagName("error")[0].firstChild.nodeValue;
	}
	return result;		
}

/**
* create remote element
*/   	 	
FreshBooks_Element.prototype.create = function(){
	var content = "";
	content = this.internalPrepareCreate(content);
	var responseXML = this.sendRequest(content,"create");
	var responseStatus = this.processResponse(responseXML);
	this.internalCreate(responseStatus,responseXML);
	return responseStatus;
}
/**
* internal hook to be implemented in child classes with particular logic how to generate xml request for create request
*/ 	
FreshBooks_Element.prototype.internalPrepareCreate = function(content){}
/**
* internal hook to be implemented in child classes with particular logic how to process xml response object for create
*/
FreshBooks_Element.prototype.internalCreate = function(responseStatus,XMLObject){}
/**
* update remote element
*/   	 	
FreshBooks_Element.prototype.update = function (){
	var content = "";
	content = this.internalPrepareUpdate(content);
	var responseXML = this.sendRequest(content,"update");
	var responseStatus = this.processResponse(responseXML);
	this.internalUpdate(responseStatus,responseXML);
	return responseStatus;
}
/**
* internal hook to be implemented in child classes with particular logic how to generate xml request for update request
*/ 
FreshBooks_Element.prototype.internalPrepareUpdate = function(content){}
/**
* internal hook to be implemented in child classes with particular logic how to process xml response object for update
*/
FreshBooks_Element.prototype.internalUpdate = function(responseStatus,XMLObject){}

/**
* get remote element
*/   	 	
FreshBooks_Element.prototype.get = function(id){
	var content = "";
	content = this.internalPrepareGet(id,content);
	var responseXML = this.sendRequest(content,"get");
	var responseStatus = this.processResponse(responseXML);
	this.internalGet(responseStatus,responseXML);
	return responseStatus;
}
/**
* internal hook to be implemented in child classes with particular logic how to generate xml request for get request
*/ 
FreshBooks_Element.prototype.internalPrepareGet = function(id,content){}
/**
* internal hook to be implemented in child classes with particular logic how to process xml response object for get
*/
FreshBooks_Element.prototype.internalGet = function(responseStatus,XMLObject){}

/**
* delete remote element
*/   	 	
FreshBooks_Element.prototype.del = function(){
	var content = "";
	content = this.internalPrepareDelete(content);
	var responseXML = this.sendRequest(content,"delete");
	var responseStatus = this.processResponse(responseXML);
	this.internalDelete(responseStatus,responseXML);
	return responseStatus;
}
/**
* internal hook to be implemented in child classes with particular logic how to generate xml request for delete request
*/ 
FreshBooks_Element.prototype.internalPrepareDelete = function(content){}
/**
* internal hook to be implemented in child classes with particular logic how to process xml response object for delete
*/
FreshBooks_Element.prototype.internalDelete = function(responseStatus,XMLObject){}

/**
* list/search remote elements
* returns object containing: "page", "perPage", "pages", "total" and "rows" array of records
*/   	 	
FreshBooks_Element.prototype.listing = function(page,perPage,filters){
	var content = this.getTagXML("page",page) + this.getTagXML("per_page",perPage);
	content = content + this.internalPrepareListing(filters,content);
	var responseXML = this.sendRequest(content,"list");
	var responseStatus = this.processResponse(responseXML);
	return this.internalListing(responseStatus,responseXML);
}
/**
* internal hook to be implemented in child classes with particular logic how to process xml response object for list
*/	
FreshBooks_Element.prototype.internalPrepareListing = function(filters,content){}

/**
* internal hook to be implemented in child classes with particular logic how to process xml response object for list
*/
FreshBooks_Element.prototype.internalListing = function(responseStatus,XMLObject){}