const fs = require("fs");
const inquirer = require("inquirer");




//ask user questions

async function askQuestions() {
    try {

        const { name } = await inquirer.prompt({
        message: 'The title of your project: ',
        name: 'name',
        });

        const { description } = await inquirer.prompt({
        message: 'The description of your project: ',
        name: 'description',
        });

        const { link } = await inquirer.prompt({
        message: 'URL to link to your deployed project: ',
        name: 'link',
        });

        const { screenshotPath } = await inquirer.prompt({
        message: 'File path to screenshot of your project',
        name: 'screenshotPath',
        });

        const { installation } = await inquirer.prompt({
        message: 'Instructions for the installation of your project: ',
        name: 'installation',
        });

        const { usage } = await inquirer.prompt({
        message: 'Instructions for the usage of your project: ',
        name: 'usage',
        });

        const { license } = await inquirer.prompt({
        message: 'What license is your project under? ',
        name: 'license',
        });

        let { anycredits } = await inquirer.prompt({
        type: 'confirm',
        message: 'Is there anyone that you would like to credit for contributing to your project? ',
        name: 'anycredits',
        default: true,
        });

        let listOfCredits = []
        while (anycredits) {   
            const { credits } = await inquirer.prompt({
                message: 'Name of person you would like to credit: ',
                name: 'credits',
                });

            listOfCredits.push(credits);

            const { morecredits } = await inquirer.prompt({
                type: 'confirm',
                message: 'Is there anyone else that you would like to credit for contributing to your project? ',
                name: 'morecredits',
                default: true,
                });

            if (!morecredits) {
                anycredits = false;
            }
        }  

        console.log(listOfCredits);
        const { contributing } = await inquirer.prompt({
        message: 'Instructions for those who might contribute to your project: ',
        name: 'contributing',
        });

        const { tests } = await inquirer.prompt({
        message: 'What tests exist for your project? ',
        name: 'tests',
        });

        const { questions } = await inquirer.prompt({
        message: 'What questions remain for your project? ',
        name: 'questions',
        });

        answers = {
            name: name,
            description: description,
            link: link,
            screenshotPath: screenshotPath,
            installation: installation,
            usage: usage,
            license: license,
            listOfCredits: listOfCredits,
            contributing: contributing,
            tests: tests,
            questions: questions,
        }
        console.log(answers);
        return answers;

    } catch (err) {
        console.log(err);
    }
}


// function to write README file
function writeToFile(data) {

    const createdHTML = '';
    fs.writeFile('README.md', createdHTML, function(err){
        if (err) {
            console.log(err);
        }
    })
}

// function to initialize program
function init() {
    const answers = askQuestions();

    writeToFile(answers);

}

// function call to initialize program
init();
