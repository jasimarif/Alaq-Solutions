import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Navbar, BlogCard } from '../../Components';

const BlogDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const blogs = [
    {
      id: 1,
      title: "The Future of Financial Technology",
      excerpt: "Exploring how emerging technologies are reshaping the financial landscape and what it means for businesses.",
      content: `
        <p>Financial technology has evolved dramatically over the past decade, transforming how businesses handle their financial operations. From artificial intelligence-powered analytics to blockchain-based transactions, the landscape is changing rapidly.</p>
        
        <h3>Key Technological Advances</h3>
        <p>The integration of AI and machine learning in financial systems has enabled unprecedented levels of automation and accuracy. These technologies are helping businesses make data-driven decisions faster than ever before.</p>
        
        <h3>Impact on Traditional Banking</h3>
        <p>Traditional banking institutions are adapting to these changes by embracing digital transformation. This shift is creating new opportunities for both established players and fintech startups.</p>
        
        <h3>Looking Ahead</h3>
        <p>As we move forward, we can expect to see even more integration between traditional financial services and emerging technologies. The future holds promise for more efficient, secure, and accessible financial solutions.</p>
      `,
      date: "October 15, 2025",
      author: "ALAQ Solutions Team",
      image: "/api/placeholder/800/400",
      category: "Technology",
      readTime: "5 min read"
    },
    {
      id: 2,
      title: "Automating Your Revenue Process",
      excerpt: "A comprehensive guide to implementing revenue automation in your organization for maximum efficiency.",
      content: `
        <p>Revenue automation is no longer a luxury—it's a necessity for businesses looking to scale efficiently. This comprehensive guide will walk you through the essential steps to implement revenue automation in your organization.</p>
        
        <h3>Understanding Revenue Automation</h3>
        <p>Revenue automation involves using technology to streamline and optimize the entire revenue cycle, from lead generation to payment collection. This approach reduces manual errors, saves time, and improves cash flow.</p>
        
        <h3>Key Benefits</h3>
        <p>Organizations that implement revenue automation typically see a 30-50% reduction in processing time and a significant improvement in accuracy. The benefits extend beyond efficiency to include better customer experiences and improved compliance.</p>
        
        <h3>Implementation Strategy</h3>
        <p>Successful implementation requires careful planning, stakeholder buy-in, and a phased approach. Start with the most manual processes and gradually expand automation across your revenue cycle.</p>
      `,
      date: "October 10, 2025",
           author: "ALAQ Solutions Team",
      image: "/api/placeholder/800/400",
      category: "Automation",
      readTime: "7 min read"
    },
    {
      id: 3,
      title: "Best Practices for Modern Accounting",
      excerpt: "Essential practices every finance team should implement for accurate and efficient accounting processes.",
      content: `
        <p>Modern accounting goes beyond traditional bookkeeping. Today's finance teams need to embrace digital tools, real-time reporting, and strategic analysis to drive business success.</p>
        
        <h3>Digital-First Approach</h3>
        <p>Cloud-based accounting software has revolutionized how businesses manage their finances. These platforms offer real-time insights, automated reconciliation, and seamless integration with other business systems.</p>
        
        <h3>Compliance and Accuracy</h3>
        <p>Maintaining compliance while ensuring accuracy requires robust processes and controls. Modern accounting practices emphasize automation for routine tasks while maintaining human oversight for complex decisions.</p>
        
        <h3>Strategic Financial Management</h3>
        <p>The role of accounting has evolved from record-keeping to strategic advisory. Finance teams now provide valuable insights that drive business strategy and growth.</p>
      `,
      date: "October 5, 2025",
            author: "ALAQ Solutions Team",
      image: "/api/placeholder/800/400",
      category: "Accounting",
      readTime: "6 min read"
    },
    {
      id: 4,
      title: "Digital Transformation in Finance",
      excerpt: "How digital tools and platforms are revolutionizing traditional financial operations.",
      content: `
        <p>Digital transformation in finance is reshaping how organizations manage their financial operations. From automated workflows to AI-powered analytics, the possibilities are endless.</p>
        
        <h3>Core Components</h3>
        <p>Successful digital transformation in finance involves several key components: process automation, data analytics, cloud infrastructure, and user experience design.</p>
        
        <h3>Overcoming Challenges</h3>
        <p>While the benefits are clear, organizations often face challenges in implementation. These include legacy system integration, change management, and ensuring data security.</p>
        
        <h3>Measuring Success</h3>
        <p>Key performance indicators for digital transformation include process efficiency, error reduction, cost savings, and employee satisfaction.</p>
      `,
      date: "September 30, 2025",
      author: "ALAQ Solutions Team",
      image: "/api/placeholder/800/400",
      category: "Digital Transformation",
      readTime: "8 min read"
    },
    {
      id: 5,
      title: "Scaling Your Business with Smart Solutions",
      excerpt: "Strategies and tools to help your business grow efficiently while maintaining operational excellence.",
      content: `
        <p>Scaling a business requires more than just increasing revenue—it demands smart solutions that can grow with your organization while maintaining quality and efficiency.</p>
        
        <h3>Infrastructure for Growth</h3>
        <p>Building scalable infrastructure is crucial for sustainable growth. This includes technology systems, processes, and organizational structures that can adapt to increased demand.</p>
        
        <h3>Technology Solutions</h3>
        <p>Modern businesses rely on cloud-based solutions, automation tools, and integrated platforms to scale efficiently. These technologies enable growth without proportional increases in overhead.</p>
        
        <h3>Strategic Planning</h3>
        <p>Successful scaling requires careful planning and execution. Organizations must balance growth objectives with operational stability and customer satisfaction.</p>
      `,
      date: "September 25, 2025",
      author: "ALAQ Solutions Team",
      image: "/api/placeholder/800/400",
      category: "Business Growth",
      readTime: "9 min read"
    },
    {
      id: 6,
      title: "Data Security in Financial Systems",
      excerpt: "Essential security measures and best practices for protecting sensitive financial data.",
      content: `
        <p>Data security in financial systems is paramount in today's digital landscape. Organizations must implement comprehensive security measures to protect sensitive financial information.</p>
        
        <h3>Security Framework</h3>
        <p>A robust security framework includes multiple layers of protection: encryption, access controls, monitoring, and incident response procedures.</p>
        
        <h3>Compliance Requirements</h3>
        <p>Financial organizations must comply with various regulations including PCI DSS, SOX, and GDPR. These requirements shape security policies and procedures.</p>
        
        <h3>Emerging Threats</h3>
        <p>As technology evolves, so do security threats. Organizations must stay vigilant and adapt their security measures to address new risks and vulnerabilities.</p>
      `,
      date: "September 20, 2025",
      author: "ALAQ Solutions Team",
      image: "/api/placeholder/800/400",
      category: "Security",
      readTime: "7 min read"
    }
  ];

  const currentBlog = blogs.find(blog => blog.id === parseInt(id));
  
  if (!currentBlog) {
    return (
      <div className="bg-darkBlue min-h-screen font-poppins">
        <Navbar />
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-white mb-4">Blog Not Found</h1>
            <p className="text-gray-300 mb-8">The blog post you're looking for doesn't exist.</p>
            <button 
              onClick={() => navigate('/blogs')}
              className="px-6 py-3 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors duration-300 cursor-none"
            >
              Back to Blogs
            </button>
          </div>
        </div>
      </div>
    );
  }

  const otherBlogs = blogs
    .filter(blog => blog.id !== currentBlog.id)
    .sort(() => 0.5 - Math.random())
    .slice(0, 3);

  return (
    <div className="bg-darkBlue min-h-screen font-poppins">
      <Navbar />
      
      {/* Blog Header */}
      <div className="relative px-6 lg:px-24 pt-20 pb-16">
        <div className="max-w-4xl mx-auto">
          <button 
            onClick={() => navigate('/blogs')}
            className="inline-flex items-center text-blue-400 hover:text-blue-300 transition-colors duration-300 mb-8 cursor-none"
          >
            ← Back to Blogs
          </button>
          
          <div className="mb-8">
            <div className="flex items-center gap-4 text-gray-400 text-sm mb-4">
              <span>{currentBlog.date}</span>
              <span>•</span>
              <span>{currentBlog.readTime}</span>
              <span>•</span>
              <span>By {currentBlog.author}</span>
            </div>
            
            <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6">
              {currentBlog.title}
            </h1>
            
            <p className="text-xl text-gray-300 leading-relaxed">
              {currentBlog.excerpt}
            </p>
          </div>
          
          {/* Featured Image */}
          <div className="aspect-video bg-gray-600 rounded-2xl overflow-hidden relative mb-12">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-white text-lg font-semibold">Featured Image</div>
            </div>
          </div>
        </div>
      </div>

      {/* Blog Content */}
      <div className="px-6 lg:px-24 pb-20">
        <div className="max-w-4xl mx-auto">
          <div 
            className="prose prose-lg prose-invert max-w-none"
            dangerouslySetInnerHTML={{ __html: currentBlog.content }}
            style={{
              color: '#e5e7eb',
              lineHeight: '1.75',
            }}
          />
        </div>
      </div>

      {/* You Might Also Like Section */}
      <div className="px-6 lg:px-24 pb-20">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-12 text-center">
            You Might Also Like
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {otherBlogs.map((blog) => (
              <BlogCard key={blog.id} blog={blog} />
            ))}
          </div>
        </div>
      </div>

    </div>
  );
};

export default BlogDetailPage;