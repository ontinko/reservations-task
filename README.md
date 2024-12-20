## Restaurant reservation page (technical task)

### Prerequisites

In order to run this application, you need [Docker and docker-compose](https://docs.docker.com/) installed and configured

### Notes

Some notes regarding the task execution (compromises)

 - I had to stick to PostgreSQL instead of MySQL because of MySQL and Prisma specific connection issues I didn't have time to figure out
 - The API URL on the frontend is used directly for the same reason, some Vite specific behavior I couldn't figure out in time
 - Ideally, in a larger app, I would probably use React Query to utilize caching and to avoid using my own flag variables like `isLoading`. However, in this app, I decided it would be OK to just go with plan axios

### Setup

1. Get the source code

With GitHub CLI

```sh
gh repo clone ontinko/reservations-task
cd reservations-task
```

With HTTPS

```sh
git clone https://github.com/ontinko/reservations-task.git
cd reservations-task
```

With SSH

```sh
git clone git@github.com:ontinko/reservations-task.git
cd reservations-task
```

2. Create `.env` file

Copy the existing example and edit the values to suit your requirements
Please make sure no processes are running on the specified ports

```sh
cp .env.example .env
```

2. Build & run the app

```sh
docker compose up --build
```

3. Access the application at the port specified in the `.env` (`3001` is the default one)
