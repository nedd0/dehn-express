import { injectable } from "inversify";
import { ISftpService } from "../../application/services/ISftpService";
import SftpClient from "ssh2-sftp-client";
import * as dotenv from "dotenv";

dotenv.config();

@injectable()
export class SftpService implements ISftpService {
  private client: SftpClient;

  constructor() {
    this.client = new SftpClient();
  }

  public async connect(): Promise<void> {
    await this.client.connect({
      host: process.env.SFTP_HOST,
      port: process.env.SFTP_PORT,
      username: process.env.SFTP_USER,
      password: process.env.SFTP_PASSWORD
    });
  }

  public async disconnect(): Promise<void> {
    await this.client.end();
  }

  public async download(lastExecutionDate: Date, country:string): Promise<Buffer[]> {
    const files = await this.client.list(process.env.SFTP_BASEPATH+country);

    const newFiles = files.filter(file => {
      const createdDate = new Date(file.modifyTime * 1000); // convert from seconds to milliseconds
      return createdDate > lastExecutionDate;
    });

    const buffers = await Promise.all(newFiles.map(async file => {
      const buffer = await this.client.get(`${process.env.SFTP_BASEPATH+country}/${file.name}`);
      return buffer;
    }));

    return buffers;
  }


}
