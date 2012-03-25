var log4js = require('log4js');
var logger = log4js.getLogger('Element', 'INFO');


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

module.exports = FreshBooks_Element;


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
	if(value == "" || value == null)  {
		return "";
    }
	var result = "<" + tag + ">" + value + "</" + tag + ">";
	return result;
}

/**
* get xml dom node friendly value
*/
FreshBooks_Element.prototype.getXMLElementValue = function (xmlObject, element) {
	
	if (!xmlObject) {
        logger.info("getXMLElementValue for ", element, " has invalid xmlObject");
		return "";
    }
    //logger.info("getXMLElementValue for ", element);
    //logger.debug(" in ", xmlObject);

    // TODO - untested under browser js
    var jsdomAns;
    var jsDomElements = xmlObject.getElementsByTagName(element);
    if (jsDomElements) {
        jsdomAns = jsDomElements[0];
    }
//    logger.debug("jsDomAns = ", jsdomAns);
    if (jsdomAns) {
        if (jsdomAns.firstChild) {
            return jsdomAns.firstChild.nodeValue;
        }
    }

    logger.info("getXMLElementValue for ", element, " fell through to old implementation");


    // TODO: (MC) I'm only leaving in this because I don't understand how the library is supposed to act in browser js.
	var nodes = xmlObject.childNodes;
	for (var i = 0; i < nodes.length; i++){
		if(nodes[i].nodeName == element){

			if(nodes[i].firstChild){
				var result = nodes[i].firstChild.nodeValue;
				return result;
			}
			else {
				return "";
            }
		}
	}
    logger.info("getXMLElementValue for ", element, " returned no value");

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
FreshBooks_Element.prototype.sendRequest = function(content, methodName, callback){
    if (!GLOBAL.httpClient) {
        throw "GLOBAL.httpClient has not been set up (is null)";
    }

	this.lastError = "";
	var requestXML = this.requestEnvelope(content,methodName);
	GLOBAL.httpClient.send(requestXML, callback);           //what was a return value is now passed into the callback
}

/**
* processes response xml
*/
FreshBooks_Element.prototype.processResponse = function(xmlObject){
    this.response = {};
	if(!xmlObject){
		this.lastError = "Response was empty"; // Used to say "Connection Error", but that was an assumption
		return false;
	}
    //var response = this.getXMLElementValue(xmlObject,"response"); // SMELL - one of these two lines is needed. Which... that is the q.
	var response = xmlObject.getElementsByTagName("response");

	if(response != null && response.length)  {
		var result = xmlObject.getElementsByTagName("response")[0].getAttribute("status") == "ok";
    } else {
		this.lastError = "Parse error";
		result = false;
	}

	if(!result){
		this.lastError = xmlObject.getElementsByTagName("error")[0].firstChild.nodeValue;
	}

    logger.trace("FreshBooks_Element.prototype.processResponse returning ",result);
	return result;
}

/**
* create remote element
*/
FreshBooks_Element.prototype.create = function(callbackParameter){
    var self = this;     // closure to remember who I am inside the callback

    var callback = function(responseXML){
        var responseStatus = self.processResponse(responseXML);
        self.internalCreate(responseStatus, responseXML);
        if (callbackParameter) {   // Is there a better way, e.g. convention, than passing self like this?
            callbackParameter(responseStatus, self, responseXML);
        }
    }

    var content = "";
	content = this.internalPrepareCreate(content);
	this.sendRequest(content, "create", callback);
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
    logger.error("update has not been modified for async JS (TODO)");
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
    logger.error("get has not been modified for async JS (TODO)");

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
FreshBooks_Element.prototype.del = function(callbackParameter){ // SMELL - why is this not called delete?

    var self = this;     // closure to remember who I am inside the callback
    var content = "";
    content = this.internalPrepareDelete(content);

    var callback = function(responseXML){
        var responseStatus = self.processResponse(responseXML);
        self.internalDelete(responseStatus, responseXML);

        if (callbackParameter) {   // Is there a better way, e.g. convention, than passing self like this?
            callbackParameter(responseStatus, self);
        }
    }

    this.sendRequest(content,"delete", callback);

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
FreshBooks_Element.prototype.listing = function(page,perPage,filters,callbackParameter){
    var self = this;     // closure to remember who I am inside the callback

    var content = this.getTagXML("page",page) + this.getTagXML("per_page",perPage);
    content = content + this.internalPrepareListing(filters,content);


    var callback = function(responseXML){
        var responseStatus = self.processResponse(responseXML);
        var listing = self.internalListing(responseStatus,responseXML);
        self.internalCreate(responseStatus, responseXML);
        if (callbackParameter) {   // Is there a better way, e.g. convention, than passing self like this?
            callbackParameter(responseStatus, listing, self);
        }
    }

	var responseXML = this.sendRequest(content,"list", callback);
}
/**
* internal hook to be implemented in child classes with particular logic how to process xml response object for list
*/	
FreshBooks_Element.prototype.internalPrepareListing = function(filters,content){}

/**
* internal hook to be implemented in child classes with particular logic how to process xml response object for list
*/
FreshBooks_Element.prototype.internalListing = function(responseStatus,XMLObject){}