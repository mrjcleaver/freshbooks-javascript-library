httpClient = null;
var FreshBooks = require('../../index.js');
var nodeRequest = require("request");

var jsdom = require('jsdom');
var log4js = require('log4js');
var logger = log4js.getLogger('httpClient');
logger.setLevel(logger.WARN);


FreshBooks_HttpClient.prototype.constructor = FreshBooks_HttpClient;
module.exports = FreshBooks_HttpClient;

/**
 * FreshBooks HttpClient Class
 * @copyright  Milan Rukavina, rukavinamilan@gmail.com
 * @version    1.0
 * @constructor
 */
function FreshBooks_HttpClient(url, token, proxyUrl) {
    this.url = url;
    this.token = token;
    this.proxyUrl = proxyUrl;


    /**
     * Send request via Node Request method
     * This is asynchronous
     *
     * @return {Boolean}
     */
    this.send = this.browserSend; // rewired for node



    /**
     * send request via Browser method
     *
     * This is synchronous, and will call nextFunction straight away
     * TODO - think about running async for browser.
     */
    this.browserSend = function (content, nextFunction) {
        var url = "";
        if (this.proxyUrl) {
            url = this.proxyUrl + "?url=" + this.url;
        } else {
            url = this.url;
        }
        var post = "token=" + this.token + "&content=" + content;
        this.request.open("POST", url, false, this.token);
        this.request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        this.request.setRequestHeader("Content-length", post.length);
        this.request.send(post);
        if (this.request.status == 200) {
            nextFunction(this.request.responseXML);
        } else {
            nextFunction(false);
        }
    };


    var processNodeResponse = function (error, response, bodyXML) {

    };

    /**
     * Send request via Node Request method
     * This is asynchronous, and will call callback once the IO is complete
     *
     * @return {Boolean}
     */
    // TODO: if you omit parameterCallback the error reporting doesn't work
    this.nodeSend = function (content, parameterCallback) {
        if (!content) {
            console.trace();
            throw ("No content!");
        } else {
            logger.trace("Sending " + content);
        }

        var responseCallback = processNodeResponse;

        if (parameterCallback) {
            responseCallback = parameterCallback;
        };

//        logger.info("Response will go to ", responseCallback);

        var responseCallback = function (error, response, bodyXML) {
            logger.info("Callback on Response: ", error, bodyXML); // don't print response object
            var xmlObject;

            if (responseCallback) {
                if (typeof bodyXML === "string") {                // in Node, this is a string.
                                                                  // the js library gets this as an XMLObject
                    xmlObject = jsdom.jsdom(bodyXML);
//                    logger.info("Converted ", bodyXML, " to XML");
//                    logger.trace("xml ouput = ", xmlObject);
                } else {
                    xmlObject = bodyXML;
                }
                parameterCallback(xmlObject);
            } else {
                console.trace("No callback, no one to notify");
            }
        };

        var errorCallback = function (error, response, body) {
            logger.info('ERROR =========================== ' + error + ' ' + response + ' ' + body);
        };

        options = {
            url:this.url,
            method:"POST",
            headers:{
                contentType:"text/xml",
                'Content-Length':content.length
            },
            body:content || "",
            onError:errorCallback
        };

//        logger.info("Node Send:", options);
        req = nodeRequest(options, responseCallback);// ('callback', error, response, body)
//        logger.info("moving on");

    };


    /**
     * Work out whether this is node or browser based
     * @return {Boolean}
     */
    this.isRunningUnderNode = function () {
        // http://stackoverflow.com/questions/4224606/how-to-check-whether-a-script-is-running-under-node-js
        // Establish the root object, `window` in the browser, or `global` on the server.
        var root = this;

        // Create a reference to this
        var _ = new Object();

        var isNode = false;

        // Export the Underscore object for **CommonJS**, with backwards-compatibility
        // for the old `require()` API. If we're not in CommonJS, add `_` to the
        // global object.
        if (typeof module !== 'undefined' && module.exports) {
            module.exports = _;
            root._ = _;
            isNode = true;
        } else {
            root._ = _;
        }
        logger.trace("isNode?: ", isNode);
        return isNode;
    };

    this.wireUpSend = function() {
        if (this.isRunningUnderNode()) {
            this.send = this.nodeSend;
            this.request = nodeRequest;
        } else {
            if (window.XMLHttpRequest) {
                this.request = new XMLHttpRequest();
                this.isIE = false;
            }
            // branch for IE/Windows ActiveX version
            else {
                if (window.ActiveXObject) {
                    this.isIE = true;
                    this.request = new ActiveXObject("Microsoft.XMLHTTP");
                }
            }
            this.send = this.browserSend;
        }
    };

    this.wireUpSend();

}