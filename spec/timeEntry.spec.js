// jasmine-node spec/timeEntry.spec.js

var FreshBooks = require('freshbooks-javascript-library');
moment = require('moment');

var today = moment().format("YYYY-MM-DD");

var config = require("./freshbooksTestConnection.js"); // see sampleFreshbooksTestConnection.js
var url = config.url;
var token = ''; // not set up to use tokens yet.

GLOBAL.httpClient = undefined;


describe('timeEntry', function () {


    it('should be able to initialize httpClient', function () {

        GLOBAL.httpClient = new FreshBooks.HttpClient(url, token);
        expect(httpClient).toNotBe(null);
    });


    it('should be able to send raw XML via httpClient', function () {
        var ans = undefined;

        var callback = function (params) {
            //console.log("Called back with ", params);
            ans = params;
            var statusCode = ans.getElementsByTagName("response")[0].getAttribute("status");
            expect(statusCode).toMatch('.*ok.*');
            asyncSpecDone();
        }

        expect(httpClient).toNotBe(null);
        httpClient.send(
            '<request method="time_entry.create"><time_entry><project_id>1</project_id><task_id>1</task_id><notes>notes</notes><hours>1</hours></time_entry></request>',
            callback);

        asyncSpecWait();
    });

    it('timeEntry should generate XML', function(){

        var entry = new FreshBooks.TimeEntry();
        entry.notes = "notes";
        entry.hours = "1";

        var xml = entry.asXML();
        expect (xml).toEqual('<time_entry><notes>notes</notes><hours>1</hours></time_entry>');
    });

    it('timeEntry should submit', function(){

        var entry = new FreshBooks.TimeEntry();
        entry.notes = "notes";
        entry.hours = "1";
        entry.projectId = "1";
        entry.taskId = "1";

        var callback = function (params) {
            console.log("Called back with ", params);
            ans = params;
            expect(ans).toBe(true);
            asyncSpecDone();
        }

        entry.create(callback);
        asyncSpecWait();

    });

});

/*
    it('poster should insert an entry', function(){
        var data = {
            projectId: 1,
            taskId: 1,
            date: today,
            notes: "textEntry.spec.js "+today,
            hours: 1000,
            staffId: ''
        };
//        freshbooksPoster.submitTimeEntry(data);

//        freshbooksPoster.lookupEntry(data);
    });


    it('poster should detect a duplicate entry', function(){
        var data1 = {
            projectId: 1,
            taskId: 1,
            date: today,
            notes: "textEntry.spec.js "+today,
            hours: 1000,
            staffId: ''
        };

        var data2 = {
            projectId: 1,
            taskId: 1,
            date: today,
            notes: "textEntry.spec.js "+today,
            hours: 1000,
            staffId: ''
        };
//        freshbooksPoster.submitTimeEntry(data1);
//        freshbooksPoster.submitTimeEntry(data2);

        console.log(freshbooksPoster.lookupEntry(data1));
    });
});

*/
