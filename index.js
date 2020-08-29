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
        message: 'The introduction or description for your project: \n use semicolon(;) for new paragraph!\n',
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
        message: 'Instructions for the installation of your project: \n use semicolon(;) for new paragraph!\n',
        name: 'Installation',
        },
        {
        message: 'Instructions for the usage of your project: \n use semicolon(;) for new paragraph!\n',
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
        message: 'Instructions for those who might contribute to your project: \n use semicolon(;) for new paragraph!\n',
        name: 'Contributing',
        },
        {
        message: 'What tests exist for your project? \n use semicolon(;) for new paragraph!\n',
        name: 'Tests',
        },
        {
        message: 'If people have questions, how can they contact you? \n use semicolon(;) for new paragraph!\n',
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
            createdHTML += data[key].split(";").join("\n\n");
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

async function createBadges(){
    let moreBadges=true;
    let createdBadges = []
    while (moreBadges) {
        const { label } = await inquirer.prompt({
        message: 'Badge LABEL (gray left-side text): ',
        name: 'label',
        });

        const { message } = await inquirer.prompt({
        message: 'Badge MESSAGE (color right-side text): ',
        name: 'message',
        });
        
        const { color } = await inquirer.prompt({
        message: 'Badge COLOR: ',
        name: 'color',
        });

        const { more } = await inquirer.prompt({
        type: 'confirm',
        message: 'Do you want to make another badge? ',
        name: 'more',
        });

        createdBadges.push({
            label: label,
            message: message,
            color: color,
        })
        if (!(more)){
            moreBadges = false;
        }
    }  
    console.log(createdBadges);
    return createdBadges;
}



// function to initialize program
function init() {
    let badges;
    inquirer.prompt(questions).then(function(answers){
        inquirer.prompt({
            type:"confirm",
            message:"Would you like to add badges to your README? ",
            name:"anyBadges",
        }).then(function(answers){
            if (answers.anyBadges===true){
                badges = createBadges();
            }
        })
        console.log(badges);
        writeToFile(answers);
    })


}

// function call to initialize program
init();
