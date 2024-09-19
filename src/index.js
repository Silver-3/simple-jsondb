const fs = require('fs');

module.exports = class jsonDB {
    constructor(filePath) {
        this.filePath = filePath || "./db.json";
        this.data = {};
        
        if (!fs.existsSync(this.filePath)) {
            fs.writeFileSync(this.filePath, "{}", "utf-8");
        } else {
            this.getDataFromFile();
        }
    }

    getDataFromFile() {
        const savedData = JSON.parse(fs.readFileSync(this.filePath));

        if (typeof savedData == "object") {
            this.data = savedData;
        }
    }

    saveData() {
        fs.writeFileSync(this.filePath, JSON.stringify(this.data, null, 2), "utf-8");
    }

    /**
     * 
     * @param {String} key 
     * @param {String, Object, Number} value 
     * @returns {value}
     */

    set(key, value) {
        if (!key) throw new Error("Key was not specified.\n\nHow to fix: db.set(KEY, value)");
        if (!value) throw new Error("Value was not specified.\n\nHow to fix: db.set(key, VALUE)");

        if (typeof key !== "string") throw new Error("Key type is not a string.");

        this.data[key] = value;
        this.saveData();

        return this.data[key];
    }

    /**
     * 
     * @param {String} key 
     * @returns {String, Object, Number}
     */

    get(key) {
        if (!key) throw new Error("Key was not specified.\n\nHow to fix: db.get(KEY)");
        if (typeof key !== "string") throw new Error("Key type is not a string.");

        return this.data[key];
    }

    /**
     * 
     * @param {String} key 
     * @returns {String, Object, Number}
     */

    fetch(key) {
        if (!key) throw new Error("Key was not specified.\n\nHow to fix: db.fetch(KEY)");
        if (typeof key !== "string") throw new Error("Key type is not a string.");

        return this.data[key];
    }

    /**
     * 
     * @param {String} key 
     * @returns {Boolean}
     */

    has(key) {
        if (!key) throw new Error("Key was not specified.\n\nHow to fix: db.has(KEY)");
        if (typeof key !== "string") throw new Error("Key type is not a string.");

        return Boolean(this.data[key]);
    }

    /**
     * 
     * @param {String} key 
     * @returns {Boolean}
     */

    delete(key) {
        if (!key) throw new Error("Key was not specified.\n\nHow to fix: db.delete(KEY)");
        if (typeof key !== "string") throw new Error("Key type is not a string.");

        delete this.data[key];
        this.saveData();

        return true;
    }

    clear() {
        this.data = {};
        this.saveData();
    }

    deleteAll() {
        this.data = {};
        this.saveData();
    }

    /**
     * @returns {Object}
     */

    all() {
        return Object.keys(this.data).map((i) => {
            return {
                key: i,
                value: this.data[i]
            }
        });
    }

    /**
     * 
     * @param {String} key 
     * @param {Number} amount 
     * @returns {Number}
     */

    add(key, amount) {
        if (!key) throw new Error("Key was not specified.\n\nHow to fix: db.add(KEY, amount)");
        if (!amount) throw new Error("Amount was not specified.\n\nHow to fix: db.add(key, AMOUNT)");

        if (!this.data[key]) this.data[key] = 0;

        if (typeof key !== "string") throw new Error("Key type is not a string.");
        if (typeof amount !== "number") throw new Error("Amount type is not a number.");
        if (typeof this.data[key] !== "number") throw new Error("Value of key is not a number.");

        this.data[key] += amount;
        this.saveData();

        return this.data[key];
    }

    /**
     * 
     * @param {String} key 
     * @param {Number} amount 
     * @returns {Number}
     */

    sub(key, amount) {
        if (!key) throw new Error("Key was not specified.\n\nHow to fix: db.sub(KEY, amount)");
        if (!amount) throw new Error("Amount was not specified.\n\nHow to fix: db.sub(key, AMOUNT)");

        if (!this.data[key]) this.data[key] = 0;

        if (typeof key !== "string") throw new Error("Key type is not a string.");
        if (typeof amount !== "number") throw new Error("Amount type is not a number.");
        if (typeof this.data[key] !== "number") throw new Error("Value of key is not a number.");

        this.data[key] -= amount;
        this.saveData();

        return this.data[key];
    }

    /**
     * 
     * @param {String} key 
     * @param {String} item 
     * @returns {Array}
     */

    push(key, item) {
        if (!key) throw new Error("Key was not specified.\n\nHow to fix: db.push(KEY, item)");
        if (!item) throw new Error("Item was not specified.\n\nHow to fix: db.push(key, ITEM)");

        if (typeof key !== "string") throw new Error("Key type is not a string.");
        if (typeof item !== "string") throw new Error("Item type is not a string.");

        if (!this.data[key]) this.data[key] = [];
        if (!Array.isArray(this.data[key])) this.data[key] = [this.data[key]];

        this.data[key].push(item);
        this.saveData();

        return this.data[key];
    }

    /**
     * 
     * @param {String} key 
     * @param {String} item 
     * @returns {Array}
     */

    unpush(key, item) {
        if (!key) throw new Error("Key was not specified.\n\nHow to fix: db.unpush(KEY, item)");
        if (!item) throw new Error("Item was not specified.\n\nHow to fix: db.unpush(key, ITEM)");

        if (typeof key !== "string") throw new Error("Key type is not a string.");
        if (typeof item !== "string") throw new Error("Item type is not a string.");

        if (!this.data[key]) this.data[key] = [];
        if (!Array.isArray(this.data[key])) this.data[key] = [this.data[key]];

        const filtered = this.data[key].filter(i => i !== item);
        this.data[key] = filtered;
        this.saveData();

        return this.data[key];
    }
}