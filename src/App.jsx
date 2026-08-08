import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';

// Concept Pages
import HomeOverview from './components/concepts/HomeOverview';
import React19HooksDemo from './components/concepts/React19HooksDemo';
import ConcurrentHooksDemo from './components/concepts/ConcurrentHooksDemo';
import CustomStateDemo from './components/concepts/CustomStateDemo';
import ContextDemo from './components/concepts/ContextDemo';
import MemoCallbackDemo from './components/concepts/MemoCallbackDemo';
import ReducerCounterDemo from './components/concepts/ReducerCounterDemo';
import ShoppingCartDemo from './components/concepts/ShoppingCartDemo';
import ClassComponentsDemo from './components/concepts/ClassComponentsDemo';
import ReactRouterDemo from './components/concepts/ReactRouterDemo';
import React19FeaturesDemo from './components/concepts/React19FeaturesDemo';

const CustomHooksDemo = React.lazy(
  () => import('./components/concepts/CustomHooksDemo'),
);
const WeatherApp = React.lazy(() => import('./pages/WeatherApp'));

const NotFound = () => (
  <div style={{ padding: '2rem', textAlign: 'center' }}>
    <h1 style={{ fontSize: '2rem', color: '#f87171' }}>404 - Page Not Found</h1>
    <p style={{ color: '#cbd5e1' }}>
      The page you are looking for does not exist. Please check the URL or
      return to the home page.
    </p>
  </div>
);  

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomeOverview />} />
          <Route path="custom-hooks" element={<CustomHooksDemo />} />
          <Route path="react-19-hooks" element={<React19HooksDemo />} />
          <Route path="concurrent-hooks" element={<ConcurrentHooksDemo />} />
          <Route path="custom-state" element={<CustomStateDemo />} />
          <Route path="context-api" element={<ContextDemo />} />
          <Route path="memo-callback" element={<MemoCallbackDemo />} />
          <Route path="reducer-counter" element={<ReducerCounterDemo />} />
          <Route path="shopping-cart" element={<ShoppingCartDemo />} />
          <Route path="class-components" element={<ClassComponentsDemo />} />
          <Route path="react-router" element={<ReactRouterDemo />} />
          <Route path="react-19-features" element={<React19FeaturesDemo />} />
          <Route path="weather-app" element={<WeatherApp />} />
          {/* Not found */}
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
