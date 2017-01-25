const router = express.Router()
const config = require('./config')

// Mongo Database Client
MongoClient = require("mongodb").MongoClient;

MongoClient.connect(config.database.url, function(err, db) {
    if (err) {
        console.log('err', err);
        return
    }

    console.log("Connected correctly to server")

    let tutoriel_collection = db.collection('personnages');
    tutoriel_collection.find().toArray(function(err, docs) {
        console.log(err || docs);
        db.close();
    });
});


router.use('/user', require('./routes/user.js'))

module.exports = router;
