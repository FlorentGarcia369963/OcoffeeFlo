const dataMapper = require('../dataMapper');
const mainController = require('../controllers/mainController')


const accountController = {

    async registerUser(req, res, next) {
        const data = req.body;

        console.log('log du data');
        console.log(data);
        
        try {
            
            
            const alreadyRegistered = await dataMapper.checkUserExistence(data);
    
            if (alreadyRegistered) {
                console.log('Vous êtes déjà inscrit !');
    
                res.redirect('/accountPage');
    
            }else{
    
    
                const register = await dataMapper.registerUser(data)
        
                console.log('log du register');
                console.log(register);
        
                res.redirect('/accountPage');
            }
        } catch (error) {
            console.error(error);
    res.status(500).send('Une erreur est survenue pendant l\'opération')
        }



    },

    async logUser(req, res, next) {
        const data = req.body
       
        try {
           

            
            const userExist = await dataMapper.checkUserExistence(data)
            
            if (!userExist) {
                
                res.redirect('/accountPage');
            } else {
                console.log('connexion OK');
                
                req.session.account.push(userExist)
               
                res.locals.user = req.session.account[0]
               

                res.redirect('/');
                

                
            }
            
        } catch (error) {
            console.error(error);
    res.status(500).send('Une erreur est survenue pendant l\'opération')
        }


    },

    checkSessionsIsActive (req,res,next){
        if(req.session.account.length !== 0){
        res.locals.user = req.session.account[0];
        }else{ res.locals.user = null}
        // cette fonction étant utilisée en middleware, le next est essentiel
        return next()
    },

    unlogUser (req, res, next){
        if(req.session.account.length!==0){
            req.session.destroy(
                (err) => {
                        if (err) {
                            return res.status(500).send('Error occurred during logout.');
                        }}
            )
        }
        res.redirect('/')
    }



    

            


        


};

module.exports = accountController;