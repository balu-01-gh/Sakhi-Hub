/**
 * Gamification System for SAKHI HUB
 * Manages badges, points, achievements, and user progression
 */

// Badge Definitions
export const BADGES = {
  FIRST_LOGIN: {
    id: 'first_login',
    name: 'Welcome Sakhi',
    description: 'Completed first login',
    icon: '👋',
    points: 10,
    color: 'bg-blue-500'
  },
  SOS_SETUP: {
    id: 'sos_setup',
    name: 'Safety First',
    description: 'Set up safety circle',
    icon: '🛡️',
    points: 50,
    color: 'bg-red-500'
  },
  FIRST_VOTE: {
    id: 'first_vote',
    name: 'Voice Matters',
    description: 'Cast first vote in community',
    icon: '🗳️',
    points: 25,
    color: 'bg-purple-500'
  },
  FIVE_VOTES: {
    id: 'five_votes',
    name: 'Active Citizen',
    description: 'Participated in 5 community decisions',
    icon: '⭐',
    points: 100,
    color: 'bg-yellow-500'
  },
  HEALTH_QUERY: {
    id: 'health_query',
    name: 'Health Seeker',
    description: 'Asked first health question',
    icon: '🏥',
    points: 20,
    color: 'bg-green-500'
  },
  TEN_HEALTH_QUERIES: {
    id: 'ten_health_queries',
    name: 'Health Champion',
    description: 'Asked 10+ health questions',
    icon: '💪',
    points: 150,
    color: 'bg-emerald-500'
  },
  PRODUCT_LISTED: {
    id: 'product_listed',
    name: 'Entrepreneur',
    description: 'Listed first product',
    icon: '🛍️',
    points: 75,
    color: 'bg-pink-500'
  },
  FIVE_PRODUCTS: {
    id: 'five_products',
    name: 'Shop Owner',
    description: 'Listed 5+ products',
    icon: '🏪',
    points: 200,
    color: 'bg-orange-500'
  },
  SCHEME_CHECKED: {
    id: 'scheme_checked',
    name: 'Aware Citizen',
    description: 'Checked scheme eligibility',
    icon: '📋',
    points: 30,
    color: 'bg-indigo-500'
  },
  VIDEO_WATCHED: {
    id: 'video_watched',
    name: 'Learner',
    description: 'Completed first video lesson',
    icon: '📚',
    points: 15,
    color: 'bg-cyan-500'
  },
  FIVE_VIDEOS: {
    id: 'five_videos',
    name: 'Knowledge Seeker',
    description: 'Watched 5+ educational videos',
    icon: '🎓',
    points: 120,
    color: 'bg-teal-500'
  },
  PROFILE_COMPLETE: {
    id: 'profile_complete',
    name: 'Profile Pro',
    description: 'Completed full profile',
    icon: '✅',
    points: 40,
    color: 'bg-lime-500'
  },
  WEEK_STREAK: {
    id: 'week_streak',
    name: 'Consistent Sakhi',
    description: '7-day login streak',
    icon: '🔥',
    points: 180,
    color: 'bg-orange-600'
  },
  COMMUNITY_HELPER: {
    id: 'community_helper',
    name: 'Community Star',
    description: 'Helped 5 community members',
    icon: '🌟',
    points: 250,
    color: 'bg-yellow-600'
  },
  VOICE_USER: {
    id: 'voice_user',
    name: 'Voice Expert',
    description: 'Used voice input 10 times',
    icon: '🎤',
    points: 90,
    color: 'bg-violet-500'
  }
};

// Point actions
export const POINT_ACTIONS = {
  LOGIN: 5,
  VOTE: 10,
  HEALTH_QUERY: 8,
  PRODUCT_VIEW: 2,
  PRODUCT_LIST: 25,
  SCHEME_CHECK: 12,
  VIDEO_WATCH: 15,
  PROFILE_UPDATE: 20,
  SOS_SETUP: 50,
  COMMUNITY_POST: 18,
  SHARE_RESOURCE: 30,
  VOICE_INPUT: 5
};

// Initialize user gamification data
export const initializeGamification = () => {
  const existing = localStorage.getItem('user_gamification');
  if (!existing) {
    const defaultData = {
      totalPoints: 0,
      badges: [],
      actions: {
        logins: 0,
        votes: 0,
        healthQueries: 0,
        productsListed: 0,
        schemesChecked: 0,
        videosWatched: 0,
        sosSetup: false,
        profileComplete: false,
        voiceInputs: 0,
        lastLogin: new Date().toISOString(),
        loginStreak: 1
      },
      level: 1,
      createdAt: new Date().toISOString()
    };
    localStorage.setItem('user_gamification', JSON.stringify(defaultData));
    return defaultData;
  }
  return JSON.parse(existing);
};

