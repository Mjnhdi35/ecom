/**
 * Composable for fetching images from free APIs (Unsplash, Pexels)
 * For Agriculture/E-commerce products
 */

// Interface for future API response typing

interface _ImageAPIResponse {
  url: string;
  thumbnail?: string;
  alt: string;
  photographer?: string;
}

/**
 * Get image from Unsplash API (free, no key required for basic usage)
 * @param query - Search query for the image
 * @param width - Image width
 * @param height - Image height
 */
export async function getUnsplashImage(
  query: string,
  width = 800,
  height = 600,
): Promise<string> {
  // Using Unsplash Source API (no key required)
  const encodedQuery = encodeURIComponent(query);
  return `https://source.unsplash.com/${width}x${height}/?${encodedQuery}`;
}

/**
 * Get image from Pexels API (requires free API key)
 * Fallback to Unsplash if no key provided
 * @param query - Search query
 * @param width - Image width
 * @param height - Image height
 */
export async function getPexelsImage(
  query: string,
  width = 800,
  height = 600,
): Promise<string> {
  const config = useRuntimeConfig();
  const apiKey = config.public.pexelsApiKey;

  if (!apiKey) {
    // Fallback to Unsplash
    return getUnsplashImage(query, width, height);
  }

  try {
    const response = await $fetch<{
      photos: Array<{ src: { large: string }; photographer: string }>;
    }>(
      `https://api.pexels.com/v1/search?query=${encodeURIComponent(query)}&per_page=1`,
      {
        headers: {
          Authorization: apiKey as string,
        },
      },
    );

    if (
      response?.photos &&
      response.photos.length > 0 &&
      response.photos[0]?.src?.large
    ) {
      return response.photos[0].src.large;
    }
  } catch (error) {
    console.warn('Pexels API error, falling back to Unsplash:', error);
  }

  return getUnsplashImage(query, width, height);
}

/**
 * Get agriculture product image
 * @param productName - Name of the product
 * @param category - Product category
 */
export function useAgricultureImage(productName: string, category?: string) {
  const query = category
    ? `${category} ${productName} organic fresh`
    : `${productName} organic fresh agriculture`;

  return {
    getImage: (width = 800, height = 600) =>
      getUnsplashImage(query, width, height),
    getThumbnail: (size = 400) => getUnsplashImage(query, size, size),
  };
}

/**
 * Predefined agriculture product images
 */
export const AGRICULTURE_IMAGES = {
  // Fruits
  apple: () => getUnsplashImage('organic green apple fresh', 800, 800),
  mango: () => getUnsplashImage('fresh ripe mango organic', 800, 800),
  banana: () => getUnsplashImage('organic banana fresh', 800, 800),
  orange: () => getUnsplashImage('fresh orange organic', 800, 800),
  strawberry: () => getUnsplashImage('fresh strawberry organic', 800, 800),
  grapes: () => getUnsplashImage('fresh grapes organic', 800, 800),

  // Vegetables
  tomato: () => getUnsplashImage('fresh tomato organic', 800, 800),
  carrot: () => getUnsplashImage('fresh carrot organic', 800, 800),
  lettuce: () => getUnsplashImage('fresh lettuce organic', 800, 800),
  broccoli: () => getUnsplashImage('fresh broccoli organic', 800, 800),
  cauliflower: () => getUnsplashImage('fresh cauliflower organic', 800, 800),
  spinach: () => getUnsplashImage('fresh spinach organic', 800, 800),
  cucumber: () => getUnsplashImage('fresh cucumber organic', 800, 800),
  bellPepper: () => getUnsplashImage('fresh bell pepper organic', 800, 800),
  onion: () => getUnsplashImage('fresh onion organic', 800, 800),
  potato: () => getUnsplashImage('fresh potato organic', 800, 800),

  // Herbs & Spices
  basil: () => getUnsplashImage('fresh basil organic', 800, 800),
  parsley: () => getUnsplashImage('fresh parsley organic', 800, 800),
  cilantro: () => getUnsplashImage('fresh cilantro organic', 800, 800),
  mint: () => getUnsplashImage('fresh mint organic', 800, 800),

  // Grains & Legumes
  rice: () => getUnsplashImage('organic rice grains', 800, 800),
  wheat: () => getUnsplashImage('organic wheat grains', 800, 800),
  beans: () => getUnsplashImage('organic beans fresh', 800, 800),
  lentils: () => getUnsplashImage('organic lentils', 800, 800),

  // Nuts & Seeds
  almonds: () => getUnsplashImage('organic almonds raw', 800, 800),
  walnuts: () => getUnsplashImage('organic walnuts raw', 800, 800),
  sunflowerSeeds: () => getUnsplashImage('organic sunflower seeds', 800, 800),
} as const;

/**
 * Get random agriculture image for variety
 */
export function getRandomAgricultureImage(
  category: 'fruits' | 'vegetables' | 'herbs' | 'grains' = 'vegetables',
) {
  const queries: Record<string, string[]> = {
    fruits: [
      'organic fruits fresh',
      'fresh fruits basket',
      'organic apple banana',
    ],
    vegetables: [
      'organic vegetables fresh',
      'fresh vegetables basket',
      'organic tomato carrot',
    ],
    herbs: [
      'fresh herbs organic',
      'organic basil parsley',
      'fresh mint cilantro',
    ],
    grains: ['organic grains', 'fresh grains basket', 'organic rice wheat'],
  };

  const categoryQueries = queries[category] || queries.vegetables;
  if (!categoryQueries || categoryQueries.length === 0) {
    return getUnsplashImage('organic vegetables fresh', 800, 800);
  }
  const randomQuery =
    categoryQueries[Math.floor(Math.random() * categoryQueries.length)];
  if (!randomQuery) {
    return getUnsplashImage('organic vegetables fresh', 800, 800);
  }
  return getUnsplashImage(randomQuery, 800, 800);
}
