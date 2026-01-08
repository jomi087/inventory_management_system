# IMS Backend

## Prerequisites
Make sure you have the following installed on your system:

- Node.js v18.x or higher  
  (Recommended: v18.17.0)

To check the Node.js version, run:
```bash
node -v
```

## Installation
Navigate to the backend directory and install dependencies:
```bash
cd ims_backend  
```
```bash
npm install
```

## Environment Setup
This project requires environment variables to run. Create a `.env` file in the `ims_backend` directory.
with the following variables:

```env
```
---
## Running the Backend

#### Development Mode
Runs the server using nodemon and ts-node:
```bash
npm run dev
```
---

#### **Production Run** 
* 1st - Build
  - Compiles TypeScript source code to JavaScript:
    ```bash 
    npm run build
    ```
* 2nd - Start
  - Runs the compiled server 
    ```bash 
    npm start 
    ```
---

## Code Quality Scripts
The following scripts are available for maintaining code quality.

### Linting
Checks the codebase for linting issues:-
```bash
npm run lint
```
---
### Formatting

Formats the code using Prettier:-
```bash
npm run format
```