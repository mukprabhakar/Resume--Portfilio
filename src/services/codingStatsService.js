// Service to fetch coding statistics from LeetCode, GeeksforGeeks, CodeChef, and HackerRank

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
      schoolProblems: 10,
      basicProblems: 15,
      easyProblems: 25,
      mediumProblems: 30,
      hardProblems: 15
    };
  } catch (error) {
    console.error('Error fetching GFG stats:', error);
    // Return mock data as fallback
    return {
      problemsSolved: 95,
      schoolProblems: 10,
      basicProblems: 15,
      easyProblems: 25,
      mediumProblems: 30,
      hardProblems: 15
    };
  }
};

/**
 * Fetch CodeChef statistics
 * @param {string} username - CodeChef username
 * @returns {Promise<Object>} CodeChef statistics
 */
export const fetchCodeChefStats = async (username) => {
  try {
    // For now, we'll use a mock response since we don't have a deployed backend
    // In a production environment, this would call a deployed API
    return {
      currentRating: 1650,
      highestRating: 1720,
      globalRank: 15000,
      countryRank: 12000,
      problemsSolved: 120,
      fullySolved: 100,
      partiallySolved: 20
    };
  } catch (error) {
    console.error('Error fetching CodeChef stats:', error);
    // Return mock data as fallback
    return {
      currentRating: 1650,
      highestRating: 1720,
      globalRank: 15000,
      countryRank: 12000,
      problemsSolved: 120,
      fullySolved: 100,
      partiallySolved: 20
    };
  }
};

/**
 * Fetch HackerRank statistics
 * @param {string} username - HackerRank username
 * @returns {Promise<Object>} HackerRank statistics
 */
export const fetchHackerRankStats = async (username) => {
  try {
    // For now, we'll use a mock response since we don't have a deployed backend
    // In a production environment, this would call a deployed API
    return {
      stars: 4,
      problemsSolved: 85,
      algorithmsSolved: 50,
      dataStructuresSolved: 25,
      mathematicsSolved: 10
    };
  } catch (error) {
    console.error('Error fetching HackerRank stats:', error);
    // Return mock data as fallback
    return {
      stars: 4,
      problemsSolved: 85,
      algorithmsSolved: 50,
      dataStructuresSolved: 25,
      mathematicsSolved: 10
    };
  }
};

/**
 * Fetch all coding statistics
 * @param {string} leetCodeUsername - LeetCode username
 * @param {string} gfgUsername - GeeksforGeeks username
 * @param {string} codeChefUsername - CodeChef username
 * @param {string} hackerRankUsername - HackerRank username
 * @returns {Promise<Object>} Combined coding statistics
 */
export const fetchAllCodingStats = async (leetCodeUsername, gfgUsername, codeChefUsername, hackerRankUsername) => {
  const [leetCodeStats, gfgStats, codeChefStats, hackerRankStats] = await Promise.all([
    fetchLeetCodeStats(leetCodeUsername),
    fetchGFGStats(gfgUsername),
    fetchCodeChefStats(codeChefUsername),
    fetchHackerRankStats(hackerRankUsername)
  ]);

  console.log('LeetCode stats:', leetCodeStats); // Debug log
  console.log('GFG stats:', gfgStats); // Debug log
  console.log('CodeChef stats:', codeChefStats); // Debug log
  console.log('HackerRank stats:', hackerRankStats); // Debug log

  return {
    leetCode: leetCodeStats,
    gfg: gfgStats,
    codeChef: codeChefStats,
    hackerRank: hackerRankStats
  };
};