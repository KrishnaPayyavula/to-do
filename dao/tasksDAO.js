var __TASKSDB;

class RequirementsDAO {

    // Making connection to the tasks database
    static async injectDB(connection) {
        if (__TASKSDB) {
            return
        }

        try {
            __TASKSDB = await connection.db("tasks");

        } catch (error) {
            console.log("Unable to establish the connection to the TasksDB", error);

        }
    }

}

module.exports = RequirementsDAO;