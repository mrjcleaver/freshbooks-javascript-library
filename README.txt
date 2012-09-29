======================================================================

*NB* - I have stopped working on this, but https://github.com/Metacrash/freshbooks.js has recently emerged 
and so you might want to try that also


DESCRIPTION:

This is a Javascript library for FreshBooks API (http://developers.freshbooks.com/overview/).
MOVED FROM http://code.google.com/p/freshbooks-javascript-library/ (version 8 - Feb 26, 2010)
INTO Github to encourage collaboration
AND ADAPTED FOR NODE.JS

Original Developer: Milan Rukavina
Node.js port: Martin Cleaver (Martin@Cleaver.org)

======================================================================
NODE JS:

NOTES:
- Work has begun to adapt this library for nodejs.
- A goal for moving this to github is to encourage collaboration for that goal.
- This work is in alpha condition, focused on the TimeEntry class and its dependencies, Element and HttpClient.
-- none of the other classes have been tested
- The first points of work have been:
-- use CommonJS requires to hold the library togther such that you can "require" the library
-- build a test suite (using jasmine-node) to support the new functionality
-- add moderate amounts of logging (using log4js)
-- use of jsdom to process the response
-- in HttpClient, to decouple the IO-bound calls to freshbooks, such that they are asynchronous rather
   than synchronous; see the github issues list for discussion.

CAVEATS
- there did not exist a test suite prior to the refactoring for nodejs. There are now a few tests.
- the alpha version of this probably no longer works on the browser!
- Freshbooks continued to evolve their API from 2010 to 2012 - freshbooks-javascript-library was not maintained to keep up.

HOW YOU CAN HELP
- add to the issues list
- build / submit test cases
- work on code
- let us know if there is another JS library that has overlapping functionality

FOOTNOTE
- This work is not funded but driven from Martin's personal need based on TimeEntries for FreshBooks and a desire to
  learn about node.js: other parts of the API may follow
- it is supported on an interest basis (hopefully others will help support it)
- Milan Rukavina is supportive of the project but is unable to be involved

======================================================================

FOR NODE USAGE:

Install node and npm
npm install jasmine-node jsdom log4js moment request
jasmine-node  spec/timeEntry.spec.js


======================================================================

FOR BROWSER JS
Please NOTE:
- the checked-in version of this probably no longer works on the browser (see caveats)
-- use the version in the Github Downloads section

USAGE: REQUIREMENTS:

proxy.php or similar server side script as a proxy is required since at the moment is not possible to make cross-domain ajax calls - so it's not possible to communicate with freshbooks server from client side javascript. Other possible work arround could be with using flash component like http://flxhr.flensed.com/

======================================================================


BROWSER USAGE:

Please take a look at example.htm file from this package. It's trivial an example but should be good enough to demonstrate the usage. For more details please reffer to docs directory.

======================================================================

CREDITS:
- Milan Rukavina <rukavinamilan@gmail.com>

======================================================================

LICENSE:

This program is free software; you can redistribute it and/or
modify it.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
