(function(window) {
  /**
   * Detect whether third-party-cookie is enabled in browser or not and return promise.
   * Pass custom hosting page url which listen on 'message' event on window and check 'third-party-cookie-test'
   * cookie is set or not and post message with {cookieEnabled: Boolean} data on window
   * e.g. 3rd-party-cookie.html page
   * 
   * Example: 
   *  - dw.canIUse3rdPartyCookie(url).then(fnCallback);
   *  - Where `url` is optional.
   */
  window.dw = window.dw || {};
  var s3rdPartyCookieUrl = '';
  var sOrigin = '';
  var bThirdPatyCookieEnabled;
  var oPromise;
  var oResolvePromise;
  var oRejectPromise;
  var iframe;
  var nTimer;
  
  /**
   * Create `iframe` element.
   */
  function createIframe() {
    iframe = document.createElement('iframe');
    iframe.setAttribute('src', s3rdPartyCookieUrl);
    iframe.setAttribute('id', 'iframe');
    iframe.style.position = 'absolute';
    iframe.style.top = -5000 + 'px';
    iframe.style.left = -5000 + 'px';
    document.body.appendChild(iframe);
    iframe.onload = function() {
      postMessageOnIframeWindow();
    }
  };
  
  
  /**
   * Post messages to iframe window.
   */
  function postMessageOnIframeWindow() {
    //If message is not respond in 1 second than reject promise
    nTimer = window.setTimeout(function() {
      bThirdPatyCookieEnabled = false;
      resolveRejectPromise();
    }, 1000);
    iframe.contentWindow.postMessage('third party cookie is enabled or not', sOrigin);
  };
  
  function resolveRejectPromise() {
    if(bThirdPatyCookieEnabled === undefined || !oResolvePromise || !oRejectPromise) {
      return;
    }
    
    if (bThirdPatyCookieEnabled) {
      oResolvePromise();
      return;
    }
    
    oRejectPromise();
  };
  
  /**
   * Remove `iframe` element.
   * When `e.data.cookieEnabled` is defined then, promise resolved
   * Otherwise promise rejected.
   */
  window.onmessage = function(e){
    if(!iframe || e.source !== iframe.contentWindow) {
      return;
    }
    
    if(nTimer) {
      window.clearTimeout(nTimer);
      nTimer = undefined;
    }

    // Remove `iframe` element.
    document.body.removeChild(iframe);
    bThirdPatyCookieEnabled = (e.data.cookieEnabled) ? true : false;
    resolveRejectPromise();
  };

  /**
   * Return promise object which is resolve if third party cookie is enabled otherwise reject it.
   * @param url - Custom hosting of page which is being opened in iframe on user-defined domain.
   * If `url` is not defined then use default custom hosting page url
   */
  window.dw.canIUse3rdPartyCookie = function(url) {
    if(oPromise) {
      resolveRejectPromise();
      return oPromise;
    }
    
    //Use default hosting page url if url is not defined
    if(!url) {
      url = 'https://caniuse.dreamworld.solutions/3rd-party-cookie.html';
    }
    
    //Custom hosting page url and its origin
    s3rdPartyCookieUrl = url;
    
    //Custom hosting page url's origin domain
    var oUrlData = new URL(url);
    sOrigin = oUrlData.protocol + '//' + oUrlData.hostname;
    
    if (document.readyState == "complete") {
      createIframe();
    } else {
      window.addEventListener("load", function (event) {
        createIframe();
      });
    }
    
    oPromise = new Promise(function(resolve, reject) {
      //Save `resolve` and `reject` in local variable
      oResolvePromise = resolve;
      oRejectPromise = reject;
      resolveRejectPromise();
    });
    
    return oPromise;
  }
})(window);



