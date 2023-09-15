import * as api from "../api/TaskAPI"
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { toast } from "react-toastify";

const useTasks = () => {
  return useQuery('tasks', () => api.getTasks());  
}

// TODO 後ほど修正。更新時にgetTasksのタスク全件取得が行われ遅い
const useUpdateDoneTask = () => {
  const queryClient = useQueryClient();
  return useMutation(api.updateDoneTask, {
    onSuccess: () => {// 成功
      queryClient.invalidateQueries('tasks')// コンポーネントを再描画
    },
    onError: () => {
      // TODO エラーメッセージを表示時は、既に表示されているエラーを削除してから表示
      toast.error('更新に失敗しました。')
    }
  })
}

export {
  useTasks,
  useUpdateDoneTask
}