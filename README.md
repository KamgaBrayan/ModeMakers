
# API Laravel - Guide d'installation et de configuration

## Prérequis

Avant de commencer, assurez-vous d'avoir installé les outils suivants sur votre machine :
- [Docker](https://www.docker.com/products/docker-desktop)
- [Composer](https://getcomposer.org/)
- [Node.js](https://nodejs.org/)
- [PHP](https://www.php.net/)

## Étapes d'installation

### 1. Cloner le dépôt

Commencez par cloner le projet depuis le dépôt Git et switcher vers la branche backend :

```bash
git clone https://github.com/KamgaBrayan/ModeMakers.git
cd modeMakers
git checkout backend
```

### 2. Installer les dépendances PHP

Installez les dépendances PHP avec Composer :

```bash
composer install
```

### 3. Configurer le fichier `.env`

Copiez le fichier `.env.example` et renommez-le en `.env` :

```bash
cp .env.example .env
```

Ouvrez le fichier `.env` et configurez les informations suivantes :

- **Base de données** : Assurez-vous que les paramètres de connexion à la base de données sont corrects. Par exemple :
  ```env
  DB_CONNECTION=mysql
  DB_HOST=127.0.0.1
  DB_PORT=3306
  DB_DATABASE=nom_de_votre_base
  DB_USERNAME=votre_utilisateur
  DB_PASSWORD=votre_mot_de_passe
  ```
Rassurez vous que vous avez lance votre serveur de base de donnees au port 3306 sinon configurez le bon port.


- **Clé JWT** : Configurez la clé secrète pour JWT :
  ```env
  php artisan jwt:secret
  ```
  ceci generera une cle secrete a la mettra automatiquement dans la variable JWT_SECRET du fichier .env

### 4. Lancer Mailpit avec Docker

Mailpit est utilisé pour capturer et afficher les emails envoyés depuis l'application en local.

```bash
docker run -d -p 1025:1025 -p 8025:8025 axllent/mailpit
```

- Vous pouvez accéder à l'interface Mailpit en ouvrant [http://localhost:8025](http://localhost:8025) dans votre navigateur.

### 5. Générer la clé JWT

Générez la clé secrète JWT avec la commande suivante :

```bash
php artisan jwt:secret
```

Cela générera une clé secrète et la placera dans le fichier `.env` sous la variable `JWT_SECRET`.

### 6. Effectuer les migrations de la base de données

Exécutez les migrations pour créer les tables nécessaires dans la base de données :

```bash
php artisan migrate
```

### 7. Générer la documentation API avec Scribe

Scribe est utilisé pour générer automatiquement la documentation de votre API à partir des annotations dans le code.

- Générez la documentation de l'API :

```bash
php artisan scribe:generate
```

La documentation sera générée dans le dossier `public/docs`. Vous pouvez y accéder sur la route `/docs` de votre api une fois le serveur lance

### 8. Démarrer le serveur Laravel

Enfin, démarrez le serveur Laravel pour tester l'API :

```bash
php artisan serve
```

Votre API sera maintenant disponible à [http://localhost:8000](http://localhost:8000).

vous pouvez  maintenant tester l'api en vous servants des consignes de la documentation.

## Commandes utiles

- **Exécuter les migrations** : `php artisan migrate`
- **Exécuter les tests** : `php artisan test`
- **Générer la clé JWT** : `php artisan jwt:secret`
- **Générer la documentation API** : `php artisan scribe:generate`
- **Démarrer le serveur Laravel** : `php artisan serve`

## Dépannage

- Si vous avez des problèmes avec les migrations, assurez-vous que votre base de données est correctement configurée dans le fichier `.env`.
- Si vous avez des problèmes avec Mailpit, vérifiez que Docker fonctionne correctement et que les ports ne sont pas bloqués.



---

Si vous avez des questions ou des problèmes, n'hésitez pas à me contacter.
---

### Explication des étapes :
1. **Installation des dépendances** : Vous devez d'abord installer les dépendances PHP via Composer.
2. **Configuration du fichier `.env`** : Le fichier `.env` contient les configurations sensibles, comme les informations de la base de données et la clé JWT.
3. **Mailpit avec Docker** : Mailpit est utilisé pour capturer les emails envoyés localement. Il est exécuté via Docker.
4. **Génération de la clé JWT** : La clé JWT est générée pour la sécurisation des tokens d'authentification.
5. **Migrations** : Les migrations sont exécutées pour créer la structure de la base de données.
6. **Génération de la documentation API** : Scribe est utilisé pour générer la documentation de l'API automatiquement.
7. **Démarrage du serveur Laravel** : Vous lancez le serveur Laravel pour tester l'API en local.

Ce README fournit une documentation claire et logique pour que vos collaborateurs puissent configurer et utiliser votre API Laravel.