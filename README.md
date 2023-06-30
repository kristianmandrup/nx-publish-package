# Nx publish package

Publish an Nx package to npm from the builder target folder of your project.

## Installation

Install your plugin like any other npm package:

`npm i -D @nx-publish-package` or `yarn add -D @nx-publish-package`.

### Run executor

To publish a project (that has been built) to npm

`nx run my-project:publish`

## Plugin

This library was generated with [Nx](https://nx.dev).

### Publish your Nx Plugin

In order to use your plugin in other workspaces or share it with the community, you will need to publish it to an npm registry. To publish your plugin follow these steps:

`nx publish @nx-publish-package --ver=1.0.0` which automatically builds `@nx-publish-package`

Follow the prompts from npm. That's it!

### Version bump

Currently you will have to modify the package.json version by yourself or with a tool.

After that, you can then install your plugin like any other npm package, `npm i -D @my-org/my-plugin` or
`yarn add -D @my-org/my-plugin`.

### List your Nx Plugin

Nx provides a utility (`nx list`) that lists both core and community plugins. To submit your plugin, please follow the steps below:

Fork the Nx repo (if you haven't already)

Update the `community/approved-plugins.json` file with a new entry for your plugin that includes name, url and description

Use the following commit message template: chore(core): `nx plugin submission [PLUGIN_NAME]`
push your changes, and run `yarn submit-plugin`

## Building

Run `nx build publish` to build the library.

## Running unit tests

Run `nx test publish` to execute the unit tests via [Jest](https://jestjs.io).
