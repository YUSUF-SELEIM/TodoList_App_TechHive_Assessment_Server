import express from 'express';
import { json } from 'body-parser';
import routes from './src/routes';
import cors from 'cors';

const app = express();
app.use(cors(
  {
    origin: ['http://192.168.1.7:8081','http://localhost:8081'],
    credentials: true
  }
));
app.use(json());
app.use(routes);

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
