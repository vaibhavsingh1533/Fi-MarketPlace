import productsData from '../data/products.json';

/**
 * Mock API Service simulating async network communication for 1Fi Marketplace
 */
export const apiService = {
  /**
   * Fetch products with optional filtering, search, and sorting
   */
  async getProducts({ category = 'All', search = '', sortBy = 'featured' } = {}) {
    // Simulate network delay for real API experience
    await new Promise((resolve) => setTimeout(resolve, 350));

    let results = [...productsData];

    // Filter by Category
    if (category && category !== 'All') {
      results = results.filter(
        (p) => p.category.toLowerCase() === category.toLowerCase()
      );
    }

    // Filter by Search Query
    if (search.trim()) {
      const q = search.toLowerCase().trim();
      results = results.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.tagline.toLowerCase().includes(q)
      );
    }

    // Sort Results
    if (sortBy === 'price-low') {
      results.sort((a, b) => a.defaultPrice - b.defaultPrice);
    } else if (sortBy === 'price-high') {
      results.sort((a, b) => b.defaultPrice - a.defaultPrice);
    } else if (sortBy === 'rating') {
      results.sort((a, b) => b.rating - a.rating);
    }

    return results;
  },

  /**
   * Fetch single product details by ID
   */
  async getProductById(id) {
    await new Promise((resolve) => setTimeout(resolve, 200));
    const product = productsData.find((p) => p.id === id);
    if (!product) {
      throw new Error(`Product with ID ${id} not found.`);
    }
    return product;
  },

  /**
   * Calculate EMI Plan breakdown for a given product price & tenure
   */
  calculateEMIPlan(price, tenureMonths, isNoCost = false, processingFee = 0) {
    // Annual interest rate for standard EMI (e.g. 14% p.a.) vs 0% for No-Cost
    const annualInterestRate = isNoCost ? 0 : 0.14;
    const monthlyRate = annualInterestRate / 12;

    let monthlyInstallment = 0;
    let totalInterest = 0;

    if (monthlyRate === 0) {
      monthlyInstallment = Math.ceil(price / tenureMonths);
      totalInterest = 0;
    } else {
      // Standard EMI Formula: [P x R x (1+R)^N]/[(1+R)^N-1]
      const emi =
        (price * monthlyRate * Math.pow(1 + monthlyRate, tenureMonths)) /
        (Math.pow(1 + monthlyRate, tenureMonths) - 1);
      monthlyInstallment = Math.ceil(emi);
      totalInterest = Math.max(0, monthlyInstallment * tenureMonths - price);
    }

    const totalPayable = monthlyInstallment * tenureMonths + processingFee;
    const standardCostWithInterest = price + price * 0.14 * (tenureMonths / 12);
    const savings = isNoCost ? Math.max(0, Math.round(standardCostWithInterest - price)) : 0;

    // Generate monthly payment schedule timeline
    const schedule = [];
    const today = new Date();
    for (let i = 1; i <= tenureMonths; i++) {
      const dueDate = new Date(today);
      dueDate.setMonth(today.getMonth() + i);
      schedule.push({
        monthNumber: i,
        dueDate: dueDate.toLocaleDateString('en-IN', {
          day: 'numeric',
          month: 'short',
          year: 'numeric'
        }),
        amount: monthlyInstallment
      });
    }

    return {
      tenureMonths,
      isNoCost,
      annualInterestRate: isNoCost ? '0%' : '14% p.a.',
      monthlyInstallment,
      processingFee,
      totalInterest,
      totalPayable,
      savings,
      schedule
    };
  }
};
