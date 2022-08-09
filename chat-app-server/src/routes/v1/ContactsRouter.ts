import {Router} from 'express';
import getAllContacts from '../../controllers/contacts/getAllContacts';


const ContactsRouter = Router();

ContactsRouter.get('/', getAllContacts);


export default ContactsRouter;