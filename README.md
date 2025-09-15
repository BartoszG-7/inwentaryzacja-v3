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
   
This was a duo-project with mm554, I (BartoszG-7) was mostly responsible for the front-end of the application, although I also contributed to the back-end and the database structure, as did mm554 with contributuions to the front-end.

Below is the documentation for the app:

--------------------------------------------------------------------
# 1. Log in (hard-coded, since this app is not for public use and doesn't need a sign up)
<img width="600" height="400" alt="image" src="https://github.com/user-attachments/assets/0d390842-afba-4b69-af7d-f23a4a3ee7a6" />

--------------------------------------------------------------------
# 2. Home Screen View (KIT takes you to home, and is the name of the app, please note the maximum amount of device types and latest modified projects is 5 cards, theres only 1 of them as an example)
- Device Types are displayed on the right side with the amount of devices under the device type (for example device-type hi has 109 devices under it), clicking it takes you to the magazine view.
- Latest modified projects are displayed on the left side, it displays the location it is in and the project, clicking it takes you to the project view.
<img width="600" height="400" alt="image" src="https://github.com/user-attachments/assets/ad727736-4f02-4ee6-8901-ed4f2f3cf20f" />

--------------------------------------------------------------------
# 3. Light Theme View
<img width="600" height="400" alt="image" src="https://github.com/user-attachments/assets/45637df8-d6eb-4889-bf37-0de5e7a80d71" />

--------------------------------------------------------------------
# 4. Global Search Modal (Clicking the items from the search will take you to the project where that device is located)
<img width="600" height="400" alt="image" src="https://github.com/user-attachments/assets/4b78f776-ff6a-46c6-a2d1-8adce611611e" />

--------------------------------------------------------------------
# 5. Side Bar for routing to location view and magazine view
<img width="600" height="400" alt="image" src="https://github.com/user-attachments/assets/51e265e5-6315-4c28-9f89-f6614356cbfd" />

--------------------------------------------------------------------
# 6. Mobile View for Home
<img width="300" height="600" alt="image" src="https://github.com/user-attachments/assets/f08904ec-9ca5-490d-b630-4dbc9d411df3" />

--------------------------------------------------------------------
# 7. Mobile Side Bar
<img width="300" height="600" alt="image" src="https://github.com/user-attachments/assets/ef90297e-f5a1-4821-b3d4-e0b9da8cd5c4" />

--------------------------------------------------------------------
# 8. Locations View
<img width="600" height="400" alt="image" src="https://github.com/user-attachments/assets/ac7627e2-6efb-4738-99a4-7cde7b694517" />

--------------------------------------------------------------------
# 9. Locations View Mobile
<img width="300" height="600" alt="image" src="https://github.com/user-attachments/assets/a7aed176-3964-4592-bf28-8f828f74f231" />

--------------------------------------------------------------------
# 10. Add Project Pop-up (I won't show more modals because they all have the same global css and they all look similar)
<img width="600" height="400" alt="image" src="https://github.com/user-attachments/assets/83e69c64-2ff2-4bcf-a8a5-acf09a1ed355" />

--------------------------------------------------------------------
# 11. Project View, you can assign devices to a project and it will show you how many devices are missing and all that info etc...
<img width="600" height="400" alt="image" src="https://github.com/user-attachments/assets/4183ed98-4112-42ab-8acb-93a3257f31c5" />

--------------------------------------------------------------------
# 12. Magazyn View, this is the first view, the actual device list of device types can be seen after pressing the "Jest" panel
<img width="600" height="400" alt="image" src="https://github.com/user-attachments/assets/73f546e2-6cba-44e1-878e-9f2661a0ae59" />

--------------------------------------------------------------------
# 13. Mobile Magazyn View
<img width="300" height="600" alt="image" src="https://github.com/user-attachments/assets/011e4fda-b65c-4cdd-9807-f033863e8c0c" />

--------------------------------------------------------------------
# 14. Mobile right side-bar is the static sidebar that is on desktop since it doesnt fit on mobile, it's the same for lokalizacje as well
<img width="300" height="600" alt="image" src="https://github.com/user-attachments/assets/586ff97c-d85d-4f9e-8f15-9bbfb3ad9d29" />

--------------------------------------------------------------------
# 15. Second Magazyn View, displays the device list for the device-type and allows editing/multi-adding devices under that device type, it also displays how many devices are already assigned and how many are free
<img width="600" height="400" alt="image" src="https://github.com/user-attachments/assets/b0bcbf83-9c03-47e9-a7f0-5837047ed0ab" />

--------------------------------------------------------------------
# 16. Mobile Second Magazyn View
<img width="300" height="600" alt="image" src="https://github.com/user-attachments/assets/a6b83197-9f7b-48c5-8399-4ea736cff5ff" />

For more info message BartoszG-7

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













