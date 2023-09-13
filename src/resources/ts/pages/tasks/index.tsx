import React, {useEffect, useState} from 'react';
import axios from 'axios';

type Task = {
  id: number
  title: string
  is_done: boolean
  created_at: Date
  updated_at: Date
}
const TaskPage = () => {

  const [tasks, setTasks] = useState<Task[]>([])

  const getTasks =async () => {
    // 「<Task[]>(」で取得したデータに型を定義
    const { data } = await axios.get<Task[]>('api/tasks');
    setTasks(data)
  }

  useEffect(() => {
    getTasks();
  });

  return (
    <>
      <form className="input-form">
        <div className="inner">
          <input type="text" className="input" placeholder="TODOを入力してください。" defaultValue="" />
          <button className="btn is-primary">追加</button>
        </div>
      </form>
      <div className="inner">
        <ul className="task-list">
          { tasks.map((task) => {
            <li key={task.id}>
            <label className="checkbox-label">
              <input type="checkbox" className="checkbox-input" />
            </label>
            <div><span>{task.title}</span></div>
            <button className="btn is-delete">削除</button>
          </li>
          })}
        </ul>
      </div>
    </>
  )
}

export default TaskPage