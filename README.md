# Superchat AI API
API ai chat-completion system using openai gpt-3.5-turbo model api. Includes CRUD routes protected using jwt auth.

## Technology
`Express`
`JavaScript`
`MongoDB`

## Application Architecture
I am using a custom based architecture which i created for this project, each unit of this project is treated as module which contains a controller, service & routes.

## Installation

1. Clone repository - `$ git clone https://github.com/usernameisleye/superchat-ai-api.git`

2. Install dependencies - `$ cd supercaht-ai-api`

3. Install dependencies - `$ yarn/npm install`

4. Create a new file `.env` if it doesn't exist and copy the contents of `.env.example` into it to be able to run your server on production environment.

## Running the server locally

1. Start up the server - Run `$ npm start` | `$ npm run dev`

2. Server should be running on http://localhost:2020/ by default 

## e2e Tests

1. Start up `$ npm run test`

## Usage

### Chat
```
/gpt
```
Use this route to get all chats and also send chats

### Auth
```
/user
```
Use this route to create and authenticate users

## Contact
If you need help using this API, have feature request or want to have extended functionality, feel free to contact via email:
```
adeleyeadesida@gmail.com
```
