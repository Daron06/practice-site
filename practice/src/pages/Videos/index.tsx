import React from 'react';
import { Link } from 'react-router-dom';
import { lessonRef } from '../../firebase';
const Videos = () => {
  const [videosItem, setVideosItem] = React.useState<any[]>([]);

  React.useEffect(() => {
    lessonRef.get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        setVideosItem((prev) => [
          ...prev,
          { videoPath: doc.data().videoPath, number: doc.data().number },
        ]);
      });
    });
  }, []);

  return (
    <div className="videos">
      {videosItem &&
        videosItem.map(({ number, videoPath }) => (
          <div key={number} className="videos-wrapper">
            <Link to={`/videos/${number}`}>
              <div className="item-wrapper">
                <div className="videos__item">
                  <h2>Урок №{number}</h2>
                  <div>
                    <iframe
                      title="the Best Video in the world"
                      width="504"
                      height="282"
                      src={`https://www.youtube.com/embed/${videoPath.split('v=')[1]}`}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        ))}
    </div>
  );
};

export default Videos;
