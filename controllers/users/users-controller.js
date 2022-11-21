// import the array of users
import people from './users.js'
let users = people

// use express instance app to declare HTTP GET
// request pattern /api/users to call a function
const UserController = (app) => {
    app.get('/api/users', findUsers);

    // map path pattern to handler function
    app.get('/api/users/:uid', findUserById);

    app.post('/api/users', createUser); //map URL pattern to handler function

    //map URL pattern to handler function
    app.delete('/api/users/:uid', deleteUser);

    //update user
    app.put('/api/users/:uid', updateUser);
}

// Update user
const updateUser = (req, res) => { // handle PUT /api/users/:uid
    // get user ID from path
    const userId = req.params['uid']; // get user ID from path
    const updates = req.body; // BODY includes updated fields
    users = users.map((usr) => // create a new array of users
        usr._id === userId ?        // if current user's ID matches ID we want to update
            {...usr, ...updates} :  // merge old usr with new updates
            usr                     // otherwise keep the old user
    );
    res.sendStatus(200);            // return OK
}

// Delete User
const deleteUser = (req, res) => {
    //get user ID from the path parameter uid
    const userId = req.params['uid'];
    // filter out the user whose ID is the ID of the user we want to remove
    users = users.filter(usr =>
        usr._id !== userId);

    // respond with success code
    res.sendStatus(200);

}

// function invoked if url matches pattern
const createUser = (req, res) => {
    // extract new user from BODY in request
    const newUser = req.body;

    // add an _id property with unique timestamp
    newUser._id = (new Date()).getTime() + '';

    // append new user to users array
    users.push(newUser);

    // respond with new user to client
    res.json(newUser);
}

// function runs when /api/users requested
// responds with array of users
const findUsers = (req, res) => {
    // retrieve type parameter from query
    const type = req.query.type

    // Alternatively we could have used req.query['type'] since it is an equivalent syntax in JavaScript.

        // if type parameter in query
    if(type) {
        // find users of that type
        const userOfType = users
            .filter(u => u.type === type)

        // respond with users of that type
        res.json(userOfType)
        // return so it doesn't continue
        return
    }

    // otherwise respond with all users
    res.json(users)
}


// function called if URL matches pattern
const findUserById = (req, res) => {
    const userId = req.params.uid; // get uid from request parameter map
    const user = users // find user in users array whose _id
        .find(u => u._id === userId); // matches userId retrieved from params

    res.json(user); // respond to client with user found
}



// exports so app.js can import
export default UserController
