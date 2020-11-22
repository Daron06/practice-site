import { IconButton } from '@material-ui/core';
import React from 'react';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import { Link } from 'react-router-dom';
import { resourcesRef } from '../../firebase';
import { useDispatch, useSelector } from 'react-redux';
import { setResourcesItems } from '../../redux/resources/actions';
import { selectResourcesItems } from '../../redux/resources/selectors';

const Resources = () => {
  const dispatch = useDispatch();
  const resources = useSelector(selectResourcesItems);

  React.useEffect(() => {
    if (!resources.length) {
      resourcesRef.get().then((querySnapshot: any) => {
        dispatch(
          setResourcesItems(
            querySnapshot.docs.map((doc: { id: string; data: () => any }) => {
              return {
                groupName: doc.id,
                items: Object.values(doc.data()),
              };
            })
          )
        );
      });
    }
  }, [resources, dispatch]);

  return (
    <div className="resources">
      {resources.map((group) => (
        <React.Fragment key={group.groupName}>
          <div className="item-wrapper resources-container">
            <div className="resources__wrapper">
              <div className="resources__items">
                <h2>{group.groupName}</h2>
                {group.items.map((item) => {
                  return (
                    <Link key={item.title} to={`resources/${group.groupName}/${item.title}`}>
                      <div className="resources__items-item">
                        <p>{item.title}</p>
                        <IconButton>
                          <ArrowForwardIosIcon />
                        </IconButton>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </React.Fragment>
      ))}
    </div>
  );
};

export default Resources;
