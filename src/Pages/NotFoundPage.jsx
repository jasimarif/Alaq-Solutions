import React from 'react';
import { Link } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';
import PageWrapper from '../Components/Common/PageWrapper';
import { PAGE_SEO } from '../data/seo';

const NotFoundPage = () => {
  return (
    <PageWrapper seo={PAGE_SEO.notFound} showCta={false}>
      <section className="py-24 sm:py-32 px-4 sm:px-6 lg:px-12 flex items-center justify-center min-h-[60vh]">
        <div className="max-w-xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-semibold">
            <span>Error 404</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-bold text-white tracking-tight">
            Page Not Found
          </h1>

          <p className="text-gray-300 text-base sm:text-lg leading-relaxed">
            The page you are looking for does not exist or has been moved. Use the navigation links above or return to our homepage.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/"
              className="inline-flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white font-medium px-6 py-3 rounded-full transition-all link"
            >
              <Home className="w-4 h-4" />
              <span>Back to Home</span>
            </Link>
            <Link
              to="/solutions"
              className="inline-flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-gray-200 px-6 py-3 rounded-full transition-all link"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Explore Solutions</span>
            </Link>
          </div>
        </div>
      </section>
    </PageWrapper>
  );
};

export default NotFoundPage;
