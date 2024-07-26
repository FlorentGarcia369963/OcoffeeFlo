const hiddenArticles = document.getElementsByClassName('card-article');
const seeAllButton = document.querySelector('.see-all-button');

// BOUTON VOIR TOUT 
if (seeAllButton !== null) {

    seeAllButton.addEventListener("click", () => {

        // for (const hiddenArticle of hiddenArticles) {

        //     hiddenArticle.classList.remove('hidden');



        // };

        fetch('api/getAllCoffees', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((response) => {
                return response.json()
            })

            .then((data) => {
                const coffees = data.coffees
                const articleContainer = document.querySelector('.article-container');
                articleContainer.textContent = '';

                coffees.forEach((coffee) => {
                    //reprise de la structure de l'article
                    //balise article et ses classes
                    const newArticle = document.createElement('article');
                    newArticle.classList.add('card-article', 'card');


                    // balise header et ses classes
                    const newHeader = document.createElement('header');
                    newHeader.classList.add('card-article-header', 'card-article-part');

                    // balise h3, ses classes et son contenu
                    const newTitle = document.createElement('h3');
                    newTitle.classList.add('card-article-title');
                    newTitle.textContent = `${coffee.name}`;

                    //insertion du h3 dans le header et du header dans l'article
                    newHeader.append(newTitle);
                    newArticle.append(newHeader);

                    //balise main et ses classes
                    const newMain = document.createElement('main');
                    newMain.classList.add('card-article-main', 'card-article-part');

                    //balise div et ses classes
                    const newDivMain = document.createElement('div');
                    newDivMain.classList.add('article-image-container');

                    //balise img
                    const newImg = document.createElement('img');
                    newImg.classList.add('card-article-main-image');
                    newImg.src = `/images/coffees/images_coffees/${coffee.name}.jpg`;
                    newImg.alt = 'Image de grains de café';

                    //mise de img dans div puis div dans main
                    newDivMain.append(newImg);
                    newMain.append(newDivMain);

                    //balises p1 à p3 du main
                    const paragraph1 = document.createElement('p');
                    paragraph1.classList.add('card-article-text-description', 'card-article-text');
                    paragraph1.textContent = `${coffee.description}`;

                    const paragraph2 = document.createElement('p');
                    paragraph2.classList.add('card-article-text-origin', 'card-article-text');
                    paragraph2.textContent = `Origine: ${coffee.origin_name}`;


                    const paragraph3 = document.createElement('p');
                    paragraph3.classList.add('card-article-text-caracteristic', 'card-article-text');
                    paragraph3.textContent = `Caractéristique principale: ${coffee.category_name}`

                    //insertion des p1 à p3 dans le main
                    newMain.append(paragraph1);
                    newMain.append(paragraph2);
                    newMain.append(paragraph3);

                    //insertion du main dans l'article
                    newArticle.append(newMain);

                    //fabrication du footer
                    const newFooter = document.createElement('footer');
                    newFooter.classList.add('card-article-footer', 'card-article-part');

                    //fabrication du like
                    // const newLike = document.createElement('a');
                    // newLike.href = `/addToBookmark/${coffee.id}`

                    const newLike = document.createElement('div')
                    newLike.classList.add('card-article-like');
                    newLike.setAttribute('id', `${coffee.id}`)

                    //fabrication de link
                    const newLink = document.createElement('a');
                    newLink.classList.add('card-article-link');
                    newLink.href = `/pageProduit/${coffee.id}`;
                    newLink.textContent = 'Découvrir';

                    //fabrication du add-to-card
                    // const newAddToCart = document.createElement('a');
                    // newAddToCart.href = `/addToCart/${coffee.id}`

                    const newAddToCart= document.createElement('div');
                    newAddToCart.classList.add('card-article-add-to-cart');
                    newAddToCart.setAttribute('id', `${coffee.id}`)

                    //insertion du like puis du lien puis du addToCart dans le footer puis du footer dans l'article
                    newFooter.append(newLike);
                    newFooter.append(newLink);
                    newFooter.append(newAddToCart);
                    newArticle.append(newFooter);

                    articleContainer.append(newArticle);

                })

                BookmarkHandler.attachListenerToLikeButtons()
                cartHandler.attachListenerToCartButtons()
            })



    })
}