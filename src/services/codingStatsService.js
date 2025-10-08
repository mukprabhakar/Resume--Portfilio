// Service to fetch coding statistics from LeetCode and GeeksforGeeks

/**
 * Fetch LeetCode statistics for a given username
 * @param {string} username - LeetCode username
 * @returns {Promise<Object>} LeetCode statistics
 */
export const fetchLeetCodeStats = async (username) => {
  try {
    const response = await fetch(`https://leetcode-stats-api.herokuapp.com/${username}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch LeetCode stats: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching LeetCode stats:', error);
    return null;
  }
};

/**
 * Fetch GeeksforGeeks statistics by calling our backend service
 * @param {string} username - GeeksforGeeks username
 * @returns {Promise<Object>} GeeksforGeeks statistics
 */
export const fetchGFGStats = async (username) => {
  try {
    // Call our backend server to scrape GFG data (bypassing CORS restrictions)
    const response = await fetch(`http://localhost:3001/api/gfg/${username}`);
    console.log('GFG response status:', response.status); // Debug log
    if (!response.ok) {
      throw new Error(`Failed to fetch GFG stats: ${response.status}`);
    }
    const data = await response.json();
    console.log('GFG data:', data); // Debug log
    return data;
  } catch (error) {
    console.error('Error fetching GFG stats:', error);
    return null;
  }
};

/**
 * Fetch all coding statistics
 * @param {string} leetCodeUsername - LeetCode username
 * @param {string} gfgUsername - GeeksforGeeks username
 * @returns {Promise<Object>} Combined coding statistics
 */
export const fetchAllCodingStats = async (leetCodeUsername, gfgUsername) => {
  const [leetCodeStats, gfgStats] = await Promise.all([
    fetchLeetCodeStats(leetCodeUsername),
    fetchGFGStats(gfgUsername)
  ]);

  console.log('LeetCode stats:', leetCodeStats); // Debug log
  console.log('GFG stats:', gfgStats); // Debug log

  return {
    leetCode: leetCodeStats,
    gfg: gfgStats
  };
};