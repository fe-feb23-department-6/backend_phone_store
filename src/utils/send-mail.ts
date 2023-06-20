import 'dotenv/config';
import { emailService } from '../services/emailService';

emailService.send({
  email: 'mohev55475@byorby.com',
  subject: 'Test',
  html: '123',
});
