const dataMapper = require('../dataMapper');


const searchController = {

    async searchByCategory(req, res) {

        const categoryToFind = Number(req.body.category);
        // console.log('log du categoryToFind');
        // console.log(categoryToFind);
        // console.log(typeof categoryToFind);
try{
        const coffeeFound = await dataMapper.getCoffeeByCategory(categoryToFind);
        // console.log('log du categoryFound');
        // console.log(categoryFound);
        if (!coffeeFound) {
            return res.json({message: 'impossible d\'accéder à la catégorie'})
        }

        return res.json({coffeeFound});
    }catch (error) {
        console.error(error);
        res.status(500).send('Une erreur est survenue dans la récupération des cafés')
    }

    },

    async getAllCoffees (req, res) {
        try {

            const coffees = await dataMapper.getAllCoffees();

            if(!coffees){
                return
            }

            return res.json({coffees});
        } catch (error) {
            console.error(error);
            res.status(500).send('Une erreur est survenue dans la récupération des cafés')
        }

    }

}

module.exports = searchController;