import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchArticles, fetchArticleById } from '../services/api'; // Updated import
import { ArrowLeft, Calendar, User, Clock, Share2, Bookmark } from 'lucide-react';
import Navbar from '../components/Navbar';

const ArticleDetail = () => {
    const { id } = useParams();
    const [article, setArticle] = useState(null);
    const [loading, setLoading] = useState(true);

    const [showOriginal, setShowOriginal] = useState(false);

    useEffect(() => {
        const loadArticle = async () => {
            try {
                const data = await fetchArticleById(id);
                console.log("Article data received:", data);
                setArticle(data);
                // Default to showing enhanced if available, else original
                setShowOriginal(false);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        loadArticle();
    }, [id]);

    if (loading) return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
            <div className="animate-pulse flex flex-col items-center">
                <div className="h-4 w-48 bg-gray-200 rounded mb-4"></div>
                <div className="h-4 w-32 bg-gray-200 rounded"></div>
            </div>
        </div>
    );

    if (!article) return <div>Article not found</div>;

    const date = new Date(article.publishedDate).toLocaleDateString('en-US', {
        year: 'numeric', month: 'long', day: 'numeric'
    });

    const displayContent = showOriginal ? article.originalContent : article.content;
    const isEnhanced = article.isEnhanced;

    return (
        <div className="min-h-screen bg-white">
            <Navbar />

            <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <Link to="/" className="inline-flex items-center text-gray-500 hover:text-blue-600 mb-8 transition-colors">
                    <ArrowLeft className="w-4 h-4 mr-2" /> Back to Articles
                </Link>

                <article>
                    <header className="mb-10 text-center">
                        <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-gray-500 mb-6">
                            <span className="flex items-center gap-1">
                                <Calendar className="w-4 h-4" /> {date}
                            </span>
                            <span className="flex items-center gap-1">
                                <User className="w-4 h-4" /> {article.author}
                            </span>
                            <span className="flex items-center gap-1">
                                <Clock className="w-4 h-4" /> 5 min read
                            </span>
                        </div>

                        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-8 leading-tight">
                            {article.title}
                        </h1>

                        {isEnhanced && (
                            <div className="flex justify-center mb-8">
                                <div className="bg-gray-100 p-1 rounded-lg inline-flex relative">
                                    <button
                                        onClick={() => setShowOriginal(false)}
                                        className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${!showOriginal ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                                    >
                                        ✨ AI Enhanced
                                    </button>
                                    <button
                                        onClick={() => setShowOriginal(true)}
                                        className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${showOriginal ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                                    >
                                        Original
                                    </button>
                                </div>
                            </div>
                        )}

                        <div className="h-1 w-20 bg-blue-600 mx-auto rounded-full"></div>
                    </header>

                    {/* Content */}
                    <div className="prose prose-lg prose-blue mx-auto text-gray-700 leading-relaxed">
                        {displayContent && displayContent.split('\n')
                            .map(p => p.trim())
                            .filter(p => p.length > 0)
                            .map((paragraph, idx) => (
                                <p key={idx} className="mb-4">
                                    {paragraph}
                                </p>
                            ))}
                    </div>

                    {/* Footer/Citation */}
                    <div className="mt-16 pt-8 border-t border-gray-100">
                        <div className="bg-gray-50 rounded-2xl p-8">
                            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                                <Bookmark className="w-5 h-5 text-blue-600" />
                                Sources & References
                            </h3>

                            {/* Original BeyondChats Source */}
                            <div className="mb-6">
                                <h4 className="text-sm font-semibold text-gray-700 mb-2">Original Source:</h4>
                                <div className="flex items-start gap-3">
                                    <span className="text-blue-600 font-bold mt-0.5">•</span>
                                    <a
                                        href={article.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-gray-700 hover:text-blue-600 transition-colors"
                                    >
                                        {article.title} - BeyondChats Blog
                                    </a>
                                </div>
                            </div>

                            {/* External References (if enhanced) */}
                            {isEnhanced && article.references && article.references.length > 0 && (
                                <div className="mb-6">
                                    <h4 className="text-sm font-semibold text-gray-700 mb-2">
                                        External References Used for Enhancement:
                                    </h4>
                                    <ul className="space-y-3">
                                        {article.references
                                            .filter(ref => ref && ref.url && ref.title) // Validate references
                                            .map((ref, idx) => (
                                                <li key={idx} className="flex items-start gap-3">
                                                    <span className="text-blue-600 font-bold mt-0.5">•</span>
                                                    <a
                                                        href={ref.url}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="text-gray-700 hover:text-blue-600 transition-colors"
                                                    >
                                                        {ref.title}
                                                    </a>
                                                </li>
                                            ))}
                                    </ul>
                                </div>
                            )}

                            {/* Show message if no external references for enhanced articles */}
                            {isEnhanced && (!article.references || article.references.length === 0) && (
                                <div className="mb-6">
                                    <p className="text-gray-600 text-sm italic">
                                        This article was enhanced using AI analysis. External references were not available at the time of enhancement.
                                    </p>
                                </div>
                            )}

                            <p className="text-gray-500 text-xs italic border-t border-gray-200 pt-4">
                                Disclaimer: This article is for educational purposes.
                                {isEnhanced && " Content has been enhanced using automated AI tools and external insights."}
                            </p>
                        </div>
                    </div>
                </article>
            </main>
        </div>
    );
};

export default ArticleDetail;
