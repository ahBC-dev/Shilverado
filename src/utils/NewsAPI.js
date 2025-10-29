

//news
// Fetch crypto news - FREE tier (no API key needed)
export const fetchCryptoNews = async () => {
  try {
    const response = await fetch(
      'https://min-api.cryptocompare.com/data/v2/news/?lang=EN&categories=Technology,Blockchain'
    );
    
    if (!response.ok) throw new Error('Failed to fetch news');
    const data = await response.json();
    
    // Transform data to match your component
    return data.Data.map(article => ({
      id: article.id,
      title: article.title,
      news_site: article.source,
      thumb_2x: article.imageurl,
      url: article.url
    })).slice(0, 3);
    
  } catch (error) {
    console.error('Error fetching news:', error);
    return [];
  }
};
