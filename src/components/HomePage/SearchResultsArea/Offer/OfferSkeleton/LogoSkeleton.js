import React from 'react';

import ContentLoader from 'react-content-loader';

const LogoSkeleton = () => {
    return (
        <ContentLoader
            height={100}
            width={100}
            primaryColor="#f3f3f3"
            secondaryColor="#ecebeb"
        >
            <circle
                cx="50"
                cy="50"
                r="50"
            />
        </ContentLoader>
    );
};

export default LogoSkeleton;