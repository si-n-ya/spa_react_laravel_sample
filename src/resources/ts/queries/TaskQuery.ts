import * as api from "../api/TaskAPI"
import { useQuery, useMutation, useQueryClient } from 'react-query';

const useTasks = () => {
  return useQuery('tasks', () => api.getTasks());  
}

const useUpdateDoneTask = () => {
  const queryClient = useQueryClient();
  return useMutation(api.updateDoneTask, {
    onSuccess: () => {// 成功
      queryClient.invalidateQueries('tasks')// コンポーネントを再描画
    }
  })
}

export {
  useTasks,
  useUpdateDoneTask
}