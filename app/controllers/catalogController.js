const dataMapper = require('../dataMapper');
const searchController = require('./searchController')

const catalogController = {
async catalogPage (req, res, next) {
// const categoryFound = searchController.searchCategory()
// console.log(categoryFound);
   try {
    
       const coffeesFound = await dataMapper.getAllCoffees();
   if(!coffeesFound){
    return 

}

const categoriesFound = await dataMapper.getAllCategories();
if(!categoriesFound){
    return 

}

       res.render('catalogue', {coffees : coffeesFound, categories : categoriesFound});

   } catch (error) {
    console.error(error);
    res.status(500).send('Une erreur est survenue dans la récupération des 3 derniers cafés')
   }

},



};

module.exports = catalogController;