## Restaurant reservation page (technical task)

### Prerequisites

In order to run this application, you need [Docker](https://www.docker.com/) and [docker-compose](https://docs.docker.com/) installed and configured

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
