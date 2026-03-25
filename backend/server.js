const express = require('express');
const cors = require('cors');

const testcaseRoutes = require('./routes/testcaseRoutes');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.status(200).send('ASTMS Backend Running');
});

app.use('/', testcaseRoutes);

app.listen(PORT, () => {
  console.log(`ASTMS backend running on port ${PORT}`);
});
