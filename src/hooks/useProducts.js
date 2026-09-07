import { useState, useEffect, useCallback } from 'react';
import { apiService } from '../services/apiService';

/**
 * Custom hook to handle async product fetching with search debouncing and race condition prevention
 */
export function useProducts(initialCategory = 'All') {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [category, setCategory] = useState(initialCategory);
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [sortBy, setSortBy] = useState('featured');

  // Debounce search query changes by 250ms
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
    }, 250);

    return () => {
      clearTimeout(handler);
    };
  }, [search]);

  // Load products with cancellation flag to prevent race conditions
  const loadProducts = useCallback(async () => {
    let isCurrent = true;
    setLoading(true);
    setError(null);

    try {
      const data = await apiService.getProducts({
        category,
        search: debouncedSearch,
        sortBy
      });

      if (isCurrent) {
        setProducts(data);
      }
    } catch (err) {
      if (isCurrent) {
        console.error('Failed to load products:', err);
        setError(err.message || 'Failed to load products');
      }
    } finally {
      if (isCurrent) {
        setLoading(false);
      }
    }

    return () => {
      isCurrent = false;
    };
  }, [category, debouncedSearch, sortBy]);

  useEffect(() => {
    let cancel = false;
    loadProducts();
    return () => {
      cancel = true;
    };
  }, [loadProducts]);

  return {
    products,
    loading,
    error,
    category,
    setCategory,
    search,
    setSearch,
    sortBy,
    setSortBy,
    refetch: loadProducts
  };
}
