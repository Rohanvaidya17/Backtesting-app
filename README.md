# Banking Analytics Platform

A React-based web application for analyzing banking metrics and performing risk assessments.

## Features

- **Key Banking Metrics Analysis**
  - ROA (Return on Assets)
  - ROE (Return on Equity)
  - NIM (Net Interest Margin)
  - Historical trends visualization

- **Risk Analysis**
  - Credit risk assessment
  - Liquidity metrics
  - Capital adequacy ratios

- **Stress Testing**
  - Interest rate shock scenarios
  - Market value decline simulation
  - Deposit withdrawal stress tests

- **Data Management**
  - CSV file upload support
  - Data validation
  - Export results to Excel/CSV

## Technology Stack

- React
- Recharts for data visualization
- TailwindCSS for styling
- Papa Parse for CSV parsing
- XLSX for Excel export

## Getting Started

1. **Installation**
   ```bash
   npm install
   ```

2. **Running the Application**
   ```bash
   npm start
   ```
   The application will run on http://localhost:3000

3. **Using the Application**
   - Start by downloading the sample CSV template
   - Fill in your banking data
   - Upload the CSV file
   - Explore different analysis tabs
   - Export results as needed

## Project Structure

```
src/
  ├── components/
  │   ├── BankingMetrics.js
  │   ├── RiskAnalysis.js
  │   ├── StressTesting.js
  │   ├── ExportResults.js
  │   └── ui/
  │       ├── button.js
  │       ├── card.js
  │       └── ...
  ├── utils/
  │   └── csvValidator.js
  └── App.js
```

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License.
