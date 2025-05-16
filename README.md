# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

## Time2Study 
A fullstack study planner app that helps students manage their time and schedule effectively.

## Clone or pull from the main branch
Choose option 1 or 2 to get the project. The instructions should work for both Mac and Windows computers.

### Option 1: How to pull from git repository?
1. Open the Terminal and create an empty folder. 
```bash
mkdir folder_name
```

Open Terminal and Initialize Git.
```bash
cd /path/to/your/desired/folder_name # you can skip this part if you are using a folder in VScode.
git init
```
This will only work if you have acces to the git repositiory if not ask Frida, then she will invite you. Copy the Git Repository URL from Github. Exampel https://github.com/FriddeFrid91/TimeToStudy_Project.git
```bash
git remote add origin https://github.com/FriddeFrid91/TimeToStudy_Project.git
```
Now we want to fetch to recive different objects.
```bash
git fetch 
git branch -r 
```
You will get something like this and the latest updates
```bash
origin/Chris
origin/Frida
origin/Mi
origin/main 
```

Now you should chose main and pull it.
```bash
git checkout -b origin/main
git pull origin main
```
You are all done now and you have our latest code. Use git branch to see if you are in main, if you are then you are good to go.
```bash
git branch
```

### Option 2: How to clone a git repository?
1. Open the Terminal 
2. Navigate to a empty folder where you want to clone the project, if you do not have one create it.
3. Follow the steps bellow.
```bash
mkdir folder_name # If you do not have a folder to clone the code
cd /path/to/your/desired/folder_name # Open your folder
git clone https://github.com/FriddeFrid91/TimeToStudy_Project.git
```

## Setup and install
Now we will install necessary packages and make a setup in order for the App to work. First we need to open two terminals. One for the backend and one for the frontend to install seperate packages. 

1. Open a Terminal for the frontend
2. Navigate to the folder_name that you have created with the project https://github.com/FriddeFrid91/TimeToStudy_Project.git inside it. If you do not have it go back to "Clone or Pull from the main branch" and follow the instructions.
3. Follow the steps bellow

### Open the frontend in the terminal
```bash
cd /path/to/your/desired/folder_name//TimeToStudy
cd frontend
```

Install this package in Frontend to get node_modules
```bash
npm install
```
If there are no issues frontend is done

### Open the backend in the terminal
```bash
cd /path/to/your/desired/folder_name//TimeToStudy
cd backend
```

Install these packages in backend to get the different functions.
```bash
npm install express cors dotenv mongoose ical.js fs path
npm install jsonwebtoken bcryptjs
```
If there are no issues Backend is done.
If you are having issues with installing packages check this site for more information https://packaging.python.org/en/latest/guides/

## Start the server by running Frontend and Backend togheter.
Now you should have everything you need if you have followed the steps from "Clone or pull from the main branch" and "Setup and install"

### Open the backend in the terminal and run it.
```bash
cd /path/to/your/desired/folder_name//TimeToStudy
cd backend
npm start
```

### If the backend is working you should see something like this
```bash
(base) chris@Chriss-Air-2 server % npm start

> server@1.0.0 start
> node schedule.js

URI from env: mongodb+srv://lubechrisi:nn8wwD8DexRYbE8p@clusteroftime2study.bd8mnnm.mongodb.net/?retryWrites=true&w=majority&appName=ClusterofTime2study
Trying to connect to MongoDB...
MongoDB connected
Server running on http://localhost:5000..
✅ Generating accessToken...
✅ Generating accessToken...
✅ Generating accessToken...
```
### Open the frontend in the terminal and run it.
```bash
cd /path/to/your/desired/folder_name//TimeToStudy
cd frontend
npm run dev
```

### If the frontend is working you should see something like this.
```bash
(base) chris@Chriss-Air-2 frontend % npm run dev

> timetostudy@0.0.0 dev
> vite


  VITE v6.3.4  ready in 811 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
  ➜  press h + enter to show help
```
### Now use your own .env files one in backend and one in frontend.
To get the .env files you first have to create an account in MogoDB atlas and crate a cluster where you can store your databases. For more information follow their website https://www.mongodb.com/. Then in your cluster you will find a MONGO_URI that you can use in .env file and store it in backend. For the .env file in the frontend you will need to ask Frida. 


### Extra
If everything is good you can now open up a browser and copy paste http://localhost:5173/ in the http search bar, then press enter. Now you will see our website, be ready to explore the beauty and the different functionalities that our website has to offer. 
