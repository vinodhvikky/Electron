const electron = require('electron');
const io = require("socket.io-client");
const path = require('path');
const url = require('url');

const app = electron.app;
app.commandLine.appendSwitch('auto');
app.commandLine.appendSwitch('disable-pinch');
app.commandLine.appendSwitch('touch-events');
app.disableHardwareAcceleration();
app.commandLine.appendSwitch('ignore-certificate-errors');
const BrowserWindow = electron.BrowserWindow;
var mainWindow = null;

function createMainWindow() {
	logger.info(' Entering createMainWindow' );

    mainWindow = new BrowserWindow({
		width: 1080,
		height: 1920,
		backgroundColor: '#00204E',
        webgl: true
	})

	mainWindow.setFullScreen(true);
	mainWindow.setKiosk(true);
	// and load the index.html of the app.
	// mainWindow.setProgressBar(0);


	mainWindow.webContents.session.clearStorageData(
		{
			storages: ['indexdb'],
			quotas: [
	            'temporary',
	            'persistent',
	            'syncable',
        	]
		}, () => {
		// logger.info(' Indexed DB Cleared');
	});

	// Emitted when the window is closed.
	mainWindow.on('closed', function() {
		// Dereference the window object, usually you would store windows
		// in an array if your app supports multi windows, this is the time
		// when you should delete the corresponding element.
		mainWindow = null;
	})

	mainWindow.webContents.openDevTools();
		mainWindow.loadURL(url.format({
			pathname: path.join(__dirname, 'index.html'),
			protocol: 'file:',
			slashes: true
		}));
	// }
}

app.on('window-all-closed', function(){
    if (process.platform != 'darwin') {
      app.quit();
    }
});

app.on('ready', function () {
    logger.info(' Entering APP PATH');
    createMainWindow();
});
