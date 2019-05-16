//Requires
const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();
const port = process.env.PORT || 3000

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

//Routes
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Lucy Tiradoegas'
    });
})

app.get('/about', (req, res) => {
    res.render('about', {
        name: 'Macy Tiradoegas',
        title: 'About Me'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        name: 'Leo Tiradoegas',
        title: 'Help'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send({
            error: 'Please provide an address'
        })
    }
    
    const address = req.query.address;

    geocode(address, (error, { latitude, longitude, location } = {}) => {
        if(error) {
          return res.send({ error })
        } 
        forecast(latitude, longitude, (error, forecast) => {
          if(error) {
            return res.send({ error });
          }  
            res.send({
                forecast,
                location,
                address
            });
        })
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Maison Tiradoegas',
        error: 'Help Article not Found'
    });
})

app.get('/products', (req, res) => {
    if(!req.query.search) {
        return res.send({
            error: 'you must provide a search term'
        })
    }

    console.log(req.query.search);
    res.send({
        products: []
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404', 
        name: 'Maison Tiradoegas',
        error: 'Page not Found'
    });
})

app.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});