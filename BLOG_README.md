# Blog Kapsul - Guide d'utilisation

## 📝 Vue d'ensemble

Le blog Kapsul ("Journal") est une plateforme de publication d'articles avec trois catégories principales :
- **Guides & itinéraires** : Articles sur les lieux à visiter
- **Creator Academy** : Conseils pour créer du contenu
- **Actualités** : Nouvelles et annonces

## 🌐 Pages publiques

### Page d'accueil du blog
- **URL** : `/journal` (accessible depuis le lien "Journal" dans la navbar)
- **Fonctionnalités** :
  - Affichage de tous les articles publiés
  - Filtrage par catégorie
  - Aperçu des articles avec titre, extrait, auteur et date

### Page d'article
- **URL** : `/journal/:id`
- **Fonctionnalités** :
  - Affichage complet de l'article
  - Métadonnées (catégorie, date, auteur)
  - Lien de retour au journal

## 🔐 Espace administration

### Connexion
- **URL** : `/admin/login` (accessible via le lien "Admin" dans le footer)
- **Identifiants par défaut** :
  - Email : `admin@kapsul.com`
  - Mot de passe : `password123`

### Tableau de bord
- **URL** : `/admin/articles`
- **Fonctionnalités** :
  - Liste de tous les articles (publiés et brouillons)
  - Création de nouveaux articles
  - Modification d'articles existants
  - Suppression d'articles
  - Aperçu du statut de publication

### Gestion des articles

#### Créer un article
1. Cliquez sur "Nouvel article"
2. Remplissez le formulaire :
   - Titre (obligatoire)
   - Catégorie (obligatoire)
   - Contenu (obligatoire)
   - Cochez "Publier l'article" pour publier immédiatement
3. Cliquez sur "Enregistrer"

#### Modifier un article
1. Dans le tableau de bord, cliquez sur "Modifier" pour l'article souhaité
2. Modifiez les champs nécessaires
3. Cliquez sur "Enregistrer"

#### Supprimer un article
1. Dans le tableau de bord, cliquez sur "Supprimer"
2. Confirmez la suppression

## 🛠️ Commandes techniques

### Créer un compte admin
```bash
bin/rails admin:create
# Ou avec des identifiants personnalisés :
EMAIL=votre@email.com PASSWORD=votremotdepasse bin/rails admin:create
```

### Lister les admins
```bash
bin/rails admin:list
```

### Créer des articles de test
```bash
bin/rails db:seed
```

## 📂 Structure des fichiers

### Modèles
- `app/models/article.rb` : Modèle Article avec validations
- `app/models/admin.rb` : Modèle Admin avec authentification

### Contrôleurs
- `app/controllers/blog_controller.rb` : Contrôleur public du blog
- `app/controllers/admin/articles_controller.rb` : Gestion des articles (admin)
- `app/controllers/admin/sessions_controller.rb` : Authentification admin
- `app/controllers/concerns/admin_authentication.rb` : Concern pour l'authentification

### Vues
- `app/views/blog/` : Vues publiques du blog
- `app/views/admin/articles/` : Vues de gestion des articles
- `app/views/admin/sessions/` : Vues d'authentification

### Styles
- `app/assets/stylesheets/blog.css` : Styles du blog public
- `app/assets/stylesheets/admin.css` : Styles de l'espace admin

## 🎨 Catégories d'articles

Les catégories sont définies dans `app/models/article.rb` :
- Guides & itinéraires
- Creator Academy
- Actualités

Pour ajouter une catégorie, modifiez la constante `CATEGORIES` dans le modèle Article.

## 🔒 Sécurité

- Les mots de passe sont chiffrés avec bcrypt
- L'accès à l'espace admin nécessite une authentification
- Les sessions sont gérées de manière sécurisée par Rails

## 📱 Responsive

Le blog et l'espace admin sont entièrement responsive et s'adaptent aux mobiles et tablettes.
