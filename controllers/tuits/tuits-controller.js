// import tuits
import posts from "./tuits.js"

let tuits = posts;

// use express instance app to declare HTTP GET
// request pattern /api/tuits to call a function
export default (app) => {
    app.post('/api/tuits', createTuit);
    app.get('/api/tuits', findTuits);
    app.put('/api/tuits/:tid', updateTuit);
    app.delete('/api/tuits/:tid', deleteTuit);
}


const createTuit = (req, res) => {
    // retrieve data from HTTP body
    const newTuit = req.body;

    // add _id field as a time stamp
    newTuit._id = (new Date()).getTime()+'';
    
    // initialize username
    newTuit.userName = "Nasa";
    
    // initialize handle
    newTuit.handle = "nasa";
    
    // initialize default image
    newTuit.image = "nasa.png";

    // initialize likes counter
    newTuit.likes = 0;

    // initialize liked flag
    newTuit.liked = false;
    
    // initialize replies counter
    newTuit.replies = 0;
    
    // initialize retuits counter
    newTuit.retuits = 0;
    

    // append new tuit to tuits array
    tuits.push(newTuit);

    // respond with new tuit
    res.json(newTuit);

    // next chapter will store in database instead
}

const findTuits = (req, res) => {
    res.json(tuits);
}

const deleteTuit = (req, res) => {
    // retrieve the ID of the tuit we want to remove
    const tuitdIdToDelete = req.params.tid;

    // filter out the tuit from the tuits array
    tuits = tuits.filter((t
    ) =>
        t._id !== tuitdIdToDelete);

    // respond with success
    res.sendStatus(200);
    // res.json(tuits)
}

const updateTuit = (req, res) => {
    // get ID of tuit to update from path
    const tuitdIdToUpdate = req.params.tid;

    // get updates from HTTP body
    const updates = req.body;

    // find index of tuit to update
    const tuitIndex = tuits.findIndex(
        (t) => t._id === tuitdIdToUpdate) // in the tuits array

    // update the element in tuits array
    tuits[tuitIndex] =
        {...tuits[tuitIndex], ...updates}; // merging/updating old tuit with updates

    // respond with success
    res.sendStatus(200);
}

