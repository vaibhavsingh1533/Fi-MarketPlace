import { useState, useMemo } from 'react';
import { apiService } from '../services/apiService';

/**
 * Custom hook to calculate real-time EMI details for product variants & selected tenure
 */
export function useEMICalculator(basePrice, emiConfig, initialTenure = 6) {
  const [selectedTenure, setSelectedTenure] = useState(initialTenure);
  const [customPriceOffset, setCustomPriceOffset] = useState(0);

  const effectivePrice = useMemo(() => {
    return Math.max(0, (basePrice || 0) + customPriceOffset);
  }, [basePrice, customPriceOffset]);

  const noCostTenures = emiConfig?.noCostTenures || [3, 6];
  const processingFee = emiConfig?.processingFee || 0;

  const currentPlan = useMemo(() => {
    const isNoCost = noCostTenures.includes(selectedTenure);
    return apiService.calculateEMIPlan(effectivePrice, selectedTenure, isNoCost, processingFee);
  }, [effectivePrice, selectedTenure, noCostTenures, processingFee]);

  // Calculate quick summary for all available tenures
  const availableTenuresSummary = useMemo(() => {
    const min = emiConfig?.minTenure || 3;
    const max = emiConfig?.maxTenure || 12;
    const tenures = [3, 6, 9, 12].filter((t) => t >= min && t <= max);

    return tenures.map((t) => {
      const isNoCost = noCostTenures.includes(t);
      const plan = apiService.calculateEMIPlan(effectivePrice, t, isNoCost, processingFee);
      return {
        tenureMonths: t,
        isNoCost,
        monthlyInstallment: plan.monthlyInstallment,
        totalPayable: plan.totalPayable,
        savings: plan.savings
      };
    });
  }, [effectivePrice, emiConfig, noCostTenures, processingFee]);

  return {
    effectivePrice,
    selectedTenure,
    setSelectedTenure,
    setCustomPriceOffset,
    currentPlan,
    availableTenuresSummary
  };
}
