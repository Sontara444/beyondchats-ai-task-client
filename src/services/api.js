const API_URL = import.meta.env.VITE_API_URL || '/api';

export const fetchArticles = async () => {
    const response = await fetch(`${API_URL}/articles`);
    if (!response.ok) {
        throw new Error('Failed to fetch articles');
    }
    return response.json();
};

export const fetchOldestArticles = async () => {
    const response = await fetch(`${API_URL}/articles?sort=oldest&limit=5`);
    if (!response.ok) {
        throw new Error('Failed to fetch oldest articles');
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
