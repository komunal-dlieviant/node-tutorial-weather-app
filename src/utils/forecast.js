const request = require('request')

const forecast = function(latitude, longitude, callback) {
    const coordinate = encodeURIComponent(latitude + ',' + longitude)
    const url = 'https://api.darksky.net/forecast/f143e0ba3355197038f48640b0efcafa/'+coordinate+'?units=si'

    request({ url, json: true }, (error, {body}) => {
        if(error) {
            callback('Cannot connect to weather services!', undefined)
        } else if(body.error) {
            callback(body.code + ': ' + body.error, undefined)
        } else {
            const {temperature, precipProbability} = body.currently
            callback(undefined, body.daily.data[0].summary + ' It is currently ' + temperature + ' degrees out. The high today is ' + body.daily.data[0].temperatureMax + ' with a low of ' + body.daily.data[0].temperatureMin + '. There is a ' + precipProbability + '% chance of rain.')
        }
    })
}

module.exports = forecast