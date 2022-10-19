Follow the below instructions for contributing in this project:

# Local Setup
1. Fork this repository and clone it on your device using command `git clone <frontend_repo_url>`
1. Fork the [backend repository](https://github.com/gurpreet-legend/Face-Recognition-Braniac-Backend) and clone it on your device using command `git clone <backend_repo_url>`
2. Make sure NodeJS is already installed. If not, download from [here](https://nodejs.org/en/download/)
3. In the terminal, 
    * `cd backend` and run command `npm run start` to start the backend server
    * `cd frontend` and run command `npm run start` to start the localhost server
4. Create a mongoDB cluster here, Create a `.env` file according to the `.env.example` and add the `DATABASE_URL` copying from [Mongodb Atlas](https://www.mongodb.com/atlas/database)

## Creating an issue

Follow the instructions below while creating the issue.

- Make a branch and include an issue number and a one- or two-word description of the problem. For instance, if issue number 156 concerns adding a navbar, the branch should be named `navbar-156`.  Make a PR from your repository to this main repository when you have committed your modifications to the branch.
- In the issue title, mention the issue type. Select only one of the three kinds available: `Bug`, `Feature` or `Improve`. For instance, the title will be `[Bug] -{brief-definition}` if the issue is about resolving a bug.
- Make sure you mention the following sections in the issue description
  - What is the issue?
  - How to reproduce the issue?
  - What is the expected behaviour?
  - Describe a solution you would like
  - Additional Context (Optional)

  Try to add screenshots or error messages for a better understanding of the issue.


## Making a pull request

Follow the guidelines below when creating a pull request.
- Mention the issue number that the pull request is for in the title. Any PR without a specific issue will not be taken into account. The title of your PR should read `[Fix #20] - {title of PR}` if it is for issue 20.
- Mention the following points in the PR description
  - Fix `<Issue number>`
  - Describe the changes you have made
  - Screenshots
  - Additional Context (Optional)