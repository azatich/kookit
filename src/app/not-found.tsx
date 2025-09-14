"use client";

import React from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { Home, ChefHat, ArrowLeft, Search } from 'lucide-react';

const NotFound = () => {
  const t = useTranslations('NotFoundPage');

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a1a1a] to-[#2a2a2a] relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-[#FF7A00] rounded-full blur-3xl opacity-20 animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-40 h-40 bg-[#FF7A00] rounded-full blur-3xl opacity-20 animate-pulse delay-1000"></div>
      <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-amber-400 rounded-full blur-2xl opacity-15 animate-pulse delay-500"></div>

      {/* Floating cooking icons */}
      <div className="absolute top-32 right-20 text-6xl opacity-10 animate-bounce delay-300">🍳</div>
      <div className="absolute bottom-32 left-20 text-5xl opacity-10 animate-bounce delay-700">🥘</div>
      <div className="absolute top-1/3 left-10 text-4xl opacity-10 animate-bounce delay-1000">🍽️</div>
      <div className="absolute bottom-1/3 right-10 text-5xl opacity-10 animate-bounce delay-500">👨‍🍳</div>

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 text-center">
        {/* Main 404 Content */}
        <div className="max-w-2xl mx-auto">
          {/* Large 404 Number */}
          <div className="mb-8">
            <h1 className="text-9xl sm:text-[12rem] font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#FF7A00] to-amber-400 leading-none">
              404
            </h1>
          </div>

          {/* Cooking-themed 404 message */}
          <div className="mb-8">
            <h2 className="text-3xl sm:text-4xl font-pacifico text-white mb-4">
              {t('NotFound')} 🍳
            </h2>
            <p className="text-lg sm:text-xl text-gray-300 mb-2">
              {t('NotFoundDescription')} 😊
            </p>
            <p className="text-base text-gray-400">
              {t('NotFoundDescription2')} 😊
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Link
              href="/home"
              className="group flex items-center gap-3 bg-gradient-to-r from-[#FF7A00] to-amber-500 hover:from-[#FF7A00] hover:to-amber-600 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl hover:shadow-orange-500/25"
            >
              <Home className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
              {t('GoHome')}
            </Link>

            <Link
              href="/recipes"
              className="group flex items-center gap-3 bg-transparent border-2 border-[#FF7A00] text-[#FF7A00] hover:bg-[#FF7A00] hover:text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105"
            >
              <ChefHat className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
              {t('BrowseRecipes')}
            </Link>
          </div>

          {/* Search Suggestion */}
          <div className="bg-[#2f2f2f] rounded-2xl p-6 border border-gray-700">
            <div className="flex items-center gap-3 mb-4">
              <Search className="w-6 h-6 text-[#FF7A00]" />
              <h3 className="text-xl font-semibold text-white">{t('LookingForSomethingSpecific')}</h3>
            </div>
            <p className="text-gray-300 mb-4">
              {t('TrySearchingForYourFavoriteRecipes')}
            </p>
            <Link
              href="/recipes"
              className="inline-flex items-center gap-2 text-[#FF7A00] hover:text-amber-400 font-medium transition-colors duration-300"
            >
              <ArrowLeft className="w-4 h-4" />
              {t('BackToRecipeCollection')}
            </Link>
          </div>

          {/* Fun cooking quote */}
          <div className="mt-12 p-6 bg-gradient-to-r from-[#FF7A00]/10 to-amber-400/10 rounded-xl border border-[#FF7A00]/20">
            <p className="text-lg text-gray-300 italic">
              {t('CookingIsLikeLove')}
            </p>
            <p className="text-sm text-gray-400 mt-2">{t('HarrietVanHorne')}</p>
          </div>
        </div>

        {/* Bottom decorative elements */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <div className="flex gap-2 text-2xl opacity-20">
            <span className="animate-bounce delay-100">🍔</span>
            <span className="animate-bounce delay-200">🍕</span>
            <span className="animate-bounce delay-300">🍝</span>
            <span className="animate-bounce delay-400">🥗</span>
            <span className="animate-bounce delay-500">🍰</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;