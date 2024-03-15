<script setup>
// import { ref } from 'vue';
// import { root, addBranch } from './js/treeLogics.js';

// import DirBlock from './components/DirBlock.vue';
import TreeDir from './components/TreeDir.vue';

// addBranch(root.main.name, root.main.path);
// console.log(branch);
</script>

<template>
    <!-- <DirBlock2 
        index="0"
    /> -->
    <!-- <DirBlock
        :parent="root.main.path"
        dir-name=""
    /> -->
    <!-- <TreeDir
        :parent="root.main.path"
        name=""
    /> -->
    <TreeDir
        parent=""
        name="root"
        expand="true"
    />
    
</template>

<style scoped>

</style>