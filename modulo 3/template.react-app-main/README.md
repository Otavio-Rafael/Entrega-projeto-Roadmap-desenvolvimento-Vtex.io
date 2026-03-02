# React App Template

React App Template for VTEX IO.

[![Version](https://img.shields.io/badge/version-0.0.0-blue)](https://github.com/ACCT-global/template.react-app/releases) [![VTEX IO](https://img.shields.io/badge/VTEX%20IO-f71963.svg?logo=vtex&logoColor=white)](https://developers.vtex.com/vtex-developer-docs/docs/welcome) [![React](https://img.shields.io/badge/React-%2320232a.svg?logo=react&logoColor=%2361DAFB)](https://pt-br.reactjs.org/) [![TypeScript](https://img.shields.io/badge/TypeScript-%23007ACC.svg?logo=typescript&logoColor=white)](https://www.typescriptlang.org/) [![ESLint](https://img.shields.io/badge/ESLint-4B3263?logo=eslint&logoColor=white)](https://eslint.org/) [![Stylelint](https://img.shields.io/badge/Stylelint-f2f2f2?logo=stylelint&logoColor=black)](https://stylelint.io/) [![Prettier](https://img.shields.io/badge/Prettier-c596c7?logo=prettier&logoColor=white)](https://prettier.io/) [![Commitlint](https://img.shields.io/badge/Commitlint-121212?logo=commitlint)](https://commitlint.js.org/) [![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-ff69b4.svg?logo=conventionalcommits&logoColor=white)](https://www.conventionalcommits.org/en/v1.0.0/) [![Jest](https://img.shields.io/badge/-Jest%2FVTEX%20Test%20Tools-%23C21325?logo=jest&logoColor=white)](https://github.com/vtex/test-tools) [![Node](https://img.shields.io/node/v/husky)](https://nodejs.org/en/)

## Getting Started

Install all dependencies with:

```bash
yarn install && cd react && yarn install
```

### Update App Vendor

Change app vendor in `manifest.json` file:

```json
{
  "vendor": "{{store-account}}",
}
```

### Setup Workflows

This repository uses [reusable workflows](https://docs.github.com/en/actions/using-workflows/reusing-workflows). See the complete setup guide at "[Quality Digital Reusable Workflows](https://github.com/quality-digital/reusable-workflows#readme)".

### Update SonarCloud

Update the `sonar.projectKey` and `sonar.organization` properties in the `sonar-project.properties` file to run unit tests with SonarCloud and generate a coverage metric.

```properties
sonar.projectKey=your-project-key
sonar.organization=your-project-organization
```

## Documentation

You can use this template for your component documentation:

- [Documentation Template](./docs/EXAMPLE.md)

## Unit Testing

You can create tests with [VTEX Test Tools](https://github.com/vtex/test-tools) and run with:

- `yarn test`: Run unit tests.
- `yarn test:coverage`: Run unit tests and generate test coverage information and display in console. See [Jest --coverage](https://jestjs.io/docs/cli#--coverageboolean).
- `yarn test:watch`: Watching test files for changes and re-running tests related to changed files. See [Jest --watch](https://jestjs.io/docs/cli#--watch).

## Git Commit

### Conventional Commits

This repository uses [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/#specification) for better standardization of commits.

The commit message should be structured as follows:

```text
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

Examples:

```text
feat: add shipping calculator
chore(release): 1.0.0
```

Common types according to [Angular convention](https://github.com/angular/angular/blob/22b96b9/CONTRIBUTING.md#-commit-message-guidelines) can be:

- **build**: Changes that affect the build system or external dependencies (example scopes: gulp, broccoli, npm).
- **chore**: Other changes that don't modify src or test files.
- **ci**: Changes to our CI configuration files and scripts (example scopes: Travis, Circle, BrowserStack, SauceLabs).
- **docs**: Documentation only changes.
- **feat**: A new feature.
- **fix**: A bug fix.
- **perf**: A code change that improves performance.
- **refactor**: A code change that neither fixes a bug nor adds a feature.
- **revert**: Reverts a previous commit.
- **style**: Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc).
- **test**: Adding missing tests or correcting existing tests.

### Commitizen

You can use the [Commitizen](https://commitizen-tools.github.io/commitizen) CLI interface to create Conventional Commits:

```bash
yarn commit
```

![image](https://user-images.githubusercontent.com/101892002/209986018-000ba5ac-5ed6-4fe1-8974-408492a1642a.png)

## Scripts

- `yarn commit`: A CLI interface using Commitizen to automate commits. See [Commitlint](https://github.com/commitizen/cz-cli)
- `yarn format`: Formats TypeScript and JSON files using [Prettier](https://prettier.io/).
- `yarn lint`: Lint for TypeScript files with [Eslint](https://eslint.org/).
- `yarn lint:fix`: Lint for TypeScript files with automatically fix, where possible.
- `yarn stylelint`: Lint for CSS files. See [stylelint](https://stylelint.io/)
- `yarn stylelint:fix`: Lint for CSS files with automatically fix, where possible. See [stylelint fix](https://stylelint.io/user-guide/usage/options/#fix)
- `yarn test`: Run unit tests using [VTEX Test Tools](https://github.com/vtex/test-tools).
- `yarn test:coverage`: Run unit tests and generate test coverage information and display in console. See [Jest --coverage](https://jestjs.io/docs/cli#--coverageboolean)
- `yarn test:watch`: Watching test files for changes and re-running tests related to changed files. See [Jest --watch](https://jestjs.io/docs/cli#--watch)
