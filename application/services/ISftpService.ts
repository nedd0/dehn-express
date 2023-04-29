export interface ISftpService {
    connect(): Promise<void>;
    disconnect(): Promise<void>;
    download(lastExecutionDate: Date, country:string): Promise<Buffer[]>
    
  }