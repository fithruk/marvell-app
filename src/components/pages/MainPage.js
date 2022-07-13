import { useState } from 'react';

import AppAllHerous from '../appAllHerous/AppAllHerous';
import AppAboutChar from '../appAboutChar/AppAboutChar';
import ErrorBoundary from '../errorBoundary/errorBoundary';


const MainPage = () => {

    const [id, setId] = useState(null);

    const getId = (id) => {
      setId({
        id
      })
    }

    return (
        <>
            <div className="slit_box">
                <div className="split">
                    <ErrorBoundary>
                        <AppAllHerous getId={getId} />
                    </ErrorBoundary>
                </div>
                <div className="split">
                    <ErrorBoundary>
                        <AppAboutChar id={id} />
                    </ErrorBoundary>
                </div>
            </div>
        </>
    );
}

export default MainPage;
