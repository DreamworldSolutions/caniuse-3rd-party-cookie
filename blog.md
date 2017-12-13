
## Best solution to detect whether third party cookie is disabled or not.

-  Sometimes it is compulsory for our app that third-party cookie must be enabled in our browser. 
Although it is enabled by default in our browser, but sometimes it may be disabled in browser settings. 
So some functionality of application may break. So user think that it's a bug of application but 
actually it's due to third-party-cookie disabled. In this situation we need to know whether 
third-party cookie is enabled or not in our browser so we can display proper message to user.

-  We faced this same problem in [Kerika](Kerika.com). In this project we need to show preview 
of file. For this feature we are using 3rd party cookie. But when third-party cookie is disabled 
in user's browser, she could not see file preview. 

-  So we need such solution that when third-party cookie is disabled user should be prompted to 
enable third-party cookie form browser settings. We tried to find solutions for it on many forums/blogs 
but we didn't found any easy solutions. So we decided to develop such a  library and publish it as opensource package.

- As a result we created small library called **caniuse-3rd-party-cookie**.
- You can checkout from [Github](https://github.com/DreamworldSolutions/caniuse-3rd-party-cookie)