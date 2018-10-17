module.exports = function (sequelize, DataTypes) {
    return sequelize.define('user_favorite', {
        user_id: DataTypes.INTEGER,
        wine_id: DataTypes.INTEGER,
        list_id: DataTypes.INTEGER
    })
}