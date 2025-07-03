import React, { useState } from 'react';
import LandingPage from './components/LandingPage';
import AuthScreen from './components/AuthScreen';
import ChatInterface from './components/ChatInterface';
import Dashboard from './components/Dashboard';
import Profile from './components/Profile';
import Navigation from './components/Navigation';
import OpportunityDetail from './components/OpportunityDetail';
import AllOpportunities from './components/AllOpportunities';
import PersonalizedRoadmap from './components/PersonalizedRoadmap';
import OpportunityRoadmap from './components/OpportunityRoadmap';
import SettingsMenu from './components/SettingsMenu';
import EditProfileScreen from './components/EditProfileScreen';
import NotificationsScreen from './components/NotificationsScreen';
import PrivacyScreen from './components/PrivacyScreen';
import HelpScreen from './components/HelpScreen';
import CVManagement from './components/CVManagement';
import AddGoalScreen from './components/AddGoalScreen';
import CommunityMarketplace from './components/CommunityMarketplace';
import IntroductionPopup from './components/IntroductionPopup';
import { useDarkMode } from './hooks/useDarkMode';

export type Screen = 'landing' | 'auth' | 'chat' | 'dashboard' | 'profile' | 'opportunity-detail' | 'all-opportunities' | 'roadmap' | 'opportunity-roadmap' | 'settings' | 'profile-edit' | 'notifications' | 'privacy' | 'help' | 'cv-management' | 'add-goal' | 'community-marketplace';

