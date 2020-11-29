import React from 'react';
import { ADMIN_ID } from '../App';
import { messagesRef } from '../firebase';
import TaskMessages from './TaskMessages';

const NewMessages = ({ setTaskId, setOpen }: any) => {
  const [newMessages, setNewMessages] = React.useState<any>([]);

  React.useEffect(() => {
    messagesRef
      .where('newMessage', '==', true)
      .where('uid', '!=', ADMIN_ID)
      .orderBy('uid', 'asc')
      .orderBy('createdAt', 'asc')
      .onSnapshot(function (querySnapshot: any) {
        const message: any = [];
        querySnapshot.forEach(function (doc: any) {
          message.push({
            ...doc.data(),
            messageId: doc.id,
          });
        });
        setNewMessages(message);
      });
  }, []);

  return (
    <div className="admin__table__content--messages scrollbar">
      <h2 style={{ position: 'sticky', top: 0, backgroundColor: '#fff', zIndex: 500 }}>
        Непрочитанных сообщений: {newMessages.length}
      </h2>
      {!!newMessages.length &&
        newMessages.map((message: { messageId: string }) => {
          return (
            <TaskMessages
              key={message.messageId}
              setOpen={setOpen}
              setTaskId={setTaskId}
              message={message}
              newMessage={true}
            />
          );
        })}
    </div>
  );
};

export default NewMessages;
