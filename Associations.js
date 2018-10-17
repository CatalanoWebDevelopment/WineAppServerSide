const sequelize = require('./db')
const Wine = sequelize.model('wine')
const User_Favorite = sequelize.model('user_favorite')
const User = sequelize.model('user')
const List_Name = sequelize.model('list_name')

Wine.belongsToMany(User, {through: 'User_Favorite'});

User_Favorite.hasMany(Wine);
User_Favorite.belongsTo(User);

Wine.belongsTo(User_Favorite); 

List_Name.hasMany(User_Favorite)
User_Favorite.belongsTo(List_Name)

sequelize.sync()
  .then(() => {
    console.log(`Database & tables created!`)
})