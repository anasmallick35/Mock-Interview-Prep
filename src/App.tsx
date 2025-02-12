
import { RouterProvider } from 'react-router-dom';
import Header from './components/Header';
import router from './Router';
import { Suspense } from 'react';
import { Spinner } from './components/Spinner';

const App = () => {
  return (
    <>
    <Suspense fallback = {<Spinner/>}>
    <Header/>
    <RouterProvider router = {router}/>
    </Suspense>
    </>
  );
};

export default App;