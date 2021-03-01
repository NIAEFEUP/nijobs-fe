# niJobs - FrontEnd


![GitHub Workflow Status (branch)](https://img.shields.io/github/workflow/status/NIAEFEUP/nijobs-fe/CI/master?label=BUILD%20-%20Master&style=for-the-badge)
![GitHub Workflow Status (branch)](https://img.shields.io/github/workflow/status/NIAEFEUP/nijobs-fe/CI/develop?label=BUILD%20-%20Develop&style=for-the-badge)

[![Build Preview](https://img.shields.io/badge/Build%20Preview-Develop-brightgreen.svg?style=for-the-badge)](https://develop--nijobs.netlify.com/)

![LGTM Grade](https://img.shields.io/lgtm/grade/javascript/g/NIAEFEUP/nijobs-fe.svg?style=for-the-badge)
[![GitHub issues](https://img.shields.io/github/issues/NIAEFEUP/nijobs-fe.svg?style=for-the-badge)](https://github.com/NIAEFEUP/nijobs-fe/issues)
[![GitHub license](https://img.shields.io/github/license/NIAEFEUP/nijobs-fe.svg?style=for-the-badge)](https://github.com/NIAEFEUP/nijobs-fe/blob/master/LICENSE)


A platform for companies to advertise their job opportunities to the students

Made with ❤️ by NIAEFEUP.

## Installation

### Prerequisites

- [`Docker`](https://www.docker.com)
- [`Docker Compose`](https://www.docker.com)

### Installing Docker

The best approach to install `docker` is to follow the offical guide [here](https://docs.docker.com/install/linux/docker-ce/ubuntu/#install-using-the-repository). 

Please follow the steps in `Install using the repository` section.

Next, follow [these](https://docs.docker.com/install/linux/linux-postinstall/) steps to configure docker access with non sudo permissions in the `Manage Docker as a non-root user` section.

### Installing Docker Compose

The best approach to install `docker-compose` is to follow the offical guide [here](https://docs.docker.com/compose/install/#install-compose). 

## Usage

### Development
To start developing, you must create a file `.env` with environment variables, which are explained in more detail [below](#env-file-specification).

After creating the `.env` file, you must build a dev server. 

```bash
docker-compose build
```
If you have already built the images/containers before you can simply run:
```bash
docker-compose up
```

#### Using custom API Backends

In order to test something before merging a Pull Request, for example, in the NIJobs Devtools toolbar, you can specify the API host for the application to call. This is useful since in Netlify it doesn't have direct access to your `localhost` backend.

![NIJobs Devtools](https://user-images.githubusercontent.com/28157246/105634004-bb251c00-5e53-11eb-881c-becf1801c855.png)

> NIJobs Devtools are only available in non-production environments or if otherwise specified via REACT_APP_ALLOW_DEV_TOOLS=true env variable

For it to work, you must serve a backend through some server accessible on the internet. An easy way to do it is using [ngrok](https://ngrok.com/).

After starting your server on localhost, you can create a tunnel from that localhost server to the internet with ngrok with the following command:

```bash
ngrok http <backend port, usually 8087>
```

That will give you two hosts, one for `http`, another for `https`. Use the `https` one in the NIJobs Devtools.

Remember that the backend server must allow the host making the requests (the Netlify origin (i.e. `https://deploy-preview-66--nijobs.netlify.app/`), or your localhost (i.e. `http://localhost:3000`), depending on the use-case).

This can also be useful if you don't want to run the server on your local machine, since you are only developing the frontend. In that case, you can use the staging deployment at `https:/ni.fe.up.pt/st4g1ng/nijobs/api`, but beware that CORS will block your localhost by default, so you must talk with a project maintainer to discuss permissions.

> A `dev.sh` file is available in the project's root folder to run these commands on linux environments (simply run `./dev.sh [--build]`)

This will create a development server with hot reloading which will listen on `http://localhost:<HOST_PORT>`.

### Env File Specification

- `HOST_PORT`= The port where you will access the dev server in your machine (`http://localhost:<HOST_PORT>`)

## Project Details

This project uses [`React.js`](https://reactjs.org/) with [`Redux`](https://redux.js.org/) for the state management. The visual framework used is [`MaterialUI`](https://material-ui.com/).

### Project Structure

```
.
├── public :: Generated Website ends up here
└── src
    ├── actions :: Redux Actions
    ├── components :: General React Components
    │   └── HomePage :: Example folder for components used in specific page
    ├── pages :: Page Components
    └── reducers :: Redux Reducers

```


## License
[GNU General Public License v3.0](https://choosealicense.com/licenses/gpl-3.0/)
