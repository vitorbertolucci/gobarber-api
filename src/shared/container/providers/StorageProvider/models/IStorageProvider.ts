export default interface IStorageProvider {
  saveFile(file: string): Promise<string>;
  deleteFile(fiel: string): Promise<void>;
}
