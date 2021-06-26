// loop over object

export function generateOptions(options) {
  return (
    Object.entries(options)
      // map over each entry and generate HTML
      .map(
        ([currencyCode, currencyName]) =>
          `<option value="${currencyCode}">${currencyCode} - ${currencyName}</option>`
      )
      // join to dump as HTML
      .join('')
  );
}

export function formatCurrency(amount, currency) {
  return Intl.NumberFormat('en-US', { style: 'currency', currency }).format(
    amount
  );
}
