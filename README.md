# Installation

```
npm install simple-axios-router
```

# Usage

## Router

> **NOTE:** Do not add `/` at the end of any path, just add it at the beginning <br/> <br/>
> Do this: `/posts/:id`<br/><br/>
> Don't do this: `posts/:id/`

```
import { Router } form 'simple-axios-router'
```

```
// available methods
// get, post, put, patch, delete

Router.setBaseUrl('Your base URL')

Router.get('name', 'path').middleware([Auth, ...])
```

```
// route group
Router.group({name: 'posts.', prefix: '/posts', middleware: [Auth]}, () => {
    Router.get('index', '/')
    Router.get('show', '/:id')
    Router.post('store', '/')
    Router.put('update', '/:id')
    Router.delete('destroy', '/:id')
})
```

or

```
// resource routes
Router.resource('posts', '/prefix', [Middleware, ...])
```

## Axios

```
import { axios } form 'simple-axios-router'

axios('posts.index')
    .then((res) => console.log(res))
    .catch((err) => console.log(err))

axios(
        { name: 'posts.update', params: { id: 1 } },
        { data: [], // set other Axios options here https://github.com/axios/axios#request-config }
    )
    .then((res) => console.log(res))
    .catch((err) => console.log(err))
```

## Middleware

```
class Auth {
    // Must return true / false
    onBeforeRequest(route) {
        let {name, middleware, url, method} = route

        return true
    }

    // There are other methods you can use for the middleware, check out this link for more details https://emileber.github.io/axios-middleware/#/api/methods
}
```
