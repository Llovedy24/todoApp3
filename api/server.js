require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('Connected to DB'))
    .catch(console.error);

    const Todo = require('./models/Todo');
const { json } = require('express');

    app.get('/todos', async (req, res) => {
        try{const todos = await Todo.find({});

        res.json(todos);
    }catch(error){
        console.error(error.message)
            res.status(400).json({msg: error.message})
    }
    });

    app.post('/todo/new', (req, res) => {
       try { const todo = new Todo({
            text: req.body.text
        });

        todo.save();

        res.json(todo);
    }catch(error){
        console.error(error.message)
            res.status(400).json({msg: error.message})
    }
    });

    app.delete('/todo/delete/:id', async (req, res) => {
        try{const result = await Todo.findByIdAndDelete(req.params.id);

        res.json(result);
        }catch(error) {
            console.error(error.message)
            res.status(400).json({msg: error.message})
        }

    });

    app.get('/todo/complete/:id', async (req, res) => {
       try{
        const todo = await Todo.findById(req.params.id);

        todo? todo.complete = !todo.complete: null

        todo? todo.save(): null

        res.json(todo);
        }catch(error){
            console.error(error.message)
            res.status(400).json({msg: error.message})
        }
    });

    app.listen(3001, () => console.log("Server started on port 3001"));
  