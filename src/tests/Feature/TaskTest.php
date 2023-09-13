<?php

namespace Tests\Feature;

// use Illuminate\Foundation\Testing\RefreshDatabase;

use App\Models\Task;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class TaskTest extends TestCase
{
    // テスト実行時にDBをリセット
    use RefreshDatabase;
    /**
     * タスク一覧を取得
     */
    public function testGetList(): void
    {
        // 10件登録
        $tasks = Task::factory()->count(10)->create();
        // dd($tasks->toArray());

        // 登録したデータをapiから取得
        $response = $this->getJson('/api/tasks');

        // json()でデータのみ取得
        // dd($response->json());

        $response
            ->assertOk()// ステータスコードが200の場合は成功
            ->assertJsonCount($tasks->count()); // 登録したデータ数と取得したデータ数が同じかをテスト。引数には想定されるデータ数を指定
        // $response->assertStatus(200);
    }

    /**
     * タスクを登録
     * @test
     */
    public function testRegisterTask(): void
    {
        $data = [
            'title' => 'テスト投稿',
        ];
        $response = $this->postJson('/api/tasks', $data);
        
        $response
            // ->assertStatus(201);
            ->assertCreated() // 成功時のステータスは201（storeメソッドで201を返すため）
            ->assertJsonFragment($data); // titleと一部の情報が入っているか確認
    }

    /**
     * タスクの見入力テスト
     * @test
     */
    public function testValidateTaskTitleIsNotEmpty(): void
    {
        $data = [
            'title' => '',
        ];
        $response = $this->postJson('/api/tasks', $data);
        $response
            ->assertStatus(422)
            ->assertJsonValidationErrors([
                'title' => 'タイトルは必ず指定してください。'
                ]); // バリデーションの文字列確認
    }

    /**
     * タスクの最大文字数テスト
     * @test
     */
    public function testValidateTaskTitleIsMaxNumberOfCharacters(): void
    {
        $data = [
            'title' => str_repeat('あ', 256),
        ];
        $response = $this->postJson('/api/tasks', $data);
        $response
            ->assertStatus(422)
            ->assertJsonValidationErrors([
                'title' => 'タイトルは、255文字以下で指定してください。'
                ]); // バリデーションの文字列確認
    }

    /**
     * タスクを更新
     * @test
     */
    public function testUpdateTask(): void
    {
        $task = Task::factory()->create();

        $task->title = '書き換え';
        $response = $this->patchJson("/api/tasks/{$task->id}", $task->toArray());

        $response
            ->assertOk()
            ->assertJsonFragment($task->toArray());
    }

    /**
     * タスクを削除
     * @test
     */
    public function testDeleteTask(): void
    {
        // 複数のタスク（例えば10件）を生成
        $tasks = Task::factory()->count(10)->create();
        // dd($tasks->count());

        // 特定のタスクを取得
        $task = Task::first();
        
        // タスクを削除（deleteにはPOSTデータがないため、第二引数を削除）
        $response = $this->deleteJson("/api/tasks/{$task->id}");
        $response->assertOk();

        // 一覧の取得を行い合計の数が減っているか確認
        $response = $this->getJson("api/tasks");
        $response->assertJsonCount($tasks->count() - 1);
    }
}