# express-generator

This is a generator for express.js applications. It generates a project that out of the box uses the ***MVC pattern with service layer***, ***dependency injection***, ***Mongoose*** and ***BSON*** for data transfer between the client and the server.

* ***Project Initiation***
To generate the project and install the dependencies run ```node ./generator/generator.js init```

* ***Running commands the after initiation*** ``` npm run generate [INSERT COMMAND HERE] ```

* ***Command list***
The list of available commands can be obtained by running the ***help*** command(``` npm run generate help```).

* ***Dependency injection*** for services
The generator provides you with the ***inject middleware***. You can inject services like so:
    ```JavaScript
        //a random controller file
        const controller = require('express').Router();
        const inject = require('./middleware/injectMiddleware');

        //All the services are injected in the request object.
        controller.use(inject([
            'someService' //this is the actual file name in the /services folder
        ]));

        //Use the injected service
        controller.post('/',(req,res)=>req.someService.someMethod());

    ```
* ***BSON***
    The use of ***BSON*** for data transfer is optional. The ***BSON*** objects are automatically parsed(see ***app.js*** file) by a middleware. The middleware expects a compressed(with ***zlib***) ***BSON*** object. You can use [pako](https://github.com/nodeca/pako) to compress the ***BSON*** objects in the browser.

* ***Templating engine, authentication and sessions***
    The generator does not provide any default templating system, authentication or session management. You are free to use whatever you like    