<script setup>
import { ref } from 'vue';
import { treeObject, addBranch } from './js/treeLogics.js';

import DirBlock from './components/DirBlock.vue';

addBranch(treeObject.root.name, treeObject.root.path);
// console.log(branch);
</script>

<template>
    <!-- <DirBlock
        :parent="treeObject.root.path"
        dir-name="root"
    /> -->
    <div>
        <p>{{ treeObject.root.name }}</p>
        <div>
            <!-- <p v-for="dir in treeObject.branches[0]?.contents.directories" :key="dir">{{ dir }}</p> -->
            <DirBlock
                v-for="dir in treeObject.branches[0]?.contents.directories"
                :key="dir"
                :parent="treeObject.root.path"
                :dir-name="dir"
            />
        </div>
    </div>
    
</template>

<style scoped>

</style>