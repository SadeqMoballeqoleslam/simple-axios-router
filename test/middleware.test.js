const assert = require('assert');
const Service = require('../dist/Service');
const { Router, axios } = require('../main')

class ValidMiddleware {
    onBeforeRequest() {
        return true
    }
}

class InValidMiddleware {
    onBeforeRequest() {
        return false
    }
}

class FilterResponse {
    onResponse(response) {
        return JSON.parse(response.data);
    }
}

describe('Middleware class test', () => {
    beforeEach(() => {
        Router.deleteRoute()
    })

    describe('onBeforeRequest method test', () => {
        it('should not create an axios request', (done) => {
            Router.get('inValid', '/test').middleware([InValidMiddleware])

            let response = axios('inValid')
                .then((res) => done(res))
                .catch((error) => done(error))

            assert.ok(response instanceof Service)
            done()
        })

        it('should create an axios request', (done) => {
            Router
                .get('valid', 'http://google.com/')
                .middleware([ValidMiddleware])

            let response = axios('valid')
                .then((res) => done())
                .catch((err) => done())

            assert.ok(response instanceof Promise)
        })
    })

    describe('axios-middleware package test', () => {
        it('should filter response', (done) => {
            Router
                .get('tourist', 'http://restapi.adequateshop.com/api/Tourist?page=1')
                .middleware([FilterResponse])

            axios('tourist')
                .then((response) => {
                    assert.equal(response.status, undefined)
                    done()
                })
                .catch((err) => done(err))
        })
    })
})