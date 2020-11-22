import React from 'react';
import { resourcesRef, firebase } from '../../firebase';
import Markdown from 'react-markdown';
import { Button, TextField } from '@material-ui/core';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const AdminResources = () => {
  const [resources, setResources] = React.useState<any>([]);
  const [deleteCollection, setDeleteCollection] = React.useState<string>('');
  const [resourcesTitle, setResourcesTitle] = React.useState<any>([]);
  const [resourcesTitleId, setResourcesTitleId] = React.useState<string>('');
  const [resourcesItems, setResourcesItems] = React.useState<any>([]);
  const [itemResources, setItemResources] = React.useState<string>('');
  const [collectionValue, setCollectionValue] = React.useState<string>('');
  const [subcollectionTitle, setSubcollectionTitle] = React.useState<string>('');
  const [subcollectionText, setSubcollectionText] = React.useState<string>('');
  const [changeSubcollectionTitle, setChangeSubcollectionTitle] = React.useState<string>('');
  const [changeSubcollectionText, setChangeSubcollectionText] = React.useState<string>('');

  React.useEffect(() => {
    resourcesRef.onSnapshot(function (snapshot) {
      const items: any = [];

      snapshot.forEach(function (doc: any) {
        const objKey: any = [];
        for (var key in doc.data()) {
          objKey.push(doc.data()[key]);
        }
        items.push({
          id: doc.id,
          title: objKey,
        });
      });
      setResources(items);
    });
  }, []);

  React.useEffect(() => {
    if (!!resourcesItems.length) {
      setChangeSubcollectionText(resourcesItems[0].text);
      setChangeSubcollectionTitle(resourcesItems[0].title);
    }
  }, [resourcesItems]);

  const onGetResourcesTitle = (id: any) => {
    setItemResources('');
    setResourcesItems([]);
    setResourcesTitleId(id);
    resourcesRef.doc(id).onSnapshot(function (doc) {
      const objKey: any = [];
      for (var key in doc.data()) {
        objKey.push(key);
      }
      setResourcesTitle(objKey);
    });
  };

  const onGetResourcesItems = (item: any) => {
    setItemResources(item);
    resourcesRef
      .doc(resourcesTitleId)
      .get()
      .then(function (doc: any) {
        if (doc.exists) {
          setResourcesItems([doc.data()[item]]);
        } else {
          console.log('No such document!');
        }
      });
  };

  const onAddCollection = () => {
    resourcesRef.doc(collectionValue).set({});
    setCollectionValue('');
  };

  const onAddSubcollection = () => {
    resourcesRef.doc(resourcesTitleId).set(
      {
        [subcollectionTitle]: {
          title: subcollectionTitle,
          text: subcollectionText,
        },
      },
      { merge: true }
    );
    setSubcollectionTitle('');
    setSubcollectionText('');
  };

  const onChangeSubcollection = () => {
    resourcesRef.doc(resourcesTitleId).update({
      [itemResources]: firebase.firestore.FieldValue.delete(),
    });

    resourcesRef.doc(resourcesTitleId).set(
      {
        [changeSubcollectionTitle]: {
          title: changeSubcollectionTitle,
          text: changeSubcollectionText,
        },
      },
      { merge: true }
    );
    setResourcesItems([
      {
        title: changeSubcollectionTitle,
        text: changeSubcollectionText,
      },
    ]);
    setItemResources(changeSubcollectionTitle);
  };

  const onDeleteResourcesItem = (id: any) => {
    resourcesRef.doc(resourcesTitleId).update({
      [itemResources]: firebase.firestore.FieldValue.delete(),
    });
    setResourcesItems([]);
    setItemResources('');
  };

  const onDeleteCollection = () => {
    resourcesRef
      .doc(deleteCollection)
      .get()
      .then((doc: any) => {
        if (doc.exists) {
          resourcesRef
            .doc(deleteCollection)
            .delete()
            .then(function () {
              console.log('Document successfully deleted!');
            })
            .catch(function (error) {
              console.error('Error removing document: ', error);
            });
          setResourcesTitleId('');
          setResourcesItems([]);
        } else {
          alert('Такой коллекции не существует');
        }
      });
  };

  const handleAddCollection = (event: React.ChangeEvent<{ value: unknown }>) => {
    setCollectionValue(String(event.target.value) || '');
  };

  const handleAddSubcollectionTitle = (event: React.ChangeEvent<{ value: unknown }>) => {
    setSubcollectionTitle(String(event.target.value) || '');
  };

  const handleAddSubcollectionText = (event: React.ChangeEvent<{ value: unknown }>) => {
    setSubcollectionText(String(event.target.value) || '');
  };

  const handleChangeSubcollectionTitle = (event: React.ChangeEvent<{ value: unknown }>) => {
    setChangeSubcollectionTitle(String(event.target.value) || '');
  };

  const handleChangeSubcollectionText = (event: React.ChangeEvent<{ value: unknown }>) => {
    setChangeSubcollectionText(String(event.target.value) || '');
  };

  const handleDeleteCollection = (event: React.ChangeEvent<{ value: unknown }>) => {
    setDeleteCollection(String(event.target.value) || '');
  };

  const onClearFormSubcollection = () => {
    setSubcollectionTitle('');
    setSubcollectionText('');
  };
  const onReturnFormSubcollection = () => {
    setChangeSubcollectionTitle(resourcesItems[0].title);
    setChangeSubcollectionText(resourcesItems[0].text);
  };

  return (
    <div className="admin_resources">
      <div className="admin_resources__title">
        <div className="admin_resources__accordion">
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography>Добавить коллекцию</Typography>
            </AccordionSummary>

            <div style={{ padding: 15 }}>
              <div>
                <TextField
                  value={collectionValue}
                  onChange={handleAddCollection}
                  fullWidth
                  label="Назовите коллекцию"
                  variant="outlined"
                />
              </div>
              <div className="admin_resources__accordion--btn">
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => setCollectionValue('')}
                >
                  Отмена
                </Button>

                <Button
                  onClick={onAddCollection}
                  variant="contained"
                  color="secondary"
                  disabled={!collectionValue}
                >
                  Добавить
                </Button>
              </div>
            </div>
          </Accordion>
        </div>
        <div className="admin_resources__title__nav">
          {resources.map((item: any) => (
            <div key={item.id}>
              <Button onClick={() => onGetResourcesTitle(item.id)} fullWidth color="secondary">
                {item.id}
              </Button>
            </div>
          ))}
        </div>
        <div>
          <h2>Удаление коллекции</h2>
          <TextField
            value={deleteCollection}
            onChange={handleDeleteCollection}
            fullWidth
            label="Название коллекции"
            variant="outlined"
          />
          <Button
            disabled={!deleteCollection}
            onClick={onDeleteCollection}
            fullWidth
            color="secondary"
          >
            Удалить коллекцию
          </Button>
        </div>
      </div>

      <div className="admin_resources__items">
        <div className="admin_resources__accordion">
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography>Добавить подколлекцию</Typography>
            </AccordionSummary>

            <div style={{ padding: 15 }}>
              {!!resourcesTitleId ? (
                <div>
                  <div style={{ paddingBottom: 10 }}>Коллекция: {resourcesTitleId}</div>
                  <div>
                    <TextField
                      value={subcollectionTitle}
                      onChange={handleAddSubcollectionTitle}
                      fullWidth
                      label="Title - название подколлекции"
                      variant="outlined"
                    />
                  </div>
                  <div style={{ marginTop: 30 }}>
                    <TextField
                      value={subcollectionText}
                      onChange={handleAddSubcollectionText}
                      fullWidth
                      placeholder="Поделитесь знаниями, сенсей"
                      multiline
                      label="Текст - контент урока"
                      variant="outlined"
                    />
                  </div>
                  <div className="admin_resources__accordion--btn">
                    <Button
                      onClick={onClearFormSubcollection}
                      variant="contained"
                      color="secondary"
                    >
                      Отмена
                    </Button>

                    <Button
                      onClick={onAddSubcollection}
                      variant="contained"
                      color="secondary"
                      disabled={!subcollectionTitle}
                    >
                      Добавить
                    </Button>
                  </div>
                </div>
              ) : (
                <div>Вы ещё не выбрали коллекцию</div>
              )}
            </div>
          </Accordion>
        </div>
        {resourcesTitle.map((item: any) => (
          <div key={item}>
            <Button onClick={() => onGetResourcesItems(item)} fullWidth color="primary">
              {item}
            </Button>
          </div>
        ))}
      </div>

      <div className="admin_resources__content">
        <div className="admin_resources__accordion">
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography>Редактировать подколлекцию</Typography>
            </AccordionSummary>

            <div style={{ padding: 15 }}>
              {!!resourcesItems.length ? (
                <div>
                  <div style={{ paddingBottom: 10 }}>Коллекция: {resourcesItems[0].title}</div>
                  <div>
                    <TextField
                      value={changeSubcollectionTitle}
                      onChange={handleChangeSubcollectionTitle}
                      fullWidth
                      label="Title - название подколлекции"
                      variant="outlined"
                    />
                  </div>
                  <div style={{ marginTop: 30 }}>
                    <TextField
                      value={changeSubcollectionText}
                      onChange={handleChangeSubcollectionText}
                      fullWidth
                      placeholder="Поделитесь знаниями, сенсей"
                      multiline
                      label="Текст - контент урока"
                      variant="outlined"
                    />
                  </div>
                  <div className="admin_resources__accordion--btn">
                    <Button
                      onClick={onReturnFormSubcollection}
                      variant="contained"
                      color="secondary"
                    >
                      Отмена
                    </Button>

                    <Button onClick={onChangeSubcollection} variant="contained" color="secondary">
                      Редактировать
                    </Button>
                  </div>
                </div>
              ) : (
                <div>Вы ещё не выбрали подколлекцию</div>
              )}
            </div>
          </Accordion>
        </div>
        {!!resourcesItems.length && (
          <div key={resourcesItems[0].title} className="admin_resources__content__wrapper">
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <h2>{resourcesItems[0].title}</h2>
              <Button
                onClick={() => onDeleteResourcesItem(resourcesItems[0].title)}
                color="secondary"
              >
                Delete
              </Button>
            </div>
            <div>
              <Markdown source={resourcesItems[0].text} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminResources;
