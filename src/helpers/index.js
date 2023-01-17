export function getYearDifference(year) {
  return new Date().getFullYear() - year;
}

export function calculateBrand(brand) {
  // 1.30 = 30% increment
  // 1.15 = 15% increment
  // 1.05 = 5% increment
  // cada marca incrementa el valor del seguro en un porcentaje diferente

  let incremento;
  switch (brand) {
    case '1':
      incremento = 1.3;
      break;
    case '2':
      incremento = 1.15;
      break;
    case '3':
      incremento = 1.05;
      break;
    default:
      break;
  }
  return incremento;
}

export function getPlan(plan) {
  // 1.20 = 20% increment
  // 1.50 = 50% increment
  // esto es depende del plan que elijas
  return plan === '1' ? 1.2 : 1.5;
}

export function formatCurrency(amount) {
  return amount.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
  });
}
