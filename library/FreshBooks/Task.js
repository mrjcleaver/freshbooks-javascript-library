FreshBooks_Task.prototype = new FreshBooks_Element();
FreshBooks_Task.prototype.constructor = FreshBooks_Task;
FreshBooks_Task.superclass = FreshBooks_Element.prototype;
/**
 * FreshBooks Task Class
 * @copyright  Milan Rukavina, rukavinamilan@gmail.com
 * @version    1.0
 * @extends FreshBooks_Element
 * @constructor
 */
function FreshBooks_Task()
{
	this.elementName = "task";
	
	this.taskId = "";
	this.name = "";
	this.billable = "";
	this.rate = "";
	this.description = "";
}
	
/**
* return XML string
*/	
FreshBooks_Task.prototype.asXML = function()
{
	var content =
						this.getTagXML("task_id",this.taskId) +
						this.getTagXML("name",this.name) +
						this.getTagXML("billable",this.billable) +
						this.getTagXML("rate",this.rate) +
						this.getTagXML("description",this.description);
						
	return this.getTagXML("task",content);
	
}

/**
* load obect properties from SimpleXML object
*/	
FreshBooks_Task.prototype.internalLoadXML = function(XMLObject)
{
	this.taskId = this.getXMLElementValue(XMLObject,"task_id");
	this.name = this.getXMLElementValue(XMLObject,"name");
	this.billable = this.getXMLElementValue(XMLObject,"billable");
	this.rate = this.getXMLElementValue(XMLObject,"rate");
	this.description = this.getXMLElementValue(XMLObject,"description");
}

/**
* prepare XML string request for CREATE server method
*/	
FreshBooks_Task.prototype.internalPrepareCreate = function(content)
{
	return this.asXML();
}

/**
* process XML string response from CREATE server method
*/		
FreshBooks_Task.prototype.internalCreate = function(responseStatus,XMLObject)
{
	if(responseStatus){
		this.taskId = this.getXMLElementValue(XMLObject.getElementsByTagName('response')[0],"task_id");
	}
}

/**
* prepare XML string request for UPDATE server method
*/	
FreshBooks_Task.prototype.internalPrepareUpdate = function(content)
{
	return this.asXML();
}

/**
* process XML string response from UPDATE server method
*/		
FreshBooks_Task.prototype.internalUpdate = function(responseStatus,XMLObject)
{
	//
}

/**
* prepare XML string request for GET server method
*/	
FreshBooks_Task.prototype.internalPrepareGet = function(id,content)
{
	return this.getTagXML("task_id",id);
}

/**
* process XML string response from GET server method
*/	
FreshBooks_Task.prototype.internalGet = function(responseStatus,XMLObject)
{
	if(responseStatus)
		this.internalLoadXML(XMLObject.getElementsByTagName('task')[0]);
}

/**
* prepare XML string request for DELETE server method
*/	
FreshBooks_Task.prototype.internalPrepareDelete = function(content)
{
	return this.getTagXML("task_id",this.taskId);
}

/**
* process XML string response from DELETE server method
*/		
FreshBooks_Task.prototype.internalDelete = function(responseStatus,XMLObject)
{
	if(responseStatus){
		this.taskId = null;
		this.name = null;
		this.billable = null;
		this.rate = null;
		this.description = null;		
	}
}

/**
* prepare XML string request for LIST server method
*/		
FreshBooks_Task.prototype.internalPrepareListing = function(filters,content)
{
	var result = this.getTagXML("project_id",filters['projectId']);
	return result;
}

/**
* process XML string response from LIST server method
*/	
FreshBooks_Task.prototype.internalListing = function(responseStatus,XMLObject)
{
	var result = Object();
	var resultTasks = Array();
	if(responseStatus){
		var tasks = XMLObject.getElementsByTagName('task');
		if(tasks.length > 0){
			resultTasks.length = tasks.length;		
			for(var i = 0; i < tasks.length; i++){
				var thisTask = new FreshBooks_Task();
				thisTask.internalLoadXML(tasks[i]);
				resultTasks[i] = thisTask;
			}
		}
	}
	var tasksInfo = XMLObject.getElementsByTagName('tasks')[0];
	result.page = tasksInfo.getAttribute('page');
	result.perPage = tasksInfo.getAttribute('per_page');
	result.pages = tasksInfo.getAttribute('pages');
	result.total = tasksInfo.getAttribute('total');
	result.rows = resultTasks;
	return result;
}
