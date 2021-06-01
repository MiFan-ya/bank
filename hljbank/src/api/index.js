import fetch from '../api/request.js'
export function getlikedata(params){
    return fetch({
        url:'http://www.watch.com/index.php/index/frontgoods/gesslikedetail',
        params:params,
    })
}