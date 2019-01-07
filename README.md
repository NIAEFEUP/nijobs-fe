# niJobs - FrontEnd


[![Build Status](https://img.shields.io/travis/NIAEFEUP/nijobs-fe/develop.svg?style=for-the-badge)](https://travis-ci.org/NIAEFEUP/nijobs-fe)
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