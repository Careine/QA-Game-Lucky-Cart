# FinPlex BackOffice



## Getting started

To make it easy for you to get started with GitLab, here's a list of recommended next steps.

Already a pro? Just edit this README.md and make it your own. Want to make it easy? [Use the template at the bottom](#editing-this-readme)!

## Requirements

- [ ] Docker installed


docker build -t finplex/backoffice -f .docker/Dockerfile .
docker run -it -p 8080:8080 --rm --name backoffice finplex/backoffice

App is served on port : 8080

### CLIENT ID and CLIENT SECRET
Use passport:install on Laravel to generate the keys
create a file named env.prod.js on root folder and add the following code
js
export const CLIENT_ID = "the_client_id";
export const CLIENT_SECRET = "the_client_secret";