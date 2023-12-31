<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreTaskRequest;
use App\Http\Requests\UpdateTaskRequest;
use Illuminate\Http\Request;
use App\Models\Task;
use Illuminate\Support\Facades\Auth;

class TaskController extends Controller
{
    public function __construct()
    {
        // policy（only()で適用メソッドを指定）
        $this->middleware('can:checkUser,task')->only([
            'updateDone', 'update', 'destroy'
        ]);
    }
    
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Task::where('user_id', Auth::id())->orderByDesc('id')->get();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreTaskRequest $request)
    {
        $request->merge([
            'user_id' => Auth::id()
        ]);
        // createは正常の場合はデータを返す
        $task = Task::create($request->all());
        
        return $task
            ? response()->json($task, 201)
            : response()->json($task, 500);
    }

    /**
     * Display the specified resource.
     */
    public function show(Task $task)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateTaskRequest $request, Task $task)
    {
        // createは正常の場合はデータを返す
        $task->title = $request->title;
        
        return $task->update()
            ? response()->json($task)// 成功時のステータスはデフォルトは200
            : response()->json($task, 500);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Task $task)
    {   
        return $task->delete()
            ? response()->json($task)
            : response()->json($task, 500);
    }

    /**
     * is_doneの更新
     *
     * @param Task $task
     * @param Request $request
     */
    public function updateDone(Task $task, Request $request) {
        $task->is_done = $request->is_done;

        return $task->update()
            ? response()->json($task)
            : response()->json([], 500);
    }
}