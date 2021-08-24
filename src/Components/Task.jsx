import React, { useState } from 'react';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';
import dateFnsFormat from 'date-fns/format';
import isAfter from 'date-fns/isAfter';
import isBefore from 'date-fns/isBefore';
import isToday from 'date-fns/isToday';
import addDays from 'date-fns/addDays';


const TaskHeaderMapping = {
  INBOX: 'Inbox',
  TODAY: 'Today',
  NEXT_7: 'Next_7 ',
};
const taskitem = ({ selectedtab, tasks }) => {
  let taskrender = [...tasks];
  if (selectedtab === 'NEXT_7') {
    taskrender = taskrender.filter(
      (task) =>
        isAfter(task.date, new Date()) &&
        isBefore(task.date, addDays(new Date(), 7))
    );
  }
  if (selectedtab === 'TODAY') {
    taskrender = taskrender.filter((task) => isToday(task.date));
  }
  return (
    <div className='task-items-container'>
      {taskrender.map((task) => (
        <div className='task-item'>
          <p>{task.text}</p>
          <p> {dateFnsFormat(new Date(task.date), FORMAT)}</p>
        </div>
      ))}
    </div>
  );
};
const Task = ({ selectedtab }) => {
  const [showaddtask, setshowaddtask] = useState(false);
  const [tasks, settasks] = useState([]);
  const addnewtask = (text, date) => {
    const newtaskitem = { text, date: date || new Date() };
    settasks((prevState) => [...prevState, newtaskitem]);
  };
  return (
    <div className='tasks'>
      <h1>{TaskHeaderMapping[selectedtab]}</h1>
      {selectedtab === 'INBOX' ? (
        <div
          className='add-task-btn'
          onClick={() => setshowaddtask((prevState) => !prevState)}
        >
          <span className='plus'>+</span>
          <span className='add-task-text'>Add Task</span>
        </div>
      ) : null}
      {showaddtask && (
        <AddTask
          onAddTask={addnewtask}
          onCancel={() => setshowaddtask(false)}
        />
      )}
      {tasks.length > 0 ? (
        <taskitem tasks={tasks} selectedtab={selectedtab} />
      ) : (
        <p> no task yet</p>
      )}
    </div>
  );
};

const FORMAT = 'dd/MM/yyyy';
function formatDate(date, format, locale) {
  return dateFnsFormat(date, format, { locale });
}

const AddTask = ({ onCancel, onAddTask }) => {
  const [task, settask] = useState("");
  const [date, setdate] = useState(null);
  return (
    <div className='add-task-dialog'>
      <input value={task} onChange={(event) => settask(event.target.value)} />
      <div className='add-task-actions-container'>
        <div className='btn-container'>
          <button
            disabled={!task}
            className='add-btn'
            onClick={() => {
              onAddTask(task, date);
              onCancel();
              settask("");
            }}
          >
            Add Task
          </button>
          <button
            className='cancel-btn'
            onClick={() => {
              onCancel();
              settask("");
            }}
          >
            {" "}
            Cancel
          </button>
        </div>
        <div className='icon-container'>
          <DayPickerInput
            onDayChange={(day) => setdate(day)}
            placeholder={`${dateFnsFormat(new Date(), FORMAT)}`}
            formatDate={formatDate}
            format={FORMAT}
            dayPickerProps={{
              modifiers: {
                disabled: [{ before: new Date() }],
              },
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Task;
