import * as log4js from 'log4js';
import { Log4js, Logger as Log4jsLogger } from 'log4js';
const fname = process.cwd() + "/logs";


export class Logger {
    private _logger: Log4js;
    private _name: string;

    private _appenders = {
        console: {
            type: 'console'
        },
        file: {
            backups: 3,
            type: 'file',
            compress: true,
            maxLogSize: 10485760,
            filename: fname + '/app.log'
        }
    };

    private _categories = {
        default: {
            level: 'INFO',
            appenders: ['console', 'file'],
        }
    };

    private _makeConfig() {
        return {
            appenders: this._appenders,
            categories: this._categories,
        };
    }

    constructor(name) {
        this._logger = log4js.configure(this._makeConfig());
        this._name = name;
    }

    public get app(): Log4jsLogger {
        return this._logger.getLogger(this._name);
    }
}

export async function logger(scenario, logs) {
    const LoggerI = new Logger(scenario);
    const logger = LoggerI.app;
    logger.info(logs);
}