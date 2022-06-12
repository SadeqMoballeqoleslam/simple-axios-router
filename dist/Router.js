
/**
 * Register API routes
 */
class Router {
    #routes = []
    #BASE_URL = ''

    setBaseUrl(url) {
        this.#BASE_URL = url
    }

    get(name, url) {
        this.#setNewRoute(name, url, 'get')

        return this
    }

    post(name, url) {
        this.#setNewRoute(name, url, 'post')

        return this
    }

    put(name, url) {
        this.#setNewRoute(name, url, 'put')

        return this
    }

    patch(name, url) {
        this.#setNewRoute(name, url, 'patch')

        return this
    }

    delete(name, url) {
        this.#setNewRoute(name, url, 'delete')

        return this
    }

    middleware(middleware = []) {
        let index = this.#routes.length - 1,
            route = this.#routes[index]

        if (!Array.isArray(middleware)) middleware = [middleware]

        route.middleware = route.middleware.concat(middleware)

        return this
    }

    group({ prefix = '', middleware = [], name = '' }, callback) {
        let lastRouteIndex = this.#routes.length - 1

        callback()

        this.#setRouteGroupFeatures(prefix, middleware, name, lastRouteIndex)

        return this
    }

    resource(name, prefix = '', middleware = []) {
        prefix = prefix + '/' + name

        this.group({ name, prefix, middleware }, () => {
            this.get('', '')
            this.get('.show', '/:id')
            this.post('.create', '')
            this.put('.update', '/:id')
            this.delete('.delete', '/:id')
        })

        return this
    }

    route(name) {
        return this.#routes.filter(route => route.name == name)[0]
    }

    deleteRoute(route = null) {
        this.#routes = route == null ? [] : this.#routes.filter(value => route != value)

        if (route == null) this.#BASE_URL = ''
    }

    #setNewRoute(name, url, method) {
        url = this.#BASE_URL + url

        this.#routes.push({ name, url, method, middleware: [] })
    }

    #setRouteGroupFeatures(prefix, middleware, name, lastRouteIndex) {
        this.#routes = this.#routes.map((route, index) => {

            if (index > lastRouteIndex) {
                if (!Array.isArray(middleware)) middleware = [middleware]

                route.middleware = route.middleware.concat(middleware)

                let url = route.url.replace(this.#BASE_URL, '')
                route.url = this.#BASE_URL + prefix + url

                route.name = name + route.name
            }

            return route
        })
    }
}

module.exports = new Router()