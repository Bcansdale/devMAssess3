import express from 'express';
import session from 'express-session';
import lodash from 'lodash';
import morgan from 'morgan';
import nunjucks from 'nunjucks';
import ViteExpress from 'vite-express';

const app = express();
const port = '8000';

app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));
app.use(session({ secret: 'ssshhhhh', saveUninitialized: true, resave: false }));

nunjucks.configure('views', {
  autoescape: true,
  express: app,
});

const MOST_LIKED_FOSSILS = {
  aust: {
    img: '/img/australopith.png',
    name: 'Australopithecus',
    num_likes: 584,
  },
  quetz: {
    img: '/img/quetzal_torso.png',
    name: 'Quetzal',
    num_likes: 587,
  },
  steg: {
    img: '/img/stego_skull.png',
    name: 'Stegosaurus',
    num_likes: 598,
  },
  trex: {
    img: '/img/trex_skull.png',
    name: 'Tyrannosaurus Rex',
    num_likes: 601,
  },
  ammo: {
    img: '/img/ammonite.png',
    name: 'Ammonite',
    num_likes: 1000,
  },
  mamm: {
    img: '/img/mammoth_skull.png',
    name: 'Mammoth',
    num_likes: 1000,
  },
  opth: {
    img: '/img/ophthalmo_skull.png',
    name: 'Opthalmosaurus',
    num_likes: 1000,
  },
  tric: {
    img: '/img/tricera_skull.png',
    name: 'Triceratops',
    num_likes: 1000,
  },
};

const OTHER_FOSSILS = [
  {
    img: '/img/ammonite.png',
    name: 'Ammonite',
  },
  {
    img: '/img/mammoth_skull.png',
    name: 'Mammoth',
  },
  {
    img: '/img/ophthalmo_skull.png',
    name: 'Opthalmosaurus',
  },
  {
    img: '/img/tricera_skull.png',
    name: 'Triceratops',
  },
  {
    img: '/img/trex_skull.png',
    name: 'Tyrannosaurus Rex',
  },
  {
    img: '/img/stego_skull.png',
    name: 'Stegosaurus',
  },
  {
    img: '/img/quetzal_torso.png',
    name: 'Quetzal',
  },
  {
    img: '/img/australopith.png',
    name: 'Australopithecus',
  }
];

app.get('/', (req,res) => {
  if (res.req.username) {
    res.redirect('/top-fossils')
  } else {
  res.render('homepage.html.njk');
  }
});


app.get('/get-name', (req, res) => {
  const userName = req.query.name
  req.session.username = userName;
  res.redirect('/top-fossils')
})

app.get('/top-fossils', (req, res) => {
  if (req.session.username){
    res.render('top-fossils.html.njk', { fossils: MOST_LIKED_FOSSILS, userName: req.session.username });
  } else {
    res.redirect('/')
  }
});

app.post('/like-fossil', (req, res) => {
  const fossilId = req.body.fossilId;
  if (fossilId) {
    const fossil = MOST_LIKED_FOSSILS[fossilId];
    if (fossil) {
      fossil.num_likes++;
      res.render('thank-you.html.njk', {userName: req.session.username});
    }
  }
});


app.get('/random-fossil.json', (req, res) => {
  const randomFossil = lodash.sample(OTHER_FOSSILS);
  res.json(randomFossil);
});

ViteExpress.listen(app, port, () => {
  console.log(`Server running on http://localhost:${port}...`);
});



// To kill an open server
// sudo lsof -i :8000
// kill -9 <PID>
