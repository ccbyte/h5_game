/**
 * 观察者
 */
class Observer {
    private _message;
    private static _instance;

    constructor() {
        this._message = [];
    }

    /**
     * 注册命令
     * @param commandKey  消息类型
     * @param fn 处理函数
     * @param content this
     */
    public regist(commandKey, fn, content) {
        let fn_con = { fn, content };
        // 如果这个消息类型不存在，则创建一个
        if (typeof this._message[commandKey] === 'undefined') {
            this._message[commandKey] = [fn_con];
        } else {
            // 如果这个消息类型存在，则推入执行队列
            this._message[commandKey].push(fn_con);
        }
    }

    /**
     * 触发命令
     * @param commandKey  消息类型
     * @param args 参数
     */
    public fire(commandKey, args) {
        if (!this._message[commandKey]) return;

        let events = {
            commandKey: commandKey,
            args: args || {}
        },
            i = 0,
            len = this._message[commandKey].length;

        for (; i < len; i++) {
            this._message[commandKey][i].fn.call(this._message[commandKey][i].content, events);
        }
    }

    /**
     * 移除命令
     * @param commandKey 
     * @param fn 
     * @param content 
     */
    public remove(commandKey, fn, content) {
        let fn_con = { fn, content };

        if (this._message[commandKey] instanceof Array) {
            let i = this._message[commandKey].length - 1;

            for (; i >= 0; i--) {
                this._message[commandKey][i] === fn_con && this._message[commandKey].splice(i, 0);
            }
        }
    }

    public static getInstance() {
        if (this._instance === undefined) {
            this._instance = new Observer()
        }
        return this._instance;
    }
}