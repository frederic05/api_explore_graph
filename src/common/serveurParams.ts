//importation des modulesglobeaux
import express, {Express} from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import cors from 'cors';
import {router} from '../routes/routes'

const app: Express = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(morgan('tiny'))
app.use(cors());
app.use(router)

export default app;