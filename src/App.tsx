import { Routes, Route } from 'react-router-dom';
import { Desktop } from './components/layout/Desktop/Desktop';
import { SettingsProvider } from './contexts/SettingsContext';
import { AchievementsProvider } from './contexts/AchievementsContext';
import { TravelLayout } from './pages/travels/TravelLayout';
import { TravelHub } from './pages/travels/TravelHub';
import { TripPage } from './pages/travels/TripPage';

function App() {
  return (
    <SettingsProvider>
      <AchievementsProvider>
        <Routes>
          {/* Main Portfolio Desktop */}
          <Route path="/" element={<Desktop />} />

          {/* Travel Blog (Separate Minimalist Theme) */}
          <Route path="/travels" element={<TravelLayout />}>
            <Route index element={<TravelHub />} />
            <Route path=":tripId" element={<TripPage />} />
          </Route>
        </Routes>
      </AchievementsProvider>
    </SettingsProvider>
  );
}

export default App;
