/**
 * Format a number as USD currency
 * @param {number} value - The value to format
 * @returns {string} Formatted USD string
 */
export function formatCurrency(value) {
  if (value === null || value === undefined) return 'N/A';
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}

/**
 * Format a number as a percentage with +/- sign
 * @param {number} value - The percentage value
 * @returns {string} Formatted percentage string
 */
export function formatPercent(value) {
  if (value === null || value === undefined) return 'N/A';
  const sign = value >= 0 ? '+' : '';
  return `${sign}${value.toFixed(2)}%`;
}

/**
 * Format large numbers with suffixes (B, M, K)
 * @param {number} value - The value to format
 * @returns {string} Formatted market cap string
 */
export function formatMarketCap(value) {
  if (value === null || value === undefined) return 'N/A';
  if (value >= 1e12) return `$${(value / 1e12).toFixed(2)}T`;
  if (value >= 1e9) return `$${(value / 1e9).toFixed(2)}B`;
  if (value >= 1e6) return `$${(value / 1e6).toFixed(2)}M`;
  if (value >= 1e3) return `$${(value / 1e3).toFixed(2)}K`;
  return formatCurrency(value);
}
