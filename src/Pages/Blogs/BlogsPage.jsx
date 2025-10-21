import React from 'react';
import { Navbar, Footer, SlidingButton, BlogCard } from '../../Components';

const BlogsPage = () => {
  const blogs = [
    {
      id: 1,
      title: "The Future of Financial Technology",
      excerpt: "Exploring how emerging technologies are reshaping the financial landscape and what it means for businesses.",
      date: "October 15, 2025",
      author: "ALAQ Solutions Team",
      image: "/api/placeholder/400/300",
      category: "Technology"
    },
    {
      id: 2,
      title: "Automating Your Revenue Process",
      excerpt: "A comprehensive guide to implementing revenue automation in your organization for maximum efficiency.",
      date: "October 10, 2025",
      author: "ALAQ Solutions Team",
      image: "/api/placeholder/400/300",
      category: "Automation"
    },
    {
      id: 3,
      title: "Best Practices for Modern Accounting",
      excerpt: "Essential practices every finance team should implement for accurate and efficient accounting processes.",
      date: "October 5, 2025",
      author: "ALAQ Solutions Team",
      image: "/api/placeholder/400/300",
      category: "Accounting"
    },
    {
      id: 4,
      title: "Digital Transformation in Finance",
      excerpt: "How digital tools and platforms are revolutionizing traditional financial operations. Take a look at the key trends driving this change.",
      date: "September 30, 2025",
      author: "ALAQ Solutions Team",
      image: "/api/placeholder/400/300",
      category: "Digital Transformation"
    },
    {
      id: 5,
      title: "Scaling Your Business with Smart Solutions",
      excerpt: "Strategies and tools to help your business grow efficiently while maintaining operational excellence.",
      date: "September 25, 2025",
      author: "ALAQ Solutions Team",
      image: "/api/placeholder/400/300",
      category: "Business Growth"
    },
    {
      id: 6,
      title: "Data Security in Financial Systems",
      excerpt: "Essential security measures and best practices for protecting sensitive financial data. Stay ahead of potential threats.",
      date: "September 20, 2025",
      author: "ALAQ Solutions Team",
      image: "/api/placeholder/400/300",
      category: "Security"
    }
  ];

  return (
    <div className="bg-darkBlue min-h-screen font-poppins">
      <Navbar />

      {/* Hero Section */}
      <div className="relative px-6 lg:px-24 pt-20 pb-16 animate-fadeIn">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-5xl lg:text-7xl font-bold text-white mb-6 animate-slideUp">
              Our <span className="text-blue-400 tracking-tighter">Blogs</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto animate-slideUp" style={{ animationDelay: '0.1s' }}>
              Stay updated with the latest insights, trends, and best practices in financial technology and business automation.
            </p>
          </div>
        </div>
      </div>

      {/* Blog Grid */}
      <div className="px-6 lg:px-24 pb-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogs.map((blog, index) => (
              <div
                key={blog.id}
                className="animate-slideUp"
                style={{ animationDelay: `${0.2 + index * 0.08}s` }}
              >
                <BlogCard blog={blog} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Newsletter Subscription */}
      <div className="px-6 lg:px-24 pb-20 animate-fadeIn" style={{ animationDelay: '0.7s' }}>
        <div className="max-w-7xl mx-auto">
          <div className="bg-gray-800 rounded-3xl p-12 text-center">
            <h3 className="text-3xl font-bold text-white mb-4">
              <span className='text-blue-400'>Subscribe</span> to Our Newsletter
            </h3>
            <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
              Get the latest insights and updates delivered straight to your inbox. Stay ahead with our expert analysis and industry trends.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-6 py-3 rounded-full bg-gray-700 border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50"
              />
              <SlidingButton text={'Subscribe'} />
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default BlogsPage;
