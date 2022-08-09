import express, {Request, Response} from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import ErrorHandler from './middlewares/errorHandler';
import path from 'path';
import cookieParser from 'cookie-parser';
import authGuard from './middlewares/authGuard';

//Routes
import AuthRouter from './routes/v1/AuthRouter';
import UserRouter from './routes/v1/UserRouter';
import UploadRouter from './routes/v1/UplaodRouter';
import ContactsRouter from './routes/v1/ContactsRouter';


const app = express();
process.env.NODE_ENV !== "production" && app.use(morgan('dev'));

dotenv.config({path: path.resolve(__dirname + `/config/${process.env.NODE_ENV}.env`)});

app.use(cors({credentials: true, origin: 'http://localhost:3000'}));
app.use(cookieParser());
app.use(express.json());

app.use('/api/v1/auth', AuthRouter);
app.use('/api/v1/user', authGuard, UserRouter);
app.use('/api/v1/upload', authGuard, UploadRouter);
app.use('/api/v1/contacts', authGuard, ContactsRouter);

app.all('*', (req, res) => res.status(404).json({message: "Undefinded Routes"}));
app.use(ErrorHandler);

export default app;