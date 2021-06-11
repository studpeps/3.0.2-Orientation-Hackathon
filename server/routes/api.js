const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')
const questionController = require('../controllers/questionController')
const auth = require('../middlewares/auth')

const { catchErrors } = require('../handlers/errorHandler')

// router.get('/test', catchErrors( (req, res)=> {
//     res.send('okay')
// }))

router.post('/register', catchErrors(userController.register))
router.post('/login', catchErrors(userController.login))

router.get('/checkauth', auth,  (req, res) => {
    res.json({
        status: 'ok',
        message: "Authenticated."
    })
})
router.get('/logout', catchErrors(userController.logout))

// Question
router.get("/question",  catchErrors(questionController.getQuestions));
router.post("/question",  catchErrors(questionController.addQuestion));



router.post('/checkauth2', async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*')

        const token = req.body.token
        console.log(token)
        if (!token) {
            res.json({
            status: 'not ok',
            message: "UnAuthenticated"
            })
        }
        else{
            const payload = await jwt.verify(token, process.env.JWT_SECRET);
            console.log(payload)
           if (payload){
            res.json({
                status: 'ok',
                message: "Authenticated"
            })
            }
            else{
                res.json({
                    status: 'not ok',
                    message: "UnAuthenticated"
                })
            }
        }
    
})


module.exports = router;