FreshBooks_Category.prototype = new FreshBooks_Element();
FreshBooks_Category.prototype.constructor = FreshBooks_Category;
FreshBooks_Category.superclass = FreshBooks_Element.prototype;
/**
 * FreshBooks Category Class
 * @copyright  Milan Rukavina, rukavinamilan@gmail.com
 * @version    1.0
 * @extends FreshBooks_Element
 * @constructor
 */
function FreshBooks_Category()
{
	this.elementName = "category";
	
	this.categoryId = "";
	this.name = "";
	this.tax1 = "";
	this.tax2 = "";
}	

/**
* return XML string
*/ 	
FreshBooks_Category.prototype.asXML = function()
{
	var content =
						this.getTagXML("category_id",this.categoryId) +
						this.getTagXML("name",this.name) +
						this.getTagXML("tax1",this.tax1) +
						this.getTagXML("tax2",this.tax2);
						
	return this.getTagXML("category",content);
	
}

/**
* load obect properties from SimpleXML object
*/ 	
FreshBooks_Category.prototype.internalLoadXML = function(XMLObject)
{
	this.categoryId = this.getXMLElementValue(XMLObject,"category_id");
	this.name = this.getXMLElementValue(XMLObject,"name");
	this.tax1 = this.getXMLElementValue(XMLObject,"tax1");	
	this.tax2 = this.getXMLElementValue(XMLObject,"tax2");
}

/**
* prepare XML string request for CREATE server method
*/	
FreshBooks_Category.prototype.internalPrepareCreate = function(content)
{
	return this.asXML();
}

/**
* process XML string response from CREATE server method
*/		
FreshBooks_Category.prototype.internalCreate = function(responseStatus,XMLObject)
{
	if(responseStatus){
		this.categoryId = this.getXMLElementValue(XMLObject.getElementsByTagName('response')[0],"category_id");
	}
}

/**
* prepare XML string request for UPDATE server method
*/	
FreshBooks_Category.prototype.internalPrepareUpdate = function(content)
{
	return this.asXML();
}

/**
* process XML string response from UPDATE server method
*/		
FreshBooks_Category.prototype.internalUpdate = function(responseStatus,XMLObject)
{
	//
}

/**
* prepare XML string request for GET server method
*/ 	
FreshBooks_Category.prototype.internalPrepareGet = function(id,content)
{
	return this.getTagXML("category_id",id);
}

/**
* process XML string response from GET server method
*/		
FreshBooks_Category.prototype.internalGet = function(responseStatus,XMLObject)
{
	if(responseStatus)
		this.internalLoadXML(XMLObject.getElementsByTagName('category')[0]);
}

/**
* prepare XML string request for DELETE server method
*/	
FreshBooks_Category.prototype.internalPrepareDelete = function(content)
{
	return this.getTagXML("category_id",this.categoryId);
}

/**
* process XML string response from DELETE server method
*/		
FreshBooks_Category.prototype.internalDelete = function(responseStatus,XMLObject)
{
	if(responseStatus){
		this.categoryId = null;
		this.name = null;
		this.tax1 = null;
		this.tax2 = null;
	}
}

/**
* prepare XML string request for LIST server method
*/		
FreshBooks_Category.prototype.internalPrepareListing = function(filters,content)
{
	//
}

/**
* process XML string response from LIST server method
*/	
FreshBooks_Category.prototype.internalListing = function(responseStatus,XMLObject)
{
	var result = Object();
	var resultCategories = Array();
	if(responseStatus){
		var categories = XMLObject.getElementsByTagName('category');
		if(categories.length > 0){
			resultCategories.length = categories.length;		
			for(var i = 0; i < categories.length; i++){
				var thisCategory = new FreshBooks_Category();
				thisCategory.internalLoadXML(categories[i]);
				resultCategories[i] = thisCategory;
			}
		}
	}
	var categoriesInfo = XMLObject.getElementsByTagName('categories')[0];
	result.page = categoriesInfo.getAttribute('page');
	result.perPage = categoriesInfo.getAttribute('per_page');
	result.pages = categoriesInfo.getAttribute('pages');
	result.total = categoriesInfo.getAttribute('total');
	result.rows = resultCategories;
	return result;
}
