<script setup>
const props = defineProps(['parent', 'dirName']);
import { ref, computed, onUnmounted } from 'vue';
import { treeObject, addBranch } from '../js/treeLogics';

// const path = `${props.parent}/${props.dirName}`;
const path = ref(`${props.parent}/${props.dirName}`);
// const path = computed(() => `${props.parent}/${props.dirName}`);

const branchCont = ref(null);
const timeToShow = ref(false);
async function showCont() {
    // console.log(path);
    const index = await addBranch(props.dirName, path.value);
    branchCont.value = treeObject.branches[index].contents;
    timeToShow.value = true;
}

onUnmounted(() => {
    console.log('out!');
    console.log(path.value);
});
</script>

<template>
    <div class="dir">
        <p @click="showCont">{{ dirName }} [{{ path }}]</p>
        <div class="dir-cont" v-if="timeToShow">
            <DirBlock
                v-for="dir in branchCont.directories"
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
}




</style>