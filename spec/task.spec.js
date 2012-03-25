// jasmine-node spec/task.spec.js

var FreshBooks = require('../index.js');
moment = require('moment');

var today = moment().format("YYYY-MM-DD");

var config = require("./freshbooksTestConnection.js"); // see sampleFreshbooksTestConnection.js
var url = config.url;
var token = ''; // not set up to use tokens yet.

GLOBAL.httpClient = undefined;


describe('task', function () {

    it('should be able to initialize httpClient', function () {

        GLOBAL.httpClient = new FreshBooks.HttpClient(url, token);
        expect(httpClient).toNotBe(null);
    });

    it('task should return a list of tasks', function() {

        var taskClass = new FreshBooks.Task;      // SMELL: seems weird to have to set up an instance to do a class based request.
        var filter = {};

        var resultCallback = function (status, res) {
            console.log("lookupEntry found ");
            console.dir(res);
            expect(status).toBe(true);
            asyncSpecDone();
        }

        taskClass.listing(1, 100, filter, resultCallback);
        asyncSpecWait();
    });

});


