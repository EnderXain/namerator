const electron  = require('electron'),
        url     = require('url'),
        path    = require('path');

const {app, BrowserWindow, Menu} = electron;

//SET ENV
//process.env.NODE_ENV = 'production';

let mainWindow;

//listen for app to be ready
app.on('ready', function(){
    //create new window
    mainWindow = new BrowserWindow({});
    //load html into window
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, '../index.html'),
        protocol: 'file:',
        slashes: true
    }));
    //quit app when closed --used in case you make popup windows. close the main and it closes popup too (otherwise popup stays)
    mainWindow.on('closed', function(){
        app.quit();
    });

    //build menu from template
    const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
    //insert menu
    Menu.setApplicationMenu(mainMenu);
});

//create menu template
const mainMenuTemplate = [{
    label: 'File'
}];

//add developer tools item if not in production
if(process.env.NODE_ENV !== 'production'){
    mainMenuTemplate.push({
        label: 'Dev Tools',
        accelerator: ifMac() ? 'Command+I' : 'Ctrl+I',
        submenu: [{
            label: 'Toggle DevTools',
            click( item, focusedWindow ){
                focusedWindow.toggleDevTools();
            }
        },
        {
            role: 'reload'
        }]
    });
}

function ifMac(){
    return (process.platform == 'darwin' ? true : false );
}