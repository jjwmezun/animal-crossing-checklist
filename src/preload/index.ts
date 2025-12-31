import { contextBridge, ipcRenderer } from 'electron';
import { electronAPI } from '@electron-toolkit/preload';

// Custom APIs for renderer
const api = {};

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if ( process.contextIsolated ) {
	try {
		contextBridge.exposeInMainWorld( `electron`, electronAPI );
		contextBridge.exposeInMainWorld( `api`, api );
		contextBridge.exposeInMainWorld( `electronAPI`, {
			on: (
				channel: string,
				callback: ( event: Electron.IpcRendererEvent, data: object ) => void,
			) => ipcRenderer.on( channel, callback ),
			openExportWindow: ( data: object ) => ipcRenderer.send( `open-export-window`, data ),
			openImportWindow: () => ipcRenderer.send( `open-import-window` ),
			remove: ( channel: string ) => ipcRenderer.removeAllListeners( channel ),
		} );
	} catch ( error ) {
		console.error( error );
	}
} else {
	// @ts-expect-error (define in dts)
	window.electron = electronAPI;

	// @ts-expect-error (define in dts)
	window.api = api;

	// @ts-expect-error (define in dts)
	window.electronAPI = {
		on: (
			channel: string,
			callback: ( event: Electron.IpcRendererEvent, data: object ) => void,
		) => ipcRenderer.on( channel, callback ),
		openExportWindow: ( data: object ) => ipcRenderer.send( `open-export-window`, data ),
		openImportWindow: () => ipcRenderer.send( `open-import-window` ),
		remove: ( channel: string ) => ipcRenderer.removeAllListeners( channel ),
	};
}
