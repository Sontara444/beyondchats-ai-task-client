import React, { useEffect, useState } from 'react';
import { fetchArticles, scrapeArticles } from '../services/api';
import Navbar from '../components/Navbar';
import ArticleCard from '../components/ArticleCard';
import { Search, Loader2 } from 'lucide-react';

const Home = () => {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [scraping, setScraping] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    const loadArticles = async () => {
        try {
            const data = await fetchArticles();
            setArticles(data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadArticles();
    }, []);

    const handleScrape = async () => {
        setScraping(true);
        try {
            await scrapeArticles();
            // Wait a bit or poll, but for now just reload list
            await loadArticles();
        } catch (error) {
            console.error(error);
        } finally {
            setScraping(false);
        }
    };

    const filteredArticles = articles.filter(article =>
        article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (article.description && article.description.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    return (
        <div className="min-h-screen bg-gray-50 font-sans">
            <Navbar onScrape={handleScrape} isScraping={scraping} />

            <div className="relative bg-white overflow-hidden">
                <div className="absolute inset-0">
                    <div className="absolute inset-y-0 right-0 w-1/2 bg-gradient-to-l from-blue-50 to-transparent opacity-60"></div>
                </div>
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
                    <div className="text-center">
                        <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                            <span className="block">Discover the latest in</span>
                            <span className="block text-blue-600">AI & Chatbot Innovation</span>
                        </h1>
                        <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
                            Explore our curated insights, enhanced by AI, to stay ahead in the rapidly evolving world of technology.
                        </p>
                    </div>

                    <div className="mt-10 max-w-xl mx-auto">
                        <div className="relative rounded-2xl shadow-sm focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-offset-2 transition-all duration-300">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <Search className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                                type="text"
                                className="block w-full pl-11 pr-4 py-4 border-gray-200 rounded-2xl text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:ring-blue-500 shadow-sm text-lg"
                                placeholder="Search articles..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                    </div>
                </div>
            </div>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {loading ? (
                    <div className="flex flex-col items-center justify-center py-20">
                        <Loader2 className="w-12 h-12 animate-spin text-blue-600 mb-4" />
                        <p className="text-gray-500 text-lg">Curating content for you...</p>
                    </div>
                ) : (
                    <>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {filteredArticles.map(article => (
                                <ArticleCard key={article._id} article={article} />
                            ))}
                        </div>

                        {!loading && filteredArticles.length === 0 && (
                            <div className="text-center py-24 bg-white rounded-3xl border border-dashed border-gray-200">
                                <p className="text-gray-400 text-lg">No articles found matching "{searchTerm}"</p>
                            </div>
                        )}
                    </>
                )}
            </main>
        </div>
    );
};

export default Home;
