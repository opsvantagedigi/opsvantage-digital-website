import React from 'react';
import { Check } from 'lucide-react';

const PricingTier: React.FC<{
  plan: string;
  price: string;
  description: string;
  features: string[];
  isFeatured?: boolean;
}> = ({ plan, price, description, features, isFeatured }) => {
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
        <span className="text-4xl font-bold tracking-tight text-slate-900 dark:text-white">{price.startsWith('$') ? price.substring(0,1) : ''}{price.startsWith('$') ? price.substring(1) : price}</span>
        {!price.startsWith('Contact') && <span className="text-base font-medium text-slate-500 dark:text-slate-400">/mo</span>}
      </p>
      <p className="mt-4 text-sm text-slate-500 dark:text-slate-400">{description}</p>
      <ul role="list" className="mt-8 space-y-3 text-sm leading-6 text-slate-600 dark:text-slate-300 flex-grow">
        {features.map((feature) => (
          <li key={feature} className="flex gap-x-3">
            <Check className="h-6 w-5 flex-none text-titan-accent" aria-hidden="true" />
            {feature}
          </li>
        ))}
      </ul>
      <a
        href="#"
        className={`mt-8 block rounded-md py-3 px-3 text-center text-sm font-semibold leading-6 ${buttonClasses} transition-colors`}
      >
        Get started
      </a>
    </div>
  );
};

const Pricing: React.FC = () => {
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
        <div className="isolate mx-auto mt-16 grid max-w-md grid-cols-1 gap-8 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          <PricingTier
            plan="Hobby"
            price="$29"
            description="For personal projects and early-stage startups."
            features={[
              '1 AI-generated website',
              'Basic section types',
              'Community support',
              'Standard performance',
            ]}
          />
          <PricingTier
            plan="Pro"
            price="$99"
            description="For growing businesses that need more power and customization."
            features={[
              '5 AI-generated websites',
              'All section types',
              'AI section regeneration',
              'Priority email support',
              'Enhanced performance',
            ]}
            isFeatured={true}
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
          />
        </div>
      </div>
    </div>
  );
};

export default Pricing;