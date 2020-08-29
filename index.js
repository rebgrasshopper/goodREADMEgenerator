const fs = require("fs");
const inquirer = require("inquirer");
const util = require("util");
let answers;

//ask user Contact

const questions = [
        {
        message: 'The title of your project: ',
        name: 'Title',
        },
        {
        message: 'The introduction or description for your project: ',
        name: 'Introduction',
        },
        {
        message: 'URL to link to your deployed project: ',
        name: 'link',
        },
        {
        message: 'File path to screenshot of your project',
        name: 'screenshotPath',
        },
        {
        message: 'Instructions for the installation of your project: ',
        name: 'Installation',
        },
        {
        message: 'Instructions for the usage of your project: ',
        name: 'Usage',
        },
        {
        type: "list",
        message: 'What license is your project under? ',
        name: 'License',
        choices: [
            "Apache License 2.0",
            "GNU General Public License v3.0",
            "MIT License",
            "BSD 2-Clause 'Simplified' License",
            "BSD 3-Clause 'New' or 'Revised' License",
            "Boost Software License 1.0",
            "Creative Commons Zero v1.0 Universal",
            "Eclipse Public License 2.0",
            "GNU Affero General Public License",
            "GNU General Public License v2.0",
            "GNU Lesser General Public License v2.1",
            "Mozilla Public License 2.0",
            "The Unlicense",
        ]
        },
        {
        message: 'List anybody you would like to credit for contributing to your project here, separated by commas: \n **IMPORTANT** if you would like to link to those you are crediting, use this format -> \n [Person 1](www.person1.com), [Person 2](www.person2.com)\n: ',
        name: 'Credits',
        },
        {
        message: 'Instructions for those who might contribute to your project: ',
        name: 'Contributing',
        },
        {
        message: 'What tests exist for your project? ',
        name: 'Tests',
        },
        {
        message: 'If people have questions, how can they contact you? ',
        name: 'Contact',
        },
    ];


// function to write README file
function writeToFile(data) {
    let tableOfContents = [];
    let createdHTML = "";

    //create tableOfContents
    let i=1;
    for (let key in data){
        if (!(data[key]==="") && !(key === "link" || key === "screenshotPath" || key === "Title"))
        {
            tableOfContents.push(`- [Section ${i}: ${key}](#${key.toLowerCase()})`);
            i++;
        }
    }
    let listOfCredits = "- " + data.Credits.split(",").join("\n- ")

    //add strings to createdHTML
    for (let key in data){
        if (!(data[key]==="") && (key==="Credits")) {
            createdHTML += `## Credits:\n\n`;
            createdHTML += listOfCredits;
            createdHTML += "\n\n";
        } else if (!(data[key]==="") && (key==="Title")) {
            createdHTML += `# ${data.Title}`;
            createdHTML += "\n\n";
            if (!(data.screenshotPath === "")) {
                createdHTML += `![screenshot of ${data.Title}](${data.screenshotPath})\n\n`;
            } 
            if (!(data.link ==="")) {
                createdHTML += `${data.link}\n\n`;
            }
            createdHTML += `Table Of Contents:\n\n${tableOfContents.join("\n")}`;
           
            createdHTML += '\n\n';
        } else if (!(data[key]==="") && !(key==="link" || key==="screenshotPath")) {
            createdHTML += `## ${key}:\n\n`;
            createdHTML += data[key].split("\n").join("\n");
            createdHTML += "\n\n";
        }

    }
    console.log("table of contents: ", tableOfContents);


    fs.writeFile('README.md', createdHTML, function(err){
        if (err) {
            console.log(err);
        }
    })
}

// function to initialize program
function init() {
    inquirer.prompt(questions).then(function(answers){
        writeToFile(answers);
    })


}

// function call to initialize program
init();
