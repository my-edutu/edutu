import React, { useState } from 'react';
import { MessageCircle, Target, TrendingUp, BookOpen, Users, Award, ChevronRight, Sparkles, CheckCircle2, FileText, Upload, BarChart3, Zap, Plus, Globe, Bell } from 'lucide-react';
import Card from './ui/Card';
import Button from './ui/Button';
import NotificationInbox from './NotificationInbox';
import { useDarkMode } from '../hooks/useDarkMode';

interface DashboardProps {
  user: { name: string; age: number } | null;
  onOpportunityClick: (opportunity: any) => void;
  onViewAllOpportunities: () => void;
  onGoalClick: (goalTitle: string) => void;
  onNavigate?: (screen: string) => void;
  onAddGoal?: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ 
  user, 
  onOpportunityClick, 
  onViewAllOpportunities,
  onGoalClick,
  onNavigate,
  onAddGoal 
}) => {
  const [recentAchievements, setRecentAchievements] = useState([
    { 
      id: '1',
      title: "Set up Python development environment", 
      icon: <CheckCircle2 size={16} />, 
      date: "Today",
      type: "task_completed"
    },
    { 
      id: '2',
      title: "Complete Python basics tutorial", 
      icon: <CheckCircle2 size={16} />, 
      date: "Today",
      type: "task_completed"
    },
    { 
      id: '3',
      title: "Profile Complete", 
      icon: <Award size={16} />, 
      date: "Yesterday",
      type: "milestone"
    }
  ]);

  const [showNotifications, setShowNotifications] = useState(false);
  const [unreadCount] = useState(3); // This would come from your notification state
  const { isDarkMode } = useDarkMode();

  const opportunities = [
    {
      id: '1',
      title: "African Leadership Academy Scholarship",
      organization: "African Leadership Academy",
      category: "Education",
      deadline: "March 15, 2024",
      location: "South Africa",
      match: 95,
      difficulty: 'Hard' as const,
      applicants: '10,000+',
      successRate: '5%',
      description: "A comprehensive scholarship program for academically talented yet economically disadvantaged young people from Africa.",
      requirements: [
        "African citizenship",
        "Demonstrated academic excellence",
        "Financial need",
        "Leadership potential",
        "Commitment to giving back to Africa"
      ],
      benefits: [
        "Full tuition coverage",
        "Living expenses",
        "Books and supplies",
        "Leadership development",
        "Mentorship program"
      ],
      applicationProcess: [
        "Complete online application",
        "Submit academic transcripts",
        "Provide financial documentation",
        "Write personal essays",
        "Attend interview if selected"
      ],
      image: "https://images.pexels.com/photos/5212345/pexels-photo-5212345.jpeg"
    },
    {
      id: '2',
      title: "Tech Skills Bootcamp - Lagos",
      organization: "TechPoint Africa",
      category: "Skills",
      deadline: "February 28, 2024",
      location: "Lagos, Nigeria",
      match: 88,
      difficulty: 'Medium' as const,
      applicants: '2,000+',
      successRate: '25%',
      description: "6-month intensive programming bootcamp designed to transform beginners into job-ready developers.",
      requirements: [
        "Basic computer literacy",
        "Commitment to full-time learning",
        "Age 18-35",
        "Passion for technology",
        "Available for 6 months"
      ],
      benefits: [
        "Full-stack development training",
        "Job placement assistance",
        "Industry mentorship",
        "Project portfolio development",
        "Networking opportunities"
      ],
      applicationProcess: [
        "Submit online application",
        "Complete coding challenge",
        "Attend virtual interview",
        "Participate in orientation",
        "Begin intensive training"
      ],
      image: "https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg"
    },
    {
      id: '3',
      title: "Young Entrepreneurs Network",
      organization: "African Entrepreneurship Network",
      category: "Networking",
      deadline: "Ongoing",
      location: "Pan-African",
      match: 82,
      difficulty: 'Easy' as const,
      applicants: '5,000+',
      successRate: '60%',
      description: "Connect with like-minded entrepreneurs across Africa and access resources for business growth.",
      requirements: [
        "African resident or citizen",
        "Business idea or existing business",
        "Age 18-40",
        "Commitment to networking",
        "Entrepreneurial mindset"
      ],
      benefits: [
        "Access to mentor network",
        "Business development resources",
        "Funding opportunities",
        "Regular networking events",
        "Online community access"
      ],
      applicationProcess: [
        "Create profile on platform",
        "Submit business pitch",
        "Connect with mentors",
        "Participate in events",
        "Access resources and funding"
      ],
      image: "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg"
    }
  ];

  const goals = [
    { title: "Complete Python Course", progress: 75, deadline: "Next week" },
    { title: "Apply to 5 Scholarships", progress: 40, deadline: "This month" },
    { title: "Build Portfolio Website", progress: 20, deadline: "Next month" }
  ];

  const handleViewMoreAchievements = () => {
    // Navigate to achievements page
    console.log('View more achievements');
  };

  const handleCVManagement = () => {
    // Navigate to CV management page
    if (onNavigate) {
      onNavigate('cv-management');
    }
  };

  const handleCommunityMarketplace = () => {
    if (onNavigate) {
      onNavigate('community-marketplace');
    }
  };

  const getTimeOfDay = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'morning';
    if (hour < 17) return 'afternoon';
    return 'evening';
  };

  const timeOfDay = getTimeOfDay();
  const greeting = `Good ${timeOfDay}`;

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'} animate-fade-in`}>
      {/* Professional Welcome Header */}
      <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-200'} shadow-sm`}>
        <div className="p-6">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-2xl flex items-center justify-center shadow-lg">
                <Sparkles size={28} className="text-white" />
              </div>
              <div>
                <h1 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-1`}>
                  {greeting}, {user?.name}! 👋
                </h1>
                <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'} text-lg`}>
                  Ready to unlock new opportunities today?
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              {/* Notification Bell */}
              <div className="relative">
                <button
                  onClick={() => setShowNotifications(true)}
                  className={`relative p-3 rounded-2xl transition-all hover:scale-110 ${
                    isDarkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'
                  }`}
                >
                  <Bell size={20} className={isDarkMode ? 'text-gray-300' : 'text-gray-600'} />
                  {unreadCount > 0 && (
                    <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
                      <span className="text-xs text-white font-bold">
                        {unreadCount > 9 ? '9+' : unreadCount}
                      </span>
                    </div>
                  )}
                </button>
              </div>
              
              <div className="text-right">
                <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'} mb-1`}>
                  {new Date().toLocaleDateString('en-US', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>All systems active</span>
                </div>
              </div>
            </div>
          </div>

          {/* Progress Overview */}
          <div className="grid grid-cols-4 gap-6">
            <div className={`text-center p-4 ${isDarkMode ? 'bg-gray-700' : 'bg-blue-50'} rounded-2xl transition-all hover:scale-105`}>
              <div className="text-2xl font-bold text-primary mb-1">12</div>
              <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Opportunities</div>
            </div>
            <div className={`text-center p-4 ${isDarkMode ? 'bg-gray-700' : 'bg-green-50'} rounded-2xl transition-all hover:scale-105`}>
              <div className="text-2xl font-bold text-green-600 mb-1">3</div>
              <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Goals Active</div>
            </div>
            <div className={`text-center p-4 ${isDarkMode ? 'bg-gray-700' : 'bg-yellow-50'} rounded-2xl transition-all hover:scale-105`}>
              <div className="text-2xl font-bold text-yellow-600 mb-1">75%</div>
              <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Avg Progress</div>
            </div>
            <div className={`text-center p-4 ${isDarkMode ? 'bg-gray-700' : 'bg-purple-50'} rounded-2xl transition-all hover:scale-105`}>
              <div className="text-2xl font-bold text-purple-600 mb-1">7</div>
              <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Days Streak</div>
            </div>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-8">
        {/* Community Marketplace Section */}
        <Card className={`${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} shadow-sm cursor-pointer hover:shadow-lg transition-all transform hover:scale-[1.02] group`} onClick={handleCommunityMarketplace}>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <div className={`w-14 h-14 ${isDarkMode ? 'bg-gradient-to-br from-green-600 to-green-700' : 'bg-gradient-to-br from-green-50 to-green-100'} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform`}>
                <Globe size={24} className={`${isDarkMode ? 'text-white' : 'text-green-600'}`} />
              </div>
              <div>
                <h2 className={`text-xl font-semibold ${isDarkMode ? 'text-white' : 'text-gray-800'} mb-1 group-hover:text-primary transition-colors`}>Community Roadmaps</h2>
                <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Discover success paths shared by accomplished community members</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className={`px-3 py-1 ${isDarkMode ? 'bg-green-900/30 text-green-400' : 'bg-green-50 text-green-600'} rounded-full text-sm font-medium`}>
                500+ Roadmaps
              </div>
              <ChevronRight size={20} className="text-gray-400 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
          
          <div className="grid grid-cols-3 gap-4 mb-4">
            <div className={`p-3 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'} rounded-xl text-center`}>
              <Users size={20} className="text-green-600 mx-auto mb-2" />
              <p className={`text-sm font-medium ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>Success Stories</p>
            </div>
            <div className={`p-3 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'} rounded-xl text-center`}>
              <Award size={20} className="text-yellow-600 mx-auto mb-2" />
              <p className={`text-sm font-medium ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>Proven Results</p>
            </div>
            <div className={`p-3 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'} rounded-xl text-center`}>
              <MessageCircle size={20} className="text-blue-600 mx-auto mb-2" />
              <p className={`text-sm font-medium ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>Connect & Learn</p>
            </div>
          </div>

          <div className="text-center">
            <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'} mb-3`}>
              Browse roadmaps from successful entrepreneurs, scholars, and professionals
            </p>
          </div>
        </Card>

        {/* CV Management Section - With Button */}
        <Card className={`${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} shadow-sm`}>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <div className={`w-14 h-14 ${isDarkMode ? 'bg-gradient-to-br from-blue-600 to-blue-700' : 'bg-gradient-to-br from-blue-50 to-blue-100'} rounded-2xl flex items-center justify-center`}>
                <FileText size={24} className={`${isDarkMode ? 'text-white' : 'text-primary'}`} />
              </div>
              <div>
                <h2 className={`text-xl font-semibold ${isDarkMode ? 'text-white' : 'text-gray-800'} mb-1`}>CV Management</h2>
                <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Upload, optimize, and enhance your CV for better opportunities</p>
              </div>
            </div>
            <div className={`px-3 py-1 ${isDarkMode ? 'bg-blue-900/30 text-blue-400' : 'bg-blue-50 text-blue-600'} rounded-full text-sm font-medium`}>
              New Features
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className={`p-3 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'} rounded-xl text-center`}>
              <Upload size={20} className="text-primary mx-auto mb-2" />
              <p className={`text-sm font-medium ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>Upload & Scan</p>
            </div>
            <div className={`p-3 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'} rounded-xl text-center`}>
              <Zap size={20} className="text-accent mx-auto mb-2" />
              <p className={`text-sm font-medium ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>AI Optimization</p>
            </div>
          </div>

          <Button 
            onClick={handleCVManagement}
            className="w-full flex items-center justify-center gap-2"
          >
            <FileText size={16} />
            Open CV Management
            <ChevronRight size={16} />
          </Button>
        </Card>

        {/* Current Goals */}
        <Card className={`${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} shadow-sm`}>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <Target size={24} className="text-primary" />
              <h2 className={`text-xl font-semibold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>Your Goals</h2>
            </div>
            <Button 
              onClick={onAddGoal}
              className="inline-flex items-center gap-2 px-4 py-2"
            >
              <Plus size={16} />
              Add Goal
            </Button>
          </div>
          <div className="space-y-5">
            {goals.map((goal, index) => (
              <div 
                key={index} 
                className={`animate-slide-up cursor-pointer hover:${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'} p-4 -m-4 rounded-2xl transition-all group`}
                style={{ animationDelay: `${index * 100}ms` }}
                onClick={() => onGoalClick(goal.title)}
              >
                <div className="flex justify-between items-center mb-3">
                  <h3 className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>{goal.title}</h3>
                  <div className="flex items-center gap-2">
                    <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>{goal.deadline}</span>
                    <ChevronRight size={16} className="text-gray-400 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
                <div className={`w-full ${isDarkMode ? 'bg-gray-600' : 'bg-gray-200'} rounded-full h-3 mb-2`}>
                  <div
                    className="bg-gradient-to-r from-primary to-accent h-3 rounded-full transition-all duration-500 relative overflow-hidden"
                    style={{ width: `${goal.progress}%` }}
                  >
                    <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
                  </div>
                </div>
                <div className="text-sm text-primary font-medium">
                  {goal.progress}% complete
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Personalized Opportunities */}
        <Card className={`${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} shadow-sm`}>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <Sparkles size={24} className="text-primary" />
              <h2 className={`text-xl font-semibold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>Opportunities for You</h2>
            </div>
            <Button variant="secondary" className={`${isDarkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-600 border-gray-600' : 'bg-white text-gray-700 hover:bg-gray-50 border-gray-200'}`} onClick={onViewAllOpportunities}>
              View All
            </Button>
          </div>
          <div className="space-y-4">
            {opportunities.map((opp, index) => (
              <div
                key={index}
                className={`p-5 ${isDarkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-50 hover:bg-gray-100'} rounded-2xl transition-all cursor-pointer animate-slide-up group`}
                style={{ animationDelay: `${index * 100}ms` }}
                onClick={() => onOpportunityClick(opp)}
              >
                <div className="flex justify-between items-start mb-3">
                  <div className="flex-1">
                    <h3 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-800'} mb-2`}>{opp.title}</h3>
                    <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'} mb-3 leading-relaxed`}>{opp.description.substring(0, 120)}...</p>
                    <div className={`flex items-center gap-4 text-xs ${isDarkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                      <span className="bg-primary/10 text-primary px-3 py-1 rounded-full font-medium">
                        {opp.category}
                      </span>
                      <span>Due: {opp.deadline}</span>
                    </div>
                  </div>
                  <div className="text-right ml-4">
                    <div className="text-sm font-semibold text-green-600 mb-1">
                      {opp.match}% match
                    </div>
                    <ChevronRight size={16} className="text-gray-400 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Recent Achievements */}
        <Card className={`${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} shadow-sm`}>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <TrendingUp size={24} className="text-accent" />
              <h2 className={`text-xl font-semibold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>Recent Achievements</h2>
            </div>
            <Button variant="secondary" className={`${isDarkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-600 border-gray-600' : 'bg-white text-gray-700 hover:bg-gray-50 border-gray-200'}`} onClick={handleViewMoreAchievements}>
              View All
            </Button>
          </div>
          <div className="space-y-4">
            {recentAchievements.slice(0, 3).map((achievement, index) => (
              <div
                key={achievement.id}
                className="flex items-center gap-4 p-4 bg-accent/10 dark:bg-accent/20 rounded-2xl animate-slide-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="w-10 h-10 bg-accent rounded-full flex items-center justify-center text-white">
                  {achievement.icon}
                </div>
                <div className="flex-1">
                  <p className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>{achievement.title}</p>
                  <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>{achievement.date}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Notification Inbox */}
      <NotificationInbox 
        isOpen={showNotifications} 
        onClose={() => setShowNotifications(false)} 
      />
    </div>
  );
};

export default Dashboard;