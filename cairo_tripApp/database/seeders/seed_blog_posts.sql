module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('blog_posts', [
    {
      title: '',
      content: '',
      tags: '',
      image: '',
      isPublished: false
    },
    {
      title: '',
      content: '',
      tags: '',
      image: '',
      isPublished: false
    }
  ]),
  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('blog_posts', null, {})
};
