const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=585b3bf9ebeb018af8b17413a0f77beb&query=' + latitude + ',' + longitude + '&units=m'
    
     request({ url, json: true}, (error, { body }) => {

        if (error) {
            callback('Unable to connect', undefined)
        } else if (body.error){
            callback('Unable to find location', undefined)
        } else {
            callback( undefined, body.current.weather_descriptions[0] + ". It is currently " + body.current.temperature + " degrees, but it feels like " + body.current.feelslike
            )
        }
    })
}

module.exports = forecast

// const url = 'http://api.weatherstack.com/current?access_key=585b3bf9ebeb018af8b17413a0f77beb&query=37.8267,-122.4233&units=m'

// request({ url: url, json: true}, (error, response) => {
//     if (error) {
//         console.log('Unable to connect')
//     } else if (response.body.error){
//         console.log('Unable to find location')
//     } else {
//         console.log(response.body.current.weather_descriptions[0] + ". It is currently " + response.body.current.temperature + " degrees, but it feels like " + response.body.current.feelslike)
//     }
    
// })