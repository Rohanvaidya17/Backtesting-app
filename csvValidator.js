export const validateCSV = (data) => {
    // Log the data being validated
    console.log('Validating data:', data);
  
    if (!Array.isArray(data) || data.length === 0) {
      return {
        isValid: false,
        error: "The file appears to be empty or invalid. Please check your data."
      };
    }
  
    const requiredFields = [
      'date',
      'netIncome',
      'totalAssets',
      'shareholderEquity',
      'netInterestIncome',
      'earningAssets',
      'totalLoans',
      'totalDeposits',
      'nonPerformingLoans',
      'highQualityAssets',
      'totalNetCashOutflows',
      'totalCapital',
      'riskWeightedAssets'
    ];
  
    // Check for missing fields
    const firstRow = data[0];
    const missingFields = requiredFields.filter(field => !(field in firstRow));
  
    if (missingFields.length > 0) {
      console.log('Missing fields:', missingFields);
      return {
        isValid: false,
        error: `Missing required fields: ${missingFields.join(', ')}. \nExpected fields: ${requiredFields.join(', ')}\nFound fields: ${Object.keys(firstRow).join(', ')}`
      };
    }
  
    // Validate each row
    for (let i = 0; i < data.length; i++) {
      const row = data[i];
      const rowNumber = i + 1;
  
      // Check for invalid numbers
      for (const field of requiredFields) {
        if (field === 'date') continue;
        
        const value = row[field];
        if (typeof value !== 'number' || isNaN(value) || value < 0) {
          console.log(`Invalid value in row ${rowNumber}:`, field, value);
          return {
            isValid: false,
            error: `Invalid value found in row ${rowNumber} for field "${field}". Value must be a positive number.`
          };
        }
      }
  
      // Validate date format
      const dateValue = row['date'];
      if (!dateValue || !isValidDate(dateValue)) {
        console.log(`Invalid date in row ${rowNumber}:`, dateValue);
        return {
          isValid: false,
          error: `Invalid date format in row ${rowNumber}. Expected format: YYYY-MM-DD`
        };
      }
    }
  
    return {
      isValid: true,
      error: null
    };
  };
  
  const isValidDate = (dateStr) => {
    const regex = /^\d{4}-\d{2}-\d{2}$/;
    if (!regex.test(dateStr)) return false;
    
    const date = new Date(dateStr);
    return date instanceof Date && !isNaN(date);
  };