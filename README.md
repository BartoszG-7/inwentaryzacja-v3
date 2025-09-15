# Inwentaryzacja

This mobile-friendly web app is used for tracking inventory across the company’s projects and locations. The technologies used for this app are as follows:

- Angular (TypeScript)
- NestJS (TypeScript)
- MongoDB
- Mongoose
- SCSS (Sass)
- HTML
- npm
- Jest
- Esbuild
- Bootstrap
   
Below is the documentation for the app:

--------------------------------------------------------------------
1. Log in (hard-coded, since this app is not for public use and doesn't need a sign up)
<img width="600" height="400" alt="image" src="https://github.com/user-attachments/assets/0d390842-afba-4b69-af7d-f23a4a3ee7a6" />
--------------------------------------------------------------------
2. Home Screen View (KIT takes you to home, and is the name of the app, please note the maximum amount of device types and latest modified projects is 5 cards, theres only 1 of them as an example)
- Device Types are displayed on the right side with the amount of devices under the device type (for example device-type hi has 109 devices under it), clicking it takes you to the magazine view.
- Latest modified projects are displayed on the left side, it displays the location it is in and the project, clicking it takes you to the project view.
<img width="600" height="400" alt="image" src="https://github.com/user-attachments/assets/ad727736-4f02-4ee6-8901-ed4f2f3cf20f" />
--------------------------------------------------------------------
3. Light Theme View
<img width="600" height="400" alt="image" src="https://github.com/user-attachments/assets/45637df8-d6eb-4889-bf37-0de5e7a80d71" />



------------------------------------------------------------
This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 20.1.4.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```






