const Sequelize = require('sequelize'); 

const sequelize = new Sequelize(`postgresql://postgres:${encodeURIComponent(process.env.PG_SECRET)}@localhost/winemaster`, {
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