import React from 'react';
import DialogModal from '../../components/DialogModal';
import NewMessages from '../../components/NewMessages';
import TasksPending from '../../components/TasksPending';
import TransferUsers from '../../components/TransferUsers';

const News = () => {
  const [open, setOpen] = React.useState<boolean>(false);
  const [taskId, setTaskId] = React.useState<string | undefined>();

  return (
    <>
      <TransferUsers />
      <div className="admin__table__content">
        <TasksPending setTaskId={setTaskId} setOpen={setOpen} />
        <NewMessages setTaskId={setTaskId} setOpen={setOpen} />
        <DialogModal open={open} setOpen={setOpen} taskId={taskId} />
      </div>
    </>
  );
};

export default News;
