import React, { useState } from 'react';
import { Dialog } from '@headlessui/react';
import { X } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { toast } from 'react-hot-toast';
import type { Category } from '../types';
import { useAuth } from './AuthProvider';

interface AddTransactionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  categories: Category[];
}

export default function AddTransactionModal({
  isOpen,
  onClose,
  onSuccess,
  categories,
}: AddTransactionModalProps) {
  const { user } = useAuth();
  const [type, setType] = useState<'income' | 'expense'>('expense');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setLoading(true);

    try {
      const { error } = await supabase.from('transactions').insert([
        {
          user_id: user.id,
          type,
          amount: Number(amount),
          category_id: category,
          description,
          date,
        },
      ]);

      if (error) throw error;

      toast.success('Transaction added successfully');
      onSuccess();
      onClose();
      resetForm();
    } catch (error) {
      console.error('Error:', error);
      toast.error('Failed to add transaction');
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setType('expense');
    setAmount('');
    setCategory('');
    setDescription('');
    setDate(new Date().toISOString().split('T')[0]);
  };

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      className="fixed inset-0 z-10 overflow-y-auto"
    >
      <div className="flex min-h-screen items-center justify-center">
        <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-30" />

        <div className="relative bg-luxury-background rounded-lg max-w-md w-full mx-4 p-6 shadow-xl border border-luxury-border">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-luxury-gold via-luxury-emerald to-luxury-purple rounded-lg blur opacity-10"></div>
          <div className="relative">
            <div className="flex justify-between items-center mb-4">
              <Dialog.Title className="text-lg font-medium text-luxury-text">
                Add Transaction
              </Dialog.Title>
              <button
                onClick={onClose}
                className="text-luxury-muted hover:text-luxury-text transition-colors"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-luxury-text">
                  Type
                </label>
                <div className="mt-1 flex space-x-4">
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      className="form-radio text-luxury-gold focus:ring-luxury-gold"
                      name="type"
                      value="income"
                      checked={type === 'income'}
                      onChange={(e) => {
                        setType(e.target.value as 'income' | 'expense');
                        setCategory(''); // Reset category when type changes
                      }}
                    />
                    <span className="ml-2 text-luxury-text">Income</span>
                  </label>
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      className="form-radio text-luxury-gold focus:ring-luxury-gold"
                      name="type"
                      value="expense"
                      checked={type === 'expense'}
                      onChange={(e) => {
                        setType(e.target.value as 'income' | 'expense');
                        setCategory(''); // Reset category when type changes
                      }}
                    />
                    <span className="ml-2 text-luxury-text">Expense</span>
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-luxury-text">
                  Amount
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-luxury-muted">$</span>
                  </div>
                  <input
                    type="number"
                    required
                    min="0"
                    step="0.01"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="block w-full pl-7 pr-12 border-luxury-border rounded-md bg-luxury-card text-luxury-text focus:ring-luxury-gold focus:border-luxury-gold"
                    placeholder="0.00"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-luxury-text">
                  Category
                </label>
                <select
                  required
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-luxury-border rounded-md bg-luxury-card text-luxury-text focus:ring-luxury-gold focus:border-luxury-gold"
                >
                  <option value="">Select a category</option>
                  {categories
                    .filter((cat) => cat.type === type)
                    .map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.name}
                      </option>
                    ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-luxury-text">
                  Description
                </label>
                <input
                  type="text"
                  required
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="mt-1 block w-full border-luxury-border rounded-md bg-luxury-card text-luxury-text focus:ring-luxury-gold focus:border-luxury-gold"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-luxury-text">
                  Date
                </label>
                <input
                  type="date"
                  required
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="mt-1 block w-full border-luxury-border rounded-md bg-luxury-card text-luxury-text focus:ring-luxury-gold focus:border-luxury-gold"
                />
              </div>

              <div className="mt-5">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full inline-flex justify-center rounded-md border border-transparent px-4 py-2 bg-luxury-gold text-black font-medium hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-luxury-gold transition-all duration-300 transform hover:scale-105 disabled:opacity-50"
                >
                  {loading ? 'Adding...' : 'Add Transaction'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Dialog>
  );
}