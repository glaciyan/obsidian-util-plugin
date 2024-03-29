import { Plugin } from "obsidian";
import {
    DEFAULT_SETTINGS,
    KUtilPluginSettings,
    KUtilSettings
} from "plugin/KUtilSettings";
import { cleanUpAttachmentFolder } from "./KCommands";
import { KPlugin } from "./ThePlugin";

let ThePlugin: KPlugin | null = null;

export class KUtilPlugin extends Plugin {
    settings: KUtilPluginSettings;

    async onload() {
        await this.loadSettings();

        ThePlugin = {
            app: this.app,
            settings: this.settings,
        };

        this.addCommand(cleanUpAttachmentFolder);

        // This adds a settings tab so the user can configure various aspects of the plugin
        this.addSettingTab(new KUtilSettings(this.app, this));
    }

    // onunload() {
    // }
    //
    async loadSettings() {
        this.settings = Object.assign(
            {},
            DEFAULT_SETTINGS,
            (await this.loadData())?.settings
        );
    }

    async saveSettings() {
        await this.saveData({ settings: this.settings });
    }
}

export const getThePlugin = () => {
    if (ThePlugin == null) {
        throw new Error("Plugin has not been initialized!");
    }

    return ThePlugin;
};
