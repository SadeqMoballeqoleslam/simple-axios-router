const assert = require('assert');
const Service = require('../dist/Service')
const Router = require('../dist/Router')

describe('Service class test', () => {
    beforeEach(() => {
        Router.deleteRoute()
    })

    it('should set url params', () => {
        const id = 1
        const slug = 'title'

        Router.setBaseUrl('http://localhost:3000')

        Router.get('test', '/test/:id/:slug')

        let route = new Service({
            name: 'test',
            params: { id, slug }
        }).getRoute()

        assert.equal(route.url, `http://localhost:3000/test/${id}/${slug}`)
    })
})