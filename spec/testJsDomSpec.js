// jasmine-node spec/testJsDomSpec.js
var log4js = require('log4js');
var logger = log4js.getLogger();
logger.setLevel(logger.INFO);


var jsdom = require('jsdom');
var FreshBooks = require("../index.js");

describe('jsdom-should-load-freshbooks-xml', function(){
  var failXml = '<?xml version="1.0" encoding="utf-8"?>\n<response xmlns="http://www.freshbooks.com/api/" status="fail">\n  <error>\'project_id\' not found. Project not found.</error>\n  <code>50010</code>\n</response>\n';

  var XMLObject = jsdom.jsdom(failXml) 	; // capitalized because that's how the FreshBooks code has it
	
  it('should pass', function(){
	var statusCode = XMLObject.getElementsByTagName("response")[0].getAttribute("status");
	var error = XMLObject.getElementsByTagName("error")[0].firstChild.nodeValue;
	
    expect(statusCode).toEqual('fail');
	expect(error).toEqual("'project_id' not found. Project not found.");
  });
});

describe('jsdom-should-extract-freshbooks-response', function(){
  var responseXml = '<?xml version="1.0" encoding="utf-8"?>\n<response xmlns="http://www.freshbooks.com/api/" status="ok">\n  <time_entry_id>343748</time_entry_id>\n</response>\n';
	
  it('jsdom should getElementsByTagName', function(){
	var xmlObject = jsdom.jsdom(responseXml);

	var statusCode = xmlObject.getElementsByTagName("response")[0].getAttribute("status");
	
	var time_entry_id2 = xmlObject.getElementsByTagName("time_entry_id")[0].firstChild.nodeValue;
	
//	console.log(statusCode);
//	console.log(xmlObject);
//	console.log(time_entry_id2);

    expect(statusCode).toEqual("ok");
    expect(time_entry_id2).toEqual('343748');


  });
});


describe('jsdom-should-load-a-timeentry-response', function(){
    var responseXml = '<?xml version="1.0" encoding="utf-8"?>\n<response xmlns="http://www.freshbooks.com/api/" status="ok">\n  <time_entry_id>343748</time_entry_id>\n</response>\n';
    var xmlObject = jsdom.jsdom(responseXml);

    it('getXMLElementValue should= getElementsByTagName', function () {
        // Traverse by hand
        var time_entry_id_from_jsdom =  xmlObject.getElementsByTagName("time_entry_id")[0].firstChild.nodeValue;

        // now try via TimeEntry
        var responseTimeEntry = new FreshBooks.TimeEntry(); // actually it might be dubious why we would load a TimeentryResponse into a TimeEntry, but this shows tolerance.
        responseTimeEntry.loadXML(xmlObject);

        var time_entry_id_from_TimeEntry = responseTimeEntry.getXMLElementValue(xmlObject, 'time_entry_id');
        var statusCode_from_jsdom = xmlObject.getElementsByTagName("response")[0].getAttribute("status");



//        console.log(statusCode_from_jsdom);
//        console.log("TimeEntry", responseTimeEntry);
//        console.log("JSDOM says", time_entry_id_from_jsdom);
//        console.log("TimeEntry says", time_entry_id_from_TimeEntry);

        expect(time_entry_id_from_jsdom).toEqual('343748');
        expect(time_entry_id_from_TimeEntry).toEqual('343748');
        expect(statusCode_from_jsdom).toEqual("ok");

    });
});

describe('jsdom-should-load-a-timeentry-record', function(){
    var responseXml = '<?xml version="1.0" encoding="utf-8"?>\n<response xmlns="http://www.freshbooks.com/api/" status="ok">\n  <time_entry_id>343748</time_entry_id>\n</response>\n';
    var xmlObject = jsdom.jsdom(responseXml);

    it('getXMLElementValue should= getElementsByTagName', function () {
        // Traverse by hand
        var time_entry_id_from_jsdom =  xmlObject.getElementsByTagName("time_entry_id")[0].firstChild.nodeValue;

        // now try via TimeEntry
        var responseTimeEntry = new FreshBooks.TimeEntry();
        responseTimeEntry.loadXML(xmlObject);

        var time_entry_id_from_TimeEntry = responseTimeEntry.getXMLElementValue(xmlObject, 'time_entry_id');

        var statusCode_from_jsdom = xmlObject.getElementsByTagName("response")[0].getAttribute("status");



//        console.log(statusCode_from_jsdom);

//        console.log("TimeEntry", responseTimeEntry);

//        console.log("JSDOM says", time_entry_id_from_jsdom);
//        console.log("TimeEntry says", time_entry_id_from_TimeEntry);

        expect(time_entry_id_from_jsdom).toEqual('343748');
        expect(time_entry_id_from_TimeEntry).toEqual('343748');

    });
});