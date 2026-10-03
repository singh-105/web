import React, { useState } from 'react';
import { Mail, Phone, MapPin, ShieldCheck, RefreshCw, Truck, Award, Share2 } from 'lucide-react';
import { brandConfig } from '../../config/brandConfig';
import { useStore } from '../../context/StoreContext';

export const Footer: React.FC = () => {
  const { showToast } = useStore();
  const [newsletterEmail, setNewsletterEmail] = useState('');

  const handleNewsletter = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail || !newsletterEmail.includes('@')) {
      showToast('Please enter a valid email address.');
      return;
    }
    showToast(`Welcome! ₹500 welcome voucher sent to ${newsletterEmail}`);
    setNewsletterEmail('');
  };

  return (
    <footer className="bg-stone-950 text-stone-300 border-t border-stone-800/80 pt-16 pb-12">
      {/* Value Proposition Badges */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 border-b border-stone-800">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
          <div className="flex items-start space-x-3">
            <Truck className="w-6 h-6 text-amber-400 shrink-0 mt-1" />
            <div>
              <h4 className="text-sm font-semibold text-stone-100 uppercase tracking-wider">Express Delivery</h4>
              <p className="text-xs text-stone-400 mt-1">Complimentary shipping on orders above ₹2,000.</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <RefreshCw className="w-6 h-6 text-amber-400 shrink-0 mt-1" />
            <div>
              <h4 className="text-sm font-semibold text-stone-100 uppercase tracking-wider">Hassle-Free Returns</h4>
              <p className="text-xs text-stone-400 mt-1">14-day doorstep return and size exchange service.</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <Award className="w-6 h-6 text-amber-400 shrink-0 mt-1" />
            <div>
              <h4 className="text-sm font-semibold text-stone-100 uppercase tracking-wider">100% Authentic</h4>
              <p className="text-xs text-stone-400 mt-1">Directly sourced luxury organic materials.</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <ShieldCheck className="w-6 h-6 text-amber-400 shrink-0 mt-1" />
            <div>
              <h4 className="text-sm font-semibold text-stone-100 uppercase tracking-wider">Secure Payment</h4>
              <p className="text-xs text-stone-400 mt-1">Encrypted UPI, Credit Card & COD support.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 grid grid-cols-1 md:grid-cols-4 gap-12">
        {/* Brand & Newsletter */}
        <div className="md:col-span-1 space-y-4">
          <h3 className="font-serif-heading text-2xl font-bold tracking-wider text-stone-100 uppercase">
            {brandConfig.brandName}
          </h3>
          <p className="text-xs text-stone-400 leading-relaxed">
            {brandConfig.description}
          </p>
          <div className="pt-2">
            <p className="text-xs font-semibold text-amber-400 uppercase tracking-wider mb-2">
              Subscribe to Private Sales & drops
            </p>
            <form onSubmit={handleNewsletter} className="flex flex-col space-y-2">
              <input
                type="email"
                value={newsletterEmail}
                onChange={e => setNewsletterEmail(e.target.value)}
                placeholder="Enter your email address"
                className="bg-stone-900 border border-stone-800 text-stone-200 text-xs px-3 py-2.5 rounded-lg focus:outline-none focus:border-amber-500"
              />
              <button
                type="submit"
                className="bg-amber-500 text-stone-950 font-semibold text-xs py-2.5 rounded-lg hover:bg-amber-400 transition-colors uppercase tracking-wider"
              >
                Claim ₹500 Off Voucher
              </button>
            </form>
          </div>
        </div>

        {/* Store Locations */}
        <div>
          <h4 className="text-xs font-bold text-stone-100 uppercase tracking-widest mb-4">
            Flagship Stores
          </h4>
          <ul className="space-y-3 text-xs text-stone-400">
            {brandConfig.storeLocations.map((loc, idx) => (
              <li key={idx} className="border-b border-stone-900 pb-2">
                <p className="font-semibold text-stone-200">{loc.name}</p>
                <p>{loc.address}</p>
                <p className="text-stone-500">{loc.hours}</p>
              </li>
            ))}
          </ul>
        </div>

        {/* Customer Care */}
        <div>
          <h4 className="text-xs font-bold text-stone-100 uppercase tracking-widest mb-4">
            Customer Care
          </h4>
          <ul className="space-y-2.5 text-xs text-stone-400">
            <li><a href="#orders" className="hover:text-amber-400 transition-colors">Track Order & Shipments</a></li>
            <li><a href="#returns" className="hover:text-amber-400 transition-colors">Return & Exchange Portal</a></li>
            <li><a href="#size-guide" className="hover:text-amber-400 transition-colors">Size Guide & Fit Assistance</a></li>
            <li><a href="#garment-care" className="hover:text-amber-400 transition-colors">Garment Care Instructions</a></li>
            <li><a href="#appointments" className="hover:text-amber-400 transition-colors">Book Personal Styling Appointment</a></li>
            <li><a href="#faq" className="hover:text-amber-400 transition-colors">Frequently Asked Questions</a></li>
          </ul>
        </div>

        {/* Direct Contact & Social */}
        <div>
          <h4 className="text-xs font-bold text-stone-100 uppercase tracking-widest mb-4">
            Atelier Concierge
          </h4>
          <div className="space-y-3 text-xs text-stone-400">
            <div className="flex items-center space-x-2">
              <Mail className="w-4 h-4 text-amber-400" />
              <span>{brandConfig.supportEmail}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Phone className="w-4 h-4 text-amber-400" />
              <span>{brandConfig.supportPhone}</span>
            </div>
            <div className="flex items-center space-x-2">
              <MapPin className="w-4 h-4 text-amber-400" />
              <span>Mumbai • New Delhi • Bengaluru</span>
            </div>
            <div className="pt-4 flex items-center space-x-4">
              <span className="text-stone-400 text-xs font-semibold">{brandConfig.socialLinks.instagram}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-stone-900 pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500">
        <p>© {new Date().getFullYear()} {brandConfig.brandName} Atelier Ltd. All Rights Reserved.</p>
        <div className="flex items-center space-x-4 mt-4 sm:mt-0">
          <a href="#privacy" className="hover:underline">Privacy Policy</a>
          <span>•</span>
          <a href="#terms" className="hover:underline">Terms of Service</a>
          <span>•</span>
          <a href="#security" className="hover:underline">Security</a>
        </div>
      </div>
    </footer>
  );
};
