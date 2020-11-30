import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { lessonsRef } from '../../firebase';
import { setVideosItems } from '../../redux/videos/actions';
import { selectVideosItems } from '../../redux/videos/selectors';
const Videos = ({ userLearningFlow }: any) => {
  const dispatch = useDispatch();
  const videos = useSelector(selectVideosItems);

  React.useEffect(() => {
    if (!videos.length) {
      lessonsRef
        .where('learningFlow', '==', userLearningFlow)
        .orderBy('number', 'asc')
        .get()
        .then((querySnapshot: any) => {
          dispatch(
            setVideosItems(
              querySnapshot.docs.map((doc: { id: string; data: () => any }) => {
                return {
                  videoPath: doc.data().videoPath,
                  number: doc.data().number,
                  text: doc.data().text,
                  createdAt: doc.data().text,
                  lessonId: doc.id,
                };
              })
            )
          );
        });
    }
  }, [videos, dispatch, userLearningFlow]);

  return (
    <div className="videos">
      {videos &&
        videos.map(({ number, videoPath, lessonId }) => (
          <div key={lessonId} className="videos-wrapper">
            <Link to={`/videos/${lessonId}`}>
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