export function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('landing');
  const [user, setUser] = useState<{ name: string; age: number } | null>(null);
  const [selectedOpportunity, setSelectedOpportunity] = useState<any>(null);
  const [selectedGoal, setSelectedGoal] = useState<string>('');
  const [showIntroPopup, setShowIntroPopup] = useState(false);
  const [userProfile, setUserProfile] = useState<any>(null);
  const { isDarkMode } = useDarkMode();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleGetStarted = (userData?: { name: string; age: number }) => {
    scrollToTop();
    if (userData) {
      setUser(userData);
      setShowIntroPopup(true);
    } else {
      setCurrentScreen('auth');
    }
  };

  const handleAuthSuccess = (userData: { name: string; age: number }) => {
    scrollToTop();
    setUser(userData);
    setShowIntroPopup(true);
  };

  const handleIntroComplete = (profileData: any) => {
    setUserProfile(profileData);
    setShowIntroPopup(false);
    setCurrentScreen('dashboard');
  };

  const handleOpportunitySelect = (opportunity: any) => {
    scrollToTop();
    setSelectedOpportunity(opportunity);
    setCurrentScreen('opportunity-detail');
  };

  const handleAddToGoals = (opportunity: any) => {
    scrollToTop();
    setSelectedOpportunity(opportunity);
    setCurrentScreen('opportunity-roadmap');
  };

  const handleGoalClick = (goalTitle: string) => {
    scrollToTop();
    setSelectedGoal(goalTitle);
    setCurrentScreen('roadmap');
  };

  const handleLogout = () => {
    scrollToTop();
    setUser(null);
    setUserProfile(null);
    setCurrentScreen('landing');
  };

  const handleNavigate = (screen: Screen | string) => {
    scrollToTop();
    setCurrentScreen(screen as Screen);
  };

  const handleBack = (targetScreen: Screen) => {
    scrollToTop();
    setCurrentScreen(targetScreen);
  };

  const handleAddGoal = () => {
    scrollToTop();
    setCurrentScreen('add-goal');
  };

  const handleGoalCreated = (goalData: any) => {
    // Handle the created goal data
    console.log('Goal created:', goalData);
    // Navigate back to dashboard or to the specific roadmap
    if (goalData.type === 'roadmap') {
      setSelectedGoal(goalData.title);
      setCurrentScreen('roadmap');
    } else {
      setCurrentScreen('dashboard');
    }
  };

  const handleCommunityRoadmapSelect = (roadmap: any) => {
    // Handle community roadmap selection
    console.log('Community roadmap selected:', roadmap);
    setSelectedGoal(roadmap.title);
    setCurrentScreen('roadmap');
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'landing':
        return <LandingPage onGetStarted={() => handleGetStarted()} />;
      case 'auth':
        return <AuthScreen onGetStarted={handleAuthSuccess} />;
      case 'chat':
        return <ChatInterface user={user} />;
      case 'dashboard':
        return (
          <Dashboard 
            user={user} 
            onOpportunityClick={handleOpportunitySelect}
            onViewAllOpportunities={() => handleNavigate('all-opportunities')}
            onGoalClick={handleGoalClick}
            onNavigate={handleNavigate}
            onAddGoal={handleAddGoal}
          />
        );
      case 'profile':
        return (
          <Profile 
            user={user} 
            setUser={setUser}
            onNavigate={handleNavigate}
            onLogout={handleLogout}
          />
        );
      case 'opportunity-detail':
        return (
          <OpportunityDetail
            opportunity={selectedOpportunity}
            onBack={() => handleBack('dashboard')}
            onAddToGoals={handleAddToGoals}
          />
        );
      case 'all-opportunities':
        return (
          <AllOpportunities
            onBack={() => handleBack('dashboard')}
            onSelectOpportunity={handleOpportunitySelect}
          />
        );
      case 'roadmap':
        return (
          <PersonalizedRoadmap 
            onBack={() => handleBack('dashboard')}
            goalTitle={selectedGoal}
          />
        );
      case 'opportunity-roadmap':
        return (
          <OpportunityRoadmap
            onBack={() => handleBack('dashboard')}
            opportunity={selectedOpportunity}
          />
        );
      case 'settings':
        return (
          <SettingsMenu
            onBack={() => handleBack('profile')}
            onNavigate={handleNavigate}
            onLogout={handleLogout}
          />
        );
      case 'profile-edit':
        return (
          <EditProfileScreen
            user={user}
            setUser={setUser}
            onBack={() => handleBack('settings')}
          />
        );
      case 'notifications':
        return (
          <NotificationsScreen
            onBack={() => handleBack('settings')}
          />
        );
      case 'privacy':
        return (
          <PrivacyScreen
            onBack={() => handleBack('settings')}
          />
        );
      case 'help':
        return (
          <HelpScreen
            onBack={() => handleBack('settings')}
          />
        );
      case 'cv-management':
        return (
          <CVManagement
            onBack={() => handleBack('profile')}
          />
        );
      case 'add-goal':
        return (
          <AddGoalScreen
            onBack={() => handleBack('dashboard')}
            onGoalCreated={handleGoalCreated}
            onNavigate={handleNavigate}
            user={user}
          />
        );
      case 'community-marketplace':
        return (
          <CommunityMarketplace
            onBack={() => handleBack('dashboard')}
            onRoadmapSelect={handleCommunityRoadmapSelect}
            user={user}
          />
        );
      default:
        return <LandingPage onGetStarted={() => handleGetStarted()} />;
    }
  };

  const showNavigation = currentScreen !== 'landing' && 
                        currentScreen !== 'auth' && 
                        !['opportunity-detail', 'all-opportunities', 'roadmap', 'opportunity-roadmap', 'settings', 'profile-edit', 'notifications', 'privacy', 'help', 'cv-management', 'add-goal', 'community-marketplace'].includes(currentScreen);

  return (
    <div className={`min-h-screen font-inter ${isDarkMode ? 'dark' : ''}`}>
      {showNavigation && (
        <Navigation currentScreen={currentScreen} onNavigate={handleNavigate} />
      )}
      <main className={showNavigation ? 'pb-20 lg:pb-24' : ''}>
        {renderScreen()}
      </main>
      
      {/* Introduction Popup */}
      {showIntroPopup && user && (
        <IntroductionPopup
          isOpen={showIntroPopup}
          onComplete={handleIntroComplete}
          userName={user.name}
        />
      )}
    </div>
  );
}

export { App as default };