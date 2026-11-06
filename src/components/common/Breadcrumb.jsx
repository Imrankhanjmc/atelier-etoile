import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

export const Breadcrumb = ({ items = [] }) => {
  return (
    <nav aria-label="Breadcrumb" className="py-3 text-xs text-stone-500 overflow-x-auto whitespace-nowrap">
      <ol className="flex items-center gap-1.5">
        <li>
          <Link to="/" className="hover:text-stone-900 transition-colors">
            Home
          </Link>
        </li>
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={index} className="flex items-center gap-1.5">
              <ChevronRight className="w-3 h-3 text-stone-400 shrink-0" />
              {isLast || !item.href ? (
                <span className="text-stone-900 font-medium truncate max-w-[200px]">
                  {item.label}
                </span>
              ) : (
                <Link to={item.href} className="hover:text-stone-900 transition-colors">
                  {item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
