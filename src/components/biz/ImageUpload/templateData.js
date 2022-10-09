const transToM = size => (size / 1024 / 1024);

const validSize = (size, limitSize) => {

    const fileMSize = transToM(size);
    return fileMSize <= limitSize;
};

export {validSize};

const statusText = {
    selected: '待上传...',
    uploading: '上传中...',
    error: '重新上传'
};

export {statusText};

const cloaseDialogStatus = ['uploading', 'selected'];

export {cloaseDialogStatus};