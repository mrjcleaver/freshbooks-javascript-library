// jasmine-node spec/timeEntry.spec.js

var FreshBooks = require('../index.js');
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

    it('timeEntry should generate XML', function(){

        var entry = new FreshBooks.TimeEntry();
        entry.notes = "notes";
        entry.hours = "1";

        var xml = entry.asXML();
        expect (xml).toEqual('<time_entry><notes>notes</notes><hours>1</hours></time_entry>');
    });

    it('timeEntry should successfully submit a timeentry', function(){

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

    it('timeEntry should list all entries for a day', function(){

        var entryDate = today;
        //var filter = '<date_from>' + entryDate + '</date_from><date_to>' + entryDate + '</date_to>';
        var filter = {};
        filter.dateFrom = entryDate;
        filter.dateTo = entryDate;

        var timeentryClass = new FreshBooks.TimeEntry;      // SMELL: seems weird to have to set up an instance to do a class based request.

        var resultCallback = function (err, res) {
            console.log("lookupEntry for " + entryDate + " found ");
//            console.dir(res);
            expect(err).toBe(false);
            //expect(res) ?
            asyncSpecDone();
        }

        timeentryClass.listing(1, 100, filter, resultCallback);
        asyncSpecWait();

    });

    /*
    it('timeEntry should remove a single time entry', function(){
        var deleteMe = new FreshBooks.TimeEntry;

        deleteMe.hours = 1;
        deleteMe.create(createdCallback);
        // wait for answer of id created, and delete again as appropriate
        var idNumber = '360164';
        deleteMe.timeEntryId = idNumber;

        var resultCallback = function (err, res) {
            console.log("delete for " + idNumber + " done");
            expect(err).toBe(false);

            asyncSpecDone();
        }

        deleteMe.del(resultCallback);
    });

   */


    //https://yoururl.freshbooks.com/menu.php?route=Report_TimesheetDetails&type=timesheet-details&project_status=active&date_start=02%2F23%2F01&date_end=03%2F24%2F12&group_by=team&billed_filter=&submit=
    it('timeEntry should remove all entries for today', function(){

        var entryDate = today;
        var filter = {};
        filter.dateFrom = "2001-01-01"; //entryDate;
        filter.dateTo = entryDate;

        var timeentryClass = new FreshBooks.TimeEntry;      // SMELL: seems weird to have to set up an instance to do a class based request.

        var listingCallback = function (err, res) {
            console.log("lookupEntry for " + entryDate + " found ");
            console.log(res.page, res.pages, res.total);
            //expect(err).toBe(false); // TODO - why is returning false when it should be true?


            var rows = res.rows;

            for (var i=0; i<rows.length; i++) {

                var entryRow = rows[i];
                var entryId = entryRow.timeEntryId;
                var obj = new FreshBooks.TimeEntry();
                obj.timeEntryId = entryId;

                function deleteIt (objParameter, i, entryId) {
                   // console.log("Deleting ["+i+"] " + entryId);

                    var deletedCallback = function (status, res) {
                        console.log("deleted ["+ i + "] (" + entryId + ") "+status);
                        // nb. can't ask for e.g. objParameter.timeEntryId as del wipes them.
                    };

                    objParameter.del(deletedCallback);
                };

                deleteIt(obj, i, entryId);
            }

            asyncSpecDone();
        }

        timeentryClass.listing(1, 1000, filter, listingCallback);
        asyncSpecWait();

    });

});

/* test filters
 if (timeEntry.projectId) { filter += '<project_id>' + timeEntry.projectId + '</project_id>'};
 if (timeEntry.taskId) { filter += '<task_id>' + timeEntry.taskId + '</task_id>'};

 */

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
