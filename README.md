# 📊 Commerce Insights Dashboard

An AI-powered full-stack analytics platform that helps businesses analyze sales, orders, customers, products, and inventory through interactive dashboards and intelligent business insights.

Designed as a generic e-commerce analytics solution, the application is not tied to any specific platform and can be used with data from Amazon, Shopify, WooCommerce, Flipkart, Etsy, and other marketplaces.

---
## Live demo: https://commerce-insights-dashboard.vercel.app/


## ✨ Features

### 📈 Dashboard Overview
- Revenue, Orders, Customers, and Profit KPIs
- Average Order Value
- Pending, Delivered, and Returned Orders
- Refund Rate Overview

### 📊 Sales Analytics
- Daily, Weekly, Monthly, and Yearly Sales Trends
- Revenue Analysis
- Order Trends
- Interactive Charts
- Date Range Filtering

### 📦 Product Analytics
- Best Selling Products
- Lowest Selling Products
- Revenue by Product
- Product Performance
- Return Rate Analysis
- Inventory Status

### 👥 Customer Analytics
- New vs Returning Customers
- Customer Growth
- Top Customers
- Average Customer Spending

### 📦 Inventory Management
- Current Inventory
- Low Stock Alerts
- Out of Stock Products
- Inventory Overview

### 📑 Order Management
- Search Orders
- Filter by Status
- Payment Information
- Order History
- Customer Details

### 💰 Returns & Refund Analysis
- Refund Statistics
- Return Rate
- Most Returned Products

### 🌍 Geographic Analytics
- Sales by Country
- Sales by State
- Sales by City

### 📂 CSV Import
- Upload Sales Data
- Automatic CSV Parsing
- Data Validation
- Store Data in Database

### 📤 Export Reports
- Export as CSV
- Export as PDF

### 🌙 User Experience
- Responsive Design
- Dark/Light Theme
- Modern Dashboard Layout

---

# 🤖 AI Features

Powered by Google Gemini API.

- AI Business Summary
- Sales Insights
- Inventory Recommendations
- Product Recommendations
- Trend Analysis
- Business Performance Reports

Example Insights:

- Revenue increased by 12% compared to last month.
- Product A is running low on stock.
- Category Electronics generated the highest profit.
- Returns have increased for Home Appliances.

---

# 📈 Sales Forecasting

A lightweight forecasting module predicts future sales using beginner-friendly statistical techniques.

- Moving Average
- Simple Linear Regression

The forecast is displayed alongside historical sales using interactive charts.

---

# 🛠 Tech Stack

## Frontend
- Next.js
- React
- TypeScript
- Tailwind CSS
- shadcn/ui
- Recharts

## Backend
- Next.js API Routes

## Database
- PostgreSQL
- Prisma ORM

## Authentication
- Clerk / NextAuth

## AI
- Google Gemini API

## Data Processing
- Papa Parse

## Deployment
- Vercel

---

# 📁 Project Structure

```
commerce-insights-dashboard/

├── app/
├── components/
├── hooks/
├── lib/
├── prisma/
├── public/
├── types/
├── utils/
├── styles/
└── README.md
```

---

# 🚀 Getting Started

## Clone the repository

```bash
git clone https://github.com/your-username/commerce-insights-dashboard.git
```

## Navigate to the project

```bash
cd commerce-insights-dashboard
```

## Install dependencies

```bash
npm install
```

## Configure Environment Variables

Create a `.env` file and configure the required environment variables.

Example:

```env
DATABASE_URL=

NEXTAUTH_SECRET=

NEXTAUTH_URL=

GEMINI_API_KEY=
```

---

## Start the Development Server

```bash
npm run dev
```

Visit:

```
http://localhost:3000
```

---

# 📊 Dashboard Modules

- Dashboard Overview
- Sales Analytics
- Customer Analytics
- Product Analytics
- Inventory Analytics
- Order Management
- Geographic Analytics
- Returns & Refund Analysis
- AI Insights
- Forecasting
- Report Export

---

# 🎯 Future Improvements

- Multi-store Support
- Role-Based Access Control
- Scheduled Report Generation
- Email Notifications
- Advanced Forecasting Models
- Custom Dashboard Widgets
- Real-time Analytics
- API Integrations with E-commerce Platforms

---

# 💡 Why This Project?

Commerce Insights Dashboard demonstrates practical full-stack development skills by combining modern web technologies with data visualization and AI-powered analytics.

The project showcases:

- Full-Stack Development
- Authentication
- Database Design
- Data Visualization
- API Integration
- AI Integration
- CSV Processing
- Forecasting
- Responsive UI Design
- Clean Component-Based Architecture

---

# 🤝 Contributing

Contributions are welcome.

Feel free to fork the repository, open issues, or submit pull requests for improvements and new features.

---

# 📄 License

This project is licensed under the MIT License.

---

## ⭐ If you found this project helpful, consider giving it a star!
```
