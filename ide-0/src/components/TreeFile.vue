<script setup>
import TreeTitle from './TreeTitle.vue';

const { parent, name } = defineProps(['parent', 'name']);
const path = `${parent}/${name}`;
</script>

<template>
    <p class="title">
        <TreeTitle :parent="parent" :name="name" :path="path" />
    </p>
</template>

<style scoped>

</style>