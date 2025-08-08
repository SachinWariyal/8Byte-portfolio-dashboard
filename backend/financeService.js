const yahooFinance = require('yahoo-finance2').default;
const axios = require('axios');
const cheerio = require('cheerio');

async function fetchFinanceData(symbol) {
  try {
    const quote = await yahooFinance.quote(symbol);
    const cmp = quote.regularMarketPrice;

    const gfSymbol = symbol.replace('.NS', ':NSE');
    const url = `https://www.google.com/finance/quote/${gfSymbol}`;
    const { data: html } = await axios.get(url);
    const $ = cheerio.load(html);

    let pe = null;
    let earnings = null;

    $('div').each((_, div) => {
      const text = $(div).text().trim();
      if (text.includes('P/E ratio')) {
        const val = $(div).next().text();
        pe = parseFloat(val) || null;
      }
      if (text.includes('Earnings per share')) {
        earnings = $(div).next().text().trim() || null;
      }
    });

    return { cmp, pe, earnings };
  } catch (error) {
    console.error(`Error fetching data for ${symbol}:`, error.message);
    return { cmp: 0, pe: null, earnings: null };
  }
}

module.exports = { fetchFinanceData };
