https://hapi.dev/tutorials/expresstohapi/?lang=en_US

Instead of needing to get middleware to execute in the correct order,
hapi uses plugins that can hook into various extension points in the
request lifecycle.

Lifecycle extension points:

- onRequest
- onPreAuth
- onCredentials
- onPostAuth
- onPreHandler
- onPostHandler
- onPreResponse

---

No need to import body-parser, hapi automatically puts the payload
data in `request.payload`.


