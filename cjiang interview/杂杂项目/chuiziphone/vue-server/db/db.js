const MongoClient = require('mongodb').MongoClient;
// Connection URL
const url = 'mongodb://localhost:27017';
// const dbName = 'chuizi';
const dbName = 'Mydatabase';
//连接
const connect = () => {
    return new Promise((resolve, reject) => {
        MongoClient.connect(url, {
            useUnifiedTopology: true
        }, function (err, client) {
            err ? reject(err) : resolve(client);
            console.log("Connected successfully to server");
        });
    })
};



// 查
const find = (col, query) => {
    return new Promise(async (resolve, reject) => {
        let client = await connect();
        const db = client.db(dbName);
        const collection = db.collection(col);
        collection.find(query ? query : {}).toArray(function (err, docs) {
            err ? reject(err) : resolve(docs);
        });
        client.close();
    });
}


// 增  insert('表名',JSON数据)
const insert = (col, query) => {
    return new Promise(async (resolve, reject) => {
        let client = await connect();
        const db = client.db(dbName);
        const collection = db.collection(col);
        collection.insertMany(query, function (err, docs) {
            err ? reject(err) : resolve(docs);
        })
        client.close();
    })
}

// 删
const del = function (col, query) {
    return new Promise(async (resolve, reject) => {
        let client = await connect();
        const db = client.db(dbName);
        const collection = db.collection(col);
        collection.deleteOne(query, function (err, docs) {
            err ? reject(err) : resolve(docs);
        })
        client.close();
    })
}

// 改
const update = function (col, condition, query) {
    return new Promise(async (resolve, reject) => {
        let client = await connect();
        const db = client.db(dbName);
        const collection = db.collection(col);
        collection.updateOne(condition, query, function (err, docs) {
            err ? reject(err) : resolve(docs);
        })
        client.close();
    })
}

module.exports = {
    find,
    insert,
    del,
    update
}