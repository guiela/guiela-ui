# 1. Guiela UI

This is the UI source code for Guiela, an Open source project built on [VueJs](https://vuejs.org/) library for automated bank reconciliations. This is a two part application that totally separates the business logic from the user interface, an idea implemented to enable the Developer Circle team participate solely on the code base they are familiar with without having to deal with alien code.

<!-- TOC -->

- [Guiela UI](#guiela-ui)
    - [Project setup](#project-setup)
        - [Requirement](#requirement)
        - [Recomended](#recomended)
        - [Installation](#installation)
    - [Configuration](#configuration)
    - [Environment variables](#environment-variables)
        - [VUEAPPAPIURL](#vueappapiurl)
        - [VUEAPPCONVERTAPIURL](#vueappconvertapiurl)
        - [VUEAPPPROCESSAPIURL](#vueappprocessapiurl)
        - [Compiles and hot-reloads for development](#compiles-and-hot-reloads-for-development)
    - [Contributing](#contributing)
    - [Issue Reporting Guidelines](#issue-reporting-guidelines)
        - [Pull Request Guidelines](#pull-request-guidelines)
    - [Usage](#usage)
    - [License](#license)

<!-- /TOC -->

## 1.1. Project setup

### 1.1.1. Requirement
- NPM (v6.12.1 and above)
- NodeJs (v13.1.0 and above)
- Guiela API

### 1.1.2. Recomended
- [Vue CLI](https://cli.vuejs.org/guide/installation.html) installed globally

### 1.1.3. Installation

Clone the repository to your local machine and from the root directory of the application run the following command:

```
npm install
```
This will take a few seconds to install all the dependencies required to run the application.

**Note that development environments vary, so if there is an error during this process please go through the error output messages to learn the cause of the problem, knowing the problem will help your research on how to fix it.**

## 1.2. Configuration

After installation, make a copy of the create a `.env` file in the root directory then copy and paste the contents of `.env.example` to it.

Change the `VUE_APP_API_URL` to the url of the Guiela API application and that is all. Only make changes to `VUE_APP_CONVERT_API_URL` and `VUE_APP_PROCESS_API_URL` if you know what your doing.

## 1.3. Environment variables

### 1.3.1. VUE_APP_API_URL

After starting the API server on the backend, this variable should point to the url where it can be access.

### 1.3.2. VUE_APP_CONVERT_API_URL

When you select a csv file to be compared, just before you press the submit button, a quick call to the backend is made to convert it to an object and then sent back to the UI to be presented as a quick preview. This is the end point through which that call is made

### 1.3.3. VUE_APP_PROCESS_API_URL

This endpoint receives the form containing both csv files to be compared, processes it and then returns an object to the UI containing the results.

### 1.3.4. Compiles and hot-reloads for development

Start the development server by running the following:

```
npm run serve
```
Now check the port on the command line terminal to know where our application is available, e.g. `http://localhost:8080/` and visit it via the browser.

## 1.4. Contributing

## 1.5. Issue Reporting Guidelines
- The issue list of this repo is exclusively for bug reports and feature requests. Non-conforming issues will be closed immediately.

- Try to search for your issue, it may have already been answered or even fixed in the development branch.

- Check if the issue is reproducible with the latest stable version of Vue. If you are using a pre-release, please indicate the specific version you are using.

- It is required that you clearly describe the steps necessary to reproduce the issue you are running into.

- For bugs that involves build setups, you can create a reproduction repository with steps in the README.

- If your issue is resolved but still open, don’t hesitate to close it. In case you found a solution by yourself, it could be helpful to explain how you fixed it.

### 1.5.1. Pull Request Guidelines
- The master branch is basically just a snapshot of the latest stable release. All development should be done in dedicated branches. Do not submit PRs against the master branch.

- Checkout a topic branch from the relevant branch, e.g. dev, and merge back against that branch.

- Work in the src folder and DO NOT checkin dist in the commits.

- It's OK to have multiple small commits as you work on the PR - we will let GitHub automatically squash it before merging.

- Make sure npm test passes. (see development setup)

- If adding new feature:

- - Add accompanying test case.
- - Provide convincing reason to add this feature. Ideally you should open a suggestion issue first and have it greenlighted before working on it.
- If fixing a bug:

- - Provide detailed description of the bug in the PR. Live demo preferred.
- - Add appropriate test coverage if applicable.

## 1.6. Usage 

Usage documentation will be available via a Wiki.

## 1.7. License

The Guiela is open-sourced software licensed under the MIT license.