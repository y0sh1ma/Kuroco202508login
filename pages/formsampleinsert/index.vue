<template>
  <div
    style="border:1px solid #ccc; padding:24px; border-radius:8px; max-width:600px; margin:32px auto;"
  >
    <form @submit.prevent="handleSubmit">
      <div style="margin-bottom:16px;" v-if="form.topics_id">
        <strong>ID：</strong>
        <span>{{ form.topics_id }}</span>
      </div>

      <div style="margin-bottom:16px;">
        <strong>タイトル：</strong>
        <input
          v-model="form.subject"
          type="text"
          style="width:100%; padding:6px;"
          required
        />
      </div>
      <div style="margin-bottom:16px;">
        <strong>内容：</strong>
        <textarea
          v-model="form.contents"
          rows="6"
          style="width:100%; padding:6px;"
          required
        ></textarea>
      </div>

      <div class="button-group">
        <button type="submit" class="btn-primary">保存</button>
        <button type="button" @click="goBack" class="btn-primary">戻る</button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { reactive } from 'vue';

// フォームの状態
const form = reactive({
  subject: '',
  contents: '',
  open_flg: 1
});

// 保存処理
async function handleSubmit() {
  try {
    await $fetch('https://diverta-oshima.g.kuroco.app/rcms-api/10/insert', {
      method: 'POST',
      body: form,
      headers: {
        'X-RCMS-API-ACCESS-TOKEN': '42275dcbd8c48d924ff658cef0f25d1ac18985ea4f09f3caf9936c509c6db132'
      }
    });
    alert('保存しました');
    window.history.back();
  } catch (e) {
    alert('保存に失敗しました');
    // --- 詳細デバッグ出力 ---
    if (e.response) {
      console.error('POST /rcms-api/10/insert error:');
      console.error('status:', e.response.status);
      console.error('response data:', e.response.data);
      console.error('response headers:', e.response.headers);
    } else if (e.request) {
      console.error('No response received:');
      console.error('request:', e.request);
    } else {
      console.error('Error message:', e.message);
    }
    // Nuxt3の$fetchは ofetch なので e.response などはaxiosとは若干異なります
  }
}

// 戻る処理
function goBack() {
  window.history.back();
}
</script>