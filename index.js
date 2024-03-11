const { Sequelize, DataTypes } = require('sequelize')

const sequelize = new Sequelize("task_management", "root", "123456", {
    host: "localhost",
    dialect: "mysql"
})
// tao model

const Task = sequelize.define(
    "Task",
    {
        name: {
            type: DataTypes.STRING, // varchar255
            allowNull: false
        },
        status: {
            type: DataTypes.STRING
        }
    }
)
const createTask = async (name, status) => {
    // cách 1
    // const newTask = Task.build({
    //     name: name,
    //     status: status
    // })
    // await newTask.save()

    // cach 2
    const newTask = await Task.create({
        name,
        status
    })
}
//createTask("Hoc lop 1", "Hoc xong")

const getAllTasks = async () => {
    const taskList = await Task.findAll()
    console.log("----------------------")
    console.log(JSON.stringify(taskList, null, 3))
    console.log("----------------------")

}
//getAllTasks()

// tim task by id
const getTaskById = async (id) => {
    const task = await Task.findOne({
        where: {
            id: id
        }
    })
    console.log(`Task ${id}:`, JSON.stringify(task, null, 10))
}

//getTaskById(10)

const updateTask = async (id, data) => {
    await Task.update(
        data, {
        where: {
            id
        }
    })
}

//updateTask(1, {   name: "Hoc cap 2",  status: "Da hoc"})

const deleteTaskById = async (id) => {
    await Task.destroy({
        where: {
            id
        }
    })
}
deleteTaskById(1)
// đồng bộ model với database
const syncModel = async () => {
    await Task.sync({ force: true })
    console.log("Đã đồng bộ task Model với database")
    //Task.sync({alter:true})
}
const checkConnection = async () => {
    try {
        await sequelize.authenticate()
        console.log("Connected to the database")
    } catch (error) {
        console.log("Cannot connect to the database")
        console.log(error)
    }
}



checkConnection()
//syncModel()