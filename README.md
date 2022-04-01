# cogswell Time Tracker application
Also builds to Electron App.

## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn serve
```

### Compiles and minifies for production
```
yarn build
```

### Run your end-to-end tests
```
yarn test:e2e
```

### Lints and fixes files
```
yarn lint
```

# Local Development Setup
- Copy .env to .env.development.local
- Edit the contents to match organization
Do not checkin this file.

# Deployment
Create Azure App Service using Dev/Test Free F1 tier
- Use Node
- Select Windows, not Linux
- Setup github actions as in link. https://github.com/Azure-Samples/node_express_app
- Download Publish Profile from Azure Portal
- Save profile  contents as the `AZURE_WEBAPP_PUBLISH_PROFILE` secret in the github repository.


### Create env.js
Create env.js file using sample below.

env.js
```
var Env = {
  VUE_APP_API_ORGANIZATION: 'Azure Devops Organization',
  VUE_APP_API_PROJECT: 'Project Name',
  VUE_APP_API_VERBOSE_MODE: '1',
  APPINSIGHTS_INSTRUMENTATIONKEY: '************',
  INSIGHTS_API_URL: 'https://md-i-euw-insights-fa.azurewebsites.net/'
};
```

### Copy to Azure WebSite in root folder using FTP.
- Get FTP url from Azure Portal.
- Launch Windows Explorer and past in FTP link
- Use username & password from publish profile.
- Drag & Drop env.js into root folder

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
"# cogswell"
"# cogswell"
