import React from 'react';
import ContentLoader from 'react-content-loader';

const Skeleton = (props) => (
  <ContentLoader
    className="pizza-block"
    speed={2}
    width={280}
    height={466}
    viewBox="0 0 280 466"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}>
    <circle cx="120" cy="120" r="120" />
    <rect x="0" y="261" rx="5" ry="5" width="280" height="30" />
    <rect x="0" y="313" rx="5" ry="5" width="280" height="85" />
    <rect x="0" y="428" rx="5" ry="5" width="90" height="26" />
    <rect x="129" y="418" rx="19" ry="19" width="150" height="45" />
  </ContentLoader>
);

export default Skeleton;
