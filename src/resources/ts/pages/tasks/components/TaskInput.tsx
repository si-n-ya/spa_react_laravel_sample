import React, { useState } from "react"
import { useCreateTask } from "../../../queries/TaskQuery";

const TaskInput = () => {
  console.log('TaskInput render');
  const [title, setTitle] = useState('')
  const createTask = useCreateTask()

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log(title)
    createTask.mutate(title)
    setTitle('')
  }

  return (
    <>
      <form className="input-form" onSubmit={handleSubmit}>
        <div className="inner">
          <input 
            type="text" 
            className="input" 
            placeholder="TODOを入力してください。"
            value={title}
            onChange={(e) => setTitle(e.target.value)}  
          />
          <button className="btn is-primary">追加</button>
        </div>
      </form>
    </>
  )
}

export default TaskInput