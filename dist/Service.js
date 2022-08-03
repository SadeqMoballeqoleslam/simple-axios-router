
const Router = require('./Router.js')
const Middleware = require('./Middleware.js')

class Service extends Middleware {
    #route
    #options
    #paramKey = ':'

    constructor({ name, params = null }, options = {}) {
        super()

        this.#setRoute(name, params)

        this._setupMiddleware(this.#route)

        this.#options = options
    }

    #setRoute(name, params = nul) {
        let route = { ...Router.route(name), name }

        if (params)
            route.url = this.#setUrlParams(route.url, params)

        this.#route = route
    }

    #setUrlParams(url, params) {
        let keys = Object.keys(params)

        for (let key of keys) {
            url = url.replace(this.#paramKey + key, params[key])
        }

        return url
    }

    #sendRequest(axios) {
        const request = axios({
            method: this.#route.method,
            url: this.#route.url,
            ...this.#options
        })

        return request
    }

    getRoute() {
        return this.#route
    }

    makeRequest() {
        const axios = this._getAxios()

        return axios ? this.#sendRequest(axios) : this
    }

    then() {
        return this
    }
    catch() {
        return this
    }
}

module.exports = Service