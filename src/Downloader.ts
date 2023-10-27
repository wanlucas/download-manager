import internal from 'stream';
import ProgressLog from './utils/ProgressLog';
import fs from 'fs';

export default class Downloader {
  public customPath?: string;
  public progressLog: ProgressLog;

  constructor(customPath?: string) {
    this.progressLog = new ProgressLog();
    this.customPath = customPath;
  }

  protected async download(
    readable: internal.Readable,
    { title }: { title: string },
  ) {
    const path = this.customPath || this.getDownloadsPath();
    const stream = fs.createWriteStream(path + title);
    readable.pipe(stream);
    this.startProgressLog(readable);
  }

  private startProgressLog(readable: internal.Readable) {
    readable.on(
      'progress',
      (_chunkLength: number, downloadedLength: number, totalLength: number) => {
        const downloaded = downloadedLength;
        const total = totalLength;

        this.progressLog.start(
          parseFloat((total / 1e6).toFixed(1)),
          parseFloat((downloaded / 1e6).toFixed(1)),
        );
      },
    );

    readable.on('end', () => {
      this.progressLog.stop();
      console.log('Download finalizado!');
    });

    readable.on('error', (error: Error) => {
      console.log('Erro ao baixar arquivo: ', error.message);
    });
  }

  private getDownloadsPath() {
    const source = process.env.HOME || process.env.USERPROFILE;
    if (!source) throw new Error('Diretório de downloads não encontrado');
    return source.replace(' ', '') + '/Downloads/';
  }
}
