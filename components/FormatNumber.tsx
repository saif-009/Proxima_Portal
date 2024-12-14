// const FormatNumber = (amount: number) => {
//     return amount.toLocaleString('en-IN', {
//       maximumFractionDigits: 0,
//       style: 'currency',
//       currency: 'INR',
//     });
//   };
//   export default FormatNumber

const FormatNumber = (amount: number) => {
	return amount.toLocaleString('en-IN', {
	  maximumFractionDigits: 0,
	  style: 'decimal', // Use 'decimal' to avoid adding the currency symbol
	});
      };
      
      export default FormatNumber;