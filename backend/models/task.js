const Task = new Object();

const mysql = require('mysql')
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'todolist-react-express'
});

Task.getAll = (res) => {
    connection.query('SELECT * from tasks', (err, results) => {
        if (err)
            throw err;
        if (results.length > 0) {
            res.json(results)
        }
        else {
            res.send('Not results')
        }
    })
}

Task.get = (req, res) => {
    const id = req.params.id
    connection.query('SELECT * from tasks WHERE id=?', [id], (err, results) => {
        if (err)
            throw err;
        if (results.length > 0) {
            res.json(results)
        }
        else {
            res.send('Not results')
        }
    })
}

Task.add = (req, res) => {
    const sql = 'INSERT into tasks (title,description) values (?,?)'
    const { title, description } = req.body;

    connection.query(sql, [title, description], (error) => {
        if (error) throw error;
        res.send("Task created with success!")
    })
}

Task.update = (req, res) => {
    const sql = 'UPDATE tasks SET title=?, description=? WHERE id=?'
    const { id } = req.params;
    const { title, description } = req.body;

    if (title.length < 3) {
        res.send("Title must be at least 3 characters long");
        return;
    }
    if (description.length < 3) {
        res.send("Description must be at least 3 characters long");
        return;
    }

    connection.query(sql, [title, description, id], (error, results) => {
        if (error) throw error;
        if (results.affectedRows)
            res.send("Task updated with success!")
        else
            res.send("Task with id: " + id + " not found")
    })
}

Task.delete = (req, res) => {
    const sql = 'DELETE from tasks WHERE id=?'
    const { id } = req.params;
    connection.query(sql, [id], (error, results) => {
        if (error) throw error;
        if (results.affectedRows)
            res.send("Task deleted with success!")
        else
            res.send("Task with id: " + id + " not found")
    })
}

module.exports = Task