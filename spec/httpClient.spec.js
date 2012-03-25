/**
 * Created with JetBrains WebStorm.
 * User: martincleaver
 * Date: 12-03-24
 * Time: 5:59 PM
 * To change this template use File | Settings | File Templates.
 */

// jasmine-node spec/httpClient.spec.js

var FreshBooks = require('../index.js');
moment = require('moment');

var today = moment().format("YYYY-MM-DD");

var config = require("./freshbooksTestConnection.js"); // see sampleFreshbooksTestConnection.js
var url = config.url;
var token = ''; // not set up to use tokens yet.

//GLOBAL.httpClient = undefined;


describe('client', function () {

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

});