const ObjectID = require("mongodb").ObjectID;
const Joi = require('joi');
const tasksDAO = require("../dao/tasksDAO")

class TasksController {

    static async apiGetTasks(req, res) {

    }

    /**
     * 
     * @param {Object} req Request Object contains the data that needs to be saved in the database
     * @param {*} res Response Object contains the acknowledgement that sent after saving the task details
     */
    static async apiSaveTask(req, res) {
        const schema = Joi.object({
            title: Joi.string().min(3).max(30).alphanum().required(),
            description: Joi.string(),
            status: Joi.string().equal(["Done", "In-Progress", "Todo"]),
            media: Joi.allow(),
            lastModified: Joi.date(),
            targetDate: Joi.date()
        })

        try {
            let { value, error } = await schema.validateAsync(req.body);
            console.log("Value and Error ", value, error);
            res.send(value);
        } catch (error) {
            res.status(400).send(error)
        }
    }

    // _id: "#93487539845438567567",
    // title: "first note somethings",
    // description: "doijasadaodoagergoifngoifgnoidsnfgesnrgwsdfngdgf",
    // lastModified: "Oct-25",
    // status: "Done",
    // media: [1, 2, 3],
    // targetDate: "",


}

module.exports = TasksController;

