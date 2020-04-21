const request = require('request')

// // Geocoding: adress -> lat/long -> weather

// const urlGeocoding = 'http://api.mapbox.com/geocoding/v5/mapbox.places/Los%20Angeles.json?access_token=pk.eyJ1Ijoicmhhbm5hYXVsZXIiLCJhIjoiY2s5N2M5NWdyMDhkNTNrcXhzbnpzajQyZSJ9.omEkqn8Tp-COspqQbj5vTg&limit=1'

// request({url: urlGeocoding, json: true}, (error, response) => {
//     if (error){
//         console.log('Unable to connect to location services')
//     } else if (!response.body.features[0]){
//         console.log('Unable to find location')
//     } else{
//         const latitude = response.body.features[0].center[0]
//         const longitude = response.body.features[0].center[1]
//         console.log(latitude, longitude)
//     }

// })

const geoCode = (address, callback) => {
    const url = 'http://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1Ijoicmhhbm5hYXVsZXIiLCJhIjoiY2s5N2M5NWdyMDhkNTNrcXhzbnpzajQyZSJ9.omEkqn8Tp-COspqQbj5vTg&limit=1'

    request({url, json: true}, (error, response) => {

        const {body} = response

        if (error){
            callback('Unable to connect to location services', undefined)
        } else if (!body.features[0]){
            callback('Unable to find location', undefined)
        } else{
            
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}


module.exports = geoCode