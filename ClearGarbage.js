import sequelize from "./src/dbsequelize.js";
(async () => {
    try {
      // Disable foreign key checks
      await sequelize.query('SET FOREIGN_KEY_CHECKS = 0');
  
      // Drop the tables
      // await sequelize.getQueryInterface().dropTable('grades');
      // await sequelize.getQueryInterface().dropTable('students');
      // await sequelize.getQueryInterface().dropTable('books');
      // await sequelize.getQueryInterface().dropTable('users');
      await sequelize.getQueryInterface().dropTable('templates');
      console.log('Tables dropped successfully.');
      // Re-enable foreign key checks
      await sequelize.query('SET FOREIGN_KEY_CHECKS = 1');
    } catch (error) {
      console.error('Error: ', error);
    } finally {
      await sequelize.close();
    }
  })();
  