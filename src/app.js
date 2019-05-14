const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

//setup static directory
app.use(express.static(path.join(__dirname, '../public')))

//setup handlebar engine and views directory
app.set('views', path.join(__dirname, '../templates/views'))
app.set('view engine', 'hbs')
hbs.registerPartials(path.join(__dirname, '../templates/partials'))

app.get('/', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'NAME'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'NAME'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'NAME',
        msg: 'Google it'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address) {
        res.send({error:'You must provide an address.'})
    } else {
        geocode(req.query.address, (error, {latitude, longitude, location}={}) => {
            if(error) {
                res.send({error})
            } else {
                forecast(latitude, longitude, (error, forecastData) => {
                    if(error) {
                        res.send({error})
                    } else {
                        res.send({
                            location: location,
                            forecast: forecastData,
                            address: req.query.address
                        })
                    }
                })
            }
        })
    }
})

app.get('/products', (req, res) => {
    if(!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }
    
    console.log(req.query)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'NAME',
        errMsg: 'Help article not found.'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'NAME',
        errMsg: 'Page not found.'
    })
})

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})