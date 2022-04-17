/* --------------- */
/* Require Modules */
/* --------------- */
const licenseData = require('./license-data.json');

// todo: Create a function that returns the license link
// *--DONE
// If there is no license, return an empty string
const renderLicenseLink = licenseInfoResult => {
  if (!licenseInfoResult) return '';
  // construct license source documentation link
  const licenseSourceUrl = licenseData.licenseRoot + licenseInfoResult.endpoint;

  // return license url
  return licenseSourceUrl;
}

// todo: Create a function that returns a license badge based on which license is passed in
// *--DONE
// If there is no license, return an empty string
const renderLicenseBadge = licenseInfoResult => {
  if (!licenseInfoResult) return '';

  // construct badge icon image
  const badgeIconUrl = licenseData.badgeTemplate
    .replace('@name', licenseInfoResult.endpoint.replace('-', '_'))
    .replace('@color', licenseInfoResult.badgeColor);

  // return markdown of license badge
  return `
  [![License: ${licenseInfoResult.name}](${badgeIconUrl})](${renderLicenseLink(licenseInfoResult)})
  `;
}

// todo: Create a function that returns the license section of README
// *--DONE
// If there is no license, return an empty string
const renderLicenseSection = licenseInfoResult => {
  if (!licenseInfoResult) return '';

  // construct license markdown
  const licenseInfo = licenseInfoResult.default
    ? `\n${licenseInfoResult.info}` : `\nThis application is distributed under the [${licenseInfoResult.name}](${renderLicenseLink(licenseInfoResult)}) license.`;

  // return license section markdown
  return renderLicenseBadge(licenseInfoResult) + licenseInfo;
}

// todo: Create a function to generate markdown for README
const generateMarkdown = readmeData => {
  // Aquire selected license data
  const licenseInfoResult = licenseData.licenseInfo.find(choiceData => choiceData.name === readmeData.licenseType);

  // Return mark-down string
  return `
  # ${readmeData.title}
  ## Description
  ${readmeData.description}
  ## License
  ${renderLicenseSection(licenseInfoResult)}
  ## Table of contents
  - [License](#License)
  - [Usage](#Usage)
  - [Installation](#Installation)
  - [Testing](#Testing)
  - [Contributions](#Contributions)
  ## Usage
  ${readmeData.usage}
  ## Installation
  ${readmeData.installation}
  ## Tests
  ${readmeData.tests}
  ## Contributors
  Contributors: 
  ${readmeData.contributions}
  ## Questions
  Find me on GitHub: <https://github.com/${readmeData.githubName}>
  \nReach me by email: ${readmeData.email}
  `;
}

module.exports = {
  generateMarkdown
}