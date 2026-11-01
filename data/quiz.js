/* =============================================================
   QUIZZES  (data/quiz.js)
   -------------------------------------------------------------
   Two quizzes: "pre" (Prior Knowledge Quiz) and "post" (Post Quiz).
   Each question has:
     module   - which module it tests (1 to 5)
     question - the question text
     options  - the four answers, in order A, B, C, D
     answer   - the letter of the correct option ("A", "B", "C" or "D")
   Every question is worth 5 marks. 20 questions = 100 marks.

   The website shuffles the ORDER the four options are shown in, so
   on screen the correct answer appears as A, B, C or D equally often.
   The words are not changed. Always write the options and the answer
   letter here in your own order: the shuffling is done for you.
   ============================================================= */

const QUIZZES = {
  /* ---------------------------------------------------------- */
  /* PRIOR KNOWLEDGE QUIZ (pre)                                  */
  /* ---------------------------------------------------------- */
  pre: {
    title: "Prior Knowledge Quiz",
    questions: [
      { // Q1
        module: 1,
        question: "What does fundamental analysis look at when determining a stock's value?",
        options: [
          "Price history and volumes",
          "Company sales, profits, debt, cash and management",
          "Social media trends",
          "How many people have bought"
        ],
        answer: "B"
      },
      { // Q2
        module: 1,
        question: "What is a mid cap company in India?",
        options: [
          "Ranked between 1-100",
          "Ranked between 101-250",
          "Ranked between 251+",
          "Companies with share prices below Rs500"
        ],
        answer: "B"
      },
      { // Q3
        module: 1,
        question: "Why did Paytm fall 27% on its first day of trading in November 2021?",
        options: [
          "They had no profits and a high valuation",
          "The market was closed for holidays",
          "They had too much cash",
          "Their IPO was subscribed 50 times"
        ],
        answer: "A"
      },
      { // Q4
        module: 1,
        question: "An IPO has no profits, a high valuation and lots of hype online. As an investor, what should you look at first?",
        options: [
          "How many influencers are promoting",
          "The company's financials and whether they make profit",
          "Colour of the logo",
          "How much the share price rose on day one"
        ],
        answer: "B"
      },
      { // Q5
        module: 2,
        question: "Which statement shows how much debt a company has?",
        options: [
          "Profit and Loss statement",
          "Balance sheet",
          "Cashflow Statement",
          "Cover page of annual report"
        ],
        answer: "B"
      },
      { // Q6
        module: 2,
        question: "What does PAT stand for?",
        options: [
          "Price After Tax",
          "Profit After Tax",
          "Payment And Trade",
          "Profit At Time"
        ],
        answer: "B"
      },
      { // Q7
        module: 2,
        question: "A company has a net profit of Rs2,583 crore but has negative cash from operations. What could this mean?",
        options: [
          "The company is performing extremely well.",
          "The profit isn't supported by real cash.",
          "The company has no debt.",
          "The company paid a large dividend."
        ],
        answer: "B"
      },
      { // Q8
        module: 2,
        question: "You want to see if the company is receiving real cash from its customers. Look at...",
        options: [
          "Revenue from operations (P&L)",
          "Cash from operations (cash flow)",
          "Share Capital (Balance Sheet)",
          "Depreciation (P&L)"
        ],
        answer: "B"
      },
      { // Q9
        module: 3,
        question: "What is the formula for PE ratio?",
        options: [
          "Share Price / EPS",
          "EPS / Share Price",
          "Net Profit / Total Debt",
          "Total Debt / Total Equity"
        ],
        answer: "A"
      },
      { // Q10
        module: 3,
        question: "What is the formula for Return on Equity (ROE)?",
        options: [
          "Net Profit / Sales",
          "Net Profit / Shareholders' Equity x 100",
          "Total Debt / Shareholders' Equity",
          "Share Price / Book Value"
        ],
        answer: "B"
      },
      { // Q11
        module: 3,
        question: "Company 1 has a 50% ROE and a 2 debt to equity ratio. Company 2 has a 25% ROE and has no debt. Which company would be the healthiest?",
        options: [
          "Company 1 as it has a higher ROE.",
          "Company 2 as the ROE is not driven by heavy debt.",
          "They are equal.",
          "Neither of them as ROE doesn't matter."
        ],
        answer: "B"
      },
      { // Q12
        module: 3,
        question: "A share has a share price of Rs500 and has an EPS of Rs25. What is the PE ratio?",
        options: [
          "5",
          "12.5",
          "20",
          "25"
        ],
        answer: "C"
      },
      { // Q13
        module: 4,
        question: "What is promoter pledging?",
        options: [
          "Promoters promise to buy more shares.",
          "Promoters take out loans with their shares as collateral.",
          "Promoters pay out a dividend.",
          "Promoters sell the company."
        ],
        answer: "B"
      },
      { // Q14
        module: 4,
        question: "According to Zerodha's checklist, which is a green flag?",
        options: [
          "Cash from operations is negative every year.",
          "Sales and profits are both increasing by more than 15% for 5 years.",
          "Auditor resigned this year.",
          "EPS is decreasing but profit is increasing."
        ],
        answer: "B"
      },
      { // Q15
        module: 4,
        question: "A company has increasing promoter pledging, an auditor resignation and loans to a promoter owned company. How many red flags do they have? What should you do?",
        options: [
          "1 red flag. Buy.",
          "2 red flags. Ignore.",
          "3 red flags. Do not buy until you understand why.",
          "0 red flags. Everything is normal."
        ],
        answer: "C"
      },
      { // Q16
        module: 4,
        question: "A company has sales growing at 24% per year, profit growing at 22% per year, 0.1 debt to equity, positive cash from operations, stable promoter holding and 0% pledged. How many red flags do they have?",
        options: [
          "0",
          "1",
          "3",
          "5"
        ],
        answer: "A"
      },
      { // Q17
        module: 5,
        question: "What is the first step in the 10 step process?",
        options: [
          "Check PE ratio",
          "Ensure it is a mid cap company from the latest list from AMFI.",
          "Write your one sentence conclusion.",
          "Count the number of red flags."
        ],
        answer: "B"
      },
      { // Q18
        module: 5,
        question: "Why should we only compare ratios to companies within the same sector?",
        options: [
          "All sectors have the same average ratios.",
          "Average margin or PE ratios within one sector could be unusual in another.",
          "It is faster.",
          "Screener only shows one sector at a time."
        ],
        answer: "B"
      },
      { // Q19
        module: 5,
        question: "NLC India has a PE ratio of 9.9 and Ajanta Pharma has a PE ratio of 36. Is the cheapest company better to invest in?",
        options: [
          "Yes. A lower PE ratio is better.",
          "No. NLC is cheap as it has high debt and slow growth so cannot be decided by just looking at the PE ratio.",
          "Yes. NLC pays out a higher dividend.",
          "No. PE ratio is not a real ratio."
        ],
        answer: "B"
      },
      { // Q20
        module: 5,
        question: "A company has an ROE of 27%, 0.06 debt to equity ratio, 24% profit growth over 3 years, positive cash from operations, promoter holding of 63.5% with no pledge and a PE ratio of 36. What is the best reason to be cautious about investing?",
        options: [
          "Too much debt.",
          "No profit growth.",
          "High price. PE ratio is 36 so you're paying a lot for good quality.",
          "Promoter holding too low."
        ],
        answer: "C"
      }
    ]
  },

  /* ---------------------------------------------------------- */
  /* POST QUIZ (post)                                            */
  /* Questions 1, 2, 5, 6, 9, 10, 13, 14, 17 and 18 are the same */
  /* as the Prior Knowledge Quiz.                                */
  /* ---------------------------------------------------------- */
  post: {
    title: "Post Quiz",
    questions: [
      { // Q1 (same as pre)
        module: 1,
        question: "What does fundamental analysis look at when determining a stock's value?",
        options: [
          "Price history and volumes",
          "Company sales, profits, debt, cash and management",
          "Social media trends",
          "How many people have bought"
        ],
        answer: "B"
      },
      { // Q2 (same as pre)
        module: 1,
        question: "What is a mid cap company in India?",
        options: [
          "Ranked between 1-100",
          "Ranked between 101-250",
          "Ranked between 251+",
          "Companies with share prices below Rs500"
        ],
        answer: "B"
      },
      { // Q3
        module: 1,
        question: "Paytm's IPO had a subscription of only 1.89 times. The company had never made a profit. What does this tell a fundamental analyst?",
        options: [
          "The stock would definitely increase on listing.",
          "The figures indicated poor performance but were hidden due to the hype.",
          "They have very good cash flow.",
          "Nothing. IPO figures are irrelevant."
        ],
        answer: "B"
      },
      { // Q4
        module: 1,
        question: "Everyone online is saying a new company is going to double on day one. Using fundamental analysis what should you do first?",
        options: [
          "Buy on day one before it goes up.",
          "Look at the company's financial statements to see if they make profit and cash.",
          "Wait for an influencer to make a video.",
          "Look at the stock's price chart from yesterday."
        ],
        answer: "B"
      },
      { // Q5 (same as pre)
        module: 2,
        question: "Which statement shows how much debt a company has?",
        options: [
          "Profit and Loss statement",
          "Balance sheet",
          "Cashflow Statement",
          "Cover page of annual report"
        ],
        answer: "B"
      },
      { // Q6 (same as pre)
        module: 2,
        question: "What does PAT stand for?",
        options: [
          "Price After Tax",
          "Profit After Tax",
          "Payment And Trade",
          "Profit At Time"
        ],
        answer: "B"
      },
      { // Q7
        module: 2,
        question: "A company has a net profit of Rs5,776 crore and cash from operations of Rs8,315 crore. This suggests...",
        options: [
          "The profit is supported by real cash.",
          "The company is making losses.",
          "They are hiding debt.",
          "No customers."
        ],
        answer: "A"
      },
      { // Q8
        module: 2,
        question: "You want to see how much the company owes its lenders. Look at...",
        options: [
          "Revenue from Operations (P&L)",
          "Borrowings (Balance Sheet)",
          "Cash from Investing (Cashflow)",
          "Tax (P&L)"
        ],
        answer: "B"
      },
      { // Q9 (same as pre)
        module: 3,
        question: "What is the formula for PE ratio?",
        options: [
          "Share Price / EPS",
          "EPS / Share Price",
          "Net Profit / Total Debt",
          "Total Debt / Total Equity"
        ],
        answer: "A"
      },
      { // Q10 (same as pre)
        module: 3,
        question: "What is the formula for Return on Equity (ROE)?",
        options: [
          "Net Profit / Sales",
          "Net Profit / Shareholders' Equity x 100",
          "Total Debt / Shareholders' Equity",
          "Share Price / Book Value"
        ],
        answer: "B"
      },
      { // Q11
        module: 3,
        question: "A company's PE ratio increased from 30 to 35. Its EPS hasn't changed. What has happened?",
        options: [
          "Profits have increased.",
          "The share price has increased but profits are flat so it is more expensive.",
          "New shares have been issued.",
          "The company has less debt."
        ],
        answer: "B"
      },
      { // Q12
        module: 3,
        question: "A share has a share price of Rs1,230 and an EPS of Rs41. What is the PE ratio? (Round to nearest whole number.)",
        options: [
          "15",
          "20",
          "30",
          "41"
        ],
        answer: "C"
      },
      { // Q13 (same as pre)
        module: 4,
        question: "What is promoter pledging?",
        options: [
          "Promoters promise to buy more shares.",
          "Promoters take out loans with their shares as collateral.",
          "Promoters pay out a dividend.",
          "Promoters sell the company."
        ],
        answer: "B"
      },
      { // Q14 (same as pre)
        module: 4,
        question: "According to Zerodha's checklist, which is a green flag?",
        options: [
          "Cash from operations is negative every year.",
          "Sales and profits are both increasing by more than 15% for 5 years.",
          "Auditor resigned this year.",
          "EPS is decreasing but profit is increasing."
        ],
        answer: "B"
      },
      { // Q15
        module: 4,
        question: "A company has increasing profits but increasing share count and falling EPS. The promoter holding has also fallen through 3 separate sales. How many red flags do they have? What should you do?",
        options: [
          "0 red flags. This is normal growth.",
          "2 red flags (dilution, promoter holding falling). Investigate further before buying.",
          "1 red flag. Buy now.",
          "5 red flags. The company is bankrupt."
        ],
        answer: "B"
      },
      { // Q16
        module: 4,
        question: "A company has 67% promoter pledged, a one-off gain of Rs5,168 crore in their FY25 profit, a PE ratio of 156 and -1% profit growth over 3 years. How many red flags do they have?",
        options: [
          "0",
          "1",
          "2",
          "3+"
        ],
        answer: "D"
      },
      { // Q17 (same as pre)
        module: 5,
        question: "What is the first step in the 10 step process?",
        options: [
          "Check PE ratio",
          "Ensure it is a mid cap company from the latest list from AMFI.",
          "Write your one sentence conclusion.",
          "Count the number of red flags."
        ],
        answer: "B"
      },
      { // Q18 (same as pre)
        module: 5,
        question: "Why should we only compare ratios to companies within the same sector?",
        options: [
          "All sectors have the same average ratios.",
          "Average margin or PE ratios within one sector could be unusual in another.",
          "It is faster.",
          "Screener only shows one sector at a time."
        ],
        answer: "B"
      },
      { // Q19
        module: 5,
        question: "Sona BLW has a PE ratio of 64.6 and profits have slowed to about 5% growth in FY26. Hero MotoCorp has a PE ratio of 18.2 and profits have increased by 32% in FY26. Is it better to invest in the cheaper stock?",
        options: [
          "Yes. Lower PE ratio wins.",
          "No. But Sona BLW's high PE ratio with slowing growth is a warning sign that needs to be explained.",
          "Yes. Hero sells more bikes.",
          "No. PE ratio shouldn't ever be used."
        ],
        answer: "B"
      },
      { // Q20
        module: 5,
        question: "A company has a PE ratio of 9.9, ROE of 11.9%, ROCE of 8.4%, debt to equity ratio of 1.3, promoter holding has fallen by 9.7% over 3 years and has contingent liabilities of about Rs13,000 crore. What is the best reason to be cautious before investing?",
        options: [
          "PE ratio is too high.",
          "High debt, low returns and owner is selling so low PE ratio could be a trap.",
          "Promoter holding increasing too quickly.",
          "ROE is above 25%."
        ],
        answer: "B"
      }
    ]
  }
};
