const { syncAndSeed, models: { Character, Description } } = require('./db/index');
const express = require('express');
const app = express();
const chalk = require('chalk')
const path = require('path')

app.get('/', (req, res, next) => res.sendFile(path.join(__dirname, 'index.html')))

app.use('/', express.static(path.join(__dirname, 'public'))); // need to add photos / css public folder

app.use('/api', require('./api'))

app.get('/', async(req, res, next) => { // display on browser, json data
    try {
        const [chars, desc] = await Promise.all([ // new variables to display data
            await Character.findAll({ // === SELECT * FROM Character 
                include: [
                    {
                        model: Description,
                        required: true
                    },
                    {
                        model: Character, 
                        as: 'companion',
                        required: true
                    }
                ]
            }), 
        ]);

        res.send( { 
            chars,
            desc
        });
    }
    catch (ex) {
        next(ex)
    }
})

const init = async() => {
    try {
        await syncAndSeed();
        const port = process.env.PORT || 3000;
        app.listen(port, ()=> console.log(`listening on port ${port}`));
    }
    catch(ex) {
        console.log(chalk.magenta(ex));
    }
};

init()
