import { useParams, Link } from 'react-router-dom';
import { Calendar, User, Clock, Share2, ArrowLeft } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Separator } from '../components/ui/separator';
import { blogArticles } from '../lib/mockData';
import { toast } from 'sonner@2.0.3';

export default function ArticlePage() {
  const { id } = useParams();
  const article = blogArticles.find((a) => a.id === id);

  if (!article) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl text-gray-900 mb-4">Article not found</h2>
          <Link to="/blog">
            <Button>Back to Blog</Button>
          </Link>
        </div>
      </div>
    );
  }

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success('Link copied to clipboard!');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link to="/blog">
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="size-4 mr-2" />
            Back to Blog
          </Button>
        </Link>

        <article className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Featured Image */}
          <img src={article.image} alt={article.title} className="w-full h-96 object-cover" />

          {/* Article Content */}
          <div className="p-8">
            <Badge className="mb-4">{article.category}</Badge>
            <h1 className="text-4xl text-gray-900 mb-4">{article.title}</h1>

            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-4 text-gray-600">
                <div className="flex items-center">
                  <User className="size-4 mr-2" />
                  {article.author}
                </div>
                <Separator orientation="vertical" className="h-4" />
                <div className="flex items-center">
                  <Calendar className="size-4 mr-2" />
                  {new Date(article.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </div>
                <Separator orientation="vertical" className="h-4" />
                <div className="flex items-center">
                  <Clock className="size-4 mr-2" />
                  {article.readTime}
                </div>
              </div>

              <Button variant="outline" size="icon" onClick={handleShare}>
                <Share2 className="size-4" />
              </Button>
            </div>

            <Separator className="mb-6" />

            <div className="prose max-w-none">
              <p className="text-xl text-gray-700 mb-6">{article.excerpt}</p>
              <div className="text-gray-700 leading-relaxed space-y-4">
                {article.content.split('\n\n').map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>

              <div className="mt-8 p-6 bg-emerald-50 rounded-lg">
                <h3 className="text-xl text-gray-900 mb-2">Planning a trip to Cameroon?</h3>
                <p className="text-gray-700 mb-4">
                  Check out our comprehensive guides and start planning your adventure today!
                </p>
                <div className="flex space-x-3">
                  <Link to="/destinations">
                    <Button variant="default" className="bg-emerald-600 hover:bg-emerald-700">
                      Browse Destinations
                    </Button>
                  </Link>
                  <Link to="/trip-planner">
                    <Button variant="outline">Trip Planner</Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </article>

        {/* Related Articles */}
        <div className="mt-12">
          <h2 className="text-2xl text-gray-900 mb-6">More Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {blogArticles
              .filter((a) => a.id !== id)
              .slice(0, 2)
              .map((relatedArticle) => (
                <Link
                  key={relatedArticle.id}
                  to={`/blog/${relatedArticle.id}`}
                  className="bg-white rounded-lg overflow-hidden shadow hover:shadow-lg transition"
                >
                  <img
                    src={relatedArticle.image}
                    alt={relatedArticle.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <Badge className="mb-2">{relatedArticle.category}</Badge>
                    <h3 className="text-lg text-gray-900 mb-2">{relatedArticle.title}</h3>
                    <p className="text-sm text-gray-600">{relatedArticle.excerpt}</p>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
