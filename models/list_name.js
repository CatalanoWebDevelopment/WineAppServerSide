module.exports = function (sequelize, DataTypes) {
    return sequelize.define('list_name', {
        title: DataTypes.STRING
    })
}