// Award points and check for badges
export const awardPoints = (action, amount = null) => {
  const gamificationData = initializeGamification();
  const points = amount || POINT_ACTIONS[action] || 0;
  
  gamificationData.totalPoints += points;
  
  // Update action counts
  switch (action) {
    case 'LOGIN':
      gamificationData.actions.logins += 1;
      checkLoginStreak(gamificationData);
      break;
    case 'VOTE':
      gamificationData.actions.votes += 1;
      break;
    case 'HEALTH_QUERY':
      gamificationData.actions.healthQueries += 1;
      break;
    case 'PRODUCT_LIST':
      gamificationData.actions.productsListed += 1;
      break;
    case 'SCHEME_CHECK':
      gamificationData.actions.schemesChecked += 1;
      break;
    case 'VIDEO_WATCH':
      gamificationData.actions.videosWatched += 1;
      break;
    case 'SOS_SETUP':
      gamificationData.actions.sosSetup = true;
      break;
    case 'PROFILE_UPDATE':
      gamificationData.actions.profileComplete = true;
      break;
    case 'VOICE_INPUT':
      gamificationData.actions.voiceInputs += 1;
      break;
  }
  
  // Check for new badges
  checkAndAwardBadges(gamificationData);
  
  // Calculate level
  gamificationData.level = calculateLevel(gamificationData.totalPoints);
  
  localStorage.setItem('user_gamification', JSON.stringify(gamificationData));
  
  return {
    pointsAwarded: points,
    totalPoints: gamificationData.totalPoints,
    newBadges: getNewBadges(gamificationData),
    level: gamificationData.level
  };
};

// Check login streak
const checkLoginStreak = (data) => {
  const lastLogin = new Date(data.actions.lastLogin);
  const today = new Date();
  const diffTime = Math.abs(today - lastLogin);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  if (diffDays === 1) {
    data.actions.loginStreak = (data.actions.loginStreak || 1) + 1;
  } else if (diffDays > 1) {
    data.actions.loginStreak = 1;
  }
  
  data.actions.lastLogin = today.toISOString();
};

// Check and award badges based on achievements
const checkAndAwardBadges = (data) => {
  const newBadges = [];
  
  // First login
  if (data.actions.logins >= 1 && !data.badges.includes(BADGES.FIRST_LOGIN.id)) {
    newBadges.push(BADGES.FIRST_LOGIN.id);
  }
  
  // SOS Setup
  if (data.actions.sosSetup && !data.badges.includes(BADGES.SOS_SETUP.id)) {
    newBadges.push(BADGES.SOS_SETUP.id);
  }
  
  // Voting badges
  if (data.actions.votes >= 1 && !data.badges.includes(BADGES.FIRST_VOTE.id)) {
    newBadges.push(BADGES.FIRST_VOTE.id);
  }
  if (data.actions.votes >= 5 && !data.badges.includes(BADGES.FIVE_VOTES.id)) {
    newBadges.push(BADGES.FIVE_VOTES.id);
  }
  
  // Health query badges
  if (data.actions.healthQueries >= 1 && !data.badges.includes(BADGES.HEALTH_QUERY.id)) {
    newBadges.push(BADGES.HEALTH_QUERY.id);
  }
  if (data.actions.healthQueries >= 10 && !data.badges.includes(BADGES.TEN_HEALTH_QUERIES.id)) {
    newBadges.push(BADGES.TEN_HEALTH_QUERIES.id);
  }
  
  // Product badges
  if (data.actions.productsListed >= 1 && !data.badges.includes(BADGES.PRODUCT_LISTED.id)) {
    newBadges.push(BADGES.PRODUCT_LISTED.id);
  }
  if (data.actions.productsListed >= 5 && !data.badges.includes(BADGES.FIVE_PRODUCTS.id)) {
    newBadges.push(BADGES.FIVE_PRODUCTS.id);
  }
  
  // Scheme check
  if (data.actions.schemesChecked >= 1 && !data.badges.includes(BADGES.SCHEME_CHECKED.id)) {
    newBadges.push(BADGES.SCHEME_CHECKED.id);
  }
  
  // Video badges
  if (data.actions.videosWatched >= 1 && !data.badges.includes(BADGES.VIDEO_WATCHED.id)) {
    newBadges.push(BADGES.VIDEO_WATCHED.id);
  }
  if (data.actions.videosWatched >= 5 && !data.badges.includes(BADGES.FIVE_VIDEOS.id)) {
    newBadges.push(BADGES.FIVE_VIDEOS.id);
  }
  
  // Profile complete
  if (data.actions.profileComplete && !data.badges.includes(BADGES.PROFILE_COMPLETE.id)) {
    newBadges.push(BADGES.PROFILE_COMPLETE.id);
  }
  
  // Week streak
  if (data.actions.loginStreak >= 7 && !data.badges.includes(BADGES.WEEK_STREAK.id)) {
    newBadges.push(BADGES.WEEK_STREAK.id);
  }
  
  // Voice user
  if (data.actions.voiceInputs >= 10 && !data.badges.includes(BADGES.VOICE_USER.id)) {
    newBadges.push(BADGES.VOICE_USER.id);
  }
  
  // Add new badges to user's collection
  data.badges = [...data.badges, ...newBadges];
  
  return newBadges;
};

// Get newly awarded badges
const getNewBadges = (data) => {
  return data.badges.map(badgeId => {
    return Object.values(BADGES).find(badge => badge.id === badgeId);
  }).filter(Boolean);
};

