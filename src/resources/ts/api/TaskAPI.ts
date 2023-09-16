import axios from 'axios';
import {Task} from "../types/Task";

const getTasks = async() => {
  const { data } = await axios.get<Task[]>('api/tasks');
  return data;
}

const updateDoneTask = async ({ id, is_done }: Task) => {
  const { data } = await axios.patch<Task>(
    `/api/tasks/update-done/${id}`,// URL
    { is_done: !is_done }// 送信するデータ
  );
  return data;
}

const createTask = async (title: string) => {
  const { data } = await axios.post<Task>(
    `/api/tasks/`,// URL
    { title: title }// 送信するデータ
  );
  return data;
}

export {
  getTasks,
  updateDoneTask,
  createTask,
}