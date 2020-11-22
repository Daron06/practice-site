import React from 'react';
import format from 'date-fns/format';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
import HourglassEmptyIcon from '@material-ui/icons/HourglassEmpty';

export interface TaskItemProps {
  status: 'completed' | 'rejected' | 'pending';
  id: string;
  number: number;
  createdAt: Date;
  responseAt: Date;
  description?: string;
}

const statusLabel = {
  completed: 'Выполнено',
  rejected: 'Отклонено',
  pending: '— Ожидается проверка',
};

const TaskItem: React.FC<TaskItemProps> = ({
  status,
  number,
  createdAt,
  description,
  responseAt,
}): React.ReactElement => {
  return (
    <div className="activities__task-item">
      {status === 'completed' ? (
        <div style={{ backgroundColor: '#e7f8f5' }} className="activities__circle">
          <CheckIcon style={{ color: '#0bb89a' }} />
        </div>
      ) : status === 'pending' ? (
        <div style={{ backgroundColor: '#FEF3E9' }} className="activities__circle">
          <HourglassEmptyIcon style={{ color: '#F98F2E' }} />
        </div>
      ) : (
        <div style={{ backgroundColor: '#FCEDED' }} className="activities__circle">
          <CloseIcon style={{ color: '#EC8383' }} />
        </div>
      )}
      <div className="activities__info">
        <h3>
          Задание №{number} {statusLabel[status]}
        </h3>
        {status === 'pending' ? (
          <p>
            Отправлено на проверку: <span>{format(createdAt, 'dd.MM.yyyy - HH:mm')}</span>
          </p>
        ) : (
          <div>
            <p>
              Отправлено на проверку: <span>{format(createdAt, 'dd.MM.yyyy - HH:mm')}</span>{' '}
            </p>
            <p>
              {statusLabel[status]}: <span>{format(responseAt, 'dd.MM.yyyy - HH:mm')}</span>
            </p>
          </div>
        )}
      </div>
      {description && <p className="activities__info-description">{description}</p>}
    </div>
  );
};

export default TaskItem;
