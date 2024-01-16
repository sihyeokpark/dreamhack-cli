import axios from 'axios'
import * as stream from 'stream'
import { promisify } from 'util'
import {createWriteStream} from 'fs'

const finished = promisify(stream.finished)

export default async function downloadFile(fileUrl, outputLocationPath) {
  const writer = createWriteStream(outputLocationPath);
  return axios({
    method: 'get',
    url: fileUrl,
    responseType: 'stream',
  }).then(response => {
    response.data.pipe(writer)
    return finished(writer) //this is a Promise
  });
}