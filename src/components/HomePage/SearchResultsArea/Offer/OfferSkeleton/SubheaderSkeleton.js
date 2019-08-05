import React from 'react';
import ContentLoader from 'react-content-loader';

const SubheaderSkeleton = () => {
    return (
        <ContentLoader 
            height={15}
            width={100}
            primaryColor="#f3f3f3"
            secondaryColor="#ecebeb"
        >
            <rect
                x="0"
                y="2.5"
                rx="2"
                ry="2"
                width="80"
                height="5"
            />
            <rect
                x="0"
                y="12"
                rx="1"
                ry="1"
                width="20"
                height="2"
            />
            <rect
                x="25"
                y="12"
                rx="1"
                ry="1"
                width="10"
                height="2"
            />
            <rect
                x="85"
                y="12"
                rx="1"
                ry="1"
                width="15"
                height="2"
            />
        </ContentLoader>
    );
};

export default SubheaderSkeleton;