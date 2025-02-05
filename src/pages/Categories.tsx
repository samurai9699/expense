import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { toast } from 'react-hot-toast';
import { Plus, Trash2 } from 'lucide-react';
import type { Category } from '../types';
import { useAuth } from '../components/AuthProvider';

export default function Categories() {
  const { user } = useAuth();
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [newCategory, setNewCategory] = useState({
    name: '',
    type: 'expense' as 'income' | 'expense',
    budget: '',
  });

  useEffect(() => {
    fetchCategories();
  }, []);

  async function fetchCategories() {
    try {
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .order('name');

      if (error) throw error;

      setCategories(data || []);
    } catch (error) {
      toast.error('Failed to load categories');
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    try {
      const { error } = await supabase.from('categories').insert([
        {
          user_id: user.id,
          name: newCategory.name,
          type: newCategory.type,
          budget: newCategory.budget ? Number(newCategory.budget) : null,
        },
      ]);

      if (error) throw error;

      toast.success('Category added successfully');
      setNewCategory({ name: '', type: 'expense', budget: '' });
      fetchCategories();
    } catch (error) {
      console.error('Error:', error);
      toast.error('Failed to add category');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this category?')) return;

    try {
      const { error } = await supabase
        .from('categories')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast.success('Category deleted successfully');
      fetchCategories();
    } catch (error) {
      toast.error('Failed to delete category');
      console.error('Error:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-luxury-gold"></div>
      </div>
    );
  }

  return (
    <div className="py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-2xl font-semibold text-luxury-text">Categories</h1>
            <p className="mt-2 text-sm text-luxury-muted">
              Manage your income and expense categories
            </p>
          </div>
        </div>

        {/* Add Category Form */}
        <div className="mt-6 relative">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-luxury-gold via-luxury-emerald to-luxury-purple rounded-lg blur opacity-10"></div>
          <form onSubmit={handleSubmit} className="relative space-y-4 max-w-lg bg-luxury-card p-6 rounded-lg">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-luxury-text">
                  Category Name
                </label>
                <input
                  type="text"
                  required
                  value={newCategory.name}
                  onChange={(e) => setNewCategory(prev => ({ ...prev, name: e.target.value }))}
                  className="mt-1 block w-full border-luxury-border rounded-md bg-luxury-background text-luxury-text focus:ring-luxury-gold focus:border-luxury-gold"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-luxury-text">
                  Type
                </label>
                <select
                  value={newCategory.type}
                  onChange={(e) => setNewCategory(prev => ({ ...prev, type: e.target.value as 'income' | 'expense' }))}
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-luxury-border rounded-md bg-luxury-background text-luxury-text focus:ring-luxury-gold focus:border-luxury-gold"
                >
                  <option value="income">Income</option>
                  <option value="expense">Expense</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-luxury-text">
                Monthly Budget (optional)
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-luxury-muted">$</span>
                </div>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  value={newCategory.budget}
                  onChange={(e) => setNewCategory(prev => ({ ...prev, budget: e.target.value }))}
                  className="block w-full pl-7 pr-12 border-luxury-border rounded-md bg-luxury-background text-luxury-text focus:ring-luxury-gold focus:border-luxury-gold"
                  placeholder="0.00"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-black bg-luxury-gold hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-luxury-gold transition-all duration-300 transform hover:scale-105"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Category
              </button>
            </div>
          </form>
        </div>

        {/* Categories List */}
        <div className="mt-8">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((category) => (
              <div
                key={category.id}
                className="relative group"
              >
                <div className="absolute -inset-0.5 bg-gradient-to-r from-luxury-gold via-luxury-emerald to-luxury-purple rounded-lg blur opacity-10 group-hover:opacity-20 transition duration-1000"></div>
                <div className="relative bg-luxury-card p-6 rounded-lg shadow-xl">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-medium text-luxury-text">
                        {category.name}
                      </h3>
                      <p className="mt-1 text-sm text-luxury-muted">
                        {category.type.charAt(0).toUpperCase() + category.type.slice(1)}
                      </p>
                      {category.budget && (
                        <p className="mt-1 text-sm font-medium text-luxury-gold">
                          Budget: ${category.budget.toFixed(2)}
                        </p>
                      )}
                    </div>
                    {!category.is_default && (
                      <button
                        onClick={() => handleDelete(category.id)}
                        className="text-red-500 hover:text-red-600 transition-colors"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}