// Calculate level based on points
const calculateLevel = (points) => {
  if (points < 100) return 1;
  if (points < 300) return 2;
  if (points < 600) return 3;
  if (points < 1000) return 4;
  if (points < 1500) return 5;
  if (points < 2200) return 6;
  if (points < 3000) return 7;
  if (points < 4000) return 8;
  if (points < 5500) return 9;
  return 10;
};

// Get points needed for next level
export const getNextLevelPoints = (currentPoints) => {
  const levels = [0, 100, 300, 600, 1000, 1500, 2200, 3000, 4000, 5500, 10000];
  const currentLevel = calculateLevel(currentPoints);
  return levels[currentLevel] || 10000;
};

// Get user gamification data
export const getGamificationData = () => {
  return initializeGamification();
};

// Get leaderboard (from localStorage - in real app would be from backend)
export const getLeaderboard = () => {
  const currentUser = getGamificationData();
  const userName = localStorage.getItem('user_name') || 'You';
  
  // Mock leaderboard data + current user
  const leaderboard = [
    { rank: 1, name: 'Lakshmi Devi', points: 3250, badges: 12, level: 8, village: 'Rampur' },
    { rank: 2, name: 'Rani Kumari', points: 2890, badges: 10, level: 7, village: 'Sitapur' },
    { rank: 3, name: 'Sita Verma', points: 2450, badges: 9, level: 7, village: 'Kishanpur' },
    { rank: 4, name: 'Maya Singh', points: 2100, badges: 8, level: 6, village: 'Bilaspur' },
    { rank: 5, name: 'Geeta Bai', points: 1875, badges: 8, level: 6, village: 'Durgpur' },
    { rank: 6, name: 'Anita Rao', points: 1650, badges: 7, level: 5, village: 'Sonapur' },
    { rank: 7, name: 'Radha Sharma', points: 1420, badges: 6, level: 5, village: 'Madhubani' },
    { rank: 8, name: 'Priya Patel', points: 1180, badges: 6, level: 4, village: 'Ahmedabad' },
    { rank: 9, name: 'Sunita Devi', points: 980, badges: 5, level: 4, village: 'Patna' },
    { rank: 10, name: 'Kavita Singh', points: 750, badges: 4, level: 3, village: 'Lucknow' },
  ];
  
  // Insert current user
  const userEntry = {
    rank: 0,
    name: userName,
    points: currentUser.totalPoints,
    badges: currentUser.badges.length,
    level: currentUser.level,
    village: 'Your Village',
    isCurrentUser: true
  };
  
  // Find where user ranks
  let inserted = false;
  for (let i = 0; i < leaderboard.length; i++) {
    if (currentUser.totalPoints > leaderboard[i].points) {
      leaderboard.splice(i, 0, userEntry);
      inserted = true;
      break;
    }
  }
  
  if (!inserted) {
    leaderboard.push(userEntry);
  }
  
  // Update ranks
  leaderboard.forEach((entry, index) => {
    entry.rank = index + 1;
  });
  
  return leaderboard.slice(0, 15); // Top 15
};

// Get user badges
export const getUserBadges = () => {
  const data = getGamificationData();
  return data.badges.map(badgeId => {
    return Object.values(BADGES).find(badge => badge.id === badgeId);
  }).filter(Boolean);
};

// Get progress to next badge
export const getNextBadgeProgress = () => {
  const data = getGamificationData();
  const progress = [];
  
  // Check each badge type for progress
  if (!data.badges.includes(BADGES.FIVE_VOTES.id)) {
    progress.push({
      badge: BADGES.FIVE_VOTES,
      current: data.actions.votes,
      target: 5,
      percentage: (data.actions.votes / 5) * 100
    });
  }
  
  if (!data.badges.includes(BADGES.TEN_HEALTH_QUERIES.id)) {
    progress.push({
      badge: BADGES.TEN_HEALTH_QUERIES,
      current: data.actions.healthQueries,
      target: 10,
      percentage: (data.actions.healthQueries / 10) * 100
    });
  }
  
  if (!data.badges.includes(BADGES.FIVE_PRODUCTS.id)) {
    progress.push({
      badge: BADGES.FIVE_PRODUCTS,
      current: data.actions.productsListed,
      target: 5,
      percentage: (data.actions.productsListed / 5) * 100
    });
  }
  
  if (!data.badges.includes(BADGES.FIVE_VIDEOS.id)) {
    progress.push({
      badge: BADGES.FIVE_VIDEOS,
      current: data.actions.videosWatched,
      target: 5,
      percentage: (data.actions.videosWatched / 5) * 100
    });
  }
  
  if (!data.badges.includes(BADGES.WEEK_STREAK.id)) {
    progress.push({
      badge: BADGES.WEEK_STREAK,
      current: data.actions.loginStreak || 1,
      target: 7,
      percentage: ((data.actions.loginStreak || 1) / 7) * 100
    });
  }
  
  return progress.sort((a, b) => b.percentage - a.percentage);
};
