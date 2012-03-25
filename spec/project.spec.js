// jasmine-node spec/project.spec.js

var FreshBooks = require('../index.js');
moment = require('moment');

var today = moment().format("YYYY-MM-DD");

var config = require("./freshbooksTestConnection.js"); // see sampleFreshbooksTestConnection.js
var url = config.url;
var token = ''; // not set up to use tokens yet.

GLOBAL.httpClient = undefined;


describe('project', function () {

    it('should be able to initialize httpClient', function () {

        GLOBAL.httpClient = new FreshBooks.HttpClient(url, token);
        expect(httpClient).toNotBe(null);
    });

    it('project should return a list of projects', function() {

        var projectClass = new FreshBooks.Project;      // SMELL: seems weird to have to set up an instance to do a class based request.
        var filter = {};

        var resultCallback = function (status, res) {
            console.log("lookupEntry found ");
            console.dir(res);
            expect(status).toBe(true);
            asyncSpecDone();
        }

        projectClass.listing(1, 100, filter, resultCallback);
        asyncSpecWait();
    });

});


