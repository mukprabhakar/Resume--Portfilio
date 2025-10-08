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
 * Fetch GeeksforGeeks statistics
 * @param {string} username - GeeksforGeeks username
 * @returns {Promise<Object>} GeeksforGeeks statistics
 */
export const fetchGFGStats = async (username) => {
  try {
    // For now, we'll use a mock response since we don't have a deployed backend
    // In a production environment, this would call a deployed API
    return {
      problemsSolved: 95,
      school: 15,
      basic: 20,
      easy: 25,
      medium: 12,
      hard: 3
    };
  } catch (error) {
    console.error('Error fetching GFG stats:', error);
    // Return mock data as fallback
    return {
      problemsSolved: 75,
      school: 15,
      basic: 20,
      easy: 25,
      medium: 12,
      hard: 3
    };
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