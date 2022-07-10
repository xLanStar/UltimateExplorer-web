<script setup>
import { ref } from 'vue'
defineProps({
    depth: Number,
    folder: Object,
    onClick: Function
});

const expand = ref(false);

</script>

<template>
    <div class="fc">
        <div class="menuitem ca hbc"
            :style="{'padding-left': (depth * 15) + 'px'}"
            @click="onClick(folder)">
            <img v-if="folder.subfolders"
                class="ca"
                :src="expand ? 'expand.svg' : '/unexpand.svg'"
                @click.stop="expand = !expand">
            <a :style="{'margin-left': folder.subfolders ? '0' : '32px'}">{{ folder.name }}</a>
        </div>
        <div v-show="expand" class="fc">
            <MenuItem v-for="subfolder in folder.subfolders"
                :key="subfolder"
                :folder="subfolder"
                :depth="depth + 1"
                :onClick="onClick"></MenuItem>
        </div>
    </div>
</template>