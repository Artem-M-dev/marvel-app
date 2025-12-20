import {Helmet} from 'react-helmet';

import ComicsList from "../comicsList/ComicsList";
import AppBanner from "../appBanner/AppBanner";
import ErrorBoundary from "../ErrorBoundary/ErrorBoundary";

const ComicsPage = () => {
    return (
        <>
            <Helmet>
                <meta
                    name="description"
                    content="Web site created using create-react-app"
                    />
                <title>React App</title>
            </Helmet>
            <AppBanner/>    
            <ErrorBoundary>
                <ComicsList/>
            </ErrorBoundary>
        </>
    )
}

export default ComicsPage