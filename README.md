### Rick and Morty API Interview Documentation.

| Tech Stach           |
| -------------------- |
| Next JS              |
| Typescript           |
| Tailwindcss & Shadcn |
| tRPC                 |
| zod                  |

> I have setup my app using the create-t3-app.

This project is a React application that utilizes the Rick and Morty API to retrieve information about:
  - characters, 
  - locations, 
  - and episodes

from the popular animated TV series Rick and Morty. 
The application allows users to search for characters, filter locations, 
and view detailed information about each character.

#### Project Structure
**pages/** */: Contains Next.js pages for routing.\
**components/**: Contains React components used in the application.\
**interfaces/**: Contains TypeScript interface definitions for API schemas.\
**utils/**: Contains utility functions and constants.\
**constants/**: Contains constants used in the application.\
**Components**\
**Hero**: The Hero component displays a hero section with an image and a search input field. It allows users to search for characters by name.\
**Locations**: The Locations component displays a list of locations retrieved from the API. It allows users to filter locations by name and view the residents of each location.\
**CharacterByID**: The CharacterByID component displays detailed information about a character identified by its ID. It fetches character data from the API and displays it on the 
**page**.

#### Data Fetching
Data fetching is handled using Axios for `REST API` requests and Apollo Client for GraphQL queries (*I used this for getting character data*).\
The application retrieves data about characters, locations, and episodes from the Rick and Morty API.\

#### Error Handling
Error handling is implemented using try-catch blocks for Axios requests and Apollo Client queries.
Error messages are displayed to users in case of failed requests.

#### Performance Optimization
Performance is optimized by using useEffect hook to fetch data asynchronously and useState hook to manage loading states.
Loading indicators are displayed while data is being fetched to provide feedback to users.

#### Usage
To run the project locally, follow these steps:

Clone the repository:`git clone <repository-url>`\
Install dependencies: `pnpm install`   *I am using pnpm but you can use any package manager of choice*\
Run prisma db setup script: `pnpx db:push` or use `pnpx prisma db push`\
Start the development server: `npm run dev`\
Open the application in your browser:` http://localhost:3000`
To view your database with prisma studio: `pnpx prisma studio`


### Thought Process.

Why create-T3 -  I used create-t3 for an end to end type safety. This will help with making API type safe and will help me identify issues early into my development before building or at runtime.

Why Choose two ways for retrieving the data - For the locations, the REST worked well as it was the first choice. When Implementing the third tesk (*Display the data in a manner that allows you to view the location, its residents and see an image of the resident with a representation of their name & status.*) I found some issues and bottle necks with the REST so I decided to use the GraphQL API instead to help get better targeted and accurate character data.

Why sqlite and prisma - for saving notes I believe SQLite is the best option that helps in monitoring the database and is the one that's closet to a producttion db level SQL based database.


#### Architecture & design.

![Characters](https://github.com/shadmeoli/rick_n_morty_interview/assets/85517013/4c78da95-ecac-459b-b451-4be5be819cf1)

![Home](https://github.com/shadmeoli/rick_n_morty_interview/assets/85517013/cb8765ef-2252-44fd-b0fc-6fa1818d4426)

![Note Creaton](https://github.com/shadmeoli/rick_n_morty_interview/assets/85517013/1bab910f-f723-481e-8277-8638a4b72f51)

