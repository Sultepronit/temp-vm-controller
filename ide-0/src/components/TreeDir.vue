<script setup>
import { ref, onUnmounted } from 'vue';
import { branches, addBranch } from '../js/treeLogics';
import TreeTitle from './TreeTitle.vue';
import TreeFile from './TreeFile.vue';

const { parent, name, expand } = defineProps(['parent', 'name', 'expand']);
// const path = `${parent}/${name}`;
// if(!parent) {
//     path = '.';
// }
const path = parent ? `${parent}/${name}` : '.';

const isExpanded = ref(false);
const branchIndex = ref(-1);

async function getDirCont() {
    if(isExpanded.value) {
        return; // add functionality for refresh
    }
    branchIndex.value = await addBranch(name, path);
    isExpanded.value = true;
}
if(expand) {
    getDirCont();
}

onUnmounted(() => {
    console.log('out!');
    console.log(path);
    branches[branchIndex.value] = null;
    // console.log(branches);                          
});
</script>

<template>
    <div class="dir">
        <p
            class="dir-title"
            :class="{expanded: isExpanded}"    
            @click="getDirCont"
        >
            <span>+</span>
            <TreeTitle :parent="parent" :name="name" :path="path" />
        </p>
        <div class="dir-cont" v-if="isExpanded">
            <TreeDir
                v-for="dir in branches[branchIndex].dirs"
                :key="dir"
                :parent="path"
                :name="dir"
            />
            <TreeFile
                v-for="file in branches[branchIndex].files"
                :key="file"
                :parent="path"
                :name="file"
            />
        </div>
    </div>
</template>

<style scoped>
.dir {
    /* border: 1px solid black; */
    /* padding-left: 0.5rem; */
    margin-bottom: 3px;
}
.dir-title {
    color: green;
}
.dir-cont {
    margin-left: 0.5em;
    border: 1px solid black;
    min-height: 0.5em;
}
.expanded {
    font-weight: bold;
}
</style>