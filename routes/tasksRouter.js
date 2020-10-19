const router = require('express').Router()
const tasksController = require("../controllers/tasksController");
router.use((req, res, next) => {
    console.log("@ TasksAPI Called: ", new Date().toLocaleString(), req.path)
    next()
})

router.route('/getTasks').get(tasksController.apiGetTasks);
router.route("/saveTask").post(tasksController.apiSaveTask)
module.exports = router