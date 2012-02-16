var httpClient = null;
/**
 * FreshBooks HttpClient Class
 * @copyright  Milan Rukavina, rukavinamilan@gmail.com
 * @version    1.0
 * @constructor
 */
function FreshBooks_HttpClient(url,token,proxyUrl) {
	this.url = url;
	this.token = token;
	this.proxyUrl = proxyUrl;
	// branch for native XMLHttpRequest object
	if (window.XMLHttpRequest) {
		this.request = new XMLHttpRequest();
		this.isIE = false;
	}
	// branch for IE/Windows ActiveX version
	else{ 
		if (window.ActiveXObject) {
			this.isIE = true;
			this.request = new ActiveXObject("Microsoft.XMLHTTP");
		}
	}
	
/**
 * send request
 */	
	this.send = function(content) {
		var url = "";
		if(this.proxyUrl)
			url = this.proxyUrl + "?url=" + this.url;
		else
			url = this.url;
		var post = "token=" + this.token + "&content=" + content;
		this.request.open("POST", url, false, this.token);
		this.request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		this.request.setRequestHeader("Content-length", post.length);
    this.request.send(post);
		if(this.request.status == 200)
			return this.request.responseXML;
		else
			return false; 
	};
}