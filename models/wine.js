module.exports = function (sequelize, DataTypes) {
    return sequelize.define('wine', {
        vintage: DataTypes.INTEGER,
        color: DataTypes.STRING,
        apellation: DataTypes.STRING,
        country: DataTypes.STRING,
        score: DataTypes.INTEGER,
        confidence_index: DataTypes.STRING,
        region: DataTypes.STRING,
        name: DataTypes.STRING
    })
}