import React from 'react';
import { Calendar, User, ArrowRight, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

const ArticleCard = ({ article }) => {
    const isEnhanced = article.source === 'BeyondChats+AI';

    // Format date
    const date = new Date(article.publishedDate).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    return (
        <div className="group bg-white rounded-2xl overflow-hidden border border-gray-100 hover:border-purple-200 shadow-sm hover:shadow-2xl hover:shadow-purple-500/10 transition-all duration-300 flex flex-col h-full transform hover:-translate-y-1">
            <div className="p-6 flex flex-col flex-grow relative">
                <div className="flex justify-between items-start mb-4">
                    <span className={`text-[10px] font-bold tracking-wider uppercase px-2 py-1 rounded-md ${isEnhanced ? 'bg-fuchsia-50 text-fuchsia-700' : 'bg-purple-50 text-purple-700'}`}>
                        {article.source}
                    </span>
                    {isEnhanced && (
                        <span className="flex items-center gap-1 text-[10px] bg-gradient-to-r from-fuchsia-500 to-purple-600 text-white px-2 py-1 rounded-full shadow-sm">
                            <Sparkles className="w-3 h-3" /> AI
                        </span>
                    )}
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 leading-tight group-hover:text-purple-600 transition-colors">
                    {article.title}
                </h3>

                <p className="text-gray-500 text-sm mb-6 line-clamp-3 leading-relaxed flex-grow">
                    {article.description || article.content.substring(0, 150) + "..."}
                </p>

                <div className="pt-4 border-t border-gray-50 mt-auto flex items-center justify-between">
                    <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-1.5 text-xs text-gray-400">
                            <User className="w-3 h-3" />
                            {article.author}
                        </div>
                        <div className="flex items-center gap-1.5 text-xs text-gray-400">
                            <Calendar className="w-3 h-3" />
                            {date}
                        </div>
                    </div>

                    <Link
                        to={`/article/${article._id}`}
                        className="w-8 h-8 rounded-full bg-purple-50 text-purple-600 flex items-center justify-center group-hover:bg-purple-600 group-hover:text-white transition-all duration-300"
                        title="Read Article"
                    >
                        <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ArticleCard;
