const path = require('path')
const express = require('express')
const hbs = require('hbs')

const geoCode = require('./utils/geocode')
const forecast = require('./utils/forecast')

console.log(__dirname)
//console.log(__filename)
console.log(path.join(__dirname, '../public')) //will return the file path

const app = express()
const port = process.env.PORT || 3000 //for heroku

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs') //hbs module to use handlebar with express
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Rhanna'
    })  //render our views
})

app.get('/about', (req,res) => {
    res.render('about', {
        title: 'about',
        name: 'Rhanna'
    })
} )

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'help',
        name: 'Rhanna',
        contact: 'rhanna@gmail.com'
    })
} )

app.get('/weather', (req, res) => {
    if (!req.query.address){
        res.send({
            error: "You must to provide an address"
        })
    } else {

        geoCode(req.query.address, (error, {latitude, longitude, location} = {}) => {
            if (error) {
                return res.send({ error })
            }
    
            forecast(latitude, longitude, (error, forecastData) => {
                if (error) {
                    return res.send({ error })
                }
        
                res.send({
                    address: req.query.address,
                    location,
                    forecast: forecastData
                })
              })
        })


    }

})

app.get('/products', (req,res) => {
    if (!req.query.search) {
        return res.send({
            error: "You must provide a search term"
        })
    }

    console.log(req.query.search)
    
    res.send({
        products: []
    })
})

app.get('/help/*', (req,res) => {
    res.render('error', {
        title: '404 page',
        name: 'Rhanna',
        message: 'Help article not found'
    })
})

app.get('*', (req, res) => { //match everything we didn't match before to see error page
    res.render('error', {
        title: '404 page',
        message: 'Page not found',
        name: 'Rhanna'
    })
})

// start the server up

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})




// app.com, app.com/help, app.com/about

// server send a response when some tries to get the resources

// app.get('', (req, res) => {
//     res.send('Hello express!')
// })


// app.get('/help', (req, res) => {
//     res.send([{
//         name: 'Rhanna',
//         age: 22
//     }, {
//         name: 'Mariah'
//     }])
// })

// app.get('/about', (req, res) => {
//     res.send('<h1>About</h1>')
// })
