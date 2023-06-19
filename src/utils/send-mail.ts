import 'dotenv/config';
import { send } from '../services/emailService';

send({
  email: 'mohev55475@byorby.com',
  subject: 'Test',
  html: '123',
});
