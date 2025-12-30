const API_URL = import.meta.env.VITE_API_URL || '/api';

export const fetchArticles = async () => {
    const response = await fetch(`${API_URL}/articles`);
    if (!response.ok) {
        throw new Error('Failed to fetch articles');
    }
    return response.json();
};

export const scrapeArticles = async () => {
    const response = await fetch(`${API_URL}/articles/scrape`, {
        method: 'POST',
    });
    if (!response.ok) {
        throw new Error('Failed to trigger scrape');
    }
    return response.json();
};
