# Project Tracker

This project was generated using Nx.

# Setup
Requirements

Node v16+
Nx CLI via npm install -g nx
Install Nx Console in VSCode as plugin.
Install Project Dependencies npm install
Java Runtime (JRE) installed. Required for API-Lib Generation.
Ask other developers for env and orm-config files.

# Building an App
`nx build <app-name>`

Building Backend:
`nx serve api`

Building Frontend:
`nx serve web`

Serving an App
Command:
`nx serve <app-name>`

Running Backend:
`nx serve api`

Running Frontend:
`nx serve web`

# Generate API Library
Make sure your API is running:
`nx serve api`

Then on a separate terminal instance:
`nx run api-lib:generate-sources`

# Running existing Migrations
All migration commands for API can be found in apps/api/project.json

Make sure you have the right ormconfig.json on your apps/api folder.

Then enter command:

`nx run api:migration-run`
This will run all migrations that have not yet ran on your database.

# Generating Migration
To Generate a Migration (if you have a change in entities) you can enter command:

`nx run api:migration-generate -n <MigrationName>`

## Development server

Run `nx serve my-app` for a dev server. Navigate to http://localhost:4200/. The app will automatically reload if you change any of the source files.

## Build

Run `nx build my-app` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `nx test my-app` to execute the unit tests via [Jest](https://jestjs.io).

Run `nx affected:test` to execute the unit tests affected by a change.

## Running end-to-end tests

Run `nx e2e my-app` to execute the end-to-end tests via [Cypress](https://www.cypress.io).

Run `nx affected:e2e` to execute the end-to-end tests affected by a change.

## Understand your workspace

Run `nx graph` to see a diagram of the dependencies of your projects.

## Further help

Visit the [Nx Documentation](https://nx.dev) to learn more.
