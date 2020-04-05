# Firebase functions website checker
Scrape website in specified intervals and check on changes and be notified when they occur. 

1) checkout this repo and do `npm install`

2) create [Firebase](https://firebase.com) project and [install firebase tools](https://firebase.google.com/docs/cli#install-cli-mac-linux) 
3) in the checkouted repo do the `firebase init` procedure
4) open the `index.js` file and edit `config` values

  * `url` of the page you would like to check 
  * `selector` path of the part of the web you would like to check
  * current html `content` of the selector path you want to diff against.
  * `callback` which should be triggered when change occurs

5) run `npm run deploy`

### Optionals 

1) Edit the `scheduled` parametr how often if should run and check. 1 minute is a minimum. 

2) if you need to debug script locally first, just add `checkHandler()` at the end of `index.js` file. and run `npm run start`

3) if you don't know how to create selector and content do following in browser. 
  
  * Select text on the web bage and `right click -> inspect element` 
  * In the inspector menu, when your element is selected `right click -> copy -> selector path`
  * Change tab to console and run following `document.querySelector(<your selector>).outerHTML.replace(/[\n\t\r ]/g, '')` and that is your `config.content`
  