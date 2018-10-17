const Sequelize = require('sequelize'); 

const sequelize = new Sequelize('winemaster', 'postgres', process.env.PG_SECRET, {
    host: 'localhost',
    dialect: 'postgres'
})

sequelize.authenticate().then(
    function() {
        console.log("Connected to WineMaster Postgres Database.")
    },
    function(err) {
        console.log(err)
    }
);

module.exports = sequelize;