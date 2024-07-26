const dotenv = require('dotenv');
const express = require('express');

dotenv.config()
const session = require('express-session');

const dayjs = require('dayjs');

dayjs().format();

const router = require('./app/routers/router');
const { checkSessionsIsActive } = require('./app/controllers/accountController');
const mainController = require('./app/controllers/mainController');
const app = express();


app.set('view engine', 'ejs');
app.set('views', 'app/views');

app.use(session({
  resave: true,
  saveUninitialized: true,
  secret: process.env.SECRET,
  cookie: {
    secure: false,
  }
}));

app.use((req, res, next) => {

  if (!req.session.account) {
    req.session.account = [];
  }

  if (!req.session.cart) {
    req.session.cart = [];
  }

  if (!req.session.data) {
    req.session.data = [];
  }

  if (!req.session.bookmark) {
    req.session.bookmark = [];
  }



  next();

}

);

// app.use((req, res, next) => {
//   res.locals.data = [];
//   next();
// });


// app.use(mainController.homeArticles)




app.use(express.static('public'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(checkSessionsIsActive)



app.use(router);



const PORT = process.env.PORT || 3000;

app.listen(PORT), () => {
  console.log(`Le serveur est en cours sur le localhost, au port ${PORT}`);
}



