# BACKEND

## Docker

In this step, you will learn how to initialize the project using Docker Compose, which will help you quickly and easily set up the environment.

1. Copy the .env.example file to .env (or use the provided copy of env when starting)
     ```sh
    docker-compose up -d  
    ```

## Commands

In this step, you will learn how to initialize the project, which will help you quickly and easily set up the environment.

1. Install mysql 8+, node 22+

2. Copy the .env.example file to .env (or use the provided copy of env when starting)
     ```sh
    npm i --quiet
    node ace migration:run
    npm run dev 
    ```
3. open url in browser, http://localhost:3333/
