const base = require("./airtable-base");

const DEFAULT_SIZE = 10;
class AirtableStore {

    constructor(tableName) {
        this.tableName = tableName;
    }

    create(data) {
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

    getAll(_search = [], size = DEFAULT_SIZE) {
        return new Promise((resolve, reject) => {
            const d = [];

            // const _search = [{term: 'some text', field: 'question' }]
            const searchText = _search?.map(f => {

                switch (f.type) {
                    case 'array':
                        return `SEARCH(UPPER("${f.term}"), UPPER(ARRAYJOIN({${f.field}}, ",")))`
                    case 'text':
                    default:
                        return `SEARCH(UPPER("${f.term}"), UPPER({${f.field}}))`
                }

            }).join(", ");
            const formula = `OR(${searchText})`

            const selectProperties = {
                view: "Grid view",
                maxRecords: size
            };

            if (Array.isArray(_search) && _search.length > 0) {
                selectProperties.filterByFormula = formula
            }

            base(this.tableName).select({
                ...selectProperties,
            }).eachPage(function page(records, fetchNextPage) {
                // This function (`page`) will get called for each page of records.

                records.forEach(function (record, i) {
                    // console.log('Retrieved',i, record.get('Question Text'));
                    d.push({ ...record.fields, id: record.id })
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
        try {
            const res = await base(this.tableName).find(id)

            return await new Promise(resolve => {
                resolve(res._rawJson)
            })
        } catch (error) {
            console.error(error)
        }

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