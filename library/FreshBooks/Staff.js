FreshBooks_Staff.prototype = new FreshBooks_Element();
FreshBooks_Staff.prototype.constructor = FreshBooks_Staff;
FreshBooks_Staff.superclass = FreshBooks_Element.prototype;
/**
 * FreshBooks Staff Class
 * @copyright  Milan Rukavina, rukavinamilan@gmail.com
 * @version    1.0
 * @extends FreshBooks_Element
 * @constructor
 */
function FreshBooks_Staff()
{
	this.elementName = "staff";
	
	this.staffId = "";
	this.username = "";
	this.firstName = "";
	this.lastName = "";
	this.email = "";	
	this.businessPhone = "";
	this.mobilePhone = "";
	this.rate = "";
	this.lastLogin = "";
	this.numberOfLogins = "";
	this.signupDate = "";
	this.street1 = "";
	this.street2 = "";
	this.city = "";
	this.state = "";
	this.country = "";
	this.code = "";
}
	
/**
* return XML string
*/ 	
FreshBooks_Staff.prototype.asXML = function()
{
	var content =
						this.getTagXML("staff_id",this.staffId) +
						this.getTagXML("username",this.username) +
						this.getTagXML("first_name",this.firstName) +
						this.getTagXML("last_name",this.lastName) +
						this.getTagXML("email",this.email) +
						
						this.getTagXML("business_hone",this.businessPhone) +
						this.getTagXML("mobile_phone",this.mobilePhone) +
						this.getTagXML("rate",this.rate) +
						this.getTagXML("last_login",this.lastLogin) +
						this.getTagXML("number_of_logins",this.numberOfLogins) +
						this.getTagXML("signup_date",this.signupDate) +
						
						this.getTagXML("street1",this.street1) +
						this.getTagXML("street2",this.street2) +
						this.getTagXML("city",this.city) +
						this.getTagXML("state",this.state) +
						this.getTagXML("country",this.country) +
						this.getTagXML("code",this.code);
	return this.getTagXML("staff",content);
	
}

/**
* load obect properties from SimpleXML object
*/	
FreshBooks_Staff.prototype.internalLoadXML = function(XMLObject)
{
	this.staffId = this.getXMLElementValue(XMLObject,"staff_id");
	this.username = this.getXMLElementValue(XMLObject,"username");
	this.firstName = this.getXMLElementValue(XMLObject,"first_name");
	this.lastName = this.getXMLElementValue(XMLObject,"last_name");
	this.email = this.getXMLElementValue(XMLObject,"email");
	
	this.businessPhone = this.getXMLElementValue(XMLObject,"business_phone");
	this.mobilePhone = this.getXMLElementValue(XMLObject,"mobile_phone");
	this.rate = this.getXMLElementValue(XMLObject,"rate");
	this.lastLogin = this.getXMLElementValue(XMLObject,"last_login");
	this.numberOfLogins = this.getXMLElementValue(XMLObject,"number_of_logins");
	this.signupDate = this.getXMLElementValue(XMLObject,"signup_date");
	
	this.street1 = this.getXMLElementValue(XMLObject,"street1");
	this.street2 = this.getXMLElementValue(XMLObject,"street2");
	this.city = this.getXMLElementValue(XMLObject,"city");
	this.state = this.getXMLElementValue(XMLObject,"state");
	this.country = this.getXMLElementValue(XMLObject,"country");
	this.code = this.getXMLElementValue(XMLObject,"code");
}

FreshBooks_Staff.prototype.internalPrepareCreate = function(content)
{
	//
}

FreshBooks_Staff.prototype.internalCreate = function(responseStatus,XMLObject)
{
	//
}

/**
* create not supported - returns false
*/ 	
FreshBooks_Staff.prototype.create = function(){
	return false;
}

FreshBooks_Staff.prototype.internalPrepareUpdate = function(content)
{
	//
}

FreshBooks_Staff.prototype.internalUpdate = function(responseStatus,XMLObject)
{
	//
}

/**
* update not supported - returns false
*/ 	
FreshBooks_Staff.prototype.update = function(){
	return false;
}

/**
* prepare XML string request for GET server method
*/ 	
FreshBooks_Staff.prototype.internalPrepareGet = function(id,content)
{
	return this.getTagXML("staff_id",id);
}

/**
* process XML string response from GET server method
*/		
FreshBooks_Staff.prototype.internalGet = function(responseStatus,XMLObject)
{
	if(responseStatus)
		this.internalLoadXML(XMLObject.getElementsByTagName('staff')[0]);
}

/**
* delete not supported - returns false
*/	
FreshBooks_Staff.prototype.del = function(){
	return false;
}

FreshBooks_Staff.prototype.internalPrepareDelete = function(content)
{
	//
}

FreshBooks_Staff.prototype.internalDelete = function(responseStatus,XMLObject)
{
	//
}

/**
* prepare XML string request for LIST server method
*/	
FreshBooks_Staff.prototype.internalPrepareListing = function(filters,content)
{
	//
}

/**
* process XML string response from LIST server method
*/	
FreshBooks_Staff.prototype.internalListing = function(responseStatus,XMLObject)
{	
	var result = Object();
	var resultStaffMembers = Array();
	if(responseStatus){
		var staffMembers = XMLObject.getElementsByTagName('member');
		if(staffMembers.length > 0){
			resultStaffMembers.length = staffMembers.length;		
			for(var i = 0; i < staffMembers.length; i++){
				var thisStaff = new FreshBooks_Staff();
				thisStaff.internalLoadXML(staffMembers[i]);
				resultStaffMembers[i] = thisStaff;
			}
		}
	}
	var membersInfo = XMLObject.getElementsByTagName('staff_members')[0];
	result.page = membersInfo.getAttribute('page');
	result.perPage = membersInfo.getAttribute('per_page');
	result.pages = membersInfo.getAttribute('pages');
	result.total = membersInfo.getAttribute('total');
	result.rows = resultStaffMembers;
	return result;
}
