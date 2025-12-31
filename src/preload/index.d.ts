import { ElectronAPI } from '@electron-toolkit/preload';

declare global {
  interface Window {
    electron: ElectronAPI
    api: unknown
    electronAPI: {
      on: ( channel: string, callback: ( event: Electron.IpcRendererEvent, data: object ) => void ) => void,
      openExportWindow: ( data: object ) => void,
      openImportWindow: () => void,
      remove: ( channel: string ) => void,
    }
  }
}
