<template>
  <div id="app">
    <Toast />
    <Toast position="bottom-center" group="bottom" />

    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>

    <!-- Schedule -->
    <Dialog
      v-model:visible="isShowSchedule"
      maximizable
      modal
      header="課表"
      class="floating-schedule-dialog"
      :content-style="{
        margin: '0 0 1rem',
      }"
    >
      <FloatingSchedule />
    </Dialog>

    <!-- Advanced search -->
    <Dialog
      v-model:visible="isShowAdvancedSearch"
      modal
      header="進階搜尋"
      class="advanced-search-dialog"
      :content-style="{
        margin: '0 0 1rem',
      }"
      content-class="hide-scrollbar"
    >
      <AdvancedSearch />
    </Dialog>
  </div>
</template>

<script setup>
import { Toast, Dialog } from "primevue";

import { FloatingSchedule, AdvancedSearch } from "#components";

useHead({
  title: "",
  titleTemplate: (titleChunk) => {
    return titleChunk ? `${titleChunk} | NTNUx` : "NTNUx | 課程查詢系統";
  },
  meta: [
    {
      name: "description",
      content: "更適合師大人的課程查詢系統，更快、更強、行動裝置友好。",
    },
  ],
});

const windowWidth = useState("windowWidth", () => window.innerWidth);

function updateWidth() {
  windowWidth.value = window.innerWidth;
}

onMounted(() => {
  window.addEventListener("resize", updateWidth);
});

onBeforeMount(() => {
  window.removeEventListener("resize", updateWidth);
});

const isShowSchedule = useState("isShowSchedule", () => false);
const isShowAdvancedSearch = useState("isShowAdvancedSearch", () => false);
</script>

<style scoped lang="scss">
@import url("https://fonts.googleapis.com/css2?family=LXGW+WenKai+Mono+TC:wght@400;700&display=swap");

#app {
  font-family: "LXGW WenKai Mono TC", monospace;

  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow-y: auto;
  overflow-x: hidden;
  scrollbar-width: none;
}
</style>

<style lang="scss">
body {
  margin: 0;
  background-color: var(--p-content-background);
}

html {
  font-size: 14px;
}

.hide-scrollbar {
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* Internet Explorer and Edge */
}

.advanced-search-dialog,
.floating-schedule-dialog {
  width: clamp(44rem, 85vw, 56rem);
  height: 90vh;
}

@media screen and (max-width: 770px) {
  .advanced-search-dialog,
  .floating-schedule-dialog {
    width: 90vw;
    height: 95vh;
  }
}
</style>
