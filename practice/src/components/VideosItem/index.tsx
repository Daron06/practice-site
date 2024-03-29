import React from 'react';
import { useHistory, useParams } from 'react-router-dom';
import Markdown from 'react-markdown';
import { lessonsRef, tasksRef } from '../../firebase';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { Button, InputBase, Modal, CircularProgress } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import TextField from '@material-ui/core/TextField';
import { selectVideosItems } from '../../redux/videos/selectors';
import { useSelector } from 'react-redux';
import highlight from 'highlight.js';
import 'highlight.js/styles/solarized-light.css';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
  })
);

const VideosItem = ({ user }: any) => {
  const history = useHistory();
  const [open, setOpen] = React.useState(false);
  const [openSnackbar, setOpenSnackbar] = React.useState(false);
  const [value, setValue] = React.useState('');
  const [urlValue, setUrlValue] = React.useState('');
  const classes = useStyles();
  const videos = useSelector(selectVideosItems);
  const [lesson, setLesson] = React.useState<any>();

  const { id } = useParams<{ id: string }>();

  React.useEffect(() => {
    if (!videos.length) {
      lessonsRef
        .doc(id)
        .get()
        .then((doc) => {
          if (doc.exists) {
            const data = doc.data();
            if (data) {
              setLesson(data);
            }
          }
        });
    } else {
      const video = videos.find((obj) => obj.lessonId === id);
      if (video) {
        setLesson(video);
      }
    }
  }, [id, videos]);

  React.useEffect(() => {
    document.querySelectorAll('code').forEach((block) => {
      highlight.highlightBlock(block as any);
    });
  }, [lesson]);

  const handleClose = () => {
    setOpen((prev) => (prev = false));
    setValue((prev) => (prev = ''));
    setUrlValue((prev) => (prev = ''));
  };

  const handleOpen = () => {
    setOpen((prev) => (prev = true));
  };

  const handleCloseSnackbar = (event: React.SyntheticEvent | React.MouseEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenSnackbar(false);
  };

  const onAddTask = async () => {
    if (!urlValue.match(/https:\/\/github.com\/.+?\/.+?\/pull\/\d+/)) {
      return alert('Неверно указана ссылка на pull-реквест');
    }
    if (lesson) {
      const doc = await tasksRef.add({
        number: lesson.number,
        learningFlow: user.learningFlow,
        createdAt: new Date(),
        responseAt: new Date(),
        status: 'pending',
        decision: [
          {
            text: value,
            createdAt: new Date(),
            avatar: user?.photoURL,
            name: user?.displayName || user?.email || user.uid,
          },
        ],
        reference: urlValue,
        uid: user.uid,
        newTask: true,
      });

      history.push(`/activities/${doc.id}`);

      setOpen(false);
      setValue('');
      setUrlValue('');
      setOpenSnackbar(true);
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const handleChangeRef = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUrlValue(event.target.value);
  };

  if (!lesson) {
    return <CircularProgress />;
  }

  const videoId = lesson.videoPath.split('v=')[1];

  return (
    <div className="videos-item">
      <div>
        <div className="videos-item-wrapper">
          <h1>Урок №{lesson.number}</h1>
          <br />
          <iframe
            title="video"
            width="717"
            height="402"
            src={`https://www.youtube.com/embed/${videoId}`}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
          <br />
          <br />

          <div className="markdown-content">
            <Markdown source={lesson.text} />
          </div>

          <div style={{ height: 30 }} />

          <div className="button--send">
            <Button variant="contained" onClick={handleOpen}>
              <AddIcon /> Запросить проверку
            </Button>
          </div>

          <Modal
            className={classes.modal}
            open={open}
            onClose={handleClose}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
          >
            <div className="item-wrapper videos-item__modal">
              <h2>Запросить проверку задания №{lesson.number}</h2>
              <br />
              <div>
                <TextField
                  id="standard-textarea"
                  label="Ссылка на pull request"
                  placeholder="https://github.com/user/my-job/pull/1488"
                  multiline
                  value={urlValue}
                  onChange={handleChangeRef}
                  fullWidth
                />
              </div>
              <br />
              <div className="videos-item__modal-field">
                <InputBase
                  className="scrollbar"
                  rows={8}
                  value={value}
                  onChange={handleChange}
                  fullWidth
                  inputProps={{ 'aria-label': 'naked' }}
                  multiline
                  placeholder="Комментарий"
                />
              </div>
              <div className="videos-item__modal-button">
                <div className="button--cancel 222">
                  <Button onClick={handleClose} variant="contained">
                    Отмена
                  </Button>
                </div>
                <div className="button--send">
                  <Button onClick={onAddTask} disabled={!urlValue.length} variant="contained">
                    Отправить
                  </Button>
                </div>
              </div>
            </div>
          </Modal>
        </div>
        <Snackbar
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
          open={openSnackbar}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
          message="Сообщение отправлено"
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

export default VideosItem;
