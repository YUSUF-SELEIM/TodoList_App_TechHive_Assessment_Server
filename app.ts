import express from 'express';
import { json } from 'body-parser';
import routes from './src/routes';

const app = express();
app.use(json());
app.use(routes);

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
