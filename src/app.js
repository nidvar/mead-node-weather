const weather_functions = require('./grab_weather_data')

const grab_geocode = weather_functions.grab_geocode
const grab_weather = weather_functions.grab_weather

const path = require('path')
const express = require('express')

const app = express()
const public_dir_path = path.join(__dirname, '../public')

app.set('view engine', 'hbs')

app.use(express.static(public_dir_path))

app.get('', (req, res)=>{
    res.render('index',{
        title: 'Weather'
    })
})

app.get('/about', (req, res)=>{
    res.render('about',{
        title: 'The Amazing About Page'
    })
})

app.get('/weather', (req, res)=>{
    if(!req.query.address){
        res.send({
            error: 'no address provided'
        })
        return 
    }

    

    grab_geocode(req.query.address, (a)=>{
        grab_weather(a, (b)=>{
            console.log(b)
            return res.send({
                results: b
            })
        })
    })

    
})

app.get('/help/*', (req, res)=>{
    res.render('error',{
        title: 'Help Page Not Found'
    })
})

app.get('*', (req, res)=>{
    res.render('error',{
        title: 'Error Loading Page'
    })
})

app.listen(3000, ()=>{console.log('server running ---------------->')})