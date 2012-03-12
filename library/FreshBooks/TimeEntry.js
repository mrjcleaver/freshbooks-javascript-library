var FreshBooks_Element = require('./Element');
FreshBooks_TimeEntry.prototype = new FreshBooks_Element();
FreshBooks_TimeEntry.prototype.constructor = FreshBooks_TimeEntry;
FreshBooks_TimeEntry.superclass = FreshBooks_Element.prototype;
/**
 * FreshBooks TimeEntry Class
 * @copyright  Milan Rukavina, rukavinamilan@gmail.com
 * @version    1.0
 * @extends FreshBooks_Element
 * @constructor
 */
function FreshBooks_TimeEntry()
{
	this.elementName = "time_entry";
	
	this.timeEntryId = "";
	this.projectId = "";
	this.taskId = "";	
	this.date = "";
	this.notes = "";
	this.hours = "";
	this.staffId = "";
}
	
module.exports = FreshBooks_TimeEntry;
	
	
/**
* return XML string
*/	
FreshBooks_TimeEntry.prototype.asXML = function()
{
	var content =
						this.getTagXML("time_entry_id",this.timeEntryId) +
						this.getTagXML("project_id",this.projectId) +
						this.getTagXML("task_id",this.taskId) +
						this.getTagXML("date",this.date) +
						this.getTagXML("notes",this.notes) +
						this.getTagXML("hours",this.hours);
						
	return this.getTagXML("time_entry",content);
	
}

/**
* load obect properties from SimpleXML object
*/	
FreshBooks_TimeEntry.prototype.internalLoadXML = function(XMLObject)
{
	this.timeEntryId = this.getXMLElementValue(XMLObject,"time_entry_id");
	this.projectId = this.getXMLElementValue(XMLObject,"project_id");
	this.taskId = this.getXMLElementValue(XMLObject,"task_id");
	this.date = this.getXMLElementValue(XMLObject,"date");
	this.notes = this.getXMLElementValue(XMLObject,"notes");
	this.hours = this.getXMLElementValue(XMLObject,"hours");
	this.staffId = this.getXMLElementValue(XMLObject,"staff_id");
}

/**
* prepare XML string request for CREATE server method
*/	
FreshBooks_TimeEntry.prototype.internalPrepareCreate = function(content)
{
	return this.asXML();
}

/**
* process XML string response from CREATE server method
*/		
FreshBooks_TimeEntry.prototype.internalCreate = function(responseStatus,XMLObject)
{
	if(responseStatus){
        this.timeEntryId = this.getXMLElementValue(XMLObject.getElementsByTagName('response')[0],"time_entry_id");
	}
}

/**
* prepare XML string request for UPDATE server method
*/	
FreshBooks_TimeEntry.prototype.internalPrepareUpdate = function(content)
{
	return this.asXML();
}

/**
* process XML string response from UPDATE server method
*/		
FreshBooks_TimeEntry.prototype.internalUpdate = function(responseStatus,XMLObject)
{
	//
}

/**
* prepare XML string request for GET server method
*/ 	
FreshBooks_TimeEntry.prototype.internalPrepareGet = function(id,content)
{
	return this.getTagXML("time_entry_id",id);
}

/**
* process XML string response from GET server method
*/	
FreshBooks_TimeEntry.prototype.internalGet = function(responseStatus,XMLObject)
{
	if(responseStatus)
		this.internalLoadXML(XMLObject.getElementsByTagName('time_entry')[0]);
}

/**
* prepare XML string request for DELETE server method
*/		
FreshBooks_TimeEntry.prototype.internalPrepareDelete = function(content)
{
	return this.getTagXML("time_entry_id",this.timeEntryId);
}

/**
* process XML string response from DELETE server method
*/		
FreshBooks_TimeEntry.prototype.internalDelete = function(responseStatus,XMLObject)
{
	if(responseStatus){
		this.timeEntryId = null;
		this.projectId = null;
		this.taskId = null;
		this.date = null;
		this.notes = null;
		this.hours = null;
		this.staffId = null;
	}
}

/**
* prepare XML string request for LIST server method
*/		
FreshBooks_TimeEntry.prototype.internalPrepareListing = function(filters,content)
{
	var result= this.getTagXML("project_id",filters['projectId'])
						+  this.getTagXML("task_id",filters['taskId'])
						+  this.getTagXML("date_from",filters['dateFrom'])
						+  this.getTagXML("date_to",filters['dateTo']);
	return result;
}

/**
* process XML string response from LIST server method
*/		
FreshBooks_TimeEntry.prototype.internalListing = function(responseStatus,XMLObject,rows,resultInfo)
{
	var result = Object();
	var resultTimeEntries = Array();
	if(responseStatus){
		var timeEntries = XMLObject.getElementsByTagName('time_entry');
		if(timeEntries.length > 0){
			resultTimeEntries.length = timeEntries.length;		
			for(var i = 0; i < timeEntries.length; i++){
				var thisTimeEntry = new FreshBooks_TimeEntry();
				thisTimeEntry.internalLoadXML(timeEntries[i]);
				resultTimeEntries[i] = thisTimeEntry;
			}
		}
	}
	var timeEntriesInfo = XMLObject.getElementsByTagName('time_entries')[0];
	result.page = timeEntriesInfo.getAttribute('page');
	result.perPage = timeEntriesInfo.getAttribute('per_page');
	result.pages = timeEntriesInfo.getAttribute('pages');
	result.total = timeEntriesInfo.getAttribute('total');
	result.rows = resultTimeEntries;
	return result;
}
