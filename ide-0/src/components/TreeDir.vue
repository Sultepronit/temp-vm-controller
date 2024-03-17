<script setup>
import { ref, onUnmounted } from 'vue';
import { branches, addBranch } from '../js/treeLogics';
import TreeTitle from './TreeTitle.vue';
import TreeFile from './TreeFile.vue';

const { parent, name, expand } = defineProps(['parent', 'name', 'expand']);

const path = parent ? `${parent}/${name}` : '..';

const branchIndex = ref(-1);
const isExpanded = ref(false);

async function getDirCont() {
    if(branchIndex.value >= 0) {
        return; // add functionality for refresh
    }
    branchIndex.value = await addBranch(name, path);
    isExpanded.value = true;
}
if(expand) {
    getDirCont();
}

function toggleCont() {
    if(!isExpanded.value) {
        if(branchIndex.value < 0) {
            getDirCont();
        } else {
            isExpanded.value = true;
        }
    } else {
        isExpanded.value = false;
    }
}

onUnmounted(() => {
    console.log('out!');
    console.log(path);
    branches[branchIndex.value] = null;
    console.log(branches);                          
});
</script>

<template>
    <div class="dir">
        <p
            class="dir-title"
            :class="{expanded: isExpanded}"    
        >
            <span class="toggle-cont" @click="toggleCont">
                {{ isExpanded ? '-' : '+' }}
            </span>
            <TreeTitle
                type="dir"
                @click="getDirCont"
                :parent="parent"
                :name="name"
                :path="path"
            />
        </p>
        <div class="dir-cont" v-show="isExpanded">
            <TreeDir
                v-for="dir in branches[branchIndex]?.dirs"
                :key="dir"
                :parent="path"
                :name="dir"
            />
            <TreeFile
                v-for="file in branches[branchIndex]?.files"
                :key="file"
                :parent="path"
                :name="file"
            />
        </div>
    </div>
</template>

<style scoped>
.dir-title {
    /* color: green; */
    color: #00ff66;
    white-space: nowrap;
}
.toggle-cont {
    margin-bottom: 3px;
    margin-right: 0.2em;
    font-family: Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace;
    font-weight: bold;
    cursor: pointer;
}
.dir-cont {
    margin-left: 0.5em;
    /* border: 1px solid black; */
    border: 1px solid #00ff66;
    min-height: 0.5em;
    padding-inline: 0.1em;
}
.expanded {
    font-weight: bold;
}
</style>