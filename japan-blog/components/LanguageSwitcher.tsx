"use client";

import { useRouter, usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { Globe, Check } from 'lucide-react';

interface LanguageSwitcherProps {
  availableLocales?: string[];
}

export default function LanguageSwitcher({ availableLocales = ['en', 'jp'] }: LanguageSwitcherProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Extract current locale from pathname
  const currentLocale = pathname.startsWith('/jp') ? 'jp' : 'en';
  
  const switchLanguage = async (locale: string) => {
    if (locale === currentLocale || isTransitioning) return;
    
    setIsTransitioning(true);
    
    let newPath = pathname;
    
    if (locale === 'jp') {
      // Switch to Japanese
      if (pathname.startsWith('/en')) {
        newPath = pathname.replace('/en', '/jp');
      } else {
        newPath = `/jp${pathname}`;
      }
    } else {
      // Switch to English
      if (pathname.startsWith('/jp')) {
        newPath = pathname.replace('/jp', '/en');
      } else {
        newPath = `/en${pathname}`;
      }
    }
    
    // Use replace for smoother transitions
    router.replace(newPath);
    setIsOpen(false);
    
    // Reset transition state after a delay
    setTimeout(() => setIsTransitioning(false), 500);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = () => setIsOpen(false);
    if (isOpen) {
      document.addEventListener('click', handleClickOutside);
      return () => document.removeEventListener('click', handleClickOutside);
    }
  }, [isOpen]);

  const languages = [
    { code: 'en', label: 'English', flag: '🇺🇸' },
    { code: 'jp', label: '日本語', flag: '🇯🇵' }
  ];

  const currentLanguage = languages.find(lang => lang.code === currentLocale);

  return (
    <div className="relative">
      <button
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen(!isOpen);
        }}
        disabled={isTransitioning}
        className={`flex items-center space-x-2 px-3 py-2 text-sm transition-all rounded-lg ${
          isTransitioning 
            ? 'text-stone-400 cursor-not-allowed' 
            : 'text-stone-600 hover:text-amber-600 hover:bg-stone-100'
        }`}
        aria-label="Switch language"
      >
        <Globe className={`w-4 h-4 ${isTransitioning ? 'animate-spin' : ''}`} />
        <span>{currentLanguage?.flag}</span>
        <span className="hidden sm:inline">{currentLanguage?.label}</span>
      </button>

      {isOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 z-10" 
            onClick={() => setIsOpen(false)}
          />
          
          {/* Dropdown */}
          <div className="absolute right-0 mt-2 py-2 w-44 bg-white border border-stone-200 rounded-lg shadow-lg z-20">
            {languages.filter(lang => availableLocales.includes(lang.code)).map((language) => {
              const isActive = currentLocale === language.code;
              return (
                <button
                  key={language.code}
                  onClick={(e) => {
                    e.stopPropagation();
                    switchLanguage(language.code);
                  }}
                  disabled={isActive || isTransitioning}
                  className={`w-full px-4 py-2 text-left text-sm transition-colors flex items-center justify-between ${
                    isActive 
                      ? 'text-amber-600 bg-amber-50 cursor-default' 
                      : isTransitioning
                      ? 'text-stone-400 cursor-not-allowed'
                      : 'text-stone-700 hover:bg-stone-50'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <span>{language.flag}</span>
                    <span>{language.label}</span>
                  </div>
                  {isActive && <Check className="w-3 h-3" />}
                </button>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}