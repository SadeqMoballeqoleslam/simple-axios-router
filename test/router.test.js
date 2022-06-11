const assert = require('assert');
const Router = require('../dist/Router')

describe('Router class test', () => {
    ['get', 'post', 'put', 'patch', 'delete'].forEach(method => {
        describe(method + ' method', () => {
            beforeEach(() => {
                Router.deleteRoute()
            })

            it(`should create a ${method} route with middleware`, () => {
                let route = {
                    name: `test.${method}.route`,
                    url: '/test'
                }

                Router[method](route.name, route.url).middleware(['test middleware'])

                assert.deepEqual(Router.route(route.name), { ...route, method, middleware: ['test middleware'] })
            })
        })
    });

    describe('group method', () => {
        beforeEach(() => {
            Router.deleteRoute()
        })

        it(`should create a multiple routes with middleware`, () => {
            let group = { name: 'group.', prefix: '/group-test', middleware: ['group-middleware'] },
                get = { name: 'test.group.get', url: '/test/get', method: 'get', middleware: ['get-middleware'] },
                post = { name: 'test.group.post', url: '/test/post', method: 'post', middleware: ['post-middleware'] }

            Router.group(group, () => {
                Router.get(get.name, get.url).middleware(get.middleware)
                Router.post(post.name, post.url).middleware(post.middleware)
            })

            assert.deepEqual(Router.route(group.name + get.name), {
                ...get,
                name: group.name + get.name,
                url: group.prefix + get.url,
                middleware: get.middleware.concat(group.middleware)
            })
            assert.deepEqual(Router.route(group.name + post.name), {
                ...post,
                name: group.name + post.name,
                url: group.prefix + post.url,
                middleware: post.middleware.concat(group.middleware)
            })
        })
    })

    describe('resource method', () => {
        beforeEach(() => {
            Router.deleteRoute()
        })

        it(`should create resource routes`, () => {
            Router.resource('posts')

            assert.deepEqual(Router.route('posts'), { method: 'get', url: '/posts', name: 'posts', middleware: [] })
            assert.deepEqual(Router.route('posts.show'), { method: 'get', url: '/posts/:id', name: 'posts.show', middleware: [] })
            assert.deepEqual(Router.route('posts.create'), { method: 'post', url: '/posts', name: 'posts.create', middleware: [] })
            assert.deepEqual(Router.route('posts.update'), { method: 'put', url: '/posts/:id', name: 'posts.update', middleware: [] })
            assert.deepEqual(Router.route('posts.delete'), { method: 'delete', url: '/posts/:id', name: 'posts.delete', middleware: [] })
        })
    })
})