import React from 'react';
import { RefreshCw, MessageSquare } from 'lucide-react';
import { Link } from 'react-router-dom';

const Navbar = ({ onScrape, isScraping }) => {
    return (
        <nav className="bg-white border-b border-gray-100 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">
                    <Link to="/" className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                            <MessageSquare className="w-5 h-5 text-white" />
                        </div>
                        <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
                            BeyondChats
                        </span>
                    </Link>

                    <button
                        onClick={onScrape}
                        disabled={isScraping}
                        className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${isScraping
                                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                : 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg hover:shadow-blue-500/30'
                            }`}
                    >
                        <RefreshCw className={`w-4 h-4 ${isScraping ? 'animate-spin' : ''}`} />
                        {isScraping ? 'Scraping...' : 'Refresh Content'}
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
