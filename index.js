const fs = require("fs");
const inquirer = require("inquirer");
let results;
let badges;

//initial inquirer prompts
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
        message: 'Here you can input your email address to include in a contact section:',
        name: 'Email',
        },
        {
        message: 'Here you can input your GitHub username to include in a contact section:',
        name: 'GitHub',
        },
        {
        message: 'Here you can input your LinkedIn username to include in a contact section:',
        name: 'LinkedIn',
        },
        {
        message: 'Here you can input your Twitter username to include in a contact section:',
        name: 'Twitter',
        },
        {
        message: 'Here you can input your Facebook username to include in a contact section:',
        name: 'Facebook',
        },
    ];

    //URLs to prepend to contact info
    const contactURLs = {
        Facebook:"https://www.facebook.com/", 
        Twitter:"https://www.twitter.com/", 
        LinkedIn:"https://www.linkedin.com/in/", 
        GitHub:"https://www.github.com/", 
        Email:""
    };

    //markdown for license badges
    const licenseBadges = {
        "Apache License 2.0":"[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)",
            "GNU General Public License v3.0":"[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)",
            "MIT License":"[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)",
            "BSD 2-Clause 'Simplified' License":"[![License](https://img.shields.io/badge/License-BSD%202--Clause-orange.svg)](https://opensource.org/licenses/BSD-2-Clause)",
            "BSD 3-Clause 'New' or 'Revised' License":"[![License](https://img.shields.io/badge/License-BSD%203--Clause-blue.svg)](https://opensource.org/licenses/BSD-3-Clause)",
            "Boost Software License 1.0":"[![License](https://img.shields.io/badge/License-Boost%201.0-lightblue.svg)](https://www.boost.org/LICENSE_1_0.txt)",
            "Creative Commons Zero v1.0 Universal":"[![License: CC0-1.0](https://img.shields.io/badge/License-CC0%201.0-lightgrey.svg)](http://creativecommons.org/publicdomain/zero/1.0/)",
            "Eclipse Public License 2.0":"[![License](https://img.shields.io/badge/License-EPL%201.0-red.svg)](https://opensource.org/licenses/EPL-1.0)",
            "GNU Affero General Public License":"[![License: AGPL](https://img.shields.io/badge/License-AGPL-blue.svg)](https://www.gnu.org/licenses/licenses.html#AGPL)",
            "GNU General Public License v2.0":"[![License: GPL v2](https://img.shields.io/badge/License-GPL%20v2-blue.svg)](https://www.gnu.org/licenses/old-licenses/gpl-2.0.en.html)",
            "GNU Lesser General Public License v2.1":"[![License: LGPL v2.1](https://img.shields.io/badge/License-LGPL%20v2.1-blue.svg)](https://www.gnu.org/licenses/old-licenses/lgpl-2.1.html)",
            "Mozilla Public License 2.0":"[![License: MPL 2.0](https://img.shields.io/badge/License-MPL%202.0-brightgreen.svg)](https://opensource.org/licenses/MPL-2.0)",
            "The Unlicense":"[![License: Unlicense](https://img.shields.io/badge/license-Unlicense-blue.svg)](http://unlicense.org/)",
    }

// function to write README file
function writeToFile(data, badges) {
    let tableOfContents = [];
    let createdHTML = "";

    //create tableOfContents
    let i=1;
    for (let key in data){
        if (!(data[key]==="") && !(key === "link" || key === "screenshotPath" || key === "Title" || key === "Email" || key==="GitHub" || key==="LinkedIn" || key==="Facebook" || key==="Twitter"))
        {
            tableOfContents.push(`- [Section ${i}: ${key}](#${key.toLowerCase()})`);
            i++;
        }
    }
    let listOfCredits = "- " + data.Credits.split(",").join("\n- ");
    

    //add strings to createdHTML
    for (let key in data){
        //add Credits
        if (!(data[key]==="") && (key==="Credits")) {
            createdHTML += `## Credits:\n\n`;
            createdHTML += listOfCredits;
            createdHTML += "\n\n";
            //add Title, badges, screenshotPath, deployed link, and table of contents
        } else if (!(data[key]==="") && (key==="Title")) {
            createdHTML += `# ${data.Title}`;
            createdHTML += "\n\n";
            createdHTML += licenseBadges[data.License];
            if (badges.length > 0){
                for (let badge of badges){
                    createdHTML += `![badge: ${badge.label.trim()}-${badge.message.trim()}](https://img.shields.io/badge/${badge.label.trim().replace(/ /g, '%20')}-${badge.message.trim().replace(/ /g, '%20')}-${badge.color.trim().replace(/ /g, '%20')})`
                }
                createdHTML += '\n\n';
            } else {
                createdHTML += '\n\n';
            }

            if (!(data.screenshotPath === "")) {
                createdHTML += `![screenshot of ${data.Title}](${data.screenshotPath})\n\n`;
            } 
            if (!(data.link ==="")) {
                createdHTML += `${data.link}\n\n`;
            }
            createdHTML += `Table Of Contents:\n\n${tableOfContents.join("\n")}`;
           
            createdHTML += '\n\n';
            //add Questions contact info
        } else if (!(data[key]==="") && (key==="Twitter" ||key==="LinkedIn" ||key==="Facebook" ||key==="Email" || key==="GitHub")){
            if (!(createdHTML.includes("## Questions"))){
                createdHTML += "## Questions: \n\n";
                createdHTML += "You can contact me with questions via:\n"
            }
            createdHTML += `- [${key}](${contactURLs[key]}${data[key]})\n`
            //add all other sections
        }else if (!(data[key]==="") && !(key==="link" || key==="screenshotPath")) {
            createdHTML += `## ${key}:\n\n`;
            createdHTML += data[key].split(";").join("\n\n");
            createdHTML += "\n\n";
        }

    }

    //write README.md file with createdHTML
    fs.writeFile('newReadMe.md', createdHTML, function(err){
        if (err) {
            console.log(err);
        } else {
            console.log("README completed.");
        }
    })
}

//create badges
async function createBadges(){
    let moreBadges=true;
    let createdBadges = []
    while (moreBadges) {
        //ask for badge label, message, and color
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
        //ask if any more badges
        const { more } = await inquirer.prompt({
        type: 'confirm',
        message: 'Do you want to make another badge? ',
        name: 'more',
        });
        //add badge to array
        createdBadges.push({
            label: label,
            message: message,
            color: color,
        })
        if (!(more)){
            moreBadges = false;
        }
    }  
    writeToFile(results, createdBadges);
}



// function to initialize program
function init() {
    //ask initial questions
    inquirer.prompt(questions).then(function(answers){
        results = answers;
        //ask if user would like badges
        inquirer.prompt({
            type:"confirm",
            message:"Would you like to add badges to your README? (you already have a badge for your license): ",
            name:"anyBadges",
        }).then(function(answers){
            //if yes, create badges
            if (answers.anyBadges===true){
                createBadges();
            //if no, go straight to writing file
            } else {
                writeToFile(results, {})
            }
        })

    })


}

// function call to initialize program
init();
