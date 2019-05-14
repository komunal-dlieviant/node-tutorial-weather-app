const request = require('request')

const geocode = function(address, callback) {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1IjoidHJpYWwxdyIsImEiOiJjanZld3p5cWQybzQwNDNudHk5YndsYTJtIn0.DBbe7L9VdssQ4k1j61H7nA&limit=1'

    request({ url, json: true }, (error, {body}) => {
        if(error) {
            callback('Cannot connect to location service!', undefined)
        } else if(body.features.length === 0) {
            callback('Cannot find location!', undefined)
        } else {
            const{center, place_name: location} = body.features[0]
            callback(undefined, {
                latitude: center[1],
                longitude: center[0],
                location
            })
        }
    })
}

module.exports = geocode