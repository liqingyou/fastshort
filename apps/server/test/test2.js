import { readdir } from 'fs';
import path from 'path';

const directoryPath = 'E:\\develop\\video\\tian_guan_ci_fu_2'; // 修改为您要读取的目录的路径

readdir(directoryPath, (err, files) => {
    
    if (err) {
        console.error('Error reading directory:', err);
        return;
    }

    // 按名称排序文件
    files.sort((a, b) => {
        return a.localeCompare(b, undefined, { sensitivity: 'base' });
    });

    // 列出排序后的文件
    files.forEach(file => {
        console.log(file);
    });

});

