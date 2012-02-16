FreshBooks_Project.prototype = new FreshBooks_Element();
FreshBooks_Project.prototype.constructor = FreshBooks_Project;
FreshBooks_Project.superclass = FreshBooks_Element.prototype;
/**
 * FreshBooks Project Class
 * @copyright  Milan Rukavina, rukavinamilan@gmail.com
 * @version    1.0
 * @extends FreshBooks_Element
 * @constructor
 */
function FreshBooks_Project()
{
	this.elementName = "project";
	
	this.projectId = "";
	this.name = "";
	this.billMethod = "";
	this.clientId = "";
	this.rate = "";
	this.description = "";
	this.staff = new Array();
	this.tasks = new Array();
}
	
/**
* return XML string
*/	
FreshBooks_Project.prototype.asXML = function()
{
	var content =
						this.getTagXML("project_id",this.projectId) +
						this.getTagXML("name",this.name) +
						this.getTagXML("bill_method",this.billMethod) +
						this.getTagXML("client_id",this.clientId) +
						this.getTagXML("rate",this.rate) +
						this.getTagXML("description",this.description) +
						this.tasksAsXML();
						
	return this.getTagXML("project",content);
	
}

/**
 * generate XML output from tasks array
 */
FreshBooks_Project.prototype.tasksAsXML = function(){

	var content = '';
	if(this.tasks.length > 0){
		for(var i = 0; i < this.tasks.length; i++){
			content += this.getTagXML("task_id",this.tasks[i]);
		}
		return this.getTagXML("tasks",content);
	}
	else{
		return '';
	}
}

/**
* load obect properties from SimpleXML object
*/	
FreshBooks_Project.prototype.internalLoadXML = function(XMLObject)
{
	this.projectId = this.getXMLElementValue(XMLObject,"project_id");
	this.name = this.getXMLElementValue(XMLObject,"name");
	this.billMethod = this.getXMLElementValue(XMLObject,"bill_method");
	this.clientId = this.getXMLElementValue(XMLObject,"client_id");
	this.rate = this.getXMLElementValue(XMLObject,"rate");
	this.description = this.getXMLElementValue(XMLObject,"description");
	this.loadStaff(XMLObject);
}

/**
 * load staff array from XML object
 */
FreshBooks_Project.prototype.loadStaff = function(XMLObject){
	var staff = this.getXMLNode(XMLObject,"staff");
	if(staff){
		var children=staff.childNodes;
		for (var i = 0; i < children.length; i++){
			var child = children[i];
			if(child.nodeName == "staff_id" && child.firstChild){
				var j = this.staff.length;
				this.staff.length = j + 1;
				this.staff[j] = child.firstChild.nodeValue;
			}
		}
	}
	else{
		this.staff = new Array();
	}
}

/**
* prepare XML string request for CREATE server method
*/	
FreshBooks_Project.prototype.internalPrepareCreate = function(content)
{
	return this.asXML();
}

/**
* process XML string response from CREATE server method
*/		
FreshBooks_Project.prototype.internalCreate = function(responseStatus,XMLObject)
{
	if(responseStatus){
		this.projectId = this.getXMLElementValue(XMLObject.getElementsByTagName('response')[0],"project_id");
	}
}

/**
* prepare XML string request for UPDATE server method
*/ 	
FreshBooks_Project.prototype.internalPrepareUpdate = function(content)
{
	return this.asXML();
}

/**
* process XML string response from UPDATE server method
*/	
FreshBooks_Project.prototype.internalUpdate = function(responseStatus,XMLObject)
{
	//
}

/**
* prepare XML string request for GET server method
*/ 	
FreshBooks_Project.prototype.internalPrepareGet = function(id,content)
{
	return this.getTagXML("project_id",id);
}

/**
* process XML string response from GET server method
*/		
FreshBooks_Project.prototype.internalGet = function(responseStatus,XMLObject)
{
	if(responseStatus)
		this.internalLoadXML(XMLObject.getElementsByTagName('project')[0]);
}

/**
* prepare XML string request for DELETE server method
*/	
FreshBooks_Project.prototype.internalPrepareDelete = function(content)
{
	return this.getTagXML("project_id",this.projectId);
}

/**
* process XML string response from DELETE server method
*/		
FreshBooks_Project.prototype.internalDelete = function(responseStatus,XMLObject)
{
	if(responseStatus){
		this.projectId = null;
		this.name = null;
		this.billMethod = null;
		this.clientId = null;
		this.rate = null;
		this.description = null;		
	}
}

/**
* prepare XML string request for LIST server method
*/	
FreshBooks_Project.prototype.internalPrepareListing = function(filters,content)
{
	var result = this.getTagXML("client_id",filters['clientId']) + this.getTagXML("task_id",filters['taskId']);
	return result;
}

/**
* process XML string response from LIST server method
*/	
FreshBooks_Project.prototype.internalListing = function(responseStatus,XMLObject)
{
	var result = Object();
	var resultProjects = Array();
	if(responseStatus){
		var projects = XMLObject.getElementsByTagName('project');
		if(projects.length > 0){
			resultProjects.length = projects.length;		
			for(var i = 0; i < projects.length; i++){
				var thisProject = new FreshBooks_Project();
				thisProject.internalLoadXML(projects[i]);
				resultProjects[i] = thisProject;
			}
		}
	}
	var projectsInfo = XMLObject.getElementsByTagName('projects')[0];
	result.page = projectsInfo.getAttribute('page');
	result.perPage = projectsInfo.getAttribute('per_page');
	result.pages = projectsInfo.getAttribute('pages');
	result.total = projectsInfo.getAttribute('total');
	result.rows = resultProjects;
	return result;
}
