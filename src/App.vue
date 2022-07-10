<script setup>
import axios from 'axios'
import { ref, reactive } from 'vue'
import { FileType, ViewType, folderurl, fileurl, defaultData, getFileType } from './reference'
import MenuItem from './components/MenuItem.vue'
import FileItem from './components/FileItem.vue'

// SECTION_TYPE:const
var now = new Date();
// var top;

const axiosi = axios.create({
	withCredentials: true
});

axiosi.interceptors.response.use(response => {
    if(response.data.alert) popup(response.data.alert);
    return response;
}, error => {
    if (error.response && error.response.data.alert) popup(error.response.data.alert);
    return error;
});

const data = reactive(defaultData);
const darkMode = ref(true);
const loadingCount = ref(0);

// SECTION_TYPE: Main Page
const onClickMenuItem = folder => {
    document.getElementById('menu').scrollTop += 100;
    data.viewFolder = folder;
    axiosi.get(folderurl + folder.id).then(response => {
        data.viewFiles = response.data;
    });
}

const onClickFileItem = file => {
    data.viewFile = file;
    data.viewScale = 1;
    data.viewFileType = getFileType(file.name);
    data.view |= ViewType.Viewer;
}

// SECTION_TYPE: Photo-Frame

const onScrollPhotoFrame = e => {
    if(e.deltaY < 0) (data.viewScale > 2.7) ? data.viewScale = 3 : data.viewScale += 0.3;
    else (data.viewScale < 0.4) ? data.viewScale = 0.1 : data.viewScale -= 0.3;
}


// SECTION_TYPE:Execute Phase
const onLoad = (event) => {
    // top = document.getElementById('top');

    axiosi.get(folderurl).then(response => {
        data.folders = response.data;
        console.log(data.folders);
    });
}



window.addEventListener('load', onLoad);
</script>

<template>
	<div id="top"
        :class="darkMode ? 'dark-theme' : 'light-theme'"
        @contextmenu.prevent>
        <!-- SECTION_TYPE: Header  -->
        <div v-show="data.view & ViewType.Header" id="header">
        </div>
        <!-- SECTION_TYPE: Main Page -->
        <div v-show="data.view & ViewType.MainPage" id="mainPage">
            <div id="menu">
                <MenuItem v-for="folder in data.folders"
                    :key="folder"
                    :folder="folder"
                    :depth="0"
                    :onClick="onClickMenuItem"></MenuItem>
            </div>
            <div id="explorer">
                <FileItem v-for="file in data.viewFiles"
                    :key="file"
                    :file="file"
                    :fileType="getFileType(file.name)"
                    @click="onClickFileItem(file)"></FileItem>
            </div>
        </div>
        <!-- SECTION_TYPE: Viewer -->
        <div v-show="data.view & ViewType.Viewer" id="viewer">
            
            <div v-if="data.viewFileType == FileType.Picture"
                id="photo-frame"
                @wheel="onScrollPhotoFrame"
                @click="data.view ^= ViewType.Viewer">
                <img :src="fileurl + data.viewFile.id"
                    :style="{'transform': `translate(-50%,-50%) scale(${ data.viewScale })`}"
                    @click.stop>
            </div>
        </div>
    </div>
</template>

<style lang="scss">
@import './assets/scss';
</style>