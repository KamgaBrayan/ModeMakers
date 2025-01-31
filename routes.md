# Routes de l'Application

## **Product Routes**
### Base Routes
- `GET /product` - Récupérer tous les produits
- `POST /product` - Créer un produit
- `PUT /product/{id}` - Mettre à jour un produit
- `GET /product/{id}` - Récupérer un produit par ID
- `DELETE /product/{id}` - Supprimer un produit
- `GET /stylists/{id}/products` - Récupérer les produits par ID du styliste

## **Pre-order Routes**
### Base Routes
- `GET /precommande/user/{id}` - Récupérer les précommandes par ID utilisateur
- `GET /precommande/stylist/{id}` - Récupérer les précommandes par ID styliste
- `POST /precommande` - Créer une précommande
- `GET /precommande/{id}` - Récupérer une précommande par ID
- `PATCH /precommande/{id}` - Mettre à jour une précommande
- `DELETE /precommande/{id}` - Supprimer une précommande

## **Order Routes**
### Base Routes
- `GET /command/user/{id}` - Récupérer les commandes par ID utilisateur
- `GET /command/stylist/{id}` - Récupérer les commandes par ID styliste
- `POST /command` - Créer une commande
- `GET /command/{id}` - Récupérer une commande par ID
- `GET /command/{id}/print` - Imprimer une commande

## **Stylist Routes**
### Base Routes
- `GET /stylists` - Récupérer tous les stylistes
- `GET /stylist/{id}` - Récupérer un styliste par ID
- `PUT /stylist/{id}` - Mettre à jour un styliste
- `POST /stylist` - Créer un styliste

## **Material Routes**
### Base Routes
- `GET /materials` - Récupérer tous les matériaux
- `GET /material/{id}` - Récupérer un matériau par ID
- `PUT /material/{id}` - Mettre à jour un matériau
- `DELETE /material/{id}` - Supprimer un matériau

## **Review Routes**
### Base Routes
- `GET /product/{id}/reviews` - Récupérer les avis par ID produit
- `POST /review` - Créer un avis

## **Notification Routes**
### Base Routes
- `GET /user/{id}/notifications` - Récupérer les notifications par ID utilisateur
- `DELETE /notification/{id}` - Supprimer une notification
- `POST /notification` - Créer une notification
- `GET /notification/{id}` - Récupérer une notification par ID

## **Measurement Routes**
### Base Routes
- `GET /user/{id}/measures` - Récupérer les mesures par ID utilisateur
- `DELETE /measure/{id}` - Supprimer une mesure
- `POST /measure` - Créer une mesure
- `GET /measure/{id}` - Récupérer une mesure par ID
- `PUT /measure/{id}` - Mettre à jour une mesure

## **Preferences (Favorites) Routes**
### Base Routes
- `POST /product/{id}/favorite` - Ajouter un produit aux favoris
- `DELETE /product/{id}/favorite` - Supprimer un produit des favoris
- `GET /user/{id}/favorites` - Récupérer les produits favoris d’un utilisateur

## **Payment Routes**
### Base Routes
- `POST /api/payments/create-intent` - Créer une intention de paiement
- `POST /api/payments/confirm` - Confirmer un paiement
- `POST /api/payments/cancel` - Annuler un paiement
- `POST /api/payments/webhook` - Webhook Stripe pour les événements de paiement
- `GET /api/payments/{paymentId}` - Récupérer le statut d’un paiement
- `GET /api/payments` - Lister les paiements d’un utilisateur

