<script setup>
import { selectItem } from '../js/selecting.js';

const { type, parent, name, path }
    = defineProps(['type', 'parent', 'name', 'path']);
function select() {
    // console.log(`selected ${path}!`);
    selectItem(type, parent, name, path);
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