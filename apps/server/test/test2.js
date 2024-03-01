import { execSync, exec } from 'child_process';
import fs from 'fs';

const directoryPath = 'E:\\develop\\video\\tian_guan_ci_fu_2'; // 修改为您要读取的目录的路径
let partIndex = 1;
let doArray = [];

function getVideoDuration(inputFile) {
    try {
        const stdout = execSync(`ffprobe -v error -show_entries format=duration -of default=noprint_wrappers=1:nokey=1 ${inputFile}`);
        const durationString = stdout.toString(); // 将Buffer对象转换为字符串
        return parseFloat(durationString);
    } catch (error) {
        console.error(`Error getting video duration: ${error.message}`);
        return 0;
    }
}

function splitVideo(inputFile, outputPrefix) {
    const duration = 6 * 60; // 6分钟
    let startTime = 0;
    // let partIndex = 1;

    // 获取视频总时长
    const videoDuration = getVideoDuration(inputFile);

    while (true) {

        // 如果超过了视频总时长，则停止循环
        if (startTime >= videoDuration) {
            break;
        }

        const outputFileName = `${outputPrefix}_${partIndex}.mp4`;
        const command = `ffmpeg -y -i ${inputFile} -ss ${startTime} -t ${duration} -c copy ${outputFileName}`;

        doArray.push({
            "command": command
        })

        // try {
        //     execSync(command);
        //     console.log(`Part ${partIndex} created: ${outputFileName}`);
        // } catch (error) {
        //     console.error(`Error splitting video: ${error.message}`);
        //     break;
        // }

        // 更新起始时间和部分索引
        startTime += duration;
        partIndex++;
    }
}

async function processFiles(directoryPath) {
    try {
        // 同步读取目录中的文件
        const files = fs.readdirSync(directoryPath);

        if (!files || files.length === 0) {
            console.error('No files found in directory:', directoryPath);
            return;
        }

        // 按名称排序文件
        files.sort((a, b) => {
            return a.localeCompare(b, undefined, { sensitivity: 'base' });
        });

        // 列出排序后的文件
        for (const file of files) {
            console.log(file);
            const inputFile = 'E:\\develop\\video\\tian_guan_ci_fu_2\\' + file; // 输入大视频文件路径
            const outputPrefix = 'E:\\develop\\video\\temp\\output'; // 输出小视频文件前缀路径
            splitVideo(inputFile, outputPrefix);
        }
    } catch (error) {
        console.error('Error processing files:', error);
    }
}

// 调用函数并传递目录路径
processFiles(directoryPath);
for (const item of doArray) {
    console.log(item.command)
    exec(item.command)
}