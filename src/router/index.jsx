import { createBrowserRouter } from 'react-router-dom';
import App from '../App'; 
import NotFount from '../components/NotFount';
import InfoVersiones from '../components/InfoVersiones/InfoVersiones';

export const router = createBrowserRouter([
    {
        path: '/',
        errorElement: <NotFount />,
        children: [
            {
                index: true,
                element: <App />
            },
            {
                path: '/info-V1.1',
                element: <InfoVersiones />
            }
        ]
    }
])