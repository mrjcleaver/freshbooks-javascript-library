FreshBooks_Item.prototype = new FreshBooks_Element();
FreshBooks_Item.prototype.constructor = FreshBooks_Item;
FreshBooks_Item.superclass = FreshBooks_Element.prototype;
/**
 * FreshBooks Item Class
 * @copyright  Milan Rukavina, rukavinamilan@gmail.com
 * @version    1.0
 * @extends FreshBooks_Element
 * @constructor
 */
function FreshBooks_Item()
{
	this.elementName = "item";
	
	this.itemId = "";
	this.name = "";
	this.description = "";
	this.unitCost = "";
	this.quantity = "";
	this.inventory = "";
}

/**
* return XML string
*/	
FreshBooks_Item.prototype.asXML = function()
{
	var content =
						this.getTagXML("item_id",this.itemId) +
						this.getTagXML("name",this.name) +
						this.getTagXML("description",this.description) +
						this.getTagXML("unit_cost",this.unitCost) +
						this.getTagXML("quantity",this.quantity) +
						this.getTagXML("inventory",this.inventory);
						
	return this.getTagXML("item",content);
	
}

/**
* load obect properties from SimpleXML object
*/ 	
FreshBooks_Item.prototype.internalLoadXML = function(XMLObject)
{
	this.itemId = this.getXMLElementValue(XMLObject,"item_id");
	this.name = this.getXMLElementValue(XMLObject,"name");
	this.description = this.getXMLElementValue(XMLObject,"description");
	this.unitCost = this.getXMLElementValue(XMLObject,"unit_cost");
	this.quantity = this.getXMLElementValue(XMLObject,"quantity");	
	this.inventory = this.getXMLElementValue(XMLObject,"inventory");
}

/**
* prepare XML string request for CREATE server method
*/ 	
FreshBooks_Item.prototype.internalPrepareCreate = function(content)
{
	return this.asXML();
}

/**
* process XML string response from CREATE server method
*/	
FreshBooks_Item.prototype.internalCreate = function(responseStatus,XMLObject)
{
	if(responseStatus){
		this.itemId = this.getXMLElementValue(XMLObject.getElementsByTagName('response')[0],"item_id");
	}
}

/**
* prepare XML string request for UPDATE server method
*/ 	
FreshBooks_Item.prototype.internalPrepareUpdate = function(content)
{
	return this.asXML();
}

/**
* process XML string response from UPDATE server method
*/	
FreshBooks_Item.prototype.internalUpdate = function(responseStatus,XMLObject)
{
	//
}

/**
* prepare XML string request for GET server method
*/ 	
FreshBooks_Item.prototype.internalPrepareGet = function(id,content)
{
	return this.getTagXML("item_id",id);
}

/**
* process XML string response from GET server method
*/	
FreshBooks_Item.prototype.internalGet = function(responseStatus,XMLObject)
{
	if(responseStatus)
		this.internalLoadXML(XMLObject.getElementsByTagName('item')[0]);
}

/**
* prepare XML string request for DELETE server method
*/		
FreshBooks_Item.prototype.internalPrepareDelete = function(content)
{
	return this.getTagXML("item_id",this.itemId);
}

/**
* process XML string response from DELETE server method
*/	
FreshBooks_Item.prototype.internalDelete = function(responseStatus,XMLObject)
{
	if(responseStatus){
		this.itemId = null;
		this.name = null;
		this.description = null;
		this.unitCost = null;
		this.quantity = null;
		this.inventory = null;
	}
}

/**
* prepare XML string request for LIST server method
*/	
FreshBooks_Item.prototype.internalPrepareListing = function(filters,content)
{
	//
}

/**
* process XML string response from LIST server method
*/	
FreshBooks_Item.prototype.internalListing = function(responseStatus,XMLObject)
{
	var result = Object();
	var resultItems = Array();
	if(responseStatus){
		var items = XMLObject.getElementsByTagName('item');
		if(items.length > 0){
			resultItems.length = items.length;		
			for(var i = 0; i < items.length; i++){
				var thisItem = new FreshBooks_Item();
				thisItem.internalLoadXML(items[i]);
				resultItems[i] = thisItem;
			}
		}
	}
	var itemsInfo = XMLObject.getElementsByTagName('items')[0];
	result.page = itemsInfo.getAttribute('page');
	result.perPage = itemsInfo.getAttribute('per_page');
	result.pages = itemsInfo.getAttribute('pages');
	result.total = itemsInfo.getAttribute('total');
	result.rows = resultItems;
	return result;
}
