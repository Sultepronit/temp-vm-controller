<script setup>
const { parent, name, path } = defineProps(['parent', 'name', 'path']);
function select() {
    console.log(`selected ${path}!`);
}
</script>

<template>
    <abbr :title="path" @click="select">
        <!-- {{ name }} [{{ path }}] -->
        {{ name }}
    </abbr>
</template>

<style scoped>
abbr {
    text-decoration: none;
}
</style>