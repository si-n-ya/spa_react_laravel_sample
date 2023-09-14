import React, {useEffect, useState} from 'react';
import TaskInput from "./components/TaskInput"
import TaskList from "./components/TaskList"

const TaskPage = () => {
  console.log('TaskPage render');
  return (
    <>
      <TaskInput />
      <TaskList />
    </>
  )
}

export default TaskPage