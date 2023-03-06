const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./src/page-template.js");
const { default: Choices } = require("inquirer/lib/objects/choices");


// TODO: Write Code to gather information about the development team members, and render the HTML file.

const staffMembers = []
const idList = []


const menu = () => {

    function buildTeam() {
        
    }

    function addIntern() {

    }


    function addEngineer() {
        inquirer.prompt([
            {
                type: 'input',
                name: 'engineerName',
                message: 'What is the engineers name?'
            },
            {
                type: 'input',
                name: 'engineerId',
                message: 'What is the engineers ID?'
            },
            {
                type: 'input',
                name: 'engineerEmail',
                message: 'What is the engineers email?'
            },
            {
                type: 'input',
                name: 'engineerGH',
                message: 'What is the engineers github?'
            }
        ]).then(answers => {
            const engineer = new Engineer(answers.engineerName, answers.engineerId, answers.engineerEmail, answers.engineerGH);
            staffMembers.push(engineer);
            idList.push(answers.engineerId);
            createTeam();
        })
    }
    
    function addManager(){
        console.log('Use prompts to build your team');
        inquirer.prompt([
            {
                type: 'input',
                name: 'managerName',
                message: 'What is the managers name?'
            },
            {
                type: 'input',
                name: 'managerId',
                message: 'What is the managers ID?'
            },
            {
                type: 'input',
                name: 'managerEmail',
                message: 'What is the managers email?'
            },
            {
                type: 'input',
                name: 'managerOfficeNumber',
                message: 'What is the managers office number?'
            }
        ]).then(answers => {
            const manager = new Manager(answers.managerName, answers.managerId, answers.managerEmail, answers.managerOfficeNumber);
            staffMembers.push(manager);
            idList.push(answers.managerId);
            createTeam();
        })
    }

    addManager();

    function createTeam() {
        inquirer.prompt([
            {
                type: 'input',
                name: 'memberType',
                message: 'What role does this team member hold?',
                choices: [
                    'Engineer',
                    'Intern',
                    'Manager',
                    'Nothing to add'
                ]
            }
        ]).then(userChoice => {
            if(userChoice.memberType === 'Engineer') {
                addEngineer();
            } else if(userChoice.memberType === 'Intern') {
                addIntern();
            } else if(userChoice.memberType === 'Manager') {
                addManager();
            } else {
                buildTeam();
            }
        })

    }

}

menu();