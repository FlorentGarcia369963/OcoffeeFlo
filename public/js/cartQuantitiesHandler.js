//Fonction pour gérer la quantité et le prix des produits du panier ainsi que le total

//selection de l'ensemble des container "input + -""
const quantityContainerElement = document.querySelectorAll('.quantity-container');

//mise en place d'un counter pour suivre les id ........
let counter = 0;
let creditTotalAmount = 0;
//pour chaque container, on va  selectionner l'input de quantité, le + et le -
quantityContainerElement.forEach(container => {
    ++counter
    const quantityInputElement = container.querySelector('.quantity-input');
    const decrementButtonElement = container.querySelector('.decrementButton');
    const incrementButtonElement = container.querySelector('.incrementButton');

    //on selectionne également la cellule prix pour chaque ligne et le total/ligne
    const priceCellElement = document.querySelector(`.price-cell-${counter}`);
    const totalLineElement = document.querySelector(`.total-line-cell-${counter}`)

    //mise en place de la valeur de base dans la case total par ligne
    let value = Number(priceCellElement.textContent) * quantityInputElement.value
    totalLineElement.textContent = value.toFixed(2);


    //gestion du total de la commande
    //selection de la cellule du total de la commande
    const totalOfCart = document.querySelector('.cart-total-price');

    //selection et mise en tableau de chaque cellule de la colonne "prix selon quantité"
    const column = document.querySelectorAll('tr.cart-table-body-line td:nth-child(5)');

    // console.log('log de column');

    // let tableColumn=[]
    // column.forEach(column=>{
    //     tableColumn.length =0;
    //     tableColumn.push(Number(column.textContent))
    // })
    // console.log(tableColumn);
    // const total = tableColumn.reduce ((acc,valeur)=>acc + valeur, 0);
    // console.log('log du total');
    // console.log(total);
    let tableColumn = []
    column.forEach(column => {
        tableColumn.push(Number(column.textContent));
    })
    const total = tableColumn.reduce((acc, valeur) => acc + valeur, 0);

    totalOfCart.textContent = `${total.toFixed(2)}€`;






    //au clic sur le -, on retire 1 à la valeur de l'input
    decrementButtonElement.addEventListener('click', () => {
        console.log('decrement button clicked');

        if (quantityInputElement.value > 1) {
            const quantity = parseInt(quantityInputElement.value) - 1;

            quantityInputElement.value = quantity;

            const value = Number(priceCellElement.textContent) * quantityInputElement.value
            totalLineElement.textContent = value.toFixed(2);


        }

    })

    //au clic sur le +, on ajoute 1 à la valeur de l'input

    incrementButtonElement.addEventListener('click', () => {
        console.log('increment button clicked');
        const quantity = parseInt(quantityInputElement.value) + 1;

        quantityInputElement.value = quantity;

        const value = Number(priceCellElement.textContent) * quantityInputElement.value
        totalLineElement.textContent = value.toFixed(2);


    })

    const ButtonElements = [decrementButtonElement, incrementButtonElement]



    ButtonElements.forEach(element => {
        element.addEventListener('click', () => {

            tableColumn.length = 0;
            column.forEach(column => {
                tableColumn.push(Number(column.textContent))
            })
            console.log(tableColumn);
            const total = tableColumn.reduce((acc, valeur) => acc + valeur, 0);
            console.log('log du total');
            console.log(total);

            totalOfCart.textContent = `${total.toFixed(2)}€`;


            //fin du forEach

        })
        //fin de l'addeventlistener
    })
    //fin du forEach sur buttonElements
    //fin du for each
})








