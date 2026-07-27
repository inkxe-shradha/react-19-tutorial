import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';

// Concept Pages
import HomeOverview from './components/concepts/HomeOverview';
import CustomHooksDemo from './components/concepts/CustomHooksDemo';
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
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
