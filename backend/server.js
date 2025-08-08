const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { fetchFinanceData } = require('./financeService');

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.post('/api/data', async (req, res) => {
  try {
    const holdings = req.body.tickers;
    const results = await Promise.all(
      holdings.map(async (h) => {
        const live = await fetchFinanceData(h.symbol);
        return { ...h, ...live };
      })
    );
    res.json(results);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch data' });
  }
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Backend running on http://localhost:${PORT}`));
