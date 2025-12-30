import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchArticles } from '../services/api'; // Or getById
import { ArrowLeft, Calendar, User, Clock, Share2, Bookmark } from 'lucide-react';
import Navbar from '../components/Navbar';

const ArticleDetail = () => {
    const { id } = useParams();
    const [article, setArticle] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Ideally fetch by ID, but for now we reuse fetchArticles and find
        const loadArticle = async () => {
            // In real app, call fetchArticleById(id)
            try {
                const response = await fetch(`/api/articles/${id}`);
                if (!response.ok) {
                    if (response.status === 404) {
                        setArticle(null); // Will trigger "Article not found" UI
                        return;
                    }
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setArticle(data);
            } catch (error) {
                console.error("Failed to load article:", error);
            } finally {
                setLoading(false);
            }
        };
        loadArticle();
    }, [id]);

    if (loading) return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
            <div className="animate-pulse flex flex-col items-center">
                <div className="h-4 w-48 bg-purple-200 rounded mb-4"></div>
                <div className="h-4 w-32 bg-purple-200 rounded"></div>
            </div>
        </div>
    );

    if (!article) return (
        <div className="min-h-screen bg-white flex flex-col">
            <Navbar />
            <div className="flex-grow flex flex-col items-center justify-center">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Article not found</h2>
                    <p className="text-gray-500 mb-6">The article you are looking for does not exist or has been removed.</p>
                    <Link to="/" className="text-purple-600 hover:text-purple-700 font-medium">
                        Return to Home
                    </Link>
                </div>
            </div>
        </div>
    );

    const date = new Date(article.publishedDate).toLocaleDateString('en-US', {
        year: 'numeric', month: 'long', day: 'numeric'
    });

    return (
        <div className="min-h-screen bg-white font-sans">
            <Navbar />

            <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <Link to="/" className="inline-flex items-center text-gray-500 hover:text-purple-600 mb-8 transition-colors">
                    <ArrowLeft className="w-4 h-4 mr-2" /> Back to Articles
                </Link>

                <article>
                    <header className="mb-10 text-center">
                        <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-gray-500 mb-6 font-medium">
                            <span className="flex items-center gap-1.5">
                                <Calendar className="w-4 h-4 text-purple-400" /> {date}
                            </span>
                            <span className="flex items-center gap-1.5">
                                <User className="w-4 h-4 text-purple-400" /> {article.author}
                            </span>
                            <span className="flex items-center gap-1.5">
                                <Clock className="w-4 h-4 text-purple-400" /> 5 min read
                            </span>
                        </div>

                        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-8 leading-tight tracking-tight">
                            {article.title}
                        </h1>

                        {article.source === 'BeyondChats+AI' && (
                            <div className="inline-block bg-gradient-to-r from-purple-50 to-indigo-50 border border-purple-100 rounded-full px-5 py-2 text-sm text-purple-800 mb-8 shadow-sm">
                                ✨ This content has been enhanced with AI insights
                            </div>
                        )}

                        <div className="h-1.5 w-24 bg-gradient-to-r from-purple-500 to-indigo-500 mx-auto rounded-full"></div>
                    </header>

                    {/* Content */}
                    <div className="prose prose-lg prose-purple mx-auto text-gray-700 leading-relaxed">
                        {/* 
                           We need to render newlines as paragraphs. 
                           Since content is text, we split by \n 
                        */}
                        {article.content.split('\n').filter(p => p.trim()).map((paragraph, idx) => (
                            <p key={idx} className="mb-6">
                                {paragraph}
                            </p>
                        ))}
                    </div>

                    {/* Footer/Citation */}
                    <div className="mt-16 pt-8 border-t border-gray-100">
                        <div className="bg-gradient-to-br from-gray-50 to-purple-50/30 rounded-2xl p-8 border border-gray-100">
                            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                                <Bookmark className="w-5 h-5 text-purple-600" />
                                Source & Context
                            </h3>
                            <p className="text-gray-600 text-sm mb-4">
                                Original Source: <a href={article.url} target="_blank" rel="noopener noreferrer" className="text-purple-600 hover:text-purple-700 hover:underline font-medium">{article.source}</a>
                            </p>
                            <p className="text-gray-500 text-xs italic">
                                Disclaimer: This article is for educational purposes. Content may have been aggregated from multiple sources using automated tools.
                            </p>
                        </div>
                    </div>
                </article>
            </main>
        </div>
    );
};

export default ArticleDetail;
