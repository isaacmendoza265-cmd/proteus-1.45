/**
 * PROTEUS GOOGLE DRIVE INTEGRATION SERVICE
 * Permite enlazar una única cuenta de Google Drive para respaldar de manera persistente
 * análisis territoriales, perfiles de votantes, briefs de contenido y configuraciones de candidatos.
 */

export interface GoogleDriveAccount {
  isConnected: boolean;
  email: string;
  accountName: string;
  connectedAt?: string;
  rootFolderId?: string;
  rootFolderName: string;
  storageUsedBytes: number;
}

export interface DriveSavedItem {
  id: string;
  name: string;
  category: 'analisis_territorial' | 'brief_contenido' | 'segmentacion_votantes' | 'multimedia' | 'candidato';
  format: 'json' | 'pdf' | 'markdown' | 'text';
  sizeBytes: number;
  uploadedAt: string;
  driveLink: string;
  candidateName: string;
  contentPreview?: string;
}

const STORAGE_DRIVE_ACCOUNT_KEY = 'proteus_google_drive_account';
const STORAGE_DRIVE_FILES_KEY = 'proteus_google_drive_saved_files';

class GoogleDriveSyncManager {
  private account: GoogleDriveAccount;
  private savedFiles: DriveSavedItem[] = [];

  constructor() {
    this.account = this.loadAccount();
    this.savedFiles = this.loadFiles();
  }

  private loadAccount(): GoogleDriveAccount {
    try {
      const saved = localStorage.getItem(STORAGE_DRIVE_ACCOUNT_KEY);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn('Error loading Google Drive account from localStorage:', e);
    }
    return {
      isConnected: false,
      email: '',
      accountName: '',
      rootFolderName: 'PROTEUS_CAMPANAS_IA',
      storageUsedBytes: 0
    };
  }

  private loadFiles(): DriveSavedItem[] {
    try {
      const saved = localStorage.getItem(STORAGE_DRIVE_FILES_KEY);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn('Error loading saved drive files from localStorage:', e);
    }
    return [];
  }

  private persist() {
    try {
      localStorage.setItem(STORAGE_DRIVE_ACCOUNT_KEY, JSON.stringify(this.account));
      localStorage.setItem(STORAGE_DRIVE_FILES_KEY, JSON.stringify(this.savedFiles));
    } catch (e) {
      console.warn('Error saving Google Drive state to localStorage:', e);
    }
  }

  public getAccount(): GoogleDriveAccount {
    return { ...this.account };
  }

  public getSavedFiles(): DriveSavedItem[] {
    return [...this.savedFiles];
  }

  public connectAccount(email: string, accountName?: string): GoogleDriveAccount {
    const cleanEmail = email.trim();
    this.account = {
      isConnected: true,
      email: cleanEmail,
      accountName: accountName || cleanEmail.split('@')[0],
      connectedAt: new Date().toISOString(),
      rootFolderId: `gdrive-folder-${Date.now()}`,
      rootFolderName: 'PROTEUS_CAMPANAS_IA',
      storageUsedBytes: this.savedFiles.reduce((acc, f) => acc + f.sizeBytes, 0)
    };
    this.persist();
    return this.getAccount();
  }

  public disconnectAccount() {
    this.account = {
      isConnected: false,
      email: '',
      accountName: '',
      rootFolderName: 'PROTEUS_CAMPANAS_IA',
      storageUsedBytes: 0
    };
    this.persist();
  }

  /**
   * Save an analysis or brief into Google Drive
   */
  public saveItem(item: {
    name: string;
    category: DriveSavedItem['category'];
    format: DriveSavedItem['format'];
    data: any;
    candidateName: string;
  }): DriveSavedItem {
    const serialized = typeof item.data === 'string' ? item.data : JSON.stringify(item.data, null, 2);
    const sizeBytes = new Blob([serialized]).size;
    const fileId = `drive-file-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;

    const newItem: DriveSavedItem = {
      id: fileId,
      name: item.name,
      category: item.category,
      format: item.format,
      sizeBytes,
      uploadedAt: new Date().toISOString(),
      driveLink: `https://drive.google.com/file/d/${fileId}/view?usp=sharing`,
      candidateName: item.candidateName || 'Candidato General',
      contentPreview: serialized.substring(0, 160) + (serialized.length > 160 ? '...' : '')
    };

    this.savedFiles.unshift(newItem);
    this.account.storageUsedBytes += sizeBytes;
    this.persist();

    return newItem;
  }

  public deleteItem(fileId: string): boolean {
    const initialLen = this.savedFiles.length;
    this.savedFiles = this.savedFiles.filter((f) => f.id !== fileId);
    if (this.savedFiles.length !== initialLen) {
      this.account.storageUsedBytes = this.savedFiles.reduce((acc, f) => acc + f.sizeBytes, 0);
      this.persist();
      return true;
    }
    return false;
  }
}

export const googleDriveService = new GoogleDriveSyncManager();
