import React from 'react';
import { useLocation } from 'react-router-dom';
import Markdown from 'react-markdown';
import { useSelector } from 'react-redux';
import { selectResourcesItems } from '../../redux/resources/selectors';
import { ResourceItem } from '../../redux/resources/actions';
import { resourcesRef } from '../../firebase';
import highlight from 'highlight.js';
import 'highlight.js/styles/solarized-light.css';

const ResourcesItem = (): React.ReactElement | null => {
  const [resource, setResource] = React.useState<ResourceItem>();
  const { pathname } = useLocation();
  const [, , groupName, title] = pathname.split('/');
  const resources = useSelector(selectResourcesItems);

  React.useEffect(() => {
    if (!resources.length) {
      resourcesRef
        .doc(groupName)
        .get()
        .then((doc) => {
          if (doc.exists) {
            const data = doc.data();
            if (data) {
              const [obj] = Object.values(data);
              setResource(obj);
              console.log(obj);
            }
          }
        });
    }
  }, [groupName, resources.length]);

  React.useEffect(() => {
    document.querySelectorAll('code').forEach((block) => {
      highlight.highlightBlock(block as any);
    });
  }, [resource]);

  React.useEffect(() => {
    const group = resources.find((group) => group.groupName === groupName);

    if (group) {
      setResource(group.items.find((group) => group.title === title));
    }
  }, [title, resources, groupName]);

  return (
    <div className="resources-item">
      <div className="resources-item__wrapper">
        <h1>{resource?.title}</h1>
        <div className="markdown-content">
          {resource?.text && <Markdown source={resource.text} />}
        </div>
      </div>
    </div>
  );
};

export default ResourcesItem;
