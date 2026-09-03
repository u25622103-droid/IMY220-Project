import { useState } from 'react';
import Feed from '../components/Feed';
import "../css/Home.css";

function Home() {
  const [feedType, setFeedType] = useState('local'); // 'local' or 'global'
  const [sortBy, setSortBy] = useState('recent'); // 'recent' or 'popular'

  return (
    <>
      <div className="home-bg"></div>
      <div className="home-main">
        <div className="feed-toggle">
              <button id='local'
                className={feedType === 'local' ? 'active' : ''}
                onClick={() => setFeedType('local')}
              >
                Local Feed
              </button>
              <select id='sort'
                    value={sortBy} 
                    onChange={(e) => setSortBy(e.target.value)}
                    className="sort-select"
                >
                    <option value="recent">Most Recent</option>
                    <option value="popular">Most Popular</option>
                </select>
              <button id='global'
                className={feedType === 'global' ? 'active' : ''}
                onClick={() => setFeedType('global')}
              >
                Global Feed
              </button>
            </div>
            <div className="home-content">
            <Feed type={feedType} sortBy={sortBy}/>
            </div>
      </div>
    </>
  );
}

export default Home;