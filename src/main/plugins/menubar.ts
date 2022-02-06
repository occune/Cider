import {app, Menu, shell} from "electron";

export default class Thumbar {
    /**
     * Private variables for interaction in plugins
     */
    private _win: any;
    private _app: any;
    private _store: any;

    /**
     * Base Plugin Details (Eventually implemented into a GUI in settings)
     */
    public name: string = 'Menubar Plugin';
    public description: string = 'Creates the menubar';
    public version: string = '1.0.0';
    public author: string = 'Core / Quack';

    /**
     * Thumbnail Toolbar Assets
     * NATIVE-IMAGE DOESN'T SUPPORT SVG
     private icons: { [key: string]: Electron.NativeImage } = {
        remoteIcon: nativeImage.createFromPath(join(utils.getPath('rendererPath'), 'views/svg/smartphone.svg')).toPNG(),
        soundIcon: nativeImage.createFromPath(join(utils.getPath('rendererPath'), 'views/svg/headphones.svg')).toPNG(),
        aboutIcon: nativeImage.createFromPath(join(utils.getPath('rendererPath'), 'views/svg/info.svg')).toPNG(),
        settingsIcon: nativeImage.createFromPath(join(utils.getPath('rendererPath'), 'views/svg/settings.svg')).toPNG(),
        logoutIcon: nativeImage.createFromPath(join(utils.getPath('rendererPath'), 'views/svg/log-out.svg')).toPNG(),
        ciderIcon: nativeImage.createFromPath(join(utils.getPath('rendererPath'), 'assets/logocute.png')).toPNG(),
    }
     */

    /**
     * Menubar Assets
     * @private
     */
    private isMac: boolean = process.platform === 'darwin';
    private menubarTemplate: any = [
        {
            label: app.name,
            submenu: [
                {
                    label: 'Web Remote',
                    accelerator: 'CommandOrControl+Shift+W',
                    sublabel: 'Opens in external window',
                    click: () => this._win.webContents.executeJavaScript(`ipcRenderer.invoke('showQR')`)
                }, //accelerator
                {
                    label: 'Audio Settings',
                    accelerator: 'CommandOrControl+Shift+A',
                    click: () => this._win.webContents.executeJavaScript(`app.modals.audioSettings = true`)
                },
                {
                    label: 'About',
                    accelerator: 'CommandOrControl+Shift+B',
                    click: () => this._win.webContents.executeJavaScript(`app.appRoute('about'`)
                },
                {
                    label: 'Settings',
                    accelerator: 'CommandOrControl+,',
                    click: () => this._win.webContents.executeJavaScript(`app.appRoute('settings')`)
                },
                {
                    label: 'Logout',
                    accelerator: 'CommandOrControl+Shift+O',
                    click: () => this._win.webContents.executeJavaScript(`app.unauthorize()`)
                },
                {type: 'separator'},
                {role: 'quit'}
            ]
        },
        {
            label: 'View',
            submenu: [
                {role: 'reload'},
                {role: 'forceReload'},
                {role: 'toggleDevTools'},
                {type: 'separator'},
                {role: 'resetZoom'},
                {role: 'zoomIn'},
                {role: 'zoomOut'},
                {type: 'separator'},
                {role: 'togglefullscreen'}
            ]
        },
        {
            label: 'Window',
            submenu: [
                {role: 'minimize'},
                {role: 'zoom'},
                ...(this.isMac ? [
                    {type: 'separator'},
                    {role: 'front'},
                    {type: 'separator'},
                    {role: 'window'}
                ] : [
                    {role: 'close'}
                ])
            ]
        },
        {
            label: 'Support',
            role: 'help',
            submenu: [
                {
                    label: 'Discord',
                    click: () => shell.openExternal("https://discord.gg/AppleMusic").catch(console.error)
                },
                {
                    label: 'GitHub Wiki',
                    click: () => shell.openExternal("https://github.com/ciderapp/Cider/wiki/Troubleshooting").catch(console.error)
                },
                {
                    label: 'About',
                    click: () => this._win.webContents.executeJavaScript(`app.appRoute('about')`)
                },
                {type: 'separator'},
                {
                    label: 'Report a...',
                    submenu: [
                        {
                            label: 'Bug',
                            click: () => shell.openExternal("https://github.com/ciderapp/Cider/issues/new?assignees=&labels=bug%2Ctriage&template=bug_report.yaml&title=%5BBug%5D%3A+").catch(console.error)
                        },
                        {
                            label: 'Feature Request',
                            click: () => shell.openExternal("https://github.com/ciderapp/Cider/issues/new?assignees=&labels=enhancement%2Ctriage&template=feature_request.yaml&title=%5BEnhancement%5D%3A+").catch(console.error)
                        },
                        {
                            label: 'Translation Report/Request',
                            click: () => shell.openExternal("https://github.com/ciderapp/Cider/issues/new?assignees=&labels=%F0%9F%8C%90+Translations&template=translation.yaml&title=%5BTranslation%5D%3A+").catch(console.error)
                        },
                    ]
                },
                {type: 'separator'},
                {
                    label: 'View License',
                    click: () => shell.openExternal("https://github.com/ciderapp/Cider/blob/main/LICENSE").catch(console.error)
                },
                {type: 'separator'},
                {
                    label: 'Toggle Developer Tools',
                    accelerator: 'Option+CommandOrControl+I',
                    click: () => this._win.webContents.openDevTools()
                },
                {
                    label: 'Open Configuration File in Editor',
                    click: () => this._store.openInEditor()
                }
            ]
        }
    ]

    /*******************************************************************************************
     * Public Methods
     * ****************************************************************************************/

    /**
     * Runs on plugin load (Currently run on application start)
     */
    constructor(app: any, store: any) {
        this._app = app;
        this._store = store
        console.debug(`[Plugin][${this.name}] Loading Complete.`);
    }

    /**
     * Runs on app ready
     */
    onReady(win: Electron.BrowserWindow): void {
        this._win = win;
        Menu.setApplicationMenu(Menu.buildFromTemplate(this.menubarTemplate))
    }

    /**
     * Runs on app stop
     */
    onBeforeQuit(): void {
        console.debug(`[Plugin][${this.name}] Stopped.`);
    }

    /**
     * Runs on playback State Change
     * @param attributes Music Attributes (attributes.status = current state)
     */
    onPlaybackStateDidChange(attributes: object): void {

    }

    /**
     * Runs on song change
     * @param attributes Music Attributes
     */
    onNowPlayingItemDidChange(attributes: object): void {

    }

}
