const { Model, DataTypes } = require('sequelize');
const sequelize = new Sequelize('cairo_trip', 'root', 'root', {
  host: 'db',
  dialect: 'mysql',
  port: 3306,
  logging: false,
});

class BlogPost extends Model {}

BlogPost.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  tags: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  image: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  isPublished: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  }
}, {
  sequelize,
  modelName: 'BlogPost',
  tableName: 'blog_posts',
  timestamps: false,
});

module.exports = BlogPost;