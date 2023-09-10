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
}