<script setup>
const props = defineProps(['index']);
import { ref, onUnmounted } from 'vue';
import { dirs, addBranch } from '../js/treeLogics';

// const branchCont = ref(null);
const timeToShow = ref(false);
const branchIndex = ref(-1);

// async function showCont() {
//     if(timeToShow.value) {
//         return; // add functionality for refresh
//     }
//     branchIndex.value = await addBranch(props.dirName, path.value);
//     timeToShow.value = true;
// }

onUnmounted(() => {
    console.log('out!');
    // console.log(path.value);
});
</script>

<template>
    <div class="dir">
        <p @click="showCont">
            {{ dirs[index].name }} [{{ dirs[index].path }}]
        </p>
        <div class="dir-cont" v-if="timeToShow">
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
    padding-left: 0.5rem;
    margin-bottom: 3px;
}
.dir-cont {
    border: 1px solid black;
    min-height: 0.5em;
}




</style>