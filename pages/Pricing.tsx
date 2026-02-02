'use client';

import React, { useState } from 'react';
import { Check } from 'lucide-react';
import { Link } from '../constants';
import { loadStripe, type Stripe } from '@stripe/stripe-js';

let stripePromise: Promise<Stripe | null>;
const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || '');
  }
  return stripePromise;
};

import { Plan } from '../types';

const PricingTier: React.FC<Plan & { onCheckout?: (priceId: string) => void }> = ({ plan, price, description, features, isFeatured, priceId, onCheckout, billingCycle }) => {
  const featuredClasses = isFeatured
    ? 'bg-titan-900 dark:bg-titan-800 border-titan-accent'
    : 'bg-white dark:bg-titan-900 border-slate-200 dark:border-titan-800';
  
  const buttonClasses = isFeatured
    ? 'bg-titan-accent text-white hover:bg-blue-500'
    : 'bg-slate-900 text-white dark:bg-white dark:text-titan-950 hover:bg-slate-700 dark:hover:bg-slate-200';

  return (
    <div className={`border-2 rounded-2xl p-8 flex flex-col ${featuredClasses}`}>
      <h3 className="text-lg font-semibold text-slate-500 dark:text-slate-400">{plan}</h3>
      <p className="mt-4">
        <span className="text-4xl font-bold tracking-tight text-slate-900 dark:text-white">{price}</span>
        {billingCycle && <span className="text-base font-medium text-slate-500 dark:text-slate-400">/{billingCycle === 'monthly' ? 'mo' : 'yr'}</span>}
      </p>
      <p className="mt-4 text-sm text-slate-500 dark:text-slate-400">{description}</p>
      <ul role="list" className="mt-8 space-y-3 text-sm leading-6 text-slate-600 dark:text-slate-300 grow">
        {features.map((feature: string) => (
          <li key={feature} className="flex gap-x-3">
            <Check className="h-6 w-5 flex-none text-titan-accent" aria-hidden="true" />
            {feature}
          </li>
        ))}
      </ul>
      {priceId && onCheckout ? (
        <button
          onClick={() => onCheckout(priceId)}
          className={`mt-8 block rounded-md py-3 px-3 text-center text-sm font-semibold leading-6 ${buttonClasses} transition-colors`}
        >
          Get started
        </button>
      ) : (
        <Link
          to="/contact"
          className={`mt-8 block rounded-md py-3 px-3 text-center text-sm font-semibold leading-6 ${buttonClasses} transition-colors`}
        >
          Contact Us
        </Link>
      )}
    </div>
  );
};

const Pricing: React.FC = () => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');
  const handleCheckout = async (priceId: string) => {
    const stripe = await getStripe();
    if (!stripe) return;

    const response = await fetch('/api/create-checkout-session', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ priceId }),
    });
    const session = await response.json();
    await stripe.redirectToCheckout({ sessionId: session.sessionId });
  };

  return (
    <div className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-base font-semibold leading-7 text-titan-accent">Pricing</h2>
          <p className="mt-2 text-4xl font-bold font-serif tracking-tight text-slate-900 dark:text-white sm:text-5xl">
            Plans for every stage of your business
          </p>
        </div>
        <p className="mx-auto mt-6 max-w-2xl text-center text-lg leading-8 text-slate-600 dark:text-slate-400">
          Choose a plan that's right for you. All plans include access to our Autonomous AI Website Builder.
        </p>

        <div className="flex justify-center mt-12">
          <div className="bg-titan-900 p-1.5 rounded-full flex gap-2 border border-titan-800">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-6 py-2 rounded-full text-sm font-bold transition-colors ${
                billingCycle === 'monthly' ? 'bg-titan-accent text-white shadow-md shadow-titan-accent/20' : 'text-slate-400 hover:text-white'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingCycle('yearly')}
              className={`px-6 py-2 rounded-full text-sm font-bold transition-colors relative ${
                billingCycle === 'yearly' ? 'bg-titan-accent text-white shadow-md shadow-titan-accent/20' : 'text-slate-400 hover:text-white'
              }`}
            >
              Yearly
              <span className="absolute -top-2 -right-2 bg-emerald-400 text-emerald-950 text-[10px] font-black px-2 py-0.5 rounded-full">SAVE 20%</span>
            </button>
          </div>
        </div>

        <div className="isolate mx-auto mt-16 grid max-w-md grid-cols-1 gap-8 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          <PricingTier
            plan="Hobby"
            price={billingCycle === 'monthly' ? '$29' : '$279'}
            description="For personal projects and early-stage startups."
            features={[
              '1 AI-generated website',
              'Basic section types',
              'Community support',
              'Standard performance',
            ]}
            priceId={billingCycle === 'monthly' ? 'price_placeholder_hobby_monthly' : 'price_placeholder_hobby_yearly'}
            onCheckout={handleCheckout}
            billingCycle={billingCycle}
          />
          <PricingTier
            plan="Pro"
            price={billingCycle === 'monthly' ? '$99' : '$950'}
            description="For growing businesses that need more power and customization."
            features={[
              '5 AI-generated websites',
              'All section types',
              'AI section regeneration',
              'Priority email support',
              'Enhanced performance',
            ]}
            priceId={billingCycle === 'monthly' ? 'price_placeholder_pro_monthly' : 'price_placeholder_pro_yearly'}
            isFeatured={true}
            onCheckout={handleCheckout}
            billingCycle={billingCycle}
          />
          <PricingTier
            plan="Enterprise"
            price="Contact Us"
            description="For large-scale applications and custom requirements."
            features={[
              'Unlimited websites',
              'Custom AI model training',
              'Dedicated account manager',
              '24/7 premium support',
              'Enterprise-grade security',
            ]}
            // No priceId for "Contact Us" tier
          />
        </div>
      </div>
    </div>
  );
};

export default Pricing;