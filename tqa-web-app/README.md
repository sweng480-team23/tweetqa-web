# TqaWebApp

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 12.0.5.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Deploy to GCP

1. Run `ng build` to create new distribution artifact in `dist/` directory
2. Copy `app.yaml` file to route of `dist/` directory
3. Upload the folder containing the contents of `dist/` to a GCP Cloud Storage bucket.  It should have the following structure:
   
    ---app.yaml
   
    ---tqa-web-app/
4. Create a new directory in GCP using the cloud console, `mkdir tqa-web-app`
5. Sync data from the bucket to the new directory, `gsutil rsync -r gs://tqa-web-app ./tqa-web-app`
6. From within the new directory, deploy to gcp, `cd tqa-web-app`, `gcloud app deploy`

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
