import React from 'react';
import { useApp } from '../../context/AppContext';
import { SAMPLE_PRICING_PLANS } from '../../data/mockData';
import {
  CreditCard,
  CheckCircle2,
  Sparkles,
  ShieldCheck,
  Zap,
  Clock,
  ArrowRight,
  Info
} from 'lucide-react';

export const PlansBilling = () => {
  const { hasUsedFreeTrial, activePlan, selectPricingPlan, addToast } = useApp();

  return (
    <div className="space-y-6 max-w-5xl mx-auto animate-in fade-in duration-300">
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-2 bg-brand-roseLight px-3 py-1 rounded-full text-xs font-semibold text-brand-maroon mb-2 border border-rose-200/60">
          <Sparkles className="w-3.5 h-3.5 text-brand-rose" />
          <span>Flexible Mentorship Plans</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Plans & Mentorship Billing
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 mt-1">
          Each student begins with 1 Free Trial session on us. Ongoing 1:1 sessions are available via flexible mentorship packs.
        </p>
      </div>

      {/* Free Trial / Active Plan Banner */}
      <div className="bg-gradient-to-r from-brand-rose to-brand-maroon rounded-3xl p-6 sm:p-8 text-white shadow-card flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-rose-200 bg-white/10 px-2.5 py-1 rounded-full">
            Current Account Standing
          </span>
          <h2 className="text-xl sm:text-2xl font-black mt-2">
            {!hasUsedFreeTrial ? '1 Free Trial Session Available' : `Current Plan: ${activePlan}`}
          </h2>
          <p className="text-xs text-rose-100 mt-1 max-w-lg leading-relaxed">
            {!hasUsedFreeTrial
              ? 'Your first 1:1 video consultation with an IIT/NIT/IISER senior is 100% on us (₹0). No card required.'
              : 'You have utilized your free trial. Subsequent sessions are covered under your selected demo plan.'}
          </p>
        </div>

        <div className="bg-white/15 backdrop-blur-md px-5 py-3 rounded-2xl border border-white/20 text-center self-start sm:self-auto shrink-0">
          <p className="text-xs text-rose-100 font-medium">Trial Status</p>
          <p className="text-lg font-black text-white">
            {!hasUsedFreeTrial ? '1 Active (₹0)' : 'Trial Redeemed'}
          </p>
        </div>
      </div>

      {/* Sample Pricing Disclaimer */}
      <div className="bg-amber-50/80 border border-amber-200/80 rounded-2xl p-4 flex items-start gap-3 text-xs text-amber-900">
        <Info className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
        <div>
          <span className="font-bold">Sample pricing - prototype demonstration:</span>
          <p className="text-[11px] text-amber-800 mt-0.5 leading-relaxed">
            All prices and subscription cards shown below are sample mockup values for platform demonstration. No actual credit card or real financial payment is executed.
          </p>
        </div>
      </div>

      {/* Pricing Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {SAMPLE_PRICING_PLANS.map((plan) => {
          const isSelected = activePlan.toLowerCase().includes(plan.name.toLowerCase());

          return (
            <div
              key={plan.id}
              className={`rounded-3xl p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 relative ${
                plan.popular
                  ? 'bg-white border-2 border-brand-rose shadow-card scale-102'
                  : 'bg-white/80 backdrop-blur-md border border-rose-100/80 shadow-soft hover:shadow-card'
              }`}
            >
              {plan.popular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-brand-rose to-brand-maroon text-white font-bold text-[10px] tracking-wider uppercase px-3 py-1 rounded-full shadow-xs">
                  {plan.tag}
                </span>
              )}

              <div>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-extrabold text-base text-slate-900">{plan.name}</h3>
                  {!plan.popular && (
                    <span className="text-[10px] font-semibold text-brand-maroon bg-brand-roseLight px-2 py-0.5 rounded-full">
                      {plan.tag}
                    </span>
                  )}
                </div>

                <div className="my-4">
                  <span className="text-3xl font-black text-slate-900">{plan.price}</span>
                  <span className="text-xs text-slate-500 font-medium ml-1.5">
                    / {plan.billingPeriod}
                  </span>
                  <span className="block text-[10px] text-brand-rose font-semibold mt-1">
                    Sample pricing - prototype
                  </span>
                </div>

                <p className="text-xs text-slate-600 mb-5 leading-relaxed">
                  {plan.description}
                </p>

                <div className="space-y-2.5 pt-4 border-t border-rose-50 text-xs">
                  {plan.features.map((feat, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-slate-700">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span className="leading-snug">{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-rose-50">
                <button
                  onClick={() => selectPricingPlan(`${plan.name} (Active)`)}
                  className={`w-full py-3 rounded-full font-bold text-xs transition-all flex items-center justify-center gap-1.5 ${
                    isSelected
                      ? 'bg-emerald-600 text-white shadow-xs'
                      : plan.popular
                      ? 'bg-gradient-to-r from-brand-rose to-brand-maroon hover:from-brand-roseHover hover:to-brand-maroonHover text-white shadow-soft hover:shadow-card'
                      : 'bg-white hover:bg-rose-50 text-brand-maroon border border-rose-200'
                  }`}
                >
                  {isSelected ? (
                    <>
                      <CheckCircle2 className="w-3.5 h-3.5" /> Plan Active
                    </>
                  ) : (
                    <>Select {plan.name} (Demo)</>
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
