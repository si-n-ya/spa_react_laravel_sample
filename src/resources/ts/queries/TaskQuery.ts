import * as api from "../api/TaskAPI"
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { toast } from "react-toastify";

const useTasks = () => {
  return useQuery('tasks', () => api.getTasks());  
}

// TODO 後ほど方法を変更
let errorToastId = null;// エラーメッセージのトーストIDを保存する

// TODO 後ほど修正。更新時にgetTasksのタスク全件取得が行われ遅い
const useUpdateDoneTask = () => {
  const queryClient = useQueryClient();
  return useMutation(api.updateDoneTask, {
    onSuccess: () => {// 成功
      queryClient.invalidateQueries('tasks')// コンポーネントを再描画
      // 既に表示されているエラーメッセージは削除
      if (errorToastId) {
        toast.dismiss(errorToastId);
      }
    },
    onError: () => {
      if (errorToastId) {
        toast.dismiss(errorToastId);
      }
      // 新しいエラーメッセージを表示し、そのIDを保存
      errorToastId = toast.error('更新に失敗しました。');
    }
  })
}

export {
  useTasks,
  useUpdateDoneTask
}