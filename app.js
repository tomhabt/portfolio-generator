// console.log('Hello Node!');
// console.log(module);

// var commandLineArgs = process.argv; // This is any Array declaration
//     console.log(commandLineArgs); // This will return an array of the path that node is intalled and the path that this js file directory is located

const fs = require('fs');

const generatePage = require('./src/page-template.js');
const inquirer = require('inquirer');

const profileDataArgs = process.argv.slice(2);

console.log(profileDataArgs); // prints the array

const [name, github] = profileDataArgs;

console.log(name, github); // prints inline of the two arg.


console.log(`======================`);

// fs.writeFile('index.html', generatePage(name, github), err => {
//     if (err) throw new Error (err);
//     console.log('Portfolio complete! Checkout index.html to see the output!');
// });
    
const promptUser = () => {
    return inquirer.prompt([
      {
        type: 'input',
        name: 'name',
        message: 'What is your name? (Required)',
        validate: nameInput => {
          if (nameInput) {
            return true;
          } else {
            console.log('Please enter your name!');
            return false;
          }
        }
      },
      {
        type: 'input',
        name: 'github',
        message: 'Enter your GitHub Username (Required)',
        validate: githubInput => {
          if (githubInput) {
            return true;
          } else {
            console.log('Please enter your GitHub username!');
            return false;
          }
        }
      },
      {
        type: 'confirm',
        name: 'confirmAbout',
        message: 'Would you like to enter some information about yourself for an "About" section?',
        default: true
      },
      {
        type: 'input',
        name: 'about',
        message: 'Provide some information about yourself:',
        when: ({ confirmAbout }) => confirmAbout
      }
    ]);
  };
  
  const promptProject = portfolioData => {
    console.log(`
  =================
  Add a New Project
  =================
  `);
  
    // If there's no 'myProjects' array property, create one
    if (!portfolioData.myProjects) {
      portfolioData.myProjects = [];
    }
    return inquirer
      .prompt([
        {
          type: 'input',
          name: 'name',
          message: 'What is the name of your project? (Required)',
          validate: nameInput => {
            if (nameInput) {
              return true;
            } else {
              console.log('You need to enter a project name!');
              return false;
            }
          }
        },
        {
          type: 'input',
          name: 'description',
          message: 'Provide a description of the project (Required)',
          validate: descriptionInput => {
            if (descriptionInput) {
              return true;
            } else {
              console.log('You need to enter a project description!');
              return false;
            }
          }
        },
        {
          type: 'checkbox',
          name: 'languages',
          message: 'What did you this project with? (Check all that apply)',
          choices: ['JavaScript', 'HTML', 'CSS', 'ES6', 'jQuery', 'Bootstrap', 'Node']
        },
        {
          type: 'input',
          name: 'link',
          message: 'Enter the GitHub link to your project. (Required)',
          validate: linkInput => {
            if (linkInput) {
              return true;
            } else {
              console.log('You need to enter a project GitHub link!');
              return false;
            }
          }
        },
        {
          type: 'confirm',
          name: 'feature',
          message: 'Would you like to feature this project?',
          default: false
        },
        {
          type: 'confirm',
          name: 'confirmAddProject',
          message: 'Would you like to enter another project?',
          default: false
        }
      ])
      .then(projectData => {
        portfolioData.myProjects.push(projectData);
        if (projectData.confirmAddProject) {
          return promptProject(portfolioData);
        } else {
          return portfolioData;
        }
      });
  };

promptUser()
.then(promptProject)
.then(portfolioData => console.log(portfolioData));

// portfolioData is an object of answers for overall question
// projectData is also an object of answer for project question
// projectData.myProject is an array
// myProject is an array generated from the onject portfolioData specifically filtered for my myProjects purpose