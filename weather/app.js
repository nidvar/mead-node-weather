const request = require('request-promise-native')
const request_non_promise = require('request')

const api_key = '499ed65bda5f1afc1a0d5a16a5a89e07';
const access_token = `pk.eyJ1IjoibmlkdmFyIiwiYSI6ImNrOWgxcW1kNjB0emQzZG52ZWhzOGdjaWsifQ.LKQrn_2T8AowFhYn22awpQ`

const grab_weather = (coordinates)=>{
    coordinates.then(a=>{
        const url = `http://api.weatherstack.com/current?access_key=${api_key}&query=${a}&units=f`
        request_non_promise({url:url, json:true},(err, {body})=>{
            if(err){
                console.log('fail -------------------->', err)
            }else{
                console.log(body)
            }
        })
        
    })

}

const grab_geocode = async (location)=>{

    const geo_url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${location}.json?access_token=${access_token}`

    const result = await request({url: geo_url, json:true})



    const answer = result.features[0].center
    
    const long = answer[0]
    const lat = answer[1]

    const final = `${lat}, ${long}`


    return final
}

grab_geocode('london')

grab_weather(grab_geocode('london'))