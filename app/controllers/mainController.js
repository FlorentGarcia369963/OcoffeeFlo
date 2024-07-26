const dataMapper = require('../dataMapper');
const { addToBookmark } = require('./productController');

const mainController = {

    // async homeArticles(req, res, next) {
    //     if (!res.locals.data) {
    //         res.locals.data = [];
    //     }

    //     // if(res.locals.data.length === 0){

    //     const result = await dataMapper.getThreeLastCoffees();

    //     return res.locals.data = result;
    //     // }

    // },

    async homePage(req, res, next) {
        try {
            // essai avec fonction homeArticle

            // await mainController.homeArticles(req, res, next)

            // console.log('log res.locals.data dans le homePage');
            // console.log(res.locals.data);

            // essai de base, fonctionnel
            const coffeesFound = await dataMapper.getThreeLastCoffees();

            if (!coffeesFound) {
                return
            }
            res.render('home', { coffees: coffeesFound });

            // // mise en session du coffeeFound, permet à la fonction logUser de rediriger vers la homePage
            // req.session.data.push(coffeesFound);
            // // console.log('log du req session data');
            // // console.log(req.session.data[0]);

            // res.locals.data = req.session.data[0]
            // // console.log('log du res locals data');
            // // console.log(res.locals.data);

            // res.render('home', { coffees: res.locals.data, user: res.locals.user });

        } catch (error) {
            console.error(error);
            res.status(500).send('Une erreur est survenue dans la récupération des 3 derniers cafés')
        }
    },

    shopPage(req, res, next) {
        res.render('boutique');
    },

    accountPage(req, res, next) {
        res.render('accountPage')
    },

    async bookmarkPage(req, res, next) {
        // console.log('log du bookmark dans bookmarkPage()')
        // console.log(req.session.bookmark);
        const user = res.locals.user;
        console.log('log du user dans la route bookmarkPage');
        console.log(user);
        if (!user) {
            res.render('bookmarkPage', { coffees: null })
            return
        } else {

            try {
                const bookmark = await dataMapper.getBookmark(user)
               

                res.render('bookmarkPage', { coffees: bookmark })

            } catch (error) {

                console.error(error);
                res.status(500).send('Une erreur est survenue pendant l\'opération')

            }
        }
    },

    async cartPage(req, res, next) {
        const user = res.locals.user;
        if (!user) {
// console.log('log du session cart dans fct cartPage');
// console.log(req.session.cart);

            res.render('cartPage', { coffees: req.session.cart })

        } else {

            try {
                const cart = await dataMapper.getCart(user)
                if (!cart) {
                    res.render('cartPage', {coffees : req.session.cart, user : user})
                    return
                }

                res.render('cartPage', { user: user, coffees: cart })

            } catch (error) {

                console.error(error);
                res.status(500).send('Une erreur est survenue pendant l\'opération')

            }
        }



    }



}


module.exports = mainController;