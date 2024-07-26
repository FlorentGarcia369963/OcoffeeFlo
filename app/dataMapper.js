const client = require('./database');

const dataMapper = {

    async getAllCoffees() {

        const result = await client.query(
            'SELECT coffees.*, categories.name AS category_name, origins.name AS origin_name FROM coffees JOIN categories ON coffees.category_id = categories.id JOIN origins ON coffees.origin_id = origins.id;'
        );

        return result.rows;
    },

    async getThreeLastCoffees() {

        const result = await client.query(
            'SELECT coffees.*, categories.name AS category_name, origins.name AS origin_name FROM coffees JOIN categories ON coffees.category_id = categories.id JOIN origins ON coffees.origin_id = origins.id ORDER BY date_creation DESC LIMIT 3;'
        );
        // console.log(result.rows);
        return result.rows;

    },

    async getOneCoffee(coffeeId) {
        console.log(coffeeId);
        const result = await client.query({
            text: 'SELECT coffees.*, categories.name AS category_name, origins.name AS origin_name FROM coffees JOIN categories ON coffees.category_id = categories.id JOIN origins ON coffees.origin_id = origins.id WHERE coffees.id = $1;',
            values: [coffeeId]
        })
        console.log(result.rows);
        return result.rows[0]

    },

    async getCoffeeByOrigin(originId) {

        const result = await client.query({

            text: 'SELECT coffees.*, categories.name AS category_name, origins_name AS origin.name FROM coffees JOIN categories ON coffees.category_id = categories.id JOIN origins ON coffees.origin_id = origins.id WHERE origins.id = $1;',
            values: [originId]
        });

        return result.rows[0]
    },

    async getCoffeeByCategory(categoryId) {
        // console.log('log du categoryId');
        // console.log(categoryId);
        // console.log(typeof categoryId);
        const result = await client.query(
            {

                text: 'SELECT coffees.*, categories.name AS category_name, origins.name AS origin_name FROM coffees JOIN categories ON coffees.category_id = categories.id JOIN origins ON coffees.origin_id = origins.id WHERE categories.id = $1;',
                values: [categoryId]
            }
        );


        return result.rows;
    },

    // async getCoffeeByCategory(categoryName) {
    //     console.log('log du categoryName');
    //     console.log(categoryName);
    //     console.log(typeof categoryName);
    //             const result = await client.query(
    //                 'SELECT coffees.*, categories.name AS category_name, origins.name AS origin_name FROM coffees JOIN categories ON coffees.category_id = categories.id JOIN origins ON coffees.origin_id = origins.id;'

    //         );


    //             return result.rows;
    //         },



    async getAllCategories() {

        const result = await client.query(

            'SELECT * FROM categories'

        );

        return result.rows;

    },

    async registerUser(data) {
        const result = await client.query({
            text: 'INSERT INTO "user" ("firstname", "lastname", "email", "password") VALUES ($1, $2, $3, $4)',
            values: [data.firstname, data.lastname, data.email, data.password]
        })

        return `${data.firstname} ${data.lastname} a bien été inscrit.`;
    },

    async checkUserExistence(data) {
        const result = await client.query({
            text: 'SELECT * FROM "user" WHERE email = $1 AND password = $2;',
            values: [data.email, data.password]
        });

        return result.rows[0]
    },

    async addToBookmark(user, coffeeId) {
        const result = await client.query({
            text: 'INSERT INTO "bookmark" ("user_id", "item_id") VALUES ($1, $2) RETURNING *',
            values: [user.id, coffeeId]
        })

        return result.rows[0]

    },

    async deleteFromBookmark(user, coffeeId){
        console.log('log du user.id');
        console.log(user.id);
        console.log('log du coffeId');
        console.log(coffeeId);
        await client.query({

            text: `
            DELETE FROM "bookmark" 
            WHERE user_id = $1
            AND item_id = $2;
            `,
            values: [user.id, coffeeId]

        })
        
        const message = console.log('café retiré du bookmark');
        return message
    },

    async getBookmark(user) {
        const result = await client.query({
            text: `
                SELECT * 
                FROM coffees 
                JOIN bookmark ON bookmark.item_id = coffees.id
                JOIN "user" ON "user".id = bookmark.user_id
                WHERE coffees.id = bookmark.item_id
                AND bookmark.user_id = $1;
                `,
            values: [user.id]
        })

        return result.rows
    },

    async addToCart(user, coffeeId) {
        const result = await client.query({
            text: 'INSERT INTO "cart_items" ("quantity", "user_id", "item_id") VALUES (1, $1, $2) RETURNING *',
            values: [user.id, coffeeId]
        })

        return result.rows[0]

    },

    async deleteFromCart(user, coffeeId){
        console.log('log du user.id');
        console.log(user.id);
        console.log('log du coffeId');
        console.log(coffeeId);
        await client.query({

            text: `
            DELETE FROM "cart_items" 
            WHERE user_id = $1
            AND item_id = $2;
            `,
            values: [user.id, coffeeId]

        })
        
        const message = console.log('café retiré du panier');
        return message
    },

    async getCart(user) {
        const result = await client.query({
            text: `
                SELECT coffees.* 
                FROM coffees 
                JOIN cart_items ON cart_items.item_id = coffees.id
                JOIN "user" ON "user".id = cart_items.user_id
                WHERE coffees.id = cart_items.item_id
                AND cart_items.user_id = $1;
                `,
            values: [user.id]
        })

        return result.rows
    },






};

module.exports = dataMapper;