# Schéma de la Base de Données

## Tables et Relations

### 1. `User`
- `id` (PK)
- `user_name`
- `role` (array)

**Relations :**
- 1:N avec `PreOrder` (un utilisateur peut avoir plusieurs précommandes)
- 1:N avec `Order` (un utilisateur peut avoir plusieurs commandes)
- 1:N avec `Review` (un utilisateur peut écrire plusieurs avis)
- 1:N avec `Notification` (un utilisateur peut recevoir plusieurs notifications)
- 1:N avec `Measurement` (un utilisateur peut enregistrer plusieurs mesures)
- N:M avec `Product` (favoris)

### 2. `Stylist`
- `id` (PK, FK vers `User`)
- `specialty`
- `photos`
- `biography`
- `calendar` (jours disponibles)
- `experience`
- `localisation`
- `phone`

**Relations :**
- 1:N avec `Product`
- 1:N avec `PreOrder`
- 1:N avec `Order`

### 3. `Product`
- `id` (PK)
- `name`
- `gender`
- `age`
- `publishedDate`
- `createdAt`
- `description`
- `category`
- `rating`
- `isAvailable`
- `images` (array)
- `stylist_id` (FK vers `Stylist`)

**Relations :**
- 1:N avec `Delivery`
- 1:N avec `Material`
- 1:N avec `Review`
- N:M avec `User` (favoris)

### 4. `Material`
- `id` (PK)
- `name`
- `type`
- `photos` (array)
- `price_per_square_meter`
- `description`
- `product_id` (FK vers `Product`)

### 5. `Delivery`
- `id` (PK)
- `day`
- `price`
- `type` (`enum(standard, advanced, express)`)
- `product_id` (FK vers `Product`)

### 6. `PreOrder`
- `id` (PK)
- `photos` (array)
- `createdAt`
- `updatedAt`
- `day`
- `workforce`
- `gender`
- `location`
- `specification`
- `status` (`enum(pending, reviewed, confirmed)`)
- `user_id` (FK vers `User`)
- `stylist_id` (FK vers `Stylist`)

**Relations :**
- 1:N avec `Material`
- 1:1 avec `Measurement`

### 7. `Measurement`
- `id` (PK)
- `title`
- `user_id` (FK vers `User`)
- Divers attributs de mesure

### 8. `Order`
- `id` (PK)
- `createdAt`
- `updatedAt`
- `user_id` (FK vers `User`)
- `stylist_id` (FK vers `Stylist`)
- `pre_order_id` (FK vers `PreOrder`)

**Relations :**
- 1:1 avec `Payment`

### 9. `Payment`
- `id` (PK)
- `paymentMethod`
- `account`
- `createdAt`
- `status` (`enum(pending, canceled, confirmed)`)
- `pre_order_id` (FK vers `PreOrder`)

### 10. `Review`
- `id` (PK)
- `rating`
- `comment`
- `date`
- `user_id` (FK vers `User`)
- `product_id` (FK vers `Product`)

### 11. `Notification`
- `id` (PK)
- `content`
- `date`
- `readed` (boolean)
- `received` (boolean)
- `user_id` (FK vers `User`)

### 12. `Preferences` (Favoris)
- `id` (PK)
- `user_id` (FK vers `User`)
- `product_id` (FK vers `Product`)

## Relations Principales
- `User` ↔ `PreOrder` (1:N)
- `User` ↔ `Order` (1:N)
- `User` ↔ `Review` (1:N)
- `User` ↔ `Notification` (1:N)
- `User` ↔ `Measurement` (1:N)
- `User` ↔ `Product` (N:M, favoris)
- `Stylist` ↔ `Product` (1:N)
- `Product` ↔ `Material` (1:N)
- `Product` ↔ `Delivery` (1:N)
- `Product` ↔ `Review` (1:N)
- `PreOrder` ↔ `Material` (1:N)
- `PreOrder` ↔ `Measurement` (1:1)
- `Order` ↔ `Payment` (1:1)

