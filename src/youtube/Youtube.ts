import ytdl from 'ytdl-core';
import Downloader from '../Downloader';

export type Format = 'mp3';

export default class Youtube extends Downloader {
  constructor({ path }: { path?: string } = {}) {
    super(path);
  }

  private getId(url: string) {
    const slices = url.split('v=');
    return slices[1] || slices[0];
  }

  private async mp3(url: string) {
    const videoId = this.getId(url);
    const info = await ytdl.getInfo(videoId);
    const stream = ytdl.downloadFromInfo(info, { filter: 'audioonly' });
    const title = info.videoDetails.title.replace(/\s/g, '') + '.mp3';

    this.download(stream, { title });
  }

  private async mp4(url: string) {
    const videoId = this.getId(url);
    const info = await ytdl.getInfo(videoId);
    const stream = ytdl.downloadFromInfo(info, { filter: 'videoandaudio' });
    const title = info.videoDetails.title.replace(/\s/g, '') + '.mp4';

    this.download(stream, { title });
  }

  public async start(format: Format, url: string) {
    switch (format) {
      case 'mp3':
        return this.mp3(url);
      default:
        return this.mp4(url);
    }
  }
}
