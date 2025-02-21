import { RouterProvider } from 'react-router-dom';
import router from './router';
import { Suspense } from 'react';
import { Spinner } from './components/Spinner';
import { Toaster } from 'sonner';
import useAuth from './hooks/useAuth';

const App = () => {
  useAuth()
  return (
    <>
      <Suspense fallback={<Spinner />}>
        <RouterProvider router={router} />
        <Toaster position="bottom-right" />
      </Suspense>
    </>
  );
};

export default App;