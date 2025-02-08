export type Transaction = {
    id: string;
    user_id: string;
    amount: number;
    type: 'income' | 'expense';
    category_id: string;
    description: string;
    date: string;
    created_at: string;
  };
  
  export type Category = {
    id: string;
    name: string;
    type: 'income' | 'expense';
    user_id: string;
    is_default?: boolean;
    budget?: number | null;
  };
  
  export type Profile = {
    id: string;
    email: string;
    full_name?: string;
    avatar_url?: string;
    language: string;
    theme: 'light' | 'dark';
  };