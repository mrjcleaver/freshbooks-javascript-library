// jasmine-node spec/client.spec.js

var FreshBooks = require('../index.js');
moment = require('moment');

var today = moment().format("YYYY-MM-DD");

var config = require("./freshbooksTestConnection.js"); // see sampleFreshbooksTestConnection.js
var url = config.url;
var token = ''; // not set up to use tokens yet.

GLOBAL.httpClient = undefined;


describe('client', function () {

    it('should be able to initialize httpClient', function () {

        GLOBAL.httpClient = new FreshBooks.HttpClient(url, token);
        expect(httpClient).toNotBe(null);
    });

    it('client should return a list of clients', function() {

        var clientClass = new FreshBooks.Client();      // SMELL: seems weird to have to set up an instance to do a class based request.
        var filter = {};

        var resultCallback = function (err, res) {
            console.log("lookupEntry found ");
            console.dir(res);
            expect(err).toBe(false);
            asyncSpecDone();
        }

        clientClass.listing(1, 100, filter, resultCallback);
        asyncSpecWait();
    });

});


