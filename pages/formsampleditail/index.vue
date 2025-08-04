<template>
  <div
    style="border:1px solid #ccc; padding:24px; border-radius:8px; max-width:600px; margin:32px auto;"
  >
    <div style="margin-bottom:16px;">
      <strong>ID：</strong>
      <span>{{ resp?.details?.topics_id }}</span>
    </div>
    <div style="margin-bottom:16px;">
      <strong>タイトル：</strong>
      <span>{{ resp?.details?.subject }}</span>
    </div>
    <div style="margin-bottom:16px;">
      <strong>更新日時：</strong>
      <span>{{ resp?.details?.update_ymdhi }}</span>
    </div>
    <div style="margin-bottom:16px;">
      <strong>内容：</strong>
      <span>{{ resp?.details?.contents }}</span>
    </div>

    <div
      style="display: flex; justify-content: flex-start; gap: 16px; margin-top: 32px;"
    >
      <button @click="goToUpdate" class="btn">更新する</button>
      <button @click="goBack" class="btn">戻る</button>
    </div>
  </div>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router';

// クエリ取得
const route = useRoute();
const router = useRouter();

const id = route.query.id ?? '';

// データ取得 (useFetch)
const { data: resp } = await useFetch(
  `https://diverta-oshima.g.kuroco.app/rcms-api/10/topics/${id}`,
  {
    headers: {
      'X-RCMS-API-ACCESS-TOKEN': '42275dcbd8c48d924ff658cef0f25d1ac18985ea4f09f3caf9936c509c6db132'
    }
  }
);

// 更新ボタン
function goToUpdate() {
  const topicId = resp.value?.details?.topics_id;
  if (!topicId) {
    alert('IDが取得できません');
    return;
  }
  router.push({ path: '/fromsampleupdate', query: { id: topicId } });
}

// 戻るボタン
function goBack() {
  window.history.back();
}
</script>