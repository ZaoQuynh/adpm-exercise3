import { AuthProvider } from './src/context/AuthContext';
import AppNav from './src/navigations/AppNav';
import AppStack from './src/navigations/AppStack';
import HomeScreenView from './src/screens/HomeScreenView';

export default function App() {
  return (
    <AuthProvider>
      <AppNav/>
    </AuthProvider>
  );
}