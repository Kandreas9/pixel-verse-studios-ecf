# Pixel Verse Studios ECF

This is the completed project for the ecf assesment with the theme of a character creator for the game FantasyRealm Online MMORPG created by the Pixel Verse Studios company.

## Important Links

- [French README](docs/FRENCH.md)
- SQL Files instead of migrations
- User Manual
- Figma Designs
- Project Management
- Technical Docs

## How to Setup Project Locally

> :warning: Prerequisites

- Git installed
- Composer installed
- Docker desktop installed

Everything else should be handled through Docker like node/npm, php, databases etc.

1. Clone all the files from the Github repository into your desired directory:

HTTPS:

```bash
git clone https://github.com/Kandreas9/pixel-verse-studios-ecf.git
```

SSH (Recommended by github):

```bash
git clone git@github.com:Kandreas9/pixel-verse-studios-ecf.git
```

2. Copy .env.example into a new file called .env on the root of the project.

Change some of the .env values, here is what the file should look like:

```text
APP_NAME=Laravel
APP_ENV=local
APP_KEY=
APP_DEBUG=true
APP_URL=http://localhost

APP_LOCALE=en
APP_FALLBACK_LOCALE=en
APP_FAKER_LOCALE=en_US

APP_MAINTENANCE_DRIVER=file
# APP_MAINTENANCE_STORE=database

PHP_CLI_SERVER_WORKERS=4

BCRYPT_ROUNDS=12

LOG_CHANNEL=stack
LOG_STACK=single
LOG_DEPRECATIONS_CHANNEL=null
LOG_LEVEL=debug

DB_CONNECTION=mysql
DB_HOST=mysql
DB_PORT=3306
DB_DATABASE=laravel
DB_USERNAME=sail
DB_PASSWORD=password

SESSION_DRIVER=database
SESSION_LIFETIME=120
SESSION_ENCRYPT=false
SESSION_PATH=/
SESSION_DOMAIN=null

BROADCAST_CONNECTION=log
FILESYSTEM_DISK=local
QUEUE_CONNECTION=database

CACHE_STORE=database
# CACHE_PREFIX=

MAIL_MAILER=smtp
MAIL_SCHEME=null
MAIL_HOST=mailpit
MAIL_PORT=1025
MAIL_USERNAME=null
MAIL_PASSWORD=null
MAIL_FROM_ADDRESS="hello@example.com"
MAIL_FROM_NAME="${APP_NAME}"

VITE_APP_NAME="${APP_NAME}"

SUPER_ADMIN_USERNAME=admin
SUPER_ADMIN_EMAIL=admin@example.com
SUPER_ADMIN_PASSWORD=Adminpassword!2

MONGODB_USERNAME=root
MONGODB_PASSWORD=password
MONGODB_SERVER=127.0.0.1
MONGODB_PORT=27017
MONGODB_URI=mongodb://root:password@mongodb:27017/?authSource=admin
MONGODB_DATABASE=laravel
```

3. Install composer packages (this only really matter to get sail installed, afterwards everything is developt using sail and docker containers).

```bash
composer install --ignore-platform-req=ext-mongodb
```

`--ignore-platform-req=ext-mongodb` is used because locally i do not have the required mongodb extensions for php, which doesnt matter because the container we will create with sail will have.

4. Use sail to create and run the docker container

```bash
./vendor/bin/sail up -d
```

Alternatively you can use this shell alias in your `~/.zshrc` or `~/.bashrc` depending on your shell

```bash
alias sail='sh $([ -f sail ] && echo sail || echo vendor/bin/sail)'
```

Now you can use:

```bash
sail up -d
```

This command will pull all the required images and create your container and run them in detached mode which will have your local files mounted so you can change your local files and they will reflect those changes inside the container.

5. Generate key, run migrations with seeders, and setup node for frontend

Use `sail shell` to enter the docker container shell, or use sail to run the commands from outside the container using `sail artisan` (i will continue the instruction inside the container shell for this setup).

```bash
sail shell

php artisan key:generate
php artisan migrate --seed

npm i
npm run dev
```

6. Now you should be able to connect to the site

- App: `http://localhost/`
- Mailpit: `http://localhost:8025/`

7. Down and up project again

You can now use Ctrl+C to close the npm run dev and use `exit` to exit the sail shell, run `sail down` to close the containers running on docker.

To reopen the project locally all you have to do now is:

```bash
sail up -d
sail shell
npm run dev
```
