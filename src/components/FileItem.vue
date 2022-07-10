<script setup>
import { FileType, fileurl } from '../reference';
defineProps({
    file: Object,
    fileType: Number,
    onClick: Function
});

</script>

<template>
    <div class="fileitem ca" @click="onClick">
        <div class="preview">
            <img v-if="fileType == FileType.Picture" :src="fileurl + file.id">
        </div>
        <div class="info">
            <a>{{ file.name }}</a>
        </div>
    </div>
</template>