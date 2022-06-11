const axios = require('axios')
const { Service } = require('axios-middleware')


/**
 * setup and register all middleware for axios
 * 
 */
class Middleware {
    #middlewareList = []
    #service
    #axios

    _setupMiddleware(route) {
        this.#createMiddlewareInstance(route)

        this.#setupService()

        this.#registerMiddleware()
    }

    #createMiddlewareInstance(route) {
        for (let instance of route.middleware) {
            this.#middlewareList.push(new instance(route))
        }
    }

    #setupService() {
        this.#axios = axios.create()

        this.#service = new Service(this.#axios)
    }

    #registerMiddleware() {
        this.#service.register(this.#middlewareList)
    }

    #checkOnBeforeRequest() {
        for (let middleware of this.#middlewareList) {
            if (middleware.onBeforeRequest)
                if (!middleware.onBeforeRequest()) return false;
        }

        return true
    }

    _getAxios() {
        return this.#checkOnBeforeRequest() ? this.#axios : null
    }
}

module.exports = Middleware