/* =============================================================
   COMPANY CARDS  (data/companies.js)
   -------------------------------------------------------------
   All figures are consolidated, FY26 = April 2025 to March 2026.
   Money figures are in Rs crore. Percentages are written without
   the % sign (the label on the card already says %).

   inSimulation: true  -> the card is shown in the Simulation
   inSimulation: false -> hidden (used as examples in the modules)

   The share prices (1 June 2026 and 23 October 2026) are NOT in
   this file. They live in data/prices.js.

   Anything still set to "TBD" shows "Data coming soon" on the card.
   Search this file for "FILL IN" to find every value still missing.

   1 JUNE 2026 VALUES: for the 8 simulation companies, everything price
   based on the card shows what was known on the 1 June 2026 buying date:
     Market cap     = shares (from Screener) x 1 June close
     PE             = 1 June close / FY26 EPS (from Screener)
     Dividend yield = your October yield x your October price / 1 June close
     Promoter %     = before later sales (Hindustan Copper sold in August
                      2026, Lodha in late June 2026)
   Your original October numbers are kept under "Reference only".

   DRAFT values: the flag counts and reveal texts for the 8 simulation
   companies are drafts. Search for "DRAFT" to check or change them.
   The counts use only what is on the card, with these rules taken
   from Modules 3, 4 and 5:

     Green flags (one each):
       - 3 year sales AND profit growth both over 15%
       - operating profit margin over 20%
       - debt to equity under 1
       - positive cash from operations
       - ROE over 20%
     Red flags (one each):
       - cash from operations negative or under half of net profit
       - PE over 30 on 1 June with 3 year profit growth under 15%
       - promoter selling on or before 1 June mentioned in the notes
       - 3 year sales or profit growth under 5%
       - net profit fell from FY25 to FY26

   NOT checked, because the card does not show them: auditors,
   subsidiaries, loans to promoters, dilution, contingent liabilities,
   tax rate, receivables and inventory. Add these from Screener if you
   want fuller counts.
   Reveal texts name the ratios to look at, followed by your teaching
   point. They do not prove why a price moved.

   notes: optional extra information shown in small text under a
   value on the card. Possible notes: debtToEquity, netProfit,
   cashFromOperations, promoter.

   Reference only: priceOn23Oct2026, week52High, week52Low,
   oneYearReturn and teachingPoint are kept here for you but are
   NOT shown anywhere in the app.
   ============================================================= */

