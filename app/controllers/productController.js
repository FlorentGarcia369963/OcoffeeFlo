const dataMapper = require('../dataMapper');
const dayjs = require('dayjs');

dayjs().format();


const productController = {

    async productPage(req, res, next) {
        const productId = req.params.productId
        // console.log(productId);

        try {
            const coffeeFound = await dataMapper.getOneCoffee(productId)
            // console.log(coffeeFound);
            if (!coffeeFound) {
                return
            };
            // console.log(coffeeFound);
            const formatedDate = dayjs(coffeeFound.date_creation).format('DD-MM-YYYY');
            res.render('pageProduit', {
                coffee: coffeeFound,
                coffeeDate: formatedDate
            });


        } catch (error) {
            console.error(error);
            res.status(500).send('Une erreur est survenue dans la récupération des cafés')
        }

    },

    getCoffeeId(req) {
        return req.params.coffeeId
    },

    //add et remove via api







    async addToBookmark(req, res, next) {
        const coffeeId = req.body.coffeeId
      

        const user = res.locals.user;
       
        console.log('arrivée dans bookmark');
        if (!user) {
            console.log('Se connecter');
            res.redirect('/accountPage')
        } else {

            const bookmark = await dataMapper.getBookmark(user);

            if (bookmark.find((coffee) => coffee.item_id === coffeeId)) {

                return res.json({ message: 'problème avec l\'ajout du café à la liste des favoris' })

                

            }


            try {
                // const coffeeToAdd = await dataMapper.getOneCoffee(coffeeId);
                // if (!coffeeToAdd) {
                //     return next()
                // }

                const coffeeAdded = await dataMapper.addToBookmark(user, coffeeId);

                console.log(coffeeAdded);

                // req.session.bookmark.push(coffeeToAdd)
                // console.log('log du bookmark dans addToBookmark')
                // console.log(req.session.bookmark);
                // res.redirect('/catalogue')
                res.json({ message: 'café ajouté à la liste des favoris' })

            } catch (error) {
                console.error(error);
                res.status(500).send('Une erreur est survenue dans la récupération du cafés')
            }
        }

    },

    async removeFromBookmark(req, res, next) {
        // const coffeeId = Number(productController.getCoffeeId(req));
        const coffeeId = Number(req.body.coffeeId)
        console.log('log de l\'id dans la fonction rm');
        console.log(coffeeId);
        const user = res.locals.user;
        console.log(user);
        // console.log('coffeeId');
        // console.log(coffeeId);
        // console.log('user');
        // console.log(user);

        const bookmark = await dataMapper.getBookmark(user);
        // console.log('bookmark ')
        // console.log(bookmark);



        if (bookmark.find((coffee) => coffee.item_id === coffeeId)) {

            await dataMapper.deleteFromBookmark(user, coffeeId)

        }


        // req.session.bookmark = req.session.bookmark.filter((coffee) => coffee.id !== Number(coffeeId));
        //On refait appel au dataMapper pour actualiser la liste des favoris
        const bookmarkRefreshed = await dataMapper.getBookmark(user)


        // res.redirect('/bookmark');
        console.log(`Article ${coffeeId} retiré des favoris`);
        res.json({
            bookmark: bookmarkRefreshed, 
            message: `Article ${coffeeId} retiré des favoris` 
        })

    },




    async addToCart(req, res, next) {
        const coffeeId = req.body.coffeeId;
        // console.log('log du coffee id');
        // console.log(coffeeId);

        const user = res.locals.user;
        // console.log('log du userId');
        // console.log(user);

        if (!user) {
            const coffeeToPush = await dataMapper.getOneCoffee(coffeeId)

            req.session.cart.push(coffeeToPush)
            console.log('café ajouté dans cart session');
            
            return res.json({message : 'café ajouté au panier'})
        } else {



            try {
                // const coffeeToAdd = await dataMapper.getOneCoffee(coffeeId);
                // if (!coffeeToAdd) {
                //     return next()
                // }

                const coffeeAdded = await dataMapper.addToCart(user, coffeeId);

                console.log(coffeeAdded);

                // req.session.bookmark.push(coffeeToAdd)
                // console.log('log du bookmark dans addToBookmark')
                // console.log(req.session.bookmark);
                return res.json({message : 'café ajouté au panier'})
            } catch (error) {
                console.error(error);
                res.status(500).send('Une erreur est survenue dans la récupération du cafés')
            }
        }

    },

    async removeFromCart(req, res, next) {
        const coffeeId = Number(productController.getCoffeeId(req));
        const user = res.locals.user;

        // console.log('coffeeId');
        // console.log(coffeeId);
        // console.log('user');
        // console.log(user);
        if (!user) {
            req.session.cart = req.session.cart.filter((coffee) => coffee.id !== coffeeId)
            res.redirect('/cart')
        } else {


            const cart = await dataMapper.getCart(user);
            // console.log('bookmark ')
            // console.log(bookmark);



            if (cart.find((coffee) => coffee.id === coffeeId)) {

                await dataMapper.deleteFromCart(user, coffeeId)

            }

            res.redirect('/cart');
        }
    },








}

module.exports = productController;