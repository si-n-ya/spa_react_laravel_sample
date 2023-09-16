import React, { useState } from "react";
import { Task } from "../../../types/Task";
import { useUpdateDoneTask, useUpdateTask, useDeleteTask } from "../../../queries/TaskQuery";
import { toast } from "react-toastify";

type Props = {
  task: Task
}

const TaskItem: React.FC<Props> = ({ task }) => {
  console.log('TaskItem render');
  const updateDoneTask = useUpdateDoneTask();
  const updateTask = useUpdateTask()
  const deleteTask = useDeleteTask()

  const [editTitle, setEditTitle] = useState<string|undefined>(undefined)

  const handleInputChange = (e) => {
    setEditTitle(e.target.value)
  }

  const handleUpdateForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    commonUpdateProcedure();
  };
  
  const handleUpdateButton = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    commonUpdateProcedure();
  };

  const handleToggleEdit = () => {
    // Textからinputに切り替え
    setEditTitle(task.title)
  }

  const handleOnkey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // inputからTextに切り替え
    if (['Escape', 'Tab'].includes(e.key)) {
      setEditTitle(undefined);
    }
  }

  const commonUpdateProcedure = () => {
    // 未入力の場合は終了
    if (!editTitle) {
      toast.error('タイトルを入力してください。')
      return
    }

    const newTask = {...task}
    newTask.title = editTitle

    updateTask.mutate({
      id: task.id,
      task: newTask
    })

    setEditTitle(undefined)
  }

  const itemInput = () => {
    return (
      <>
        <form onSubmit={handleUpdateForm}>
          <input
            type="text"
            className="input"
            defaultValue={editTitle}
            onChange={handleInputChange}
            onKeyDown={handleOnkey}
          />
        </form>
        <button className="btn" onClick={handleUpdateButton}>更新</button>
      </>
    )
  }

  const itemText = () => {
    return (
      <>
        <div onClick={handleToggleEdit}>
          <span>{task.title}</span>
        </div>
        <button
          className="btn is-delete"
          onClick={() => deleteTask.mutate(task.id)}
        >
        削除
        </button>
      </>
    )
  }

  return (
    <>
      <li className={task.is_done ? 'done' : ''}>
        <label className="checkbox-label">
          <input
            type="checkbox"
            className="checkbox-input"
            onClick={() => updateDoneTask.mutate(task)}
          />
        </label>
        { editTitle === undefined ? itemText() : itemInput() }
      </li>
    </>
  )
}

export default TaskItem