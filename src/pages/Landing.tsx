import React from 'react';
import { Link } from 'react-router-dom';
import { 
  LineChart, 
  Wallet, 
  PieChart, 
  Shield, 
  ArrowRight, 
  TrendingUp, 
  DollarSign,
  Users,
  Award,
  Zap
} from 'lucide-react';

export default function Landing() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gradient-start via-gradient-middle to-gradient-end text-luxury-text">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1634128221889-82ed6efebfc3?auto=format&fit=crop&q=80')] opacity-10 bg-cover bg-center" />
      
      {/* Hero Section */}
      <div className="relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 sm:pt-24 sm:pb-20">
          <div className="text-center">
            <h1 className="text-4xl tracking-tight font-extrabold sm:text-5xl md:text-6xl">
              <span className="block animate-glow">Transform Your Finances</span>
              <span className="block text-luxury-gold animate-glow">With Intelligent Tracking</span>
            </h1>
            <p className="mt-3 max-w-md mx-auto text-base text-luxury-muted sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
              Experience financial management reimagined. Our premium expense tracking solution combines elegance with powerful insights, helping you build and preserve your wealth with sophistication.
            </p>
            <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
              <div className="rounded-md shadow">
                <Link
                  to="/signup"
                  className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-black bg-luxury-gold hover:bg-opacity-90 transition-all duration-300 transform hover:scale-105 md:py-4 md:text-lg md:px-10"
                >
                  Begin Your Journey
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </div>
              <div className="mt-3 sm:mt-0 sm:ml-3">
                <Link
                  to="/login"
                  className="w-full flex items-center justify-center px-8 py-3 border border-luxury-gold text-base font-medium rounded-md text-luxury-gold bg-transparent hover:bg-luxury-gold hover:bg-opacity-10 transition-all duration-300 md:py-4 md:text-lg md:px-10"
                >
                  Sign In
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="relative bg-luxury-card bg-opacity-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
            <div className="relative overflow-hidden rounded-lg bg-luxury-background p-6 shadow-xl">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-luxury-gold to-luxury-emerald opacity-10"></div>
              <div className="relative">
                <dt className="truncate text-sm font-medium text-luxury-muted">
                  Active Users
                </dt>
                <dd className="mt-2 text-3xl font-semibold text-luxury-gold">100,000+</dd>
              </div>
            </div>
            <div className="relative overflow-hidden rounded-lg bg-luxury-background p-6 shadow-xl">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-luxury-emerald to-luxury-purple opacity-10"></div>
              <div className="relative">
                <dt className="truncate text-sm font-medium text-luxury-muted">
                  Transactions Tracked
                </dt>
                <dd className="mt-2 text-3xl font-semibold text-luxury-emerald">5M+</dd>
              </div>
            </div>
            <div className="relative overflow-hidden rounded-lg bg-luxury-background p-6 shadow-xl">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-luxury-purple to-luxury-gold opacity-10"></div>
              <div className="relative">
                <dt className="truncate text-sm font-medium text-luxury-muted">
                  Money Managed
                </dt>
                <dd className="mt-2 text-3xl font-semibold text-luxury-purple">$1B+</dd>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-base text-luxury-gold font-semibold tracking-wide uppercase animate-glow">Premium Features</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold sm:text-4xl">
              Elevate Your Financial Journey
            </p>
            <p className="mt-4 max-w-2xl text-xl text-luxury-muted lg:mx-auto">
              Experience a suite of powerful tools designed to transform your financial management
            </p>
          </div>

          <div className="mt-20">
            <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  name: 'AI-Powered Tracking',
                  description: 'Smart categorization and pattern recognition for your transactions.',
                  icon: Zap,
                  color: 'luxury-gold',
                },
                {
                  name: 'Wealth Analytics',
                  description: 'Advanced charts and insights to visualize your financial growth.',
                  icon: TrendingUp,
                  color: 'luxury-emerald',
                },
                {
                  name: 'Smart Budgeting',
                  description: 'Intelligent budget recommendations based on your spending patterns.',
                  icon: DollarSign,
                  color: 'luxury-purple',
                },
                {
                  name: 'Investment Tracking',
                  description: 'Real-time portfolio monitoring and performance analytics.',
                  icon: LineChart,
                  color: 'luxury-gold',
                },
                {
                  name: 'Bank-Grade Security',
                  description: 'Enterprise-level encryption and advanced security measures.',
                  icon: Shield,
                  color: 'luxury-emerald',
                },
                {
                  name: 'Premium Reports',
                  description: 'Detailed financial analysis and personalized insights.',
                  icon: PieChart,
                  color: 'luxury-purple',
                },
              ].map((feature) => (
                <div key={feature.name} className="relative group">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-luxury-gold via-luxury-emerald to-luxury-purple rounded-lg blur opacity-20 group-hover:opacity-40 transition duration-1000 group-hover:duration-200 animate-gradient-x"></div>
                  <div className="relative flex flex-col items-center p-6 bg-luxury-card rounded-lg shadow-xl transition duration-300 hover:transform hover:scale-105">
                    <div className={`flex items-center justify-center h-16 w-16 rounded-full bg-opacity-10 mb-4 animate-float text-${feature.color}`}>
                      <feature.icon className="h-8 w-8" aria-hidden="true" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">{feature.name}</h3>
                    <p className="text-center text-sm text-luxury-muted">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="py-24 bg-luxury-card bg-opacity-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center mb-16">
            <h2 className="text-base text-luxury-gold font-semibold tracking-wide uppercase">Testimonials</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold sm:text-4xl">
              Trusted by Financial Experts
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            {[
              {
                quote: "The most sophisticated expense tracking tool I've ever used. The AI insights are game-changing.",
                author: "Sarah Chen",
                title: "Financial Advisor",
                avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100&h=100"
              },
              {
                quote: "Finally, a financial tool that combines beautiful design with powerful functionality.",
                author: "Michael Ross",
                title: "Investment Banker",
                avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=100&h=100"
              },
              {
                quote: "The wealth analytics have completely transformed how I manage my investments.",
                author: "Emma Thompson",
                title: "Portfolio Manager",
                avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=100&h=100"
              }
            ].map((testimonial, index) => (
              <div key={index} className="relative">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-luxury-gold to-luxury-purple rounded-lg blur opacity-10"></div>
                <div className="relative bg-luxury-background p-6 rounded-lg shadow-xl">
                  <p className="text-lg font-medium text-luxury-text mb-4">"{testimonial.quote}"</p>
                  <div className="flex items-center">
                    <img
                      className="h-10 w-10 rounded-full object-cover"
                      src={testimonial.avatar}
                      alt={testimonial.author}
                    />
                    <div className="ml-3">
                      <p className="text-sm font-medium text-luxury-text">{testimonial.author}</p>
                      <p className="text-sm text-luxury-muted">{testimonial.title}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="relative py-24">
        <div className="absolute -inset-0.5 bg-gradient-to-r from-luxury-gold via-luxury-emerald to-luxury-purple opacity-10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold sm:text-4xl">
              <span className="block">Ready to Transform Your Finances?</span>
              <span className="block text-luxury-gold mt-2">Join Thousands of Successful Investors</span>
            </h2>
            <div className="mt-8 flex justify-center">
              <Link
                to="/signup"
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-black bg-luxury-gold hover:bg-opacity-90 transition-all duration-300 transform hover:scale-105"
              >
                Start Your Journey
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}