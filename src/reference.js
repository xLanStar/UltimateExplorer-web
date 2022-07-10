import { FRAGMENT } from "@vue/compiler-core";

const apiurl = "http://192.168.10.202:8040/api/",
	folderurl = apiurl + "folder/",
	fileurl = apiurl + "file/";

const ViewType = {
	Header: 1,
	MainPage: 2,
	Viewer: 4
}

const FileType = {
	Unknown: 0,
	Music: 1,
	Video: 2,
	Picture: 3,
	Text: 4
}

const fileExtensions = {
	[FileType.Music]: ['mp3', 'flac', 'ogg', 'wav'],
	[FileType.Video]: ['mp4', 'mpeg', 'mov', 'mkv', 'avi', 'flv'],
	[FileType.Picture]: ['jpg', 'png', 'bmp'],
	[FileType.Text]: ['txt'],
	[FileType.Unknown]: [],
}

const defaultData = {
	// 從伺服器抓取的資料夾資料
	folders: [],

	// 當前 explorer 查閱的資料夾
	viewFolder: null,
	viewFiles: [],

	// 當前 viewer 查閱的檔案
	viewFile: null,
	viewFileType: FileType.Unknown,
	viewScale: 1,

	// 當前畫面的狀態(位元運算)
	view: 3
};

// const FileType = {
// 	Music: ['mp3', 'flac', 'ogg', 'wav'],
// 	Video: ['mp4', 'mpeg', 'mov', 'mkv', 'avi', 'flv'],
// 	Picture: ['jpg', 'png', 'bmp'],
// 	Text: ['txt'],
// 	Unknown: []
// }

export { ViewType, folderurl, fileurl, defaultData, FileType, fileExtensions};


export const getFileType = filename => {
	let ext = filename.substring(filename.lastIndexOf('.')+1, filename.length);
	for (const fileType in fileExtensions)
		for (const fileExt of fileExtensions[fileType])
			if(ext === fileExt) return Number(fileType);
	return FileType.Unknown;
}

// 複製物件，可接受任何型別，會回傳
export const cloneObject = (obj) => {
	if (obj == null || obj == undefined) {
		return obj;
	} else if (Array.isArray(obj)) {
		var clone = [];

		for (var i in obj) clone.push(cloneObject(obj[i]));

		return clone;
	} else if (typeof obj === "object") {
		var clone = {};

		for (var i in obj) clone[i] = cloneObject(obj[i]);

		return clone;
	} else {
		return obj;
	}
};

export const fillObject = (dst, src) => {
	for (var key in dst) {
		if (src.hasOwnProperty(key)) dst[key] = cloneObject(src[key]);
	}
};

export const extendObject = (dst, src) => {
	for (var i in src) {
		if (src[i] != null) {
			if (Array.isArray(src[i])) dst[i] = cloneObject(src[i]);
			else if (typeof src[i] === "object" && src[i] != null) {
				if (!dst.hasOwnProperty(i)) dst[i] = {};

				extendObject(dst[i], src[i]);
			} else dst[i] = src[i];
		}
	}
};

export const setObjectKey = (obj, key, bool) => {
	if (obj == null) return;

	if (bool) obj[key] = true;
	else delete obj[key];
};

export const toggleObjectKey = (obj, key) => {
	if (obj == null) return;

	if (obj.hasOwnProperty(key)) delete obj[key];
	else obj[key] = true;
};

export const cleanObject = (obj) => {
	for (var key in obj) {
		if (Array.isArray(obj[key])) {
			if (obj[key].length === 0) delete obj[key];
			else
				obj[key].forEach((el) => {
					cleanObject(el);
				});
		} else if (typeof obj[key] === "object") {
			if (obj[key] === {}) delete obj[key];
			else cleanObject(obj[key]);
		} else if (obj[key] === "" || obj[key] === null || obj[key] === 0) {
			delete obj[key];
		}
	}
};

export const differObject = (obj, src) => {
	for (var key in obj) {
		if (!src.hasOwnProperty(key)) continue;
		if (typeof obj[key] === "object") {
			differObject(obj[key], src[key]);
		} else if (obj[key] === src[key]) {
			delete obj[key];
		}
	}
};
export const range = (from, to) =>
	[...Array(to - from + 1)].map((_, i) => from + i);
export const isNumeric = (value) => {
	return /^-?\d+$/.test(value);
};
