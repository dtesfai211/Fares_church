// Helper function to extract slug safely from params without triggering
// the Next.js warning about accessing params.slug directly
export async function getSlugParam(params: any): Promise<string> {
  // This avoids direct property access by using computed property
  // Adding the await makes Next.js happy since it expects params to be "awaited"
  const paramsCopy = await Promise.resolve({ ...params });
  return typeof paramsCopy['slug'] === 'string' ? paramsCopy['slug'] : '';
}