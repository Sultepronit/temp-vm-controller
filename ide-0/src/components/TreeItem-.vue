<script setup>
const { type, parent, name } = defineProps(['type', 'parent', 'name']);
import { ref, onUnmounted } from 'vue';
import { branches, addBranch } from '../js/treeLogics';

const path = `${parent}/${name}`;

const isExpanded = ref(false);
const branchIndex = ref(-1);

async function showDirCont() {
    if(isExpanded.value) {
        return; // add functionality for refresh
    }
    branchIndex.value = await addBranch(name, path);
    isExpanded.value = true;
}

onUnmounted(() => {
    console.log('out!');
    console.log(path);
});
</script>

<template>
    <div :class="type">
        <p @click="showDirCont" :class="{expanded: isExpanded}">
            {{ name }} [{{ path }}]
        </p>
        <div class="dir-cont" v-if="isExpanded">
            <DirBlock
                v-for="dir in branches[branchIndex].dirs"
                :key="dir"
                :parent="path"
                :dir-name="dir"
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
.dir-cont {
    margin-left: 0.5em;
    border: 1px solid black;
    min-height: 0.5em;
}
.expanded {
    font-weight: bold;
}
</style>