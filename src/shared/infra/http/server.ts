import express from 'express';
import routes from './routes/index';
import sequelize from '../database/index';

const app = express();

const configureExpress = () => {
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(routes);

    return app;
};

sequelize.authenticate().then(configureExpress);

app.listen(3333, async () => {
    //await sequelize.sync();
    console.log("Server Started on Port 3333!");
});
