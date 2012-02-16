FreshBooks_Expense.prototype = new FreshBooks_Element();
FreshBooks_Expense.prototype.constructor = FreshBooks_Expense;
FreshBooks_Expense.superclass = FreshBooks_Element.prototype;
/**
 * FreshBooks Expense Class
 * @copyright  Milan Rukavina, rukavinamilan@gmail.com
 * @version    1.0
 * @extends FreshBooks_Element
 * @constructor
 */
function FreshBooks_Expense()
{
	this.elementName = "expense";
	
	this.expenseId = "";
	this.staffId = "";
	this.categoryId = "";
	this.projectId = "";
	this.clientId = "";
	
	this.amount = "";
	this.date = "";
	this.notes = "";
	this.status = "";
	
	this.tax1Name = "";
	this.tax1Percent = "";
	this.tax1Amount = "";
	this.tax2Name = "";
	this.tax2Percent = "";
	this.tax2Amount = "";
}	
	
/**
* return XML string
*/	
FreshBooks_Expense.prototype.asXML = function()
{
	var content =
						this.getTagXML("expense_id",this.expenseId) +
						this.getTagXML("staff_id",this.staffId) +
						this.getTagXML("category_id",this.categoryId) +
						this.getTagXML("project_id",this.projectId) +
						this.getTagXML("client_id",this.clientId) +
						this.getTagXML("amount",this.amount) +
						this.getTagXML("date",this.date) +
						this.getTagXML("notes",this.notes) +
						this.getTagXML("status",this.status) +
						this.getTagXML("tax1_name",this.tax1Name) +
						this.getTagXML("tax1_percent",this.tax1Percent) +
						this.getTagXML("tax1_amount",this.tax1Amount) +
						this.getTagXML("tax2_name",this.tax2Name) +
						this.getTagXML("tax2_percent",this.tax2Percent) +
						this.getTagXML("tax2_amount",this.tax2Amount);
						
	return this.getTagXML("expense",content);
	
}

/**
* load obect properties from SimpleXML object
*/ 	
FreshBooks_Expense.prototype.internalLoadXML = function(XMLObject)
{
	this.expenseId = this.getXMLElementValue(XMLObject,"expense_id");
	this.staffId = this.getXMLElementValue(XMLObject,"staff_id");
	this.categoryId = this.getXMLElementValue(XMLObject,"category_id");
	this.projectId = this.getXMLElementValue(XMLObject,"project_id");
	this.clientId = this.getXMLElementValue(XMLObject,"client_id");
	this.amount = this.getXMLElementValue(XMLObject,"amount");
	this.date = this.getXMLElementValue(XMLObject,"date");
	this.notes = this.getXMLElementValue(XMLObject,"notes");
	this.status = this.getXMLElementValue(XMLObject,"status");
	this.tax1Name = this.getXMLElementValue(XMLObject,"tax1_name");
	this.tax1Percent = this.getXMLElementValue(XMLObject,"tax1_percent");
	this.tax1Amount = this.getXMLElementValue(XMLObject,"tax1_amount");
	this.tax2Name = this.getXMLElementValue(XMLObject,"tax2_name");
	this.tax2Percent = this.getXMLElementValue(XMLObject,"tax2_percent");
	this.tax2Amount = this.getXMLElementValue(XMLObject,"tax2_amount");
}

/**
* prepare XML string request for CREATE server method
*/	
FreshBooks_Expense.prototype.internalPrepareCreate = function(content)
{
	return this.asXML();
}

/**
* process XML string response from CREATE server method
*/		
FreshBooks_Expense.prototype.internalCreate = function(responseStatus,XMLObject)
{
	if(responseStatus){
		this.expenseId = this.getXMLElementValue(XMLObject.getElementsByTagName('response')[0],"expense_id");
	}
}

/**
* prepare XML string request for UPDATE server method
*/	
FreshBooks_Expense.prototype.internalPrepareUpdate = function(content)
{
	return this.asXML();
}

/**
* process XML string response from UPDATE server method
*/		
FreshBooks_Expense.prototype.internalUpdate = function(responseStatus,XMLObject)
{
	//
}

/**
* prepare XML string request for GET server method
*/ 	
FreshBooks_Expense.prototype.internalPrepareGet = function(id,content)
{
	return this.getTagXML("expense_id",id);
}

/**
* process XML string response from GET server method
*/		
FreshBooks_Expense.prototype.internalGet = function(responseStatus,XMLObject)
{
	if(responseStatus)
		this.internalLoadXML(XMLObject.getElementsByTagName('expense')[0]);
}

/**
* prepare XML string request for DELETE server method
*/		
FreshBooks_Expense.prototype.internalPrepareDelete = function(content)
{
	return this.getTagXML("expense_id",this.expenseId);
}

/**
* process XML string response from DELETE server method
*/		
FreshBooks_Expense.prototype.internalDelete = function(responseStatus,XMLObject)
{
	if(responseStatus){
		this.expenseId = null;
		this.staffId = null;
		this.categoryId = null;
		this.projectId = null;
		this.clientId = null;
		this.amount = null;
		this.date = null;
		this.notes = null;
		this.status = null;
		this.tax1Name = null;
		this.tax1Percent = null;
		this.tax1Amount = null;
		this.tax2Name = null;
		this.tax2Percent = null;
		this.tax2Amount = null;
	}
}

/**
* prepare XML string request for LIST server method
*/	
FreshBooks_Expense.prototype.internalPrepareListing = function(filters,content)
{
	var result = this.getTagXML("client_id",filters['clientId']);
	return result;
}

/**
* process XML string response from LIST server method
*/		
FreshBooks_Expense.prototype.internalListing = function(responseStatus,XMLObject)
{
	var result = Object();
	var resultExpenses = Array();
	if(responseStatus){
		var expenses = XMLObject.getElementsByTagName('expense');
		if(expenses.length > 0){
			resultExpenses.length = expenses.length;		
			for(var i = 0; i < expenses.length; i++){
				var thisExpense = new FreshBooks_Expense();
				thisExpense.internalLoadXML(expenses[i]);
				resultExpenses[i] = thisExpense;
			}
		}
	}
	var expensesInfo = XMLObject.getElementsByTagName('expenses')[0];
	result.page = expensesInfo.getAttribute('page');
	result.perPage = expensesInfo.getAttribute('per_page');
	result.pages = expensesInfo.getAttribute('pages');
	result.total = expensesInfo.getAttribute('total');
	result.rows = resultExpenses;
	return result;
}
