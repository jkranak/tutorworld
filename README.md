

<p align="center">
<img src="./client/public/logo192.png"<br />
  <h3 align="center">Tutor World</h3>

  <p align="center">
    A website for tutors and students to connect
    
  </p>
</p>

<!-- ABOUT THE PROJECT -->
## About The Project

Tutor World aim is to offer you the best platform to be able to learn from top-rated tutors. Not only are we able to host in-app online tutoring sessions, but you can also find tutors that are available at your local libraries. 

## Contributors
* Joseph Kranak [![LinkedIn][linkedin-shield]](https://www.linkedin.com/in/joseph-kranak/)
* Rahmat Yousufi [![LinkedIn][linkedin-shield]](https://www.linkedin.com/in/rahmatyousufi/)
* Bianca Procopio [![LinkedIn][linkedin-shield]](https://www.linkedin.com/in/bianca-procopio/)

### Built With
The technologies we used in the development of this project:
* Front End: [React](https://reactjs.org/), [Redux](https://redux.js.org/), [TypeScript](https://www.typescriptlang.org/), [Saas](https://www.npmjs.com/package/sass), [Axios](https://axios-http.com/)
* Back End: [PostgreSQL](https://www.postgresql.org/), [Sequelize](https://sequelize.org/), [NodeJS](https://nodejs.org/en/), [Express](http://expressjs.com/), [AWS RDS](https://aws.amazon.com/rds/)
* Others: [JWT](https://jwt.io/), [PeerJS](https://peerjs.com/), [Socket.io](https://socket.io/), [Google Maps API](https://developers.google.com/maps/apis-by-platform), [Stripe](https://stripe.com/docs/api)

## Getting Started

### Prerequisites

* npm
  ```sh
  npm install npm@latest -g
  ```

### Installation

1. You will need api keys from
* [Stripe](https://stripe.com/docs/api) 
* [Google Maps](https://developers.google.com/maps/apis-by-platform)
* [Formspark](https://www.formspark.io/)
* [Uploadcare](https://uploadcare.com/api-refs/upload-api/)
2. You will need a Postgres database running.
3. Clone the repo
   ```sh
   git clone https://github.com/your_username_/tutorworld.git
   ```
4. Install NPM packages in both client and server folders:
   ```sh
   tutorworld/client % npm install

   tutorworld/server % npm install
   ```
5. Create `server/.env` using `server/.env.example` as a template.

6. Create `client/.env` using `client/.env.example` as a template.

[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/othneildrew
[product-screenshot]: images/screenshot.png

7. Running the application
   ```sh
   tutorworld/client % npm start

   tutorworld/server/src % node index.js
   ```

