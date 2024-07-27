# O'Coffee

## Bienvenue sur le projet O'Coffee

Nous sommes dans la 16ème semaine de formation chez O'Clock lorsque je publie ce projet qui a été réalisé la 9ème semaine, après 2 mois d'apprentissage. Il résume les connaissances acquises jusqu'alors. Réalisé en HTML, CSS, JS, Node.js, SQL, il est responsive et respecte l'architeture MVC:

- Un data mapper gère l'interaction avec la base de données,
- Les vues sont produites avec le moteur de template EJS qui permet d'incorporer du JS dans les fichiers HTML pour rendre les données dynamiquement.
- Les contrôleurs permettent d'intéragir avec le data mapper en vue de manipuler les données, ou renvoyer les résultats à la vue.

Quelques fetch permettent de gérer l'affichage des cafés et le tri par catégorie de la page catalogue dynamique et sans rechargement de page. Le cours a eu lieu 4 semaines plus tard. De la même manière l'ajout aux favoris et au panier se fait sans rechargement de la page.

J'ai continué ce projet quelques jours après, mais de manière à ne pas prendre trop de retard sur les nouvelles notions, je n'ai pas géré toutes les fonctionnalités que j'aurais voulu, notamment l'apparition de notifications en cas de connexion/déconnexion, ajout ou retrait des favoris ou du panier. 

## Quelques critiques

- Le design est gros et il serait bon de le réduire.
- Il faut ajouter des notifications comme énoncé précédemment pour l'expérience utilisateur.
- On peut largement améliorer l'organisation des contrôlleurs et du JS front.
- Il est nécessaire de découper le CSS en plusieurs fichier. Le SCSS me parait plus que bienvenu de manière à factoriser mes éléments et pouvoir appliquer totalement le BEM avec tous ses intérêts.
