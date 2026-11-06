import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, Heart, ShoppingBag, User, Menu, X, ChevronRight } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';

export const Navbar = ({ onOpenSearch }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { totalItemCount, setIsCartDrawerOpen } = useCart();
  const { wishlistCount } = useWishlist();
  const location = useLocation();

  const navLinks = [
    { label: "Men", href: "/shop?gender=men" },
    { label: "Women", href: "/shop?gender=women" },
    { label: "Kids", href: "/shop?category=kids" },
    { label: "Footwear", href: "/shop?category=footwear" },
    { label: "Accessories", href: "/shop?category=accessories" },
    { label: "New Arrivals", href: "/shop?collection=new-arrivals" },
    { label: "Sale", href: "/shop?collection=sale-collection", highlight: true },
  ];

  return (
    <>
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-8 h-20">
            {/* Zone 1: Brand Wordmark (Single text element in luxury display serif) */}
            <Link
              to="/"
              className="font-serif text-2xl lg:text-3xl tracking-tight text-stone-900 whitespace-nowrap shrink-0 hover:opacity-90 transition-opacity"
            >
              ATELIER ÉTOILE
            </Link>

            {/* Zone 2: Navigation Links (single-line, subtle hover, no pills) */}
            <nav className="hidden md:flex items-center gap-7 text-xs uppercase tracking-widest font-medium text-stone-600">
              {navLinks.map((link) => {
                const isActive = location.pathname + location.search === link.href;
                return (
                  <Link
                    key={link.label}
                    to={link.href}
                    className={`whitespace-nowrap shrink-0 py-1 border-b transition-colors ${
                      link.highlight ? 'text-amber-800 font-semibold' : ''
                    } ${
                      isActive
                        ? 'border-stone-900 text-stone-900'
                        : 'border-transparent hover:text-stone-900 hover:border-stone-300'
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>

            {/* Zone 3: Interactive Controls */}
            <div className="flex items-center gap-4 sm:gap-5 shrink-0">
              {/* Search Trigger */}
              <button
                type="button"
                onClick={onOpenSearch}
                className="p-1.5 text-stone-700 hover:text-stone-950 transition-colors"
                aria-label="Search garments"
                title="Search garments"
              >
                <Search className="w-5 h-5 stroke-[1.5]" />
              </button>

              {/* Account Link */}
              <Link
                to="/account"
                className="p-1.5 text-stone-700 hover:text-stone-950 transition-colors hidden sm:block"
                aria-label="Customer Account"
                title="Customer Account"
              >
                <User className="w-5 h-5 stroke-[1.5]" />
              </Link>

              {/* Wishlist Button with Badge */}
              <Link
                to="/wishlist"
                className="p-1.5 text-stone-700 hover:text-stone-950 transition-colors relative"
                aria-label="Saved garments wishlist"
                title="Wishlist"
              >
                <Heart className="w-5 h-5 stroke-[1.5]" />
                {wishlistCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-stone-900 text-white rounded-full text-[10px] font-mono flex items-center justify-center">
                    {wishlistCount}
                  </span>
                )}
              </Link>

              {/* Shopping Bag Button with Badge */}
              <button
                type="button"
                onClick={() => setIsCartDrawerOpen(true)}
                className="p-1.5 text-stone-700 hover:text-stone-950 transition-colors relative"
                aria-label="Open Shopping Bag"
                title="Shopping Bag"
              >
                <ShoppingBag className="w-5 h-5 stroke-[1.5]" />
                {totalItemCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-amber-800 text-white rounded-full text-[10px] font-mono flex items-center justify-center">
                    {totalItemCount}
                  </span>
                )}
              </button>

              {/* Mobile Hamburger */}
              <button
                type="button"
                onClick={() => setMobileMenuOpen(true)}
                className="p-1.5 text-stone-700 hover:text-stone-950 transition-colors md:hidden"
                aria-label="Open navigation menu"
              >
                <Menu className="w-6 h-6 stroke-[1.5]" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div
            className="fixed inset-0 bg-stone-900/60 backdrop-blur-xs"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="fixed inset-y-0 left-0 w-4/5 max-w-sm bg-white shadow-2xl flex flex-col justify-between">
            <div>
              {/* Header */}
              <div className="p-5 border-b border-stone-200 flex items-center justify-between">
                <span className="font-serif text-xl tracking-tight text-stone-900">
                  ATELIER ÉTOILE
                </span>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1 text-stone-500 hover:text-stone-900"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Nav Links */}
              <div className="p-4 space-y-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.label}
                    to={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-between py-3 px-3 text-sm font-medium text-stone-800 hover:bg-stone-50 transition-colors"
                  >
                    <span>{link.label}</span>
                    <ChevronRight className="w-4 h-4 text-stone-400" />
                  </Link>
                ))}
              </div>

              {/* Quick Pages */}
              <div className="px-7 py-3 border-t border-stone-100 space-y-2 text-xs text-stone-500">
                <Link
                  to="/about"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block hover:text-stone-900 py-1"
                >
                  About the Maison
                </Link>
                <Link
                  to="/size-guide"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block hover:text-stone-900 py-1"
                >
                  Size Guide & Fit
                </Link>
                <Link
                  to="/style-guide"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block hover:text-stone-900 py-1"
                >
                  Editorial Style Guide
                </Link>
                <Link
                  to="/contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block hover:text-stone-900 py-1"
                >
                  Atelier Concierge & Contact
                </Link>
              </div>
            </div>

            {/* Footer Customer Account */}
            <div className="p-5 bg-stone-50 border-t border-stone-200">
              <Link
                to="/account"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center gap-2 py-3 bg-stone-900 text-white text-xs uppercase tracking-widest font-semibold hover:bg-stone-800 transition-colors"
              >
                <User className="w-4 h-4" />
                Account & Orders
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
