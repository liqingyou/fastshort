import mongo from '#@/lib/mongo.js'
import { ObjectId } from 'mongodb'

async function saveItem(episode, series, videoUrl, coverUrl) {

    const document = {
        "episode": episode,
        "series": series,
        "pass": true,
        "like": 0,
        "views": 0,
        "comments": 0,
        "title": "第" + episode + "集"
    }

    document.createdAt = new Date().getTime()
    document.updatedAt = new Date().getTime()
    document.video = [videoUrl]
    document.cover = [coverUrl]
    document.dedescription = document.title
    if (document.series) {
        const series = await mongo.col('series').findOne({
            _id: new ObjectId(document.series)
        })
        if (series) {
            document.seriesname = series.name
        }
    }
    const ret = await mongo.col('episode').insertOne(document)
}

await mongo.init()

const total = 32
const series = "65e19148ffc7c73a5353d49e";

for (let index = 1; index <= 32; index++) {
    let videoUrl = "https://d3avdo2qry94vj.cloudfront.net/video/5/output_" + index + ".mp4"
    let coverUrl = "https://d3avdo2qry94vj.cloudfront.net/video/cover/5.webp"
    await saveItem(index, series, videoUrl, coverUrl)
    console.log("保存", index)
}