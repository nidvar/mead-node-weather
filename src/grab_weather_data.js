const request = require('request')
const axios = require('axios')

const api_key = '499ed65bda5f1afc1a0d5a16a5a89e07';
const access_token = `pk.eyJ1IjoibmlkdmFyIiwiYSI6ImNrOWgxcW1kNjB0emQzZG52ZWhzOGdjaWsifQ.LKQrn_2T8AowFhYn22awpQ`

const grab_weather =  (coordinates, callback)=>{
    console.log('from weather', coordinates)
    const url = `http://api.weatherstack.com/current?access_key=${api_key}&query=${coordinates[1]},${coordinates[0]}&units=f`
    request({url:url, json:true},(err, {body})=>{
        if(err){
            console.log('fail -------------------->', err)
        }else{
            callback({body})
        }
    })
}

const grab_geocode =  (location, callback)=>{
    const geo_url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${location}.json?access_token=${access_token}`

    console.log('from inside ==============',location, callback)

    request({url: geo_url, json:true},(error, response)=>{
        console.log(response.body.features[0].center)
        return callback(response.body.features[0].center)
    })

}

// const grab_geocode = async (location)=>{
//     const response = await axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${location}.json?access_token=${access_token}`)

//     return response.data.features[0].center
// }

// const grab_weather = async (coordinates)=>{
//     console.log(coordinates)

//     const response = await axios.get(`http://api.weatherstack.com/current?access_key=${api_key}&query=${coordinates[1]},${coordinates[0]}&units=f`)
//     console.log(response.data)
//     return response.data
// }

module.exports={
    grab_geocode:grab_geocode,
    grab_weather:grab_weather
}