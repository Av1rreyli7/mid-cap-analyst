/* =============================================================
   PRICES  (data/prices.js)
   -------------------------------------------------------------
   Real NSE closing prices used by the Simulation.
     startPrice - closing price on 1 June 2026 (Rs)
     endPrice   - closing price on 23 October 2026 (Rs)

   Source: daily NSE closes from Yahoo Finance (downloaded 1 November
   2026). Eleven of the twelve 23 October closes match the prices in
   the original company notes to within rounding.

   Hindustan Copper is the exception. The notes said Rs 458, but that
   is its close on 16 October (458.45). It closed at 399.05 on
   23 October, confirmed on stockanalysis.com, so 399.05 is used here.

   Type prices as plain numbers, for example 4723.5
   (no "Rs" and no quote marks needed, but "4,723.50" also works).
   If a price is set to "TBD", the app shows "Data coming soon"
   instead of doing the maths.
   ============================================================= */

const PRICES = {
  // Hero MotoCorp
  HEROMOTOCO: {
    startPrice: 4819.90,
    endPrice: 5047.00
  },
  // Dr. Reddy's
  DRREDDY: {
    startPrice: 1290.40,
    endPrice: 1229.50
  },
  // Max Healthcare
  MAXHEALTH: {
    startPrice: 938.45,
    endPrice: 815.00
  },
  // Mazagon Dock
  MAZDOCK: {
    startPrice: 2423.10,
    endPrice: 1860.00
  },
  // Indian Hotels
  INDHOTEL: {
    startPrice: 646.75,
    endPrice: 781.75
  },
  // Lodha Developers
  LODHA: {
    startPrice: 893.00,
    endPrice: 963.00
  },
  // AIA Engineering
  AIAENG: {
    startPrice: 4522.70,
    endPrice: 3579.20
  },
  // Ajanta Pharma (hidden from the simulation)
  AJANTPHARM: {
    startPrice: 2931.00,
    endPrice: 3283.90
  },
  // Sona BLW (hidden from the simulation)
  SONACOMS: {
    startPrice: 600.20,
    endPrice: 752.85
  },
  // Hindustan Copper
  HINDCOPPER: {
    startPrice: 539.95,
    endPrice: 399.05
  },
  // NLC India (hidden from the simulation)
  NLCINDIA: {
    startPrice: 336.35,
    endPrice: 228.50
  },
  // Aster DM Quality Care (hidden from the simulation)
  ASTERDM: {
    startPrice: 720.95,
    endPrice: 644.75
  },

  // Nifty Midcap 150 index (the benchmark)
  niftyMidcap150Start: 22265.20,
  niftyMidcap150End: 20592.75
};
