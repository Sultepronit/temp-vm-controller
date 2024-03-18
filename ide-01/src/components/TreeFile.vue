<script setup>
import TreeTitle from './TreeTitle.vue';

const { parent, name } = defineProps(['parent', 'name']);
const path = `${parent}/${name}`;
</script>

<template>
    <p class="title">
        <TreeTitle type="file" :parent="parent" :name="name" :path="path" />
    </p>
</template>

<style scoped>

</style>