# caniuse-3rd-party-cookie

**caniuse-3rd-party-cookie** is small JavaScript library to detect whether 3rd party cookie is bloked by user in the browser or not.

Why
--------

**During working with [Kerika](kerika.com) we faced an issue.**

When user has blocked 3rd party cookie, we were unable to show preview of file stored on Box. So, User was thinking it as a Kerika bug and complaining about it. We planned to show a proper message to user in this situation. So, 1. user don't think it's a kerika bug 2. Can understand problem and 3. Can fix it herself by changing browser preference.

Hence, we developed this library & used in Kerika.

Getting started
-------

Install `caniuse-3rd-party-cookie` using:

- [npm](https://www.npmjs.com/): `npm install --save caniuse-3rd-party-cookie`

(or just use the code from [Here](https://github.com/DreamworldSolutions/caniuse-3rd-party-cookie/blob/master/caniuse-3rd-party-cookie.js)

Use in the browser:

- **Note**: invoke `canIUse3rdPartyCookie` function only after document is loaded.

```html
<script type="text/javascript" src="../caniuse-3rd-party-cookie.js"></script>
<script type="text/javascript">
     window.dw.canIUse3rdPartyCookie().then(function () {
       alert('Third Party Cookie is allowed by you.');
     }, function () {
       alert('Third Party Cookie is blocked by you.');
    });
</script>
```

# How Demo works?
### To check how demo works follow the step given below

- Verify that in your browser, 3rd party cookie is unbloked.
- [Click Here](https://kerika.com/file/16916159) and see File Preview
- Now, Block 3rd party cookie.
- Reload the page, check that page isn't showing file preview and informed user to unblock 3rd party cookie.

# How it works?

- To check whether 3rd party cookie is blocked by user or not, we need to host a code on domain different than current domain.
- We hosted such a page [Here](https://caniuse.dreamworld.solutions/3rd-party-cookie.html).
- This library creates `iframe` with url (defaults to `https://caniuse.dreamworld.solutions/3rd-party-cookie.html`).
- In this `iframe` it sets cookie
- Now library tries to get this cookie and 
    if cookie is found, it means third-party cookie is enabled, otherwise it's disabled. 


# FAQ

## Can I set cookie from my hosted page?

* Yes. If you want to host such a page on your custom domain, please use code from 
    [this page](https://caniuse.dreamworld.solutions/3rd-party-cookie.html) in your hosted page. 
    Now pass your domain url as a parameter in `canIUse3rdPartyCookie()` function. 
    e.g `caniusecookie.canIUse3rdPartyCookie(your_url)`.


