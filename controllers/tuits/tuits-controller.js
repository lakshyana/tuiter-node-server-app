// // import tuits
// import posts from "./tuits.js"
// let tuits = posts;

// instead import the tuits-dao which will
// provide the functionality of interacting with the tuits collection

// import the dao: data access object
import * as tuitsDao from './tuits-dao.js'

// use express instance app to declare HTTP GET
// request pattern /api/tuits to call a function
export default (app) => {
    app.post('/api/tuits', createTuit);
    app.get('/api/tuits', findTuits);
    app.put('/api/tuits/:tid', updateTuit);
    app.delete('/api/tuits/:tid', deleteTuit);
}


const createTuit = async  (req, res) => {  // now it's an asynchronous function
    // retrieve data from HTTP body
    const newTuit = req.body;

    // add _id field as a time stamp
    // newTuit._id = (new Date()).getTime()+''; // ID created by database instead

    // initialize username
    newTuit.userName = "Nasa";

    // initialize handle
    newTuit.handle = "nasa";

    // initialize time
    newTuit.time = "2h";

    //initialize topic
    newTuit.topic = "Space";

    // initialize default image
    newTuit.image = "nasa.png";
//     newTuit.image = "https://drive.google.com/file/d/1QgK_2QlKK750XvovSjsW04j7cP1zpkJj/view?usp=sharing";

    // initialize likes counter
    newTuit.likes = 0;

    // initialize liked flag
    newTuit.liked = false;

    // initialize replies counter
    newTuit.replies = 0;

    // initialize retuits counter
    newTuit.retuits = 0;


    // append new tuit to tuits array
    // tuits.push(newTuit); // not using array anymore

    // actual tuit inserted in database
    // with DAO's createTuit
    const insertedTuit = await tuitsDao.createTuit(newTuit);


    // respond with actual inserted tuit
    res.json(insertedTuit);

    // next chapter will store in database instead
}

const findTuits = async (req, res) => { // now it's asynchronous function
    const tuits = await tuitsDao.findTuits() // retrieve tuits from database
    res.json(tuits);
}

// const findTuits = (req, res) => {
//     res.json(tuits);
// }

const deleteTuit = async (req, res) => { // now it's an asynchronous function
    // retrieve the ID of the tuit we want to remove
    const tuitdIdToDelete = req.params.tid;

    // status reports success or failure
    const status = await tuitsDao // status reports success or failure
        .deleteTuit(tuitdIdToDelete); // to delete record from database

    // no longer using array
    // // filter out the tuit from the tuits array
    // tuits = tuits.filter((t
    // ) =>
    //     t._id !== tuitdIdToDelete);

    // respond with status
    // res.sendStatus(200);
    res.json(status) // status reports success or failure
}

const updateTuit = async (req, res) => {
    // get ID of tuit to update from path
    const tuitdIdToUpdate = req.params.tid;

    // get updates from HTTP body
    const updates = req.body;

    // // find index of tuit to update
    // const tuitIndex = tuits.findIndex(
    //     (t) => t._id === tuitdIdToUpdate) // in the tuits array
    // // update the element in tuits array
    // tuits[tuitIndex] =
    //     {...tuits[tuitIndex], ...updates}; // merging/updating old tuit with updates


    // status reports success or failure
    // to update document in database
    const status = await tuitsDao
        .updateTuit(tuitdIdToUpdate,
            updates);

    // respond with success
    // res.sendStatus(200);

    // respond with status object
    res.json(status);
}

//NOTE: Once we have defined a function as an asynchronous function,
// we are able to use the await keyword. This keyword is placed before
// the calling of a promise, which will pause the execution of the function
// until the promise is either fulfilled or rejected.