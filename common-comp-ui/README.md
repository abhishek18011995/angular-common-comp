# CommonCompUi

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 13.1.2.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.



##################################################### PWA ######################################################
######################################### Steps to use Service-Worker ###########################################
## Note: 

Service-worker will only work with when Angular projecct is build not during compilation.

=> First build the application
=> Run command "http-server -p 8080 -c-1 .\dist\common-comp-ui\browser\"  (Path of index.html inside dist folder)
    -> To use http-server we should have it installed (npm i -g http-server)
=> To test service-worker go to console of brwoser open "Application" tab and check the offline checklist & unregister the service-worker then the web page will not work


#### App Shell
Commands:
=> ng generate app-shell
=> ng run common-comp-ui:app-shell:production
=> Check index.html file in dist folder (Content has been added)
=> Run app on http-server
=> Go to index.html directory in command line and execute "http-server -p 8080"
=> Go to prefomance tab in console of google chrome and start profiling(recording) there we can see app-shell component works with basic layout.