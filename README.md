# simple-axios-router

Manage API paths in the front-end

# Installation

```
npm i simple-axios-router
```

# Usage

First of all, you need to set your API paths in your `main.js` file

## Example

To register routes, you must import the `Router` class

```
import { Router } form 'simple-axios-router'
```

Optionally, you can set the base URL

```
Router.setBaseUrl('https://example/api') // optional
```

Register your routes

```
Router.get('posts', '/posts')
```

You may submit an ajax request based on the route name

```
import { axios } form 'simple-axios-router'

axios('posts')
    .then((res) => console.log(res))
    .catch((err) => console.log(err))
```

## Router

All methods in the `Router` class

```
Router.get('name', 'path') // get request
Router.post('name', 'path') // post request
Router.put('name', 'path') // put request
Router.patch('name', 'path') // patch request
Router.delete('name', 'path') // delete request
```

You may use the `middleware` method to set middleware for the route

```
import Auth form './middleware/Auth'

Router.get('profile', '/profile').middleware([Auth, ...])
```

You may set any parameter in the URL by using `:key`

```
Router.get('posts', '/posts/:slug/:id')
```

now you must call axios like this

```
axios({name: 'posts', params: { slug: 'example-title', id: 1 } })

// URL => '/posts/example-title/1'
```

> **NOTE:** Do not add `/` at the end of any path, just add it at the beginning <br/>
> Do this: `/posts/:id`<br/>
> Don't do this: `posts/:id/`

also, you may use the `group` method to create a route group

```
Router.group({name: 'posts', prefix: '/posts', middleware: [Auth, ...]}, () => {
    Router.get('', '/').middleware([Example, ...]) // name: 'posts', url: '/posts/'
    Router.get('.show', '/:id') // name: 'posts.show', url: '/posts/:id'
    Router.post('.create', '/') // name: 'posts.create', url: '/posts/'
    Router.put('.update', '/:id') // name: 'posts.update', url: '/posts/:id'
    Router.delete('.delete', '/:id') // name: 'posts.delete', url: '/posts/:id'
})
```

or you may use the `resource` method to create resource routes

```
Router.resource('posts', '/prefix', [Middleware, ...])
```

the `resource` method creates 5 routes

1. name: `posts` , url: `/prefix/posts/` , method: `get`
2. name: `posts.show` , url: `/prefix/posts/:id` , method: `get`
3. name: `posts.create` , url: `/prefix/posts/` , method: `post`
4. name: `posts.update` , url: `/prefix/posts/:id` , method: `put`
5. name: `posts.delete` , url: `/prefix/posts/:id` , method: `delete`

> **NOTE:** Do not set prefixes such as `/`, `posts/`

#### Other methods:
**Router.route(name)**: get a route data <br/>
**Router.deleteRoute()**: delete all routes

## Axios

After registering all routes, you can use the axios helper function to send an ajax request

```
import { axios } form 'simple-axios-router'

axios('route name', { data: [] })
    .then((res) => console.log(res))
    .catch((err) => console.log(err))
```

When your route doesn't require any parameters or data

```
axios('posts.index')
```

When your route requires some parameters and data

```
axios(
    { name: 'posts.update', params: { id: 1 } },
    { data: [] }
)
```

Sometimes you may need to set query params or other axios configs

```
axios(
    'post.update',
    {
        data: [],
        params: {search: 'key'} // query params
        onUploadProgress: () => {},
        onDownloadProgress: () => {},
        ...
        // add other axios configs
        // https://github.com/axios/axios#request-config
    }
)
```

## Middleware

For middleware, I use [axios-middleware](https://emileber.github.io/axios-middleware/#/) as a dependency </br></br>
But there are 2 changes: </br> -`onBeforeRequest` method to approve the request <br>
-Access Route data in the `constructor` method

```
export default class Auth {
    constructor(route) {
        this.route = route
    }

    // Must return true / false
    onBeforeRequest() {
        let { name, middleware, url, method } = this.route

        return true
    }

    // check out this link for more methods
    // https://emileber.github.io/axios-middleware/#/api/methods
}

```

```
import Auth form './Auth'

Router.get('profile', '/profile').middleware([Auth, ...])
```
