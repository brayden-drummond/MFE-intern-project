## Publishing to NPM

First run `cd event-bus` in your terminal. Then run `npm version patch`.

You can then commit and push your changes to Azure DevOps.

In Azure DevOps, you will need to set the PUBLISH variable to true in the MFE-INTERNSHIP-PROJECT pipeline for the publish step to run.

You can then create a pull request and run the pipeline.

When you checkout to main, you will need to run npm install to update your eventbus package.json to the correct version.