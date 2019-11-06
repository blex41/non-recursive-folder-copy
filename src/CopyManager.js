const fs = require('fs-extra');
const Path = require('path');

class CopyManager {
  constructor() {
    // Create a queue accessible by all methods
    this.folderQueue = [];
  }

  /**
   * Copies a directory
   * @param {String} remotePath
   * @param {String} downloadPath
   */
  async copyFolder(remotePath, downloadPath) {
    // Add the folder to the queue
    this.folderQueue.push({ remotePath, downloadPath });
    // While the queue contains folders to download
    while (this.folderQueue.length > 0) {
      // Download them
      const { remotePath, downloadPath } = this.folderQueue.shift();
      console.log(`Copy directory: ${remotePath} to ${downloadPath}`);
      await this._copyFolderAux(remotePath, downloadPath);
    }
  }

  /**
   * Private internal method which copies the files from a folder,
   * but if it finds subfolders, simply adds them to the folderQueue
   * @param {String} remotePath
   * @param {String} downloadPath
   */
  async _copyFolderAux(remotePath, downloadPath) {
    await fs.mkdir(downloadPath);
    const list = await this.listEntries(remotePath);
    for (const fileInfo of list) {
      if (fileInfo.isDirectory) {
        const folderPath = Path.join(remotePath, fileInfo.name);
        const targetPath = Path.join(downloadPath, fileInfo.name);
        // Push the folder to the queue
        this.folderQueue.push({ remotePath: folderPath, downloadPath: targetPath });
      } else if (fileInfo.isFile) {
        const filePath = Path.join(remotePath, fileInfo.name);
        await this.copyFile(filePath, downloadPath, fileInfo);
      }
    }
  }

  /**
   * Copies a file
   * @param {String} filePath
   * @param {String} downloadPath
   * @param {Object} fileInfo
   */
  async copyFile(filePath, downloadPath, fileInfo) {
    const targetPath = Path.join(downloadPath, fileInfo.name);
    console.log(`Copy file: ${filePath} to ${targetPath}`);
    return await fs.copy(filePath, targetPath);
  }

  /**
   * Lists entries from a folder
   * @param {String} remotePath
   */
  async listEntries(remotePath) {
    const fileNames = await fs.readdir(remotePath);
    return Promise.all(
      fileNames.map(async name => {
        const stats = await fs.lstat(Path.join(remotePath, name));
        return {
          name,
          isDirectory: stats.isDirectory(),
          isFile: stats.isFile()
        };
      })
    );
  }
}

module.exports = CopyManager;
