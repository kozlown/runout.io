const router = express.Router()
const config = require('./config')

graphql = require ('graphql');
graphQLHTTP = require('express-graphql')

// Mongo Database Client
// MongoClient = require("mongodb").MongoClient;
//
// MongoClient.connect(config.database.url, function(err, db) {
//     if (err) {
//         console.log('err', err);
//         return
//     }
//
//     console.log("Connected correctly to server")
//
//     let tutoriel_collection = db.collection('personnages');
//     tutoriel_collection.find().toArray(function(err, docs) {
//         console.log(err || docs);
//         db.close();
//     });
// });

var Schema = require('./graphql/schemas/schema')

router.use('/', graphQLHTTP({
    schema: Schema,
    pretty: true,
    graphiql: true
}))

module.exports = router;