const COMPANIES = [
  /* ---------------------------------------------------------- */
  /* 1. HERO MOTOCORP                                            */
  /* ---------------------------------------------------------- */
  {
    name: "Hero MotoCorp",
    nseCode: "HEROMOTOCO",
    sector: "2 Wheelers",
    inSimulation: true,
    marketCap: "96,476",
    pe: "16.8",
    roe: "28.1",
    roce: "35.2",
    debtToEquity: "0.04",
    salesFY25: "40,923",
    salesFY26: "47,411",
    netProfitFY25: "4,376",
    netProfitFY26: "5,776",
    salesGrowth3Years: "12",
    profitGrowth3Years: "28",
    operatingProfitMargin: "15",
    cashFromOperationsFY26: "8,315",
    promoterHolding: "34.7",
    promoterPledge: "0",
    dividendYield: "3.84",
    notes: {},
    // Reference only (not shown in the app)
    marketCapOctober: "1,01,011",
    peOctober: "18.2",
    dividendYieldOctober: "3.67",
    epsFY26: "286.96",
    priceOn23Oct2026: "5,047",
    week52High: "6,390",
    week52Low: "4,672",
    oneYearReturn: "-9",
    teachingPoint: "No debt and good payout but poor sales growth over 5 years (9%).",
    // Still to fill in
    dataAsOf: "1 June 2026",
    industryPE: "TBD", // FILL IN: industry PE
    greenFlags: 3, // DRAFT, please check: low debt, positive cash, ROE over 20%
    redFlags: 0, // DRAFT, please check: none found on the card
    revealText: "Ratios to look at: debt to equity 0.04, dividend yield 3.84% on 1 June, 3 year sales growth 12%. No debt and good payout but poor sales growth over 5 years (9%)." // DRAFT, please check
  },

  /* ---------------------------------------------------------- */
  /* 2. DR. REDDY'S                                              */
  /* ---------------------------------------------------------- */
  {
    name: "Dr. Reddy's",
    nseCode: "DRREDDY",
    sector: "Pharma",
    inSimulation: true,
    marketCap: "1,07,675",
    pe: "25.7",
    roe: "11.2",
    roce: "13.0",
    debtToEquity: "0.20",
    salesFY25: "32,644",
    salesFY26: "33,700",
    netProfitFY25: "5,725",
    netProfitFY26: "4,158",
    salesGrowth3Years: "11",
    profitGrowth3Years: "-4",
    operatingProfitMargin: "19",
    cashFromOperationsFY26: "5,674",
    promoterHolding: "26.6",
    promoterPledge: "0",
    dividendYield: "0.62",
    notes: {},
    // Reference only (not shown in the app)
    marketCapOctober: "1,02,624",
    peOctober: "36.6",
    dividendYieldOctober: "0.65",
    epsFY26: "50.27",
    priceOn23Oct2026: "1,230",
    week52High: "1,415",
    week52Low: "1,080",
    oneYearReturn: "-4",
    teachingPoint: "Profits dropped 27% in FY26. Received a USFDA Form 483 in October 2026.",
    // Still to fill in
    dataAsOf: "1 June 2026",
    industryPE: "TBD", // FILL IN: industry PE
    greenFlags: 2, // DRAFT, please check: low debt, positive cash
    redFlags: 2, // DRAFT, please check: low growth, profits fell in FY26
    revealText: "Ratios to look at: PE 25.7 on 1 June (36.6 by 23 October), ROE 11.2%, 3 year profit growth -4%. Profits dropped 27% in FY26. Received a USFDA Form 483 in October 2026." // DRAFT, please check
  },

  /* ---------------------------------------------------------- */
  /* 3. MAX HEALTHCARE                                           */
  /* ---------------------------------------------------------- */
  {
    name: "Max Healthcare",
    nseCode: "MAXHEALTH",
    sector: "Hospitals",
    inSimulation: true,
    marketCap: "91,335",
    pe: "63.3",
    roe: "14.7",
    roce: "14.7",
    debtToEquity: "0.32",
    salesFY25: "7,028",
    salesFY26: "8,373",
    netProfitFY25: "1,076",
    netProfitFY26: "1,442",
    salesGrowth3Years: "22",
    profitGrowth3Years: "10",
    operatingProfitMargin: "27",
    cashFromOperationsFY26: "1,633",
    promoterHolding: "23.7",
    promoterPledge: "0",
    dividendYield: "0.22",
    notes: {},
    // Reference only (not shown in the app)
    marketCapOctober: "79,325",
    peOctober: "53.0",
    dividendYieldOctober: "0.25",
    epsFY26: "14.82",
    priceOn23Oct2026: "815",
    week52High: "1,196",
    week52Low: "797",
    oneYearReturn: "-31",
    teachingPoint: "Fast growing but expensive (PE 53). 7.4 times book.",
    // Still to fill in
    dataAsOf: "1 June 2026",
    industryPE: "TBD", // FILL IN: industry PE
    greenFlags: 3, // DRAFT, please check: margin over 20%, low debt, positive cash
    redFlags: 1, // DRAFT, please check: high PE with slowing growth
    revealText: "Ratios to look at: PE 63.3 on 1 June (53.0 by 23 October), ROE 14.7%, 3 year profit growth 10%. Fast growing but expensive. 7.4 times book by 23 October." // DRAFT, please check
  },

  /* ---------------------------------------------------------- */
  /* 4. MAZAGON DOCK                                             */
  /* ---------------------------------------------------------- */
  {
    name: "Mazagon Dock",
    nseCode: "MAZDOCK",
    sector: "Defence Shipbuilding (PSU)",
    inSimulation: true,
    marketCap: "97,743",
    pe: "37.8",
    roe: "30.4",
    roce: "35.9",
    debtToEquity: "0.05",
    salesFY25: "11,432",
    salesFY26: "13,006",
    netProfitFY25: "2,414",
    netProfitFY26: "2,583",
    salesGrowth3Years: "18",
    profitGrowth3Years: "32",
    operatingProfitMargin: "27",
    cashFromOperationsFY26: "-2,891",
    promoterHolding: "81.2",
    promoterPledge: "0",
    dividendYield: "0.72",
    notes: {
      cashFromOperations: "FY25 was plus 2,078 cr",
      promoter: "government"
    },
    // Reference only (not shown in the app)
    marketCapOctober: "77,691",
    peOctober: "27.2",
    dividendYieldOctober: "0.94",
    epsFY26: "64.04",
    priceOn23Oct2026: "1,860",
    week52High: "2,882",
    week52Low: "1,845",
    oneYearReturn: "-34",
    teachingPoint: "Made profit but not cash.",
    // Still to fill in
    dataAsOf: "1 June 2026",
    industryPE: "TBD", // FILL IN: industry PE
    greenFlags: 4, // DRAFT, please check: growth over 15%, margin over 20%, low debt, ROE over 20%
    redFlags: 1, // DRAFT, please check: profit but no cash
    revealText: "Ratios to look at: cash from operations -2,891 crore against net profit of 2,583 crore, PE 37.8 on 1 June (27.2 by 23 October), ROE 30.4%. Made profit but not cash." // DRAFT, please check
  },

  /* ---------------------------------------------------------- */
  /* 5. INDIAN HOTELS                                            */
  /* ---------------------------------------------------------- */
  {
    name: "Indian Hotels",
    nseCode: "INDHOTEL",
    sector: "Hotels",
    inSimulation: true,
    marketCap: "92,094",
    pe: "44.2",
    roe: "14.2",
    roce: "17.1",
    debtToEquity: "0.22",
    salesFY25: "8,335",
    salesFY26: "9,689",
    netProfitFY25: "2,038",
    netProfitFY26: "2,247",
    salesGrowth3Years: "19",
    profitGrowth3Years: "22",
    operatingProfitMargin: "33",
    cashFromOperationsFY26: "2,471",
    promoterHolding: "38.1",
    promoterPledge: "0",
    dividendYield: "0.51",
    notes: {},
    // Reference only (not shown in the app)
    marketCapOctober: "1,11,277",
    peOctober: "55.4",
    dividendYieldOctober: "0.42",
    epsFY26: "14.64",
    priceOn23Oct2026: "782",
    week52High: "795",
    week52Low: "565",
    oneYearReturn: "+6",
    teachingPoint: "Best margins but expensive (8.2 times book). PE 55.",
    // Still to fill in
    dataAsOf: "1 June 2026",
    industryPE: "TBD", // FILL IN: industry PE
    greenFlags: 4, // DRAFT, please check: growth over 15%, margin over 20%, low debt, positive cash
    redFlags: 0, // DRAFT, please check: none found on the card
    revealText: "Ratios to look at: operating profit margin 33%, PE 44.2 on 1 June (55.4 by 23 October), ROE 14.2%. Best margins but expensive (8.2 times book by 23 October)." // DRAFT, please check
  },

  /* ---------------------------------------------------------- */
  /* 6. LODHA DEVELOPERS                                         */
  /* ---------------------------------------------------------- */
  {
    name: "Lodha Developers",
    nseCode: "LODHA",
    sector: "Real Estate",
    inSimulation: true,
    marketCap: "89,205",
    pe: "26.0",
    roe: "16.2",
    roce: "16.9",
    debtToEquity: "0.40",
    salesFY25: "13,780",
    salesFY26: "16,676",
    netProfitFY25: "2,764",
    netProfitFY26: "3,428",
    salesGrowth3Years: "12",
    profitGrowth3Years: "48",
    operatingProfitMargin: "28",
    cashFromOperationsFY26: "7,120",
    promoterHolding: "72.3",
    promoterPledge: "0",
    dividendYield: "0.43",
    notes: {
      debtToEquity: "Net debt Rs 5,380 cr",
      cashFromOperations: "operating cashflow per the company's Q4 FY26 presentation"
    },
    // Reference only (not shown in the app)
    marketCapOctober: "96,251",
    peOctober: "23.3",
    dividendYieldOctober: "0.4",
    epsFY26: "34.32",
    promoterHoldingOctober: "70.3", // promoters sold about 2% in late June 2026
    priceOn23Oct2026: "963",
    week52High: "1,345",
    week52Low: "651",
    oneYearReturn: "-18",
    teachingPoint: "Cyclical business with beta of 1.8.",
    // Still to fill in
    dataAsOf: "1 June 2026",
    industryPE: "TBD", // FILL IN: industry PE
    greenFlags: 3, // DRAFT, please check: margin over 20%, low debt, positive cash
    redFlags: 0, // DRAFT, please check: none found on the card
    revealText: "Ratios to look at: PE 26.0 on 1 June (23.3 by 23 October), debt to equity 0.40, 3 year profit growth 48%. Cyclical business with beta of 1.8." // DRAFT, please check
  },

  /* ---------------------------------------------------------- */
  /* 7. AIA ENGINEERING                                          */
  /* ---------------------------------------------------------- */
  {
    name: "AIA Engineering",
    nseCode: "AIAENG",
    sector: "Industrial Castings",
    inSimulation: true,
    marketCap: "42,209",
    pe: "33.2",
    roe: "17.0",
    roce: "21.1",
    debtToEquity: "0.00",
    salesFY25: "4,287",
    salesFY26: "4,420",
    netProfitFY25: "1,060",
    netProfitFY26: "1,269",
    salesGrowth3Years: "-3",
    profitGrowth3Years: "7",
    operatingProfitMargin: "29",
    cashFromOperationsFY26: "592",
    promoterHolding: "58.5",
    promoterPledge: "0",
    dividendYield: "0.36",
    notes: {},
    // Reference only (not shown in the app)
    marketCapOctober: "33,401",
    peOctober: "26.3",
    dividendYieldOctober: "0.45",
    epsFY26: "136.11",
    priceOn23Oct2026: "3,579",
    week52High: "5,180",
    week52Low: "3,220",
    oneYearReturn: "+7",
    teachingPoint: "No debt but sales are going down. Exactly at the mid cap cut off.",
    // Still to fill in
    dataAsOf: "1 June 2026",
    industryPE: "TBD", // FILL IN: industry PE
    greenFlags: 3, // DRAFT, please check: margin over 20%, low debt, positive cash
    redFlags: 3, // DRAFT, please check: cash under half of profit, high PE with slowing growth, low growth
    revealText: "Ratios to look at: debt to equity 0.00, 3 year sales growth -3%, ROCE 21.1%. No debt but sales are going down. By 23 October its market cap was exactly at the mid cap cut off." // DRAFT, please check
  },

  /* ---------------------------------------------------------- */
  /* 8. AJANTA PHARMA  (hidden: used as an example in Module 5)  */
  /* ---------------------------------------------------------- */
  {
    name: "Ajanta Pharma",
    nseCode: "AJANTPHARM",
    sector: "Pharma",
    inSimulation: false,
    marketCap: "41,035",
    pe: "36.2",
    roe: "27.1",
    roce: "34.5",
    debtToEquity: "0.06",
    salesFY25: "4,648",
    salesFY26: "5,453",
    netProfitFY25: "920",
    netProfitFY26: "1,056",
    salesGrowth3Years: "13",
    profitGrowth3Years: "24",
    operatingProfitMargin: "28",
    cashFromOperationsFY26: "529",
    promoterHolding: "63.5",
    promoterPledge: "0",
    dividendYield: "0.97",
    notes: {},
    // Reference only (not shown in the app)
    priceOn23Oct2026: "3,284",
    week52High: "3,797",
    week52Low: "2,382",
    oneYearReturn: "+36",
    teachingPoint: "Clean checklist with 50% payout but expensive (9 times book).",
    // Still to fill in
    dataAsOf: "TBD", // FILL IN: date these numbers are from
    industryPE: "TBD", // FILL IN: industry PE
    greenFlags: "TBD", // FILL IN: number of green flags
    redFlags: "TBD", // FILL IN: number of red flags
    revealText: "TBD" // FILL IN: the 2 or 3 ratios that explain the price move
  },

  /* ---------------------------------------------------------- */
  /* 9. SONA BLW  (hidden: used as an example in the modules)    */
  /* ---------------------------------------------------------- */
  {
    name: "Sona BLW",
    nseCode: "SONACOMS",
    sector: "Auto Parts/EV",
    inSimulation: false,
    marketCap: "46,991",
    pe: "64.6",
    roe: "11.3",
    roce: "14.2",
    debtToEquity: "0.07",
    salesFY25: "3,546",
    salesFY26: "4,449",
    netProfitFY25: "600",
    netProfitFY26: "629",
    salesGrowth3Years: "19",
    profitGrowth3Years: "18",
    operatingProfitMargin: "24",
    cashFromOperationsFY26: "659",
    promoterHolding: "27.9",
    promoterPledge: "0",
    dividendYield: "0.45",
    notes: {},
    // Reference only (not shown in the app)
    priceOn23Oct2026: "753",
    week52High: "844",
    week52Low: "438",
    oneYearReturn: "+57",
    teachingPoint: "Expensive (PE 64.6). Profits slowed in FY26 (5%). Low promoter holding.",
    // Still to fill in
    dataAsOf: "TBD", // FILL IN: date these numbers are from
    industryPE: "TBD", // FILL IN: industry PE
    greenFlags: "TBD", // FILL IN: number of green flags
    redFlags: "TBD", // FILL IN: number of red flags
    revealText: "TBD" // FILL IN: the 2 or 3 ratios that explain the price move
  },

  /* ---------------------------------------------------------- */
  /* 10. HINDUSTAN COPPER                                        */
  /* ---------------------------------------------------------- */
  {
    name: "Hindustan Copper",
    nseCode: "HINDCOPPER",
    sector: "Copper Mining (PSU)",
    inSimulation: true,
    marketCap: "52,195",
    pe: "56.8",
    roe: "32.9",
    roce: "42.4",
    debtToEquity: "0.03",
    salesFY25: "2,071",
    salesFY26: "3,078",
    netProfitFY25: "469",
    netProfitFY26: "921",
    salesGrowth3Years: "22",
    profitGrowth3Years: "50",
    operatingProfitMargin: "48",
    cashFromOperationsFY26: "1,474",
    promoterHolding: "66.1",
    promoterPledge: "0",
    dividendYield: "0.53",
    notes: {
      promoter: "government"
    },
    // Reference only (not shown in the app)
    marketCapOctober: "44,333",
    peOctober: "36.7",
    dividendYieldOctober: "0.62",
    epsFY26: "9.50",
    promoterHoldingOctober: "60.1",
    promoterNoteOctober: "government, down from 66.1% after OFS in August 2026",
    priceOn23Oct2026: "458", // actual close on 23 Oct was 399.05; 458.45 was the 16 Oct close
    week52High: "760",
    week52Low: "308.5",
    oneYearReturn: "+34",
    teachingPoint: "Doubled profits due to copper prices. Cyclical. Government sold 6%.",
    // Still to fill in
    dataAsOf: "1 June 2026",
    industryPE: "TBD", // FILL IN: industry PE
    greenFlags: 5, // DRAFT, please check: growth over 15%, margin over 20%, low debt, positive cash, ROE over 20%
    redFlags: 0, // DRAFT, please check: none found on the card (the government sale came after 1 June)
    revealText: "Ratios to look at: ROE 32.9%, operating profit margin 48%, PE 56.8 on 1 June (36.7 by mid October). Doubled profits due to copper prices. Cyclical. Government sold 6% in August 2026." // DRAFT, please check
  },

  /* ---------------------------------------------------------- */
  /* 11. NLC INDIA  (hidden: used as an example in Module 5)     */
  /* ---------------------------------------------------------- */
  {
    name: "NLC India",
    nseCode: "NLCINDIA",
    sector: "Power/Lignite (PSU)",
    inSimulation: false,
    marketCap: "31,685",
    pe: "9.9",
    roe: "11.9",
    roce: "8.4",
    debtToEquity: "1.3",
    salesFY25: "15,322",
    salesFY26: "17,519",
    netProfitFY25: "2,714",
    netProfitFY26: "3,769",
    salesGrowth3Years: "3",
    profitGrowth3Years: "2",
    operatingProfitMargin: "32",
    cashFromOperationsFY26: "5,166",
    promoterHolding: "69.5",
    promoterPledge: "0",
    dividendYield: "1.68",
    notes: {
      promoter: "government, down 9.7% over 3 years"
    },
    // Reference only (not shown in the app)
    priceOn23Oct2026: "228",
    week52High: "388",
    week52Low: "222",
    oneYearReturn: "-14",
    teachingPoint: "Cheapest PE but heavily in debt. Contingent liabilities of around Rs 13,000 cr.",
    // Still to fill in
    dataAsOf: "TBD", // FILL IN: date these numbers are from
    industryPE: "TBD", // FILL IN: industry PE
    greenFlags: "TBD", // FILL IN: number of green flags
    redFlags: "TBD", // FILL IN: number of red flags
    revealText: "TBD" // FILL IN: the 2 or 3 ratios that explain the price move
  },

  /* ---------------------------------------------------------- */
  /* 12. ASTER DM QUALITY CARE  (hidden: used as an example)     */
  /* ---------------------------------------------------------- */
  {
    name: "Aster DM Quality Care",
    nseCode: "ASTERDM",
    sector: "Hospitals",
    inSimulation: false,
    marketCap: "56,201",
    pe: "156",
    roe: "11.3",
    roce: "11.6",
    debtToEquity: "0.62",
    salesFY25: "4,138",
    salesFY26: "4,643",
    netProfitFY25: "5,408",
    netProfitFY26: "427",
    salesGrowth3Years: "16",
    profitGrowth3Years: "-1",
    operatingProfitMargin: "19",
    cashFromOperationsFY26: "656",
    promoterHolding: "53.8",
    promoterPledge: "67",
    dividendYield: "0.47",
    notes: {
      netProfit: "FY25 includes a one off gain of Rs 5,168 cr",
      promoter: "pledge 67% of promoter holding"
    },
    // Reference only (not shown in the app)
    priceOn23Oct2026: "645",
    week52High: "891",
    week52Low: "519",
    oneYearReturn: "-9",
    teachingPoint: "Pledging is the red flag. One off profit makes PE misleading.",
    // Still to fill in
    dataAsOf: "TBD", // FILL IN: date these numbers are from
    industryPE: "TBD", // FILL IN: industry PE
    greenFlags: "TBD", // FILL IN: number of green flags
    redFlags: "TBD", // FILL IN: number of red flags
    revealText: "TBD" // FILL IN: the 2 or 3 ratios that explain the price move
  }
];
