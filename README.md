[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url]

<br />
<p align="center">
  <a href="https://github.com/rbondoc96/artemis">
    <img src="images/logo.svg" alt="Logo">
  </a>

  <h3 align="center">adopt-a-paw: Cat & Dog Adoption Website</h3>

  <p align="center">
    An fake adoption website to adopt, foster, or volunteer at adopt-a-paw!
    <br />
    <a href="https://github.com/rbondoc96/artemis"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://github.com/rbondoc96/artemis/issues">Report Bug</a>
    ·
    <a href="https://github.com/rbondoc96/artemis/issues">Request Feature</a>
  </p>
</p>

<details open="open">
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>

## About the Project

A fake cat and dog adoption website written using the PERN stack

### Built With
The website is being built using the PERN stack:
* [PostgreSQL](https://www.postgresql.org/)
* [Express.js](https://expressjs.com/)
* [React](https://reactjs.org/)
* [Node.js](https://nodejs.org/)

The backend uses Sequelize and Sequelize CLI for its ORM.

## Getting Started
To get a local copy up and running follow these simple example steps.

### Prerequisites
The following items are required to begin installation and correctly run the code

* PostgreSQL v13.3
* Node.js v16.6.0
* npm


### Installation
1. Clone the repo
    ```bash
    git clone https://github.com/rbondoc96/artemis
    ```

2. Install npm packages

    The client and server code are separated into the `/frontend` and `/backend folders`, respectively. While in each folder, run `npm install`

    ```bash
    /frontend $ npm install
    /backend  $ npm install
    ```

3. Create the database

    Use sequelize-cli to create the database and migrate the tables

    ```bash
    /backend  $ sequelize db:create    # Create DB
    /backend  $ sequelize db:migrate   # Create tables from migrations
    ```

## Usage
To start the frontend dev server, use `npm start`
```bash
/frontend $ npm start
```

To start the backend server, use ```npm start```
```bash
/backend  $ npm start
```

## Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change. 

For error handling, there is a Google Sheet with a list of error codes and their descriptions. The link to the sheet allows anyone to add comments. If there is an error you want to add, please add a comment or open an issue.

Link to the sheet - https://docs.google.com/spreadsheets/d/1hHzg22qbAh3ex7E4tIlMlMP_rUo0DqDWnBMytqQPsWo/edit?usp=sharing

Any contributions you make are **greatly appreciated!**

1. Fork the project
2. Create a new branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a pull request


## License

Distributed under the MIT License. See `LICENSE` for more information.


## Contact

Rodrigo Bondoc - rbondoc96@gmail.com

Project Link - [https://github.com/rbondoc96/artemis](https://github.com/rbondoc96/artemis)

[contributors-shield]: https://img.shields.io/github/contributors/rbondoc96/artemis?style=for-the-badge
[contributors-url]: https://github.com/rbondoc96/artemis/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/rbondoc96/artemis.svg?style=for-the-badge
[forks-url]: https://github.com/rbondoc96/artemis/network/members
[stars-shield]: https://img.shields.io/github/stars/rbondoc96/artemis.svg?style=for-the-badge
[stars-url]: https://github.com/rbondoc96/artemis/stargazers
[issues-shield]: https://img.shields.io/github/issues/rbondoc96/artemis.svg?style=for-the-badge
[issues-url]: https://github.com/rbondoc96/artemis/issues
[license-shield]: https://img.shields.io/github/license/rbondoc96/artemis.svg?style=for-the-badge
[license-url]: https://github.com/rbondoc96/artemis/blob/dev/LICENSE
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://www.linkedin.com/in/rbondoc96/