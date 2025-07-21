#  Stock Market Dashboard

A responsive, real-time stock dashboard for the Indian stock market built using React, Tailwind CSS, Chart.js, and FastAPI with Yahoo Finance API.

##  Live Demo
👉 [Visit Deployed App]https://trackstockhistory.netlify.app/

---

##  Features

-  Left panel with searchable list of 50+ companies
-  Interactive chart for 1-month price history
-  Key stock metrics: 52-week High/Low, Avg. Volume, and 20-Day Moving Average
-  Live fetch & refresh functionality
-  Fully responsive UI for desktop & mobile

---

##  Tech Stack

### Frontend
- **React.js**
- **Tailwind CSS**
- **Chart.js** (via `react-chartjs-2`)
- **Lucide Icons**

### Backend
- **FastAPI**
- **yfinance** (Yahoo Finance)
- **CORS Middleware**

---

##  Sample Dataset
Not used – live data is fetched using [Yahoo Finance](https://finance.yahoo.com/) API via `yfinance`.

---

##  Deployment
- The fronted is deployed on netlify.com and backend is on render.com 

---

##  Thought Process

The goal was to create an intuitive and responsive dashboard that helps users visualize real-time stock trends for top Indian companies. I designed a clean UI with a scrollable list of company names and a detailed chart area. On selecting a company, the backend fetches live stock data using yfinance and returns it as JSON. The frontend then renders this using Chart.js.

Tailwind CSS enabled rapid prototyping of a modern, dark-themed UI. I used FastAPI for the backend because of its performance and ease of building REST endpoints. State management, dynamic search, loading/error handling, and responsive layout were carefully handled to ensure a smooth user experience.

To speed up development and enhance implementation quality, I also leveraged AI tools (like ChatGPT) for debugging assistance, optimization suggestions, and help with structuring some component efficiently. This allowed me to focus more on refining the user experience and functionality.

---

##  Challenges Faced

- Some companies had missing or limited historical data on Yahoo Finance; I added error handling for such cases.
- Chart responsiveness across screen sizes required tuning Chart.js options.
- Initial load times on Render were longer due to server cold start.

---


