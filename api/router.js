const router = express.Router()

router.use('/user', require('./routes/user.js'))

module.exports = router;
