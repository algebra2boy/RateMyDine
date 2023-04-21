import { reviewDB } from "./server.js";

async function createDoc(info){
    try{
        console.log(info);
        let res = await reviewDB.put({
            _id: info.DiningName,
            Reviews: info.Reviews,
        })
        return JSON.stringify(res);
    }
    catch (e){
        console.error(e);
    }
}
async function getDoc(info){
    try{
        console.log(info);
        let res = await reviewDB.get(info)
        console.log(JSON.stringify(res));
        console.log(res);
        return JSON.stringify(res);
    }
    catch (e){
        console.error(e);
    }
}
async function updateDoc(info){
    
}
async function deleteDoc(info){
    
}

export {
    createDoc,
    getDoc
}