import React from 'react';
import { useHistory, useParams } from 'react-router-dom';
import Markdown from 'react-markdown';
import { lessonRef, tasksRef } from '../../firebase';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { Button, InputBase, Modal, CircularProgress } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
  })
);

const VideosItem = ({ userId }: any) => {
  const history = useHistory();
  const [open, setOpen] = React.useState(false);
  const [openSnackbar, setOpenSnackbar] = React.useState(false);
  const [value, setValue] = React.useState('');
  const [valueRef, setValueRef] = React.useState('');
  const [lessen, setLessen] = React.useState<firebase.firestore.DocumentData | undefined>();
  const classes = useStyles();

  const { id } = useParams<{ id: string }>();

  React.useEffect(() => {
    const fetchLesson = async () => {
      try {
        const doc = await lessonRef.doc(id).get();
        setLessen(doc.data());
      } catch (error) {
        console.error(error);
      }
    };

    fetchLesson();
  }, [id]);

  const handleClose = () => {
    setOpen((prev) => (prev = false));
    setValue((prev) => (prev = ''));
    setValueRef((prev) => (prev = ''));
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
    if (!!lessen) {
      const doc = await tasksRef.add({
        number: lessen.number,
        createdAt: new Date(),
        status: 'pending',
        decision: value,
        reference: valueRef,
        uid: userId,
        newTask: true,
      });

      history.push(`/activities/${doc.id}`);

      setOpen(false);
      setValue('');
      setValueRef('');
      setOpenSnackbar(true);
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const handleChangeRef = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValueRef(event.target.value);
  };

  if (!lessen) {
    return <CircularProgress />;
  }

  const videoId = lessen.videoPath.split('v=')[1];

  return (
    <div className="videos-item">
      <div className="item-wrapper videos-item-container">
        <div className="videos-item-wrapper">
          <h2>Урок №{lessen.number}</h2>
          <iframe
            title="video"
            width="717"
            height="402"
            src={`https://www.youtube.com/embed/${videoId}`}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
          <Markdown source={lessen.text} />

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
              <h2>Запросить проверку задания №{lessen.number}</h2>
              <div>
                <TextField
                  id="standard-textarea"
                  label="Ссылка на pull request"
                  placeholder="https://github.com/user/my-job/pull/1488"
                  multiline
                  value={valueRef}
                  onChange={handleChangeRef}
                  fullWidth
                />
              </div>
              <p>Комментарий: </p>
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
                  <Button onClick={onAddTask} disabled={!valueRef.length} variant="contained">
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
