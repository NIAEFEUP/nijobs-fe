import React from 'react';

import ContentLoader from 'react-content-loader';

const ContentSkeleton = () => {
    return (
        <ContentLoader 
            height={15}
            width={100}
            primaryColor="#f3f3f3"
            secondaryColor="#ecebeb"
        >
            <rect
                x="0"
                y="0"
                rx="2"
                ry="2"
                width="40"
                height="4"
            />
            <rect
                x="0"
                y="8"
                rx="1"
                ry="1"
                width="100"
                height="2"
            />
            <rect
                x="0"
                y="12"
                rx="1"
                ry="1"
                width="70"
                height="2"
            />
        </ContentLoader>
    );
};

export default ContentSkeleton;