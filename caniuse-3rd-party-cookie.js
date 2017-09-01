(function(window) {
  /**
   * Detect whether third-party-cookie is enabled in browser or not and return promise.
   * Example: 
   *  - dw.canIUse3rdPartyCookie().then(fnCallback);
   */
  window.dw = window.dw || {};
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
    iframe.setAttribute('src', 'https://caniuse.dreamworld.solutions/3rd-party-cookie.html');
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
    iframe.contentWindow.postMessage('third party cookie is enabled or not', 'https://caniuse.dreamworld.solutions');
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
   */
  window.dw.canIUse3rdPartyCookie = function(){
    if(oPromise) {
      resolveRejectPromise();
      return oPromise;
    }
    
    createIframe();
    
    oPromise = new Promise(function(resolve, reject) {
      //Save `resolve` and `reject` in local variable
      oResolvePromise = resolve;
      oRejectPromise = reject;
      resolveRejectPromise();
    });
    
    return oPromise;
  }
})(window);



