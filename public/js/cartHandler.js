
//Ajout dans lepanier

const cartHandler = {

    attachListenerToCartButtons(){
        const allCartButtons = document.querySelectorAll('.card-article-add-to-cart');
console.log(allCartButtons);
        if(allCartButtons !== null){
        
        allCartButtons.forEach(cartButton =>{
        cartButton.addEventListener('click', cartHandler.addToCart )})

    }


},

addToCart(event){
console.log(event);
console.log(Number(event.target.id));
    const coffeeId = Number(event.target.id)

    if(!coffeeId){
        return 
    }


    fetch('api/addToCart',{
        method:'POST',
        headers:{
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({coffeeId : coffeeId})
    })
    .then((response)=>{
        return response.json()
    })
    .then(data=>{
        console.log('front: ajout au panier ok');
        console.log(data);
        
    })






    //fin de addToCart
},

// removeUpdateList(event){
//     console.log(Number(event.target.id));
    
//     const coffeeId = Number(event.target.id)
//     if(!coffeeId){
//         return
//     }
    
//     fetch('api/removeFromBookmark',{
//         method: 'DELETE',
//         headers:{
//             'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({coffeeId: coffeeId})
    
//     })
//     .then((response)=>{
//         return response.json()
//     })
//     .then(data=>{
//         console.log('delete ok');
//         console.log(data);
    
//     const coffees = data.bookmark;
// if(coffees.length === 0){
//     console.log('La liste est vide');
//     // return res.json({message: 'Votre liste de favoris est vide.'})
// }




};






//retrait des favoris
//attacher l'écouteur
//supprimer l'élément de la liste et updater
//attacher l'écouteur aux nouveaux éléments



//on attache l'addEventListener



// console.log(unlikeButtons);
// console.log(unlikeButtons.length);



//on démarre les fonctions d'attachement au démarrage de la page

document.addEventListener('DOMContentLoaded', ()=>cartHandler.attachListenerToCartButtons())



