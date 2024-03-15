<script setup>
const props = defineProps(['parent', 'dirName']);
import { ref, computed, onUnmounted } from 'vue';
import { branches, addBranch } from '../js/treeLogics';

const path = `${props.parent}/${props.dirName}`;
// const path = ref(`${props.parent}/${props.dirName}`);
// const path = computed(() => `${props.parent}/${props.dirName}`);
// const branchCont = ref(null);
const isExpanded = ref(false);
const branchIndex = ref(-1);

async function showCont() {
    if(isExpanded.value) {
        return; // add functionality for refresh
    }
    // branchIndex.value = await addBranch(props.dirName, path.value);
    branchIndex.value = await addBranch(props.dirName, path);
    isExpanded.value = true;
}

onUnmounted(() => {
    console.log('out!');
    // console.log(path.value);
    console.log(path);
});

const cl = 'dir';
</script>

<template>
    <!-- <div class="dir"> -->
    <div :class="cl">
        <p @click="showCont" :class="{expanded: isExpanded}">
            {{ dirName }} [{{ path }}]
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
    border: 1px solid green;
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