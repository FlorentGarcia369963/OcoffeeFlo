const express = require('express');

const router = express.Router();

const mainController = require('../controllers/mainController')
const productController = require('../controllers/productController')
const catalogController = require('../controllers/catalogController');
const searchController = require('../controllers/searchController');
const dataMapper = require('../dataMapper');
const accountController = require('../controllers/accountController');


//------------------------------
//Router controller vues EJS

//acueil
router.get('/', mainController.homePage)

//catalogue
router.get('/catalogue', catalogController.catalogPage)

//boutique
router.get('/boutique', mainController.shopPage)
router.get('/pageProduit/:productId', productController.productPage)

//compte
router.get('/accountPage', mainController.accountPage)
router.post('/inscription', accountController.registerUser)

router.post('/connexion', accountController.logUser )
router.post('/deconnexion', accountController.unlogUser)

//favoris et panier
router.get('/bookmark', mainController.bookmarkPage)
router.get('/cart', mainController.cartPage)

//Ajout et retrait des favoris
// router.get('/addToBookmark/:coffeeId', productController.addToBookmark)
// router.get('/removeFromBookmark/:coffeeId', productController.removeFromBookmark)

//Ajout et retrait du panier
router.get('/addToCart/:coffeeId', productController.addToCart)
router.get('/removeFromCart/:coffeeId', productController.removeFromCart)

//----------------
//Router API


//tri par catégorie et obtention de la totalité des cafés sur la page catalogue
router.post('/api/resultByCategory', searchController.searchByCategory)
router.get('/api/getAllCoffees', searchController.getAllCoffees)

//ajout dans les favoris
router.post('/api/addToBookmark', productController.addToBookmark)
//retrait des favoris
router.delete('/api/removeFromBookmark', productController.removeFromBookmark)

//ajout au panier
router.post('/api/addToCart', productController.addToCart)
//retrait du panier
router.delete('/api/removeFromCart', productController.removeFromCart)


//-------------------------
// page 404
router.use((req,res,next) =>{
    res.status(404).render('404NotFound');
})

// router.get('/', productController.productPage)




module.exports = router;