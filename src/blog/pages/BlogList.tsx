import React from 'react';
import Header from '@/components/header';
import Footer from '@/components/footer';
import { Link } from 'react-router-dom';
import { Clock, User, Calendar, Tag } from 'lucide-react';

const BlogList = () => {
  const blogPosts = [
    {
      id: 'image-optimization-guide',
      title: 'Advanced Image Optimization Guide',
      description: 'Master the art of image optimization with comprehensive strategies for better web performance.',
      author: 'SnapTools Team',
      date: '2024-01-15',
      tags: ['Image Processing', 'Web Performance', 'Optimization'],
      readTime: '10 min read'
    },
    {
      id: 'pdf-manipulation-techniques',
      title: 'PDF Manipulation Techniques',
      description: 'Learn advanced techniques for manipulating PDF files efficiently and securely.',
      author: 'SnapTools Team',
      date: '2024-01-10',
      tags: ['PDF', 'Document Processing', 'Tutorial'],
      readTime: '8 min read'
    },
    {
      id: 'secure-password-guide',
      title: 'Secure Password Guide',
      description: 'Essential strategies for creating and managing secure passwords in the digital age.',
      author: 'SnapTools Team',
      date: '2024-01-05',
      tags: ['Security', 'Password Management', 'Best Practices'],
      readTime: '12 min read'
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container py-8 pt-20">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">Blog</h1>
          <p className="text-xl text-muted-foreground">
            Discover the latest insights, tutorials, and best practices from the SnapTools team.
          </p>
        </div>

        <div className="grid gap-8">
          {blogPosts.map((post) => (
            <article
              key={post.id}
              className="p-6 rounded-xl border bg-card hover:shadow-lg transition-all hover:border-primary/20"
            >
              <Link to={`/blog/posts/${post.id}`} className="block group">
                <h2 className="text-2xl font-semibold mb-3 group-hover:text-primary transition-colors">
                  {post.title}
                </h2>
                <p className="text-muted-foreground mb-4">{post.description}</p>
                
                <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    {post.author}
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    {post.date}
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    {post.readTime}
                  </div>
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </Link>
            </article>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default BlogList;