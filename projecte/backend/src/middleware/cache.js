// middleware/cache.js

// Simple in-memory cache implementation
const cache = new Map();
const DEFAULT_TTL = 60; // 60 seconds default

const cacheMiddleware = (req, res, next) => {
  const key = req.originalUrl || req.url;
  const ttl = process.env.API_CACHE_TTL ? parseInt(process.env.API_CACHE_TTL) : DEFAULT_TTL;
  
  // Check if cached data exists and is still valid
  if (cache.has(key)) {
    const cached = cache.get(key);
    const now = Date.now();
    
    if (now - cached.timestamp < ttl * 1000) {
      console.log(`Cache hit for: ${key}`);
      return res.json(cached.data);
    } else {
      // Remove expired cache
      cache.delete(key);
    }
  }
  
  // Override res.json to cache the response
  const originalJson = res.json;
  res.json = function(data) {
    // Cache the response
    cache.set(key, {
      data,
      timestamp: Date.now()
    });
    console.log(`Cached response for: ${key}`);
    return originalJson.call(this, data);
  };
  
  next();
};

module.exports = cacheMiddleware;