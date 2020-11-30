import React from 'react';
import { lessonsRef } from '../../firebase';

import { Button, IconButton, InputBase, Snackbar, TextField } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

const Lessons = () => {
  const [lessons, setLessons] = React.useState<any>([]);
  const [currentLessons, setCurrentLessons] = React.useState<any>([]);
  const [currentLessonId, setCurrentLessonId] = React.useState<string>('');
  const [lessonNumber, setLessonNumber] = React.useState<string>('');
  const [lessonText, setLessonText] = React.useState<string>('');
  const [lessonLearningFlow, setLessonLearningFlow] = React.useState<string>('');
  const [lessonVideoPath, setLessonVideoPath] = React.useState<string>('');
  const [openSnackbar, setOpenSnackbar] = React.useState<boolean>(false);
  const [learningFlowFilter, setLearningFlowFilter] = React.useState<any>([]);

  React.useEffect(() => {
    lessonsRef.orderBy('createdAt', 'asc').onSnapshot(function (snapshot) {
      const items: any = [];
      const learningFlow: any = [];
      snapshot.forEach(function (doc: any) {
        learningFlow.push(doc.data().learningFlow);

        items.push({
          number: doc.data().number,
          text: doc.data().text,
          videoPath: doc.data().videoPath,
          lessonId: doc.id,
          learningFlow: doc.data().learningFlow,
          createdAt: doc.data().createdAt,
        });
      });
      setLessons(items);
      setLearningFlowFilter(Array.from(new Set(learningFlow)));
    });
  }, []);

  const onGetCurrentLesson = (id: string) => {
    const item = lessons.find((el: any) => el.lessonId === id);
    setCurrentLessonId(id);
    setLessonNumber(item.number);
    setLessonVideoPath(item.videoPath);
    setLessonText(item.text);
    setLessonLearningFlow(item.learningFlow);
  };

  const onCurrentLearningFlow = (id: string) => {
    const items = lessons.filter((el: any) => el.learningFlow === id);
    setCurrentLessons(items);
    setLessonLearningFlow(id);
    setLessonNumber('');
    setLessonVideoPath('');
    setLessonText('');
    setCurrentLessonId('');
  };
  const onAllLearningFlow = () => {
    setLessonLearningFlow('');
    setLessonVideoPath('');
    setLessonText('');
    setLessonNumber('');
    setCurrentLessonId('');
    setCurrentLessons(lessons);
  };
  const onAddNewLearningFlow = () => {
    setCurrentLessonId('');
    setCurrentLessons([]);
    setLessonLearningFlow(String(currentLessons.length + 1));
    setLessonNumber('1');
  };
  const onNewLesson = () => {
    setLessonNumber(String(currentLessons.length + 1));
    setCurrentLessonId('');
    setLessonVideoPath('');
    setLessonText('');
  };

  const onAddNewLesson = () => {
    if (currentLessonId) {
      lessonsRef.doc(currentLessonId).set({
        number: lessonNumber,
        text: lessonText,
        videoPath: lessonVideoPath,
        learningFlow: lessonLearningFlow,
        createdAt: new Date(),
        newLesson: true,
      });
    } else {
      lessonsRef.add({
        number: lessonNumber,
        text: lessonText,
        videoPath: lessonVideoPath,
        learningFlow: lessonLearningFlow,
        createdAt: new Date(),
        newLesson: true,
      });
    }
    setOpenSnackbar(true);
  };

  const onDeleteLesson = () => {
    lessonsRef.doc(currentLessonId).delete();
    setCurrentLessons((prev: any) => prev.filter((el: any) => el.lessonId !== currentLessonId));
    setCurrentLessonId('');
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLessonText(event.target.value);
  };

  const handleChangeLessonNumber = (event: React.ChangeEvent<{ value: unknown }>) => {
    setLessonNumber(String(event.target.value) || '');
  };

  const handleChangeLessonLearningFlow = (event: React.ChangeEvent<{ value: unknown }>) => {
    setLessonLearningFlow(String(event.target.value) || '');
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
    <div className="lessons">
      <div className="lessons__header">
        <ul>
          <li>
            <Button onClick={onAllLearningFlow} color="primary" variant="outlined">
              Все потоки
            </Button>
          </li>
          {learningFlowFilter.sort().map((item: string) => {
            return (
              <li key={item}>
                <Button
                  onClick={() => onCurrentLearningFlow(item)}
                  color="secondary"
                  variant="outlined"
                >
                  Поток №{item}
                </Button>
              </li>
            );
          })}
          <li>
            <Button onClick={onAddNewLearningFlow} color="primary" variant="outlined">
              Новый поток
            </Button>
          </li>
        </ul>
      </div>
      <div className="admin__lessons">
        <div className="admin__lessons__nav">
          <nav>
            <ul>
              <li className="admin__lessons__nav__item--first">
                <Button onClick={onNewLesson} color="secondary" variant="outlined">
                  New lesson
                </Button>
              </li>
              {!!currentLessons.length &&
                currentLessons.map((item: any) => {
                  return (
                    <li key={item.lessonId}>
                      <Button
                        onClick={() => onGetCurrentLesson(item.lessonId)}
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

        <div className="admin__lessons__content">
          <div className="admin__lessons__content">
            <div style={{ display: 'flex' }}>
              <div className="admin__lessons__textField">
                <TextField
                  value={lessonNumber}
                  onChange={handleChangeLessonNumber}
                  label="Lesson Number"
                  variant="outlined"
                />
              </div>
              <div className="admin__lessons__textField">
                <TextField
                  value={lessonLearningFlow}
                  onChange={handleChangeLessonLearningFlow}
                  label="Learning Flow"
                  variant="outlined"
                />
              </div>
              <div className="admin__lessons__textField">
                <TextField
                  style={{ width: 570 }}
                  value={lessonVideoPath}
                  onChange={handleChangeLessonVideoPath}
                  label="Lesson Video Path"
                  variant="outlined"
                />
              </div>
            </div>

            <div
              className="admin__message__button"
              style={{ display: 'flex', justifyContent: 'space-between' }}
            >
              <Button
                color="primary"
                disabled={!lessonText || !lessonNumber || !lessonVideoPath}
                variant="contained"
                onClick={onAddNewLesson}
              >
                Отправить
              </Button>
              <Button
                color="primary"
                disabled={!currentLessonId}
                variant="contained"
                onClick={onDeleteLesson}
              >
                Удалить урок
              </Button>
            </div>
          </div>

          <div className="admin__lessons__field">
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
    </div>
  );
};

export default Lessons;
