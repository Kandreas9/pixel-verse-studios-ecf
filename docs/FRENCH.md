# Pixel Verse Studios ECF

Voici le projet finalisé pour l'évaluation ECF, portant sur la création d'un outil de création de personnages pour le MMORPG Fantasy Realm Online, développé par le studio Pixel Verse Studios.

## Liens importants

- [English README](../README.md)
- User Manual
- Figma Designs
- Project Management
- Technical Docs

- SQL Fichier

> :warning: Le dossier `/docs/sql/` contient les fichiers SQL correspondant aux actions effectuées par mes fichiers de migration. Ces fichiers ne sont pas utilisés dans le projet, je les ai créés à des fins de démonstration. Je n'ai pas inclus les fichiers SQL pour les rôles, car cette partie est gérée par le package `spatie/laravel-permissions`. Toutefois, un exemple plus général impliquerait une table `roles` ainsi qu'une table pivot pour les utilisateurs et les rôles (puisqu'il s'agit d'une relation Many-to-Many), à l'instar des relations `character_item` ou `comment_rating` présentes dans le projet.

## Comment configurer le projet en local

> :warning: Prérequis

- Git installé
- Composer installé
- Docker desktop installé

Tout le reste, comme Node/npm, PHP, les bases de données, devrait être géré via Docker.

1. Clonez tous les fichiers du dépôt GitHub dans le répertoire de votre choix:

HTTPS:

```bash
git clone https://github.com/Kandreas9/pixel-verse-studios-ecf.git
```

SSH (Recommandé par GitHub):

```bash
git clone git@github.com:Kandreas9/pixel-verse-studios-ecf.git
```

2. Copiez .env.example dans un nouveau fichier nommé .env dan le root du projet.

Modifiez certaines valeurs du fichier .env, voici à quoi le fichier devrait ressembler :

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

3. Installez les paquets Composer (cela n'est vraiment nécessaire que pour installer Sail, par la suite, tout le développement s'effectue à l'aide de Sail et de conteneurs Docker).

```bash
composer install --ignore-platform-req=ext-mongodb
```

`--ignore-platform-req=ext-mongodb` est utilisé parce que je ne dispose pas localement des extensions MongoDB requises pour PHP, cela n'a toutefois pas d'importance, car le conteneur que nous allons créer avec Sail en sera équipé.

4. Utilisez Sail pour créer et exécuter le conteneur Docker.

```bash
./vendor/bin/sail up -d
```

Vous pouvez également utiliser cet alias de shell dans votre fichier `~/.zshrc` ou `~/.bashrc`, selon votre shell.

```bash
alias sail='sh $([ -f sail ] && echo sail || echo vendor/bin/sail)'
```

Now you can use:

```bash
sail up -d
```

Cette commande récupérera toutes les images nécessaires, créera votre conteneur et le lancera en mode détaché, avec vos fichiers locaux montés de manière à ce que toute modification effectuée localement soit répercutée à l'intérieur du conteneur.

5. Générer la clé, exécuter les migrations avec les seeders et configurer Node pour le frontend.

Utilisez `sail shell` pour accéder au shell du conteneur Docker, ou utilisez `sail` pour exécuter les commandes depuis l'extérieur du conteneur (pour cette configuration, je poursuivrai les instructions à l'intérieur du shell du conteneur).

```bash
sail shell

php artisan key:generate
php artisan migrate --seed

npm i
npm run dev
```

6. Vous devriez maintenant pouvoir vous connecter au site.

- App: `http://localhost/`
- Mailpit: `http://localhost:8025/`

7. Fermer et rouvrir le projet

Vous pouvez désormais utiliser Ctrl+C pour arrêter `npm run dev`, utiliser `exit` pour quitter le shell Sail, puis exécuter `sail down` pour arrêter les conteneurs Docker en cours d'exécution.

Pour rouvrir le projet en local, il vous suffit désormais de:

```bash
sail up -d
sail shell
npm run dev
```
