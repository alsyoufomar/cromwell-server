require('dotenv').config();
const express = require('express');

// Set up express
const app = express();
const cors = require('cors');
app.disable('x-powered-by');
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

const userRouter = require('./routers/user.js');
app.use('/user', userRouter);

app.get('*', (req, res) => {
  res.json({ ok: true });
});

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`\n Server is running on http://localhost:${port}\n`);
});
