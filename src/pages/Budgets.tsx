import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { toast } from 'react-hot-toast';
import type { Category } from '../types';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function Budgets() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [budgets, setBudgets] = useState<Record<string, number>>({});
  const [spending, setSpending] = useState<Record<string, number>>({});

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      // Fetch categories
      const { data: categoriesData, error: categoriesError } = await supabase
        .from('categories')
        .select('*')
        .eq('type', 'expense');

      if (categoriesError) throw categoriesError;

      setCategories(categoriesData || []);

      // Fetch current month's transactions
      const startOfMonth = new Date();
      startOfMonth.setDate(1);
      startOfMonth.setHours(0, 0, 0, 0);

      const { data: transactionsData, error: transactionsError } = await supabase
        .from('transactions')
        .select('*')
        .gte('date', startOfMonth.toISOString())
        .eq('type', 'expense');

      if (transactionsError) throw transactionsError;

      // Calculate spending per category
      const spendingByCategory = (transactionsData || []).reduce((acc, transaction) => {
        const categoryId = transaction.category_id;
        acc[categoryId] = (acc[categoryId] || 0) + transaction.amount;
        return acc;
      }, {} as Record<string, number>);

      setSpending(spendingByCategory);

      // Get budgets
      const budgetsByCategory = categoriesData?.reduce((acc, category) => {
        if (category.budget) {
          acc[category.id] = category.budget;
        }
        return acc;
      }, {} as Record<string, number>);

      setBudgets(budgetsByCategory || {});
    } catch (error) {
      toast.error('Failed to load data');
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  }

  const handleBudgetChange = async (categoryId: string, budget: number) => {
    try {
      const { error } = await supabase
        .from('categories')
        .update({ budget })
        .eq('id', categoryId);

      if (error) throw error;

      setBudgets(prev => ({ ...prev, [categoryId]: budget }));
      toast.success('Budget updated successfully');
    } catch (error) {
      toast.error('Failed to update budget');
      console.error('Error:', error);
    }
  };

  const chartData = categories.map(category => ({
    name: category.name,
    budget: budgets[category.id] || 0,
    spent: spending[category.id] || 0,
  }));

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Budget Management</h1>
        <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">
          Set and track your monthly budgets for each category
        </p>

        {/* Budget Overview Chart */}
        <div className="mt-8 bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
            Budget vs Spending Overview
          </h2>
          <div className="h-96">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={chartData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="budget" fill="#3B82F6" name="Budget" />
                <Bar dataKey="spent" fill="#EF4444" name="Spent" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Budget Settings */}
        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {categories.map(category => {
            const budget = budgets[category.id] || 0;
            const spent = spending[category.id] || 0;
            const percentage = budget > 0 ? (spent / budget) * 100 : 0;

            return (
              <div
                key={category.id}
                className="bg-white dark:bg-gray-800 rounded-lg shadow p-6"
              >
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                  {category.name}
                </h3>
                
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Monthly Budget
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <span className="text-gray-500 sm:text-sm">$</span>
                    </div>
                    <input
                      type="number"
                      min="0"
                      step="0.01"
                      value={budget}
                      onChange={(e) => handleBudgetChange(category.id, Number(e.target.value))}
                      className="block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    />
                  </div>
                </div>

                <div className="mt-4">
                  <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
                    <span>Spent: ${spent.toFixed(2)}</span>
                    <span>{percentage.toFixed(1)}%</span>
                  </div>
                  <div className="mt-1 h-2 bg-gray-200 rounded-full">
                    <div
                      className={`h-2 rounded-full ${
                        percentage > 100
                          ? 'bg-red-600'
                          : percentage > 80
                          ? 'bg-yellow-500'
                          : 'bg-green-500'
                      }`}
                      style={{ width: `${Math.min(percentage, 100)}%` }}
                    ></div>
                  </div>
                </div>

                {percentage > 80 && (
                  <p className={`mt-2 text-sm ${
                    percentage > 100 ? 'text-red-600' : 'text-yellow-500'
                  }`}>
                    {percentage > 100
                      ? 'Budget exceeded!'
                      : 'Approaching budget limit'}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}