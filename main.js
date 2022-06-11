const Router = require('./dist/Router.js')
const Service = require('./dist/Service.js')

const axios = (route, options = {}) => {
    if (typeof route === 'string')
        route = { name: route, params: null }

    let service = new Service(route, options)

    return service.makeRequest()
}

module.exports = {
    Router,
    axios
}