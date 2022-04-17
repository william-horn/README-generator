/*
? @document-start
======================
| MAIN PROGRAM LOGIC |
==================================================================================================================================

? @author:                 William J. Horn
? @document-name:          index.js
? @document-created:       04/15/2022
? @document-modified:      04/15/2022

==================================================================================================================================

? @document-info
==================
| ABOUT DOCUMENT |
==================================================================================================================================

Main program logic behind application. This document is responsible for collecting, processing, and parsing user input to 
construct a markdown-formatted string. The program will then create/append the markdown string to a README.md file
in the root directory.

==================================================================================================================================

? @document-todo
========
| TODO |
==================================================================================================================================
-
==================================================================================================================================
*/

/* --------------- */
/* Require Modules */
/* --------------- */
// todo: Include packages needed for this application
// *--DONE
const fs = require('fs');
const inquirer = require('inquirer');
const { generateMarkdown } = require('./lib/generate-markdown');
const licenseInfo = require('./lib/license-data').licenseInfo;

/* ----------------------- */
/* Internal Program States */
/* ----------------------- */
// todo: Create an array of questions for user input
// *--DONE
const questions = [
    // Text-input begins //
    {
        name: 'title',
        message: 'Enter the title of your README:'
    },
    {
        name: 'description',
        message: 'Enter the description of your README:',
    },
    {
        name: 'installation',
        message: 'Enter installation details:'
    },
    {
        name: 'usage',
        message: 'Enter app usage details:'
    },
    {
        name: 'contributions',
        message: 'Enter contribution details:'
    },
    {
        name: 'tests',
        message: 'Enter information about tests:'
    },
    {
        name: 'githubName',
        message: 'Enter GitHub name:'
    },
    {
        name: 'email',
        message: 'Enter your email:'
    },
    // Text-input ends //

    // List-input begins //
    {
        type: 'list',
        name: 'licenseType',
        message: 'Choose a lisence:',
        choices: licenseInfo,
    },
    // List-input ends //
];

/* ------------------------- */
/* General-Purpose Functions */
/* ------------------------- */
// todo: Create a function to write README file
// *--DONE
const writeToFile = (fileName, data) => {
    fs.writeFile(fileName, data, err => {
        if (err) throw err;
        console.log('README has been generated in \'README.md\' file');
    });
}

// todo: Create a function to initialize app
// *--DONE
const init = () => {
    inquirer
        .prompt(questions) // prompt the user with readme questions
        .then(readmeData => generateMarkdown(readmeData))
        .then(markdownData => writeToFile('README.md', markdownData))
}

// Function call to initialize app
init();
