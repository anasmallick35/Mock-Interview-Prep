
import { RouterProvider } from 'react-router-dom';
import router from './Router';
import { Suspense } from 'react';
import { Spinner } from './components/Spinner/Spinner';

const App = () => {
  return (
    <>
    <Suspense fallback = {<Spinner/>}>
    <RouterProvider router = {router}/>

    </Suspense>
    </>
  );
};

export default App;