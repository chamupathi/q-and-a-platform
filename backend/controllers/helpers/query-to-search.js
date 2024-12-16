// This function make sure that only the allowed keys are passed through
// TODO: add Yup validation for this
const queryToSearch = (query) => {

    const search = [];

    Object.keys(query).forEach(k => {
        switch(k) {
            case 'searchText': {
                search.push({ type:'text', field: 'question', term: query[k]})
                search.push({ type:'text', field: 'answer', term: query[k]})
                search.push({ type:'text', field: 'description', term: query[k]})
                break;
            }
            case 'assignee' : {
                search.push({ type:'text', field: 'assignee', term: query[k]})
                break;
            }
            case 'question' : {
                search.push({ type:'text', field: 'question', term: query[k]})
                break;
            }
            case 'answer' : {
                search.push({ type:'text', field: 'answer', term: query[k]})
                break;
            }
            case 'tags' : {
                const terms = query[k].split(',');
                terms.forEach(t => {
                    search.push({ type:'array', field: 'tags_list', term: t});
                })
                break;
            }
            case 'property_key' : {
                search.push({ type:'array', field: 'property_key', term: query[k]})
                break;
            }
            case 'property_value' : {
                search.push({ type:'array', field: 'property_value', term: query[k]})
                break;
            }
        }
    }) 

    return search;
}

module.exports = queryToSearch;