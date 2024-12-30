
# Coally Application Challenge.

Full stack Frontend and Backend Services.






## Authors

- [@cristian1534](https://github.com/cristian1534)


## 🚀 About Me
My name is Cristian, I am interested in any open position for either Backend NodeJS or FullStack MERN.

LinkedIn Profile: https://www.linkedin.com/in/cristian-machuca-dev/


Currently I am available to work %100 remotely at any time of the day. Looking forward to collaborating with a team and 
continuing growing up with new technologies either in Backend or Frontend development as could be needed. 
Besides MERN Stack I like to work with micro services on Docker, TS, with some DevOps concepts such as CI/CD and Testing, Scrum as Jira, Git, Bitbucket and so on.

I attach this link for my references regarding Resume: 
https://europa.eu/europass/eportfolio/api/eprofile/shared-profile/cristian-machuca/aca2ec36-40d7-49ea-ac76-26ca51fa1e4e?view=html



## Deployment Swagger Documentation.

https://coally.onrender.com/api/v1/docs/

## Screenshots

![App Screenshot](https://res.cloudinary.com/dutafv5us/image/upload/v1735557768/tr5gyfiqap8nfrabinor.png)


## Backend Environment Variables

To run this project, you will need to add the following environment variables to your .env file

Just for Challenge reason MONGO_URI is available but it will be remove after 30 days.

`SECRET_TOKEN`

`MONGO_URI`

`NODE_ENV`



## Run Locally

Clone the project

```bash
  git clone https://github.com/cristian1534/Coally.git
```

Go to the project directory

```bash
  cd backend
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run dev
```


## Running Tests

To run tests, run the following command

```bash
  npm run test
```


## Screenshots

![App Screenshot](https://res.cloudinary.com/dutafv5us/image/upload/v1735557967/y3avn1ydll7n2viko0fy.png)
![App Screenshot](https://res.cloudinary.com/dutafv5us/image/upload/v1735558080/vfvc2rmx3jyhde5dzwsx.png)


## API Reference

#### Get all Tasks
```http
  POST /tasks
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `task` | `object` | Post a task|

```http
  GET /tasks
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `task` | `object` | Get all tasks|

```http
  GET /tasks/{id}
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `task` | `object` | Get a task by id|

```http
  PUT /tasks/{id}
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `task` | `object` | Update a task|

```http
  DELETE /tasks/{id}
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `task` | `object` | Delete a task|

```http
  POST /users
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `users` | `object` | Create a user|

```http
  GET /users
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `users` | `object` | Get all users|

```http
  POST /users/auth
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `users` | `object` | Log In a user|

## Frontend Environment Variables

To run this project, you will need to add the following environment variables to your .env file

Just for Challenge reason MONGO_URI is available but it will be remove after 30 days.

`NEXT_PUBLIC_BASE_URL`=https://coally.onrender.com



## Run Locally

Clone the project

```bash
  git clone https://github.com/cristian1534/Coally.git
```

Go to the project directory

```bash
  cd client
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run dev
```

## Screenshots

![App Screenshot](https://res.cloudinary.com/dutafv5us/image/upload/v1735558854/gqr6do5vypoim6xh43iu.png)
![App Screenshot](https://res.cloudinary.com/dutafv5us/image/upload/v1735558928/qch9ucyxxmv0ewmgvbnc.png)
![App Screenshot](https://res.cloudinary.com/dutafv5us/image/upload/v1735558975/hegbukhjrspumyeaglbc.png)

## DEFAULT user:

You can Log In with the default user created for testing purpose:


```bash
  email: cristian@outlook.com
```
```bash
  password: 12345678
```
##  Instance will spin down with inactivity, which can delay requests by 50 seconds or more at the first time.


## Deployment Client Side Application.

https://coally-cristian1534s-projects.vercel.app/signin

## 🛠️ Technologies Used
- **Frontend**
  - ![Next.js](https://img.shields.io/badge/Next.js-000?logo=next.js&logoColor=white&style=for-the-badge)
  - ![Typescript](https://img.shields.io/badge/Typescript-000?logo=typescript&logoColor=white&style=for-the-badge)
  - ![Tailwind](https://img.shields.io/badge/Tailwind-000?logo=tailwind&logoColor=white&style=for-the-badge)
- **Backend**
  - ![Node.js](https://img.shields.io/badge/Node.js-339933?logo=node.js&logoColor=white&style=for-the-badge)
  - ![Typescript](https://img.shields.io/badge/Typescript-000?logo=typescript&logoColor=white&style=for-the-badge)
  - ![Express.js](https://img.shields.io/badge/Express.js-000000?logo=express&logoColor=white&style=for-the-badge)
