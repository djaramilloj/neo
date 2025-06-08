# Neo - Character Battle API

This project is a backend API for a character-based battle game, built with **TypeScript** and **Express**. It follows **Domain-Driven Design (DDD)** and **Clean Architecture** principles, and uses the **Factory Design Pattern** for character creation.

## Features
- Create characters with jobs (Warrior, Thief, Mage) using a Factory Pattern
- List all characters for a user
- Get details of a specific character
- Battle between two characters, with a detailed battle log
- All endpoints and logic are implemented using DDD and Clean Architecture best practices
- Centralized error handling

## Tech Stack
- **TypeScript**: Type safety and modern JavaScript features
- **Express**: Fast, simple to implement web framework
- **DDD & Clean Architecture**: Separation of concerns, testability, and scalability
- **Factory Pattern**: Used for character creation logic

## Project Structure
```
├── src/
│   ├── application/character/        # Use cases
│   ├── domain/character/             # Entities, value objects, factories
│   ├── infrastructure/persistence/   # In-memory repository
│   ├── interfaces/http/              # Controllers
│   ├── routes/                       # Express routes
│   └── index.ts                      # App entry point
├── test/                             # Unit tests (mirrors src/ structure)
├── package.json
├── tsconfig.json
├── jest.config.js
└── README.md
```

## How to Run

### 1. Install dependencies
```
npm install
```

### 2. Start the server (development mode)
```
npm run dev
```
The server will run on `http://localhost:3000` by default.

### 3. Build and run (production mode)
```
npm run build
npm start
```

## API Endpoints

### Create a Character
- **POST** `/api/characters`
- **Body:**
```json
{
  "userId": "user1", // Any string
  "name": "HeroA", // Any string - must be unique
  "job": "Warrior" // Warrior | Mage | Thief
}
```
- **Response:** Character object

### List All Characters for a User
- **GET** `/api/characters`
- **Response:** Array of characters (name, job, **alive (Boolean)** )

### Get Character Details
- **GET** `/api/characters/:name`
- **Response:**
```json
{
  "name": "HeroA",
  "job": "Warrior",
  "currentLifePoints": 20,
  "maximumLifePoints": 20,
  "stats": {
    "strength": 10,
    "dexterity": 5,
    "intelligence": 5,
    "attackModifier": 9,
    "speedModifier": 4
  }
}
```

### Battle Between Two Characters
- **POST** `/api/characters/battle`
- **Body:**
```json
{
  "character_1": "HeroA",
  "character_2": "HeroB"
}
```
- **Response:**
```json
{
  "log": ["...battle log lines..."], // According to problem statement
  "winner": "HeroA",
  "loser": "HeroB"
}
```

## Testing
Run all unit tests:
```
npm test
```

---

**Enjoy building and battling with your characters!** 