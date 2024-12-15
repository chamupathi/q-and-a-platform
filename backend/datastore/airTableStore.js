const base = require("./airtablebase");

class AirtableStore {

    constructor(tableName) {
        this.tableName = tableName;
    }

    create(data) {
        console.log('store create', data)
        return new Promise(async (resolve, reject) => {
            const res = await base(this.tableName).create([{
                "fields": {
                    ...data
                }
            }]).catch(err => {
                console.log(err)
                reject(err)
            })

            resolve(res[0]._rawJson)
        })
        
    }

    getAll() {
        return new Promise((resolve, reject) => {
            const d = []
            base(this.tableName).select({
                view: "Grid view",
            }).eachPage(function page(records, fetchNextPage) {
                // This function (`page`) will get called for each page of records.
            
                records.forEach(function (record, i) {
                    // console.log('Retrieved',i, record.get('Question Text'));
                    d.push({...record.fields, id: record.id})
                    // console.log('Retrieved',i, record.get('Tags'));
                });
            
                // To fetch the next page of records, call `fetchNextPage`.
                // If there are more records, `page` will get called again.
                // If there are no more records, `done` will get called.
                fetchNextPage();
            
            }, function done(err) {
                if (err) { 
                    console.error(err); 
                    reject(err); 
                    return;
                }
                resolve(d)
            });
        })
    }

    async get(id) {
        const res = await base(this.tableName).find(id)

        return await new Promise(resolve => {
            resolve(res._rawJson)
        })
    }

    async update(id, data) {
        const res = await base(this.tableName).update([{
            id,
            "fields": {
                ...data
            }
        }])

        return await new Promise(resolve => {
            resolve(res[0]._rawJson)
        })
    }

    async delete(id) {
        const res = await base(this.tableName).destroy([id])

        return await new Promise(resolve => {
            resolve(res)
        })
    }
    
}


module.exports = AirtableStore