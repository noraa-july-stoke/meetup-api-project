const { sequelize } = require('./db/models');

sequelize.showAllSchemas({logging: false}).then(async (data) => {
    if (!data.includes(process.env.SCHEMA)) {
        await sequelize.createSchema(`app_academy_projects_nlxy.${process.env.SCHEMA}`);
    }
});
