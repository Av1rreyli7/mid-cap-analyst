/* =============================================================
   MODULES  (data/modules.js)
   -------------------------------------------------------------
   The five learning modules. Each module has:
     title     - shown on the Modules page and at the top of the module
     videoFile - the video shown on the Video tab
     text      - the full module text (shown on BOTH tabs)

   HOW THE TEXT IS LAID OUT
   Every line of text becomes its own paragraph.
   A few symbols at the very start of a line change how it looks.
   The symbols themselves are never shown on the website:
     ## at the start  -> a small heading
     -  at the start  -> a bullet point
     +  at the start  -> a numbered step (1, 2, 3...)
     >  at the start  -> a highlighted box
     **words**        -> those words are shown in bold
   You can edit the words freely. Just keep the text between the
   two ` (backtick) marks.
   ============================================================= */

const MODULES = [
  /* ---------------------------------------------------------- */
  /* MODULE 1                                                    */
  /* ---------------------------------------------------------- */
  {
    title: "What is Fundamental Analysis?",
    videoFile: "videos/module1.mp4",
    text: `
Hi and welcome to Module 1! In this module we will learn what Fundamental Analysis is, what it is not (guessing), what a mid-cap stock is and see what happened with almost a million people ignoring the numbers on one IPO!
A stock is often referred to as its price. People often talk about stocks going up and down and everyone has an opinion on where it will go. However behind every stock is an actual company. A company that sells products, employs staff, takes out loans and either profits or doesn't.
There are two types of analysis.
- **Technical analysis** looks at the trends in a stock's price and volume to try and predict where it might go next.
- **Fundamental analysis** looks at the company. It looks at how much sales, profits, debt, cash, etc the company has to work out how much the company is actually worth. As stated by Zerodha Varsity, one of our main sources, "Fundamental Analysis is the art of evaluating the intrinsic value of a stock to find long-term investing opportunities."
> The easiest way to remember this is technical analysis = price story, fundamental analysis = company story.
We will be looking at fundamental analysis in this app. Whilst the price can be influenced by hype, ultimately the company will drive the price.
Fundamental analysis consists of two parts.
- **Quantitative analysis** - Looking at numbers. How much revenue the company has (sales), what their profit is (revenue - costs), how much debt they have and how much cashflow they have (real cash coming in). We will also look at ratios derived from these numbers. This is covered in Modules 2 and 3.
- **Qualitative analysis** - The story. What do they sell, who runs the company, who are their competitors and are there any red flags with how they are run. This is covered in Module 4.
A good analysis will include both of these. You could have a company with great numbers but lying management, or honest management with bad numbers.
> The single most important thing to remember in this app (and will be mentioned in every module) is that numbers mean nothing on their own. Ratios only become useful when compared to something.
Zerodha have an easy example. Ultratech Cement has a profit margin of 15%. We don't know if that is good. However if we compare it to their competitor ACC Cement in the same industry with a 12% margin, then we know it is good. They are keeping more of every rupee of sales than their competitor.
You can compare to competitors in the same industry, or compare against the company's previous years. We will be doing both throughout this app.
How do real investors research a stock? Zerodha explain there are 3 steps.
- **Step 1** - Understanding the business. What does it do, who runs it, who buys from it and who are their competitors. A serious investor will spend about 15 hours on this part of the analysis. If there are any red flags here, don't go any further.
- **Step 2** - Financial checklist. This is where the ratios come in. Growth, margins, debt, cashflow, return on equity.
- **Step 3** - Valuation. Whether the price is fair or not. Professionals will use a method called discounted cash flow. This is too advanced for this app so we will stop at the valuation ratios (PE etc). These will be learnt in Module 3.
**What is a mid-cap stock?** This app focuses on mid-caps so this is important.
In India, every listed company is ranked by its market capitalisation under rules set by SEBI (the stock market regulator), and the official ranked list is prepared and published by AMFI (the mutual fund industry body). The market capitalisation is simply the share price multiplied by the total number of shares. This is how much the market values the whole company.
Large caps are the top 100 companies, mid-caps are ranked 101-250 and small caps are ranked 251+.
AMFI publishes an official list every 6 months (January and July). This list uses the average market cap over the last 6 months. In the July 2026 list, a company needed to have a market cap of around 33,500 crore rupees to qualify as a mid-cap. To qualify as a large-cap they needed to have a market cap of around 1,06,300 crore rupees. The average mid-cap was worth around 62,454 crore rupees. There are exactly 150 companies in the mid-cap group. These companies are tracked by the NSE in an index called the Nifty Midcap 150. Mid-cap mutual funds must invest at least 65% of their money in these 150 companies.
**Why are we focussing on mid-caps?** Large-caps are analysed by thousands of analysts so there is very little to find out. Small-caps often move based on rumours rather than numbers. Mid-caps are in the middle. They have enough history and reporting to analyse properly but also enough growth and risk to actually make a difference.
Let's finish this module off with a story.
In November 2021 Paytm (One97 Communications) had the largest IPO in Indian history. It raised 18,300 crore rupees. The issue price was 2,150 rupees per share. Almost 1 million retail investors applied.
However on the 18th November 2021 it opened at 1,950. This is already a 9% drop from the issue price. By the end of the day it closed at 1,564 on the BSE (a 27.25% drop) and 1,560 on the NSE (a 27.44% drop). Around 38,000 crore rupees of value was lost in one day. It continued to drop on day 2 by up to 17-18% during the day to around 1,271.
**Why did this happen?** The company had never made a profit. It was valued extremely highly. Analysts questioned the business model as UPI had made digital wallets far less important. The IPO subscription was also low at just 1.89 times.
All of this information was available in the prospectus. Anyone who looked at the numbers rather than the hype could have seen the risk. This is what fundamental analysis is for. The next 4 modules will teach you how to do this.
> **To recap Module 1.** Fundamental analysis looks at the company not the price. It has quantitative and qualitative analysis. Ratios mean nothing on their own so always compare to competitors or previous years. Mid-caps are ranked 101-250 in India. The list is updated every 6 months by AMFI. Paytm dropped 27% on day 1 as the numbers were poor and the hype was high.
See you in Module 2.
`
  },

  /* ---------------------------------------------------------- */
  /* MODULE 2                                                    */
  /* ---------------------------------------------------------- */
  {
    title: "The Three Financial Statements",
    videoFile: "videos/module2.mp4",
    text: `
Welcome to Module 2! We will look at the 3 documents every listed company must publish. We will also look at what each one tells us and how to spot companies whose profit is not backed by real cash.
**Where do the numbers come from?** Every listed company must publish 3 financial statements. The full version can be found in their annual report. This is a lengthy PDF on their investor relations page. You will not need to read the whole thing. Sites such as Screener.in and Moneycontrol give you the same numbers in an easy to read table format. This is what we use in our company cards.
There are 3 statements.
**Profit and Loss** - Did they make a profit this year? This is for 1 year/quarter. The numbers flow from top to bottom.
- **Revenue from operations** - Sales. How much money they have made from their actual business.
- **Other income** - Income from non-business related activities. This could be interest made on investments. Ignore this when assessing how good the business is (Zerodha).
- **Total expenses** - Cost of raw materials, salaries, rent etc.
- **Operating profit/EBITDA** - This is your revenue from operations minus your operating expenses. This shows you how good the core business is. It is profit before interest, depreciation and tax.
- **Finance cost** - Interest paid on loans.
- **Depreciation** - Depreciation of machines and buildings each year.
You will then have profit before tax, tax and finally net profit (PAT = profit after tax). This is the final number. This is what is left for the shareholders.
**Balance sheet** - What do they own and what do they owe? This is a snapshot of one day (usually 31st March). The balance sheet has two sides and will always balance. Assets = Liabilities + Equity.
- **Equity** - Share capital + Reserves. This is also known as equity/net worth/book value. This is the shareholders' money.
- **Liabilities** - The main ones to look at are long term and short term borrowings. This is the lenders' money. This is the company's debt.
- **Assets** - Fixed assets (factories, machines, hospitals, hotels etc). Inventory (stock to sell). Receivables (money owed by customers). Cash.
The two most important numbers from the balance sheet are equity and borrowings. These affect the debt to equity ratio and return on equity (covered in Module 3).
**Cashflow** - This is often ignored by beginners.
The reason this exists is because companies can count sales as they send an invoice. Even though they haven't received any payment.
Cashflow has 3 sections. Cash from operations (CFO) - Cash generated from the business. Cash from investing - Cash spent on buying assets (also known as capex). Cash from financing - Loans taken and paid back. Dividends paid.
> Zerodha has a clear checklist. Cash from operations should be positive. If they are not generating cash from their operations something is wrong.
Let's look at an example of a company making a profit but no cash.
Mazagon Dock Shipbuilders is a mid-cap company that builds warships and submarines for the Indian Navy. In FY26 (April 2025-March 2026) they had a net profit of 2,583 crore rupees. However their net cash from operations for the same year was -2,891 crore rupees. In the previous year (FY25) they had positive cash from operations of 2,078 crore rupees. This is because they had been taking advance payments from their customers and this ran out.
Compare this to Hero MotoCorp. In FY26 they had a net profit of 5,776 crore rupees but had cash from operations of 8,315 crore rupees. They have more cash than profit. This is real profit.
Both are mid-caps and both showed a profit in their P&L for the same year. However only the cashflow shows the difference.
Two habits to get into.
- **Always look at consolidated numbers.** This includes the company and all their subsidiaries. Standalone means just the parent company. Zerodha says that most of the time if you are getting different numbers to what is on the website it's because one is consolidated and one is standalone. All the company cards in this app are labelled consolidated, FY26.
- **Know where to look for free.** Annual reports can be found on the company's investor relations page. All results filings can be found on NSE India. Screener.in has 10 year tables, ratios, shareholding and cashflow. Moneycontrol has a ratios tab.
> **To recap Module 2.** The P&L tells you if they made a profit. Net profit/PAT is the final line. The balance sheet tells you what they own and owe. Equity is shareholders money and borrowings are debt. The cashflow tells you if they have real cash. Cash from operations should be positive. Not all profit equals cash in the bank. Mazagon Dock had a profit of 2,583 crore in FY26 but had a cash from operations of -2,891 crore. Always look at consolidated figures.
See you in Module 3.
`
  },

  /* ---------------------------------------------------------- */
  /* MODULE 3                                                    */
  /* ---------------------------------------------------------- */
  {
    title: "The 10 Ratios",
    videoFile: "videos/module3.mp4",
    text: `
Welcome to Module 3. This is the largest module. You'll learn the 10 ratios that are seen on every company card in the app, what they mean, what is considered a good score and 2 pitfalls to avoid.
**Why use ratios?** As we can see, it is difficult to compare raw figures. If a company makes 1,000 crore in profit, this is an enormous figure for a small company but nothing for a very large company. Ratios help by converting raw figures into percentages and multiples. Zerodha has grouped them into 4 categories - Profitability, Leverage (Debt), Valuation and Operating. Almost all of the figures below can be found on a company's Screener page. The two exceptions are interest cover, which you calculate from the P&L, and debt to equity, which is calculated from the balance sheet (borrowings divided by equity).
> Remember ratios shouldn't be looked at in isolation. Refer to Module 1. They must be compared to competitors in the same sector or previous years.
## Profitability:
**Operating Profit Margin (OPM).** This shows what % of sales are left after running costs. This is calculated by dividing operating profit by sales. The higher the ratio, the better. This should be compared within the sector. Hindustan Copper had an OPM of 48% in FY26 as they operate in mining and have very high margins at high metal prices. Hero MotoCorp had an OPM of 15% as they operate in vehicle manufacturing which has thin margins.
**Net Profit Margin (PAT margin).** This shows what % of revenue is left after everything. This is calculated by dividing net profit by total revenue. Compared to competitors.
**Return on Equity (ROE).** This is the main one to look at. It shows how much profit the company is making from owner funds. It is calculated by taking net profit and dividing by shareholder equity and multiplying by 100. The average ROE of top Indian companies is 14-16% according to Zerodha. The Zerodha author prefers to look at companies with an ROE of 18%+. The Investable Checklist looks for 20-25%. Ajanta Pharma had 27.1%, Hindustan Copper had 32.9% and NLC India had 11.9%.
**Return on Capital Employed (ROCE).** This works in the same fashion as ROE but takes into account debt. This is important as companies can increase their ROE by taking on debt, which I'll show you in a minute, but borrowing does not inflate ROCE in the same way. If ROE is much higher than ROCE then they are running on expensive debt. AIA Engineering had 21.1%, NLC India had 8.4%.
## Leverage:
**Debt to Equity.** This shows how much debt the company has. This is calculated by taking total debt and dividing by total equity. If it is 1 then debt equals equity. If it is higher than 1 then you should be wary of the company as they are highly leveraged. If it is less than 1 then they have a larger equity base. Generally speaking anything under 1 is good and most companies shouldn't be higher than 2 (Investopedia). AIA Engineering had a debt to equity of almost zero in FY26. NLC India had approximately 1.3.
**Interest cover.** This shows how many times they can pay interest. This is calculated by taking EBIT (profit before interest and tax) and dividing by interest costs. Zerodha says 3 times is good. Jain Irrigation, Zerodha's example of a stressed company had only 1.2 times. This isn't shown on Screener so you will have to calculate it yourself using the P&L.
## Valuation:
**Earnings Per Share (EPS).** This shows how much profit they are making per share in the company. This is calculated by taking net profit and dividing by the number of shares. EPS should be growing in line with profits. If profit is rising but EPS isn't then the company is issuing new shares.
**Price Earnings Ratio (PE).** This shows how many years of profit you are paying for one share. Investopedia and Investor.gov say this helps to determine if the stock is over or undervalued in relation to the company itself or others. The Zerodha author tries to avoid stocks over 25-30 times earnings. Compare to the industry PE. NLC India looks cheap at 9.9 times in October 2026. Sona BLW looks expensive at 64.6 times. Aster DM looks distorted as they have a one off gain. I'll explain why in the PE pitfall.
**Price Book Ratio (P/B).** This shows how much you are paying compared to their net worth. There isn't a 'good' figure to look for so compare to peers. This is most important for banks and asset heavy companies. Hero MotoCorp had a P/B of 4.7 times. Indian Hotels had a P/B of 8.2 times.
**Dividend Yield.** This shows what % of your investment you are getting back each year in cash form. Often seen as good if between 2-6%. Most high growth companies won't pay much as they are reinvesting profits. Hero MotoCorp had 3.67%. Max Healthcare had 0.25%.
That covers the 10 ratios. One thing we need to look at in the checklist is growth rates. Zerodha likes to see sales and profits grow above 15% per annum (CAGR). CAGR is the compound annual growth rate. This is calculated by taking the final value and dividing by the initial value. Take this to the power of 1 over the number of years. Then subtract 1. You don't have to calculate this. Screener provides 3,5 and 10 year growth for sales and profits on each company page.
## Pitfalls:
**Pitfall 1: ROE.** Zerodha explains using a pizza oven example. Let's say you open a shop and buy a pizza oven for 10,000. In your first year you make 2,500 in profit.
- If you paid for the oven yourself your equity is 10,000. ROE = 2,500/10,000 = 25%.
- If you borrowed 2,000 and invested 8,000 of your own, ROE = 2,500/8,000 = 31.25%.
- If you borrowed 5,000 and invested 5,000, ROE = 2,500/5,000 = 50%.
The profit hasn't changed, only the amount of debt. This means a high ROE can indicate a great business or a highly leveraged business. Take note of how high the debt to equity is. You want high ROE with low debt.
**Pitfall 2: PE.** This will increase as the price increases. If the share price goes from 500 to 750 but EPS stays the same at 25 then PE will increase from 20 to 30. Nothing has changed about the business.
A low PE can indicate the stock is cheap or that the business is in trouble and the market knows. A very high PE can indicate that the market expects high growth or there is something strange in the earnings. Aster DM's PE is 156 because last year's profit was inflated by a one off gain, and this year's profit has fallen back to its small normal level, which makes the PE look huge.
**Earnings can be manipulated.** Zerodha warns that companies may change their accounting policies or have low depreciation to increase profits. Check that earnings are growing in line with sales and cashflow. If profit is increasing but sales and cash aren't then be wary.
**Operating Ratios:** These are good to know but won't be in the quiz. Inventory Days = 365/inventory turnover. This shows how long the company holds stock for. Lower is better. Receivable Days (DSO) shows how long customers take to pay. This is a warning if it increases. Asset Turnover = sales/assets. This shows how much sales they are making per rupee of assets. Higher is better. This works well for manufacturers such as AIA Engineering and Sona BLW. It means very little for hospitals and hotels.
> **To summarise Module 3.** Profitability ratios include OPM, Net Margin, ROE (aim for over 18%) and ROCE. Leverage ratios include Debt to Equity (under 1 is good) and Interest Cover (3 times is good). Valuation ratios include EPS, PE (compare to industry and be wary if over 25-30), P/B and Dividend Yield. Growth should be over 15% per annum for sales and profits over 5 years. Watch out for high ROE with high debt. Earnings can be manipulated, which distorts PE.
See you in Module 4.
`
  },

  /* ---------------------------------------------------------- */
  /* MODULE 4                                                    */
  /* ---------------------------------------------------------- */
  {
    title: "Green Flags and Red Flags",
    videoFile: "videos/module4.mp4",
    text: `
Welcome to Module 4. In this module we'll look at the indicators that show us a healthy company, indicators that show us a risky company, where to find them for free and how to count them without jumping to conclusions.
We count flags. If there is one green or red flag then this is a reason to look further into the company. However if there are 3+ red flags then they will usually tell a consistent story. This module is to show you the flags to look for. Module 5 will be used to make your decision.
## Green Flags:
- **Sales and profits are growing together by over 15% per annum over the last 5 years.** Real growth.
- **EPS is growing in line with profits.** No dilution.
- **Gross Margin over 20%.** They have pricing power (moat).
- **Low debt.** Not highly leveraged. Debt to equity comfortably under 1.
- **Positive Cashflow from Operations.** Profits are real.
- **ROE over 20-25% with low debt.** They make a good return on owner money.
- **Receivables are stable as a % of sales.** They aren't pushing sales on credit.
- **Inventory growing in line with profits (for manufacturers).**
- **Promoter holdings are stable or increasing.** They believe in their own company.
## Red Flags:
- **Profit but no cash.** High net profit but low or negative cashflow from operations for 2-3 years.
- **Promoter pledging increasing.** Promoters are the founders or controlling owners of the company. Pledging means they have borrowed money using their own shares as collateral. If the share price drops then the lender can sell the shares causing the price to drop further. Pledge % can be found on Screener under the shareholding tab.
- **Resigned auditor or qualified audit.** The auditor checks the accounts. If they've resigned or added warnings then ask yourself why?
- **Too many subsidiaries.** Is this a way of moving money out of the listed company?
- **Loan to promoter owned companies.** Money is being moved out of the company to the owner's private businesses.
- **Lots of dilution.** Shares are increasing so EPS is decreasing.
- **High valuation with slowing growth.** You're paying a growth price for a company that isn't growing anymore.
- **Promoter holdings decreasing in multiple rounds.** Owners selling.
- **Criminal history or strong political connections to promoters.** Step 1 check from Zerodha.
- **Easy to copy products in a cheap labour country.**
- **Large contingent liabilities.** Cases in court or guarantees.
- **Low tax rate or capitalised interest.** Automatically highlighted in the cons box on Screener.
Let's look at some real mid cap examples. Data as of October 2026.
- **Aster DM Quality Care (Hospital Chain)** has 67% of promoter holdings pledged. Blackstone, one of their promoters pledged their entire 28.56% in August 2026. This is the most obvious red flag.
- **Mazagon Dock** had a profit of 2,583 crore in FY26 but had a net cashflow from operations of -2,891 crore. Profit but no cash. This is a warning for 1 year but would be a serious flag for 2-3 years.
- **Sona BLW** has a high valuation of 64.6 times with slowing profit growth of ~5% in FY26.
- **Hindustan Copper and NLC India** both had their promoter (government) sell part of their stake in August 2026 and 2025. Whilst not as alarming as family members selling, it still causes dilution to other shareholders.
- **NLC India** has around 13,000 crore of contingent liabilities.
- **Dr. Reddy's** had a 27% fall in profits in FY26. They also received a Form 483 from the USFDA in October 2026. A Form 483 is a list of observations from the US drug regulator during an inspection.
All of this can be found for free. Look at the Pros & Cons box at the top of each company page on Screener. Look at the shareholding tab to see promoter holdings and pledge per quarter. Look at the cashflow tab. On NSE India look at company filings. Auditor and director resignations must be announced here.
> **Something to note about India.** Most listed companies in India are run by their promoters. Therefore the actions of promoters (pledging, selling and related party deals) are more important than they would be in a professional management market.
**How is this used in the app?** Every company card in the simulation will show how many flags there are. Green on one side and red on the other. The flags are based on the lists from this module. The flags are just providing information and you will need to make your decision. Module 5 shows you how.
> **To summarise Module 4.** If there is 1 flag, look further. If there are 3+ red flags then stop until you understand why. Green flags include growth over 15%, EPS in line, margins over 20%, low debt, positive cash, high ROE with no debt, stable receivables and stable promoters. Red flags include profit but no cash, pledging, auditor resignation, related party deals, dilution, high PE with slowing growth, promoter selling and large contingent liabilities. These can be found on Screener under the shareholding and cashflow tabs. In India look out for promoters.
See you in Module 5.
`
  },

  /* ---------------------------------------------------------- */
  /* MODULE 5                                                    */
  /* ---------------------------------------------------------- */
  {
    title: "The 10 Step Framework",
    videoFile: "videos/module5.mp4",
    text: `
Welcome to the final module. We will now learn a framework that can be used on any company card in around 15 minutes. We'll also look at why mid caps require an extra level of caution. We'll then do a full worked example of comparing two real mid caps. Once we've learned this, we will be ready to play the simulation.
## The 10 step framework:
+ **Check if it is a mid cap.** Check that it is between company rank 101-250 on the latest AMFI list. This is the July 2026 list, with a cut-off of approx 33,500 crore. If the market cap is near the cut-off, take note as it may move categories at the next list.
+ **Understand the basics.** What do they sell? To whom? And who are their top 2-3 competitors?
+ **Check growth.** Check that sales and profits have grown well (ideally >15%) over the last 3 and 5 years. If profits have increased but sales haven't, make sure to check why. For example, Aster DM had one off gains of 5,168 crore on the sale of a business, meaning their profits were massive in FY25 but very small in FY26.
+ **Check profitability.** Compare operating margin and Return on Equity to one competitor in the same sector (e.g. hospital to hospital, miners to miners).
+ **Check debt.** Debt to equity ratio should be less than 1. If ROE is high, check it is not high due to debt (ROE trap from Module 3).
+ **Check cash flow.** Cash flow from operations should be positive. Should be similar to Net profit.
+ **Check owners.** Promoters should be stable, with no pledging. Also ensure there hasn't been a large amount of selling of shares recently. No auditor or director changes in last year.
+ **Check price.** Compare PE ratio to industry average. Also ensure it makes sense from a historical perspective.
+ **Count red/green flags.** Use the framework from Module 4. If there are three or more red flags, don't invest until you understand why.
+ **Write a sentence.** "I would invest because..." or "I wouldn't invest because...". If you cannot write a sentence then you have not completed the analysis. This is exactly what you will do in the simulation.
**Why do mid caps need more caution?** Mid caps tend to be volatile. Between the 12 companies in this app, some have had massive movements in their share price over the last year up to October 2026. Sona BLW had a 57% increase whereas Mazagon Dock had a 34% decrease. Most of these companies are profitable and established.
This shows that the numbers help you understand the quality of the business, but not what the price will do next month. A good analysis will help you improve your chances, but you will never eliminate risk. That's why the simulation is over months.
**Sector bias.** Some ratios will not make sense. Inventory and receivables days make sense for manufacturing businesses such as Hero MotoCorp or AIA Engineering. However, for a service based company like Indian Hotels or Max Healthcare these ratios do not matter. Book value is most important for banks. Cost of goods sold and gross margin don't make sense for banks or NBFCs hence why there are none in the simulation.
Let's do a full worked example. Ajanta Pharma and NLC India. Both FY26, both consolidated. Both confirmed mid caps. Ajanta is a pharmaceutical company whilst NLC is a government owned power/lignite mining company.
**Growth:** Sales growth over 3 years: Ajanta = 13%, NLC = 3%. Profit growth over 3 years: Ajanta = 24%, NLC = 2%. Ajanta is growing well. NLC is stagnant.
**Profits:** Operating margin: Ajanta = 28%, NLC = 32%. Return on Equity: Ajanta = 27.1%, NLC = 11.9%. ROCE: Ajanta = 34.5%, NLC = 8.4%. Both have good margins. However Ajanta is making a lot more from its capital.
**Debt:** Debt to equity: Ajanta = ~0.06, NLC = ~1.3. Ajanta has a high ROE but very little debt. This is ideal. NLC has a low ROE despite having high levels of debt.
**Cash Flow:** Cash flow from operations: Ajanta = 529 crore, NLC = 5,166 crore. Cash flow is positive. NLC has high levels of cash as it is a capital intensive utility. Often utilities have high levels of debt and cash.
**Owners:** Ajanta has 63.5% held by promoters. This is stable with no pledging. NLC has 69.5% held by promoters (the government). However this has fallen by 9.7% over the last three years due to selling.
**Price:** PE ratio: Ajanta = 36.2, NLC = 9.9. Dividend Yield: Ajanta = 0.97%, NLC = 1.68%. NLC looks cheap and gives more back. Ajanta looks expensive.
**Flags:** Ajanta has lots of green flags. It has growth, ROE without debt, positive cash flow and stable owners. However it has one warning sign. It has a high valuation (36 times earnings and 9 times book value). NLC has several red flags. It has a high debt to equity, selling promoters, lots of contingent liabilities (13,000 crore) and low growth. In its favour it has positive cash flow, which is a green flag, and a low PE.
**Sentence:** Ajanta has a high quality business with no debt and growth. The market has valued it highly so the risk is in the price. NLC is a cheap, slow utility with high levels of debt. The owner is selling so the low PE may be a trap.
> This example doesn't give a clear answer. This is what the app is trying to teach you to do. Just because it is cheap doesn't mean it is better.
## Once you get into the simulation:
You will be given a fictional budget of 10 lakh rupees. You will be given real mid cap company cards. Each card will have the 10 ratios (from Module 3), growth, cash flow, promoter information and number of flags. All this information will be from before the simulation date. Use the 10 step framework on each card. Divide your budget any way you want. Write your sentence for each investment. See how you did compared to the Nifty Midcap 150 during the real time period. Read through the reveal screen. This shows you the 2-3 ratios that explain each company's price move.
## Summary of Module 5:
> The 10 steps are: Check if it is a mid cap, understand basics, check growth, check profitability, check debt, check cash flow, check owners, check price, count flags, sentence. Mid caps are volatile so the numbers do not tell you what the price will do next month, just the quality. Only compare within sectors. Ajanta is the high quality expensive business and NLC is the cheap risky business. There isn't a clear answer. Write your sentence. If you can't write your sentence then you haven't finished.
`
  }
];
