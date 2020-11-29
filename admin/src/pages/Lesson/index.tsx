import React from 'react';
import { lessonRef } from '../../firebase';

import { Button, IconButton, InputBase, Snackbar, TextField } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

const AdminLesson = () => {
  const [lesson, setLesson] = React.useState<any>([]);
  const [lessonNumber, setLessonNumber] = React.useState<string | undefined>('');
  const [newLesson, setNewLesson] = React.useState<string>('');
  const [lessonVideoPath, setLessonVideoPath] = React.useState<string | undefined>('');
  const [lessonText, setLessonText] = React.useState<string>('');
  const [openSnackbar, setOpenSnackbar] = React.useState<boolean>(false);

  React.useEffect(() => {
    lessonRef.onSnapshot(function (snapshot) {
      const items: any = [];
      setNewLesson(String(snapshot.docs.length + 1));

      snapshot.forEach(function (doc: any) {
        items.push({
          number: doc.data().number,
          text: doc.data().text,
          videoPath: doc.data().videoPath,
        });
      });
      setLesson(items);
    });
  }, []);

  const onGetCurrentLesson = (id: string) => {
    const item = lesson.find((el: any) => el.number === id);

    setLessonNumber(item.number);
    setLessonVideoPath(item.videoPath);
    setLessonText(item.text);
  };

  const onNewLesson = () => {
    setLessonNumber(newLesson);
    setLessonVideoPath('');
    setLessonText('');
  };

  const onAddNewLesson = () => {
    if (lessonRef) {
      lessonRef.doc(lessonNumber).set({
        number: lessonNumber,
        text: lessonText,
        videoPath: lessonVideoPath,
        newLesson: true,
      });
    }

    setLessonText('');
    setLessonNumber('');
    setLessonVideoPath('');
    setOpenSnackbar(true);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLessonText(event.target.value);
  };

  const handleChangeLessonNumber = (event: React.ChangeEvent<{ value: unknown }>) => {
    setLessonNumber(String(event.target.value) || '');
  };

  const handleChangeLessonVideoPath = (event: React.ChangeEvent<{ value: unknown }>) => {
    setLessonVideoPath(String(event.target.value) || '');
  };

  const handleCloseSnackbar = (event: React.SyntheticEvent | React.MouseEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenSnackbar(false);
  };

  return (
    <div className="admin__lesson">
      <div className="admin__lesson__nav">
        <nav>
          <ul>
            <li className="admin__lesson__nav__item--first">
              <Button onClick={onNewLesson} color="secondary" variant="outlined">
                New lesson
              </Button>
            </li>
            {!!lesson.length &&
              lesson.map((item: any) => {
                return (
                  <li key={item.number}>
                    <Button
                      onClick={() => onGetCurrentLesson(item.number)}
                      color="secondary"
                      variant="outlined"
                    >
                      Lesson №{item.number}
                    </Button>
                  </li>
                );
              })}
          </ul>
        </nav>
      </div>

      <div className="admin__lesson__content">
        <div className="admin__lesson__content">
          <div style={{ display: 'flex' }}>
            <div className="admin__lesson__textField">
              <TextField
                value={lessonNumber}
                onChange={handleChangeLessonNumber}
                label="Lesson Number"
                variant="outlined"
              />
            </div>
            <div className="admin__lesson__textField">
              <TextField
                style={{ width: 770 }}
                value={lessonVideoPath}
                onChange={handleChangeLessonVideoPath}
                label="Lesson Video Path"
                variant="outlined"
              />
            </div>
          </div>

          <div className="admin__message__button">
            <Button
              color="primary"
              disabled={lessonText.length === 0 || !lessonNumber || !lessonVideoPath}
              variant="contained"
              onClick={onAddNewLesson}
            >
              Отправить
            </Button>
          </div>
        </div>

        <div className="admin__lesson__field">
          <InputBase
            className="scrollbar"
            value={lessonText}
            onChange={handleChange}
            fullWidth
            inputProps={{ 'aria-label': 'naked' }}
            multiline
            placeholder="Используйте язык разметки - Markdown"
          />
        </div>
      </div>
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        message="Урок добавлен"
        action={
          <React.Fragment>
            <Button color="secondary" size="small" onClick={handleCloseSnackbar}>
              Скрыть
            </Button>
            <IconButton
              size="small"
              aria-label="close"
              color="inherit"
              onClick={handleCloseSnackbar}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          </React.Fragment>
        }
      />
    </div>
  );
};

export default AdminLesson;
