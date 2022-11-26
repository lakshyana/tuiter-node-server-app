// Create mongoose schema

// load the mongoose library
import mongoose from 'mongoose';
// create the schema
const schema = mongoose.Schema({
    tuit: String, // tuit property of type String
    likes: Number, // likes property of type Number
    liked: Boolean, // liked property of type Boolean
    }, {collection: 'tuits'});// collection name where tuits are stored in tuiter database
export default schema; // export schema so it can be used elsewhere
