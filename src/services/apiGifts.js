export function giftPropose(SetState) {
    fetch(`http://localhost:3003/gift-propose`)
    .then( response => response.json() )
    .then( data => SetState(data) )
    .catch( error => console.log(error) )   
}

export function giftGetAll(SetState) {
    fetch(`http://localhost:3003/getall`)
    .then( response => response.json() )
    .then( data => SetState(data) )
    .catch( error => console.log(error) )   
}

export function giftPutItem(item, setGiftCollection) {
    fetch(`http://localhost:3003/edit`, {
        method: "PUT",
        body: JSON.stringify(item),
        headers: {"Content-type": "application/json; charset=UTF-8"}
    })
    .then( response => console.log(response.status) )
    .then( () => giftGetAll(setGiftCollection))
    .catch( error => console.log(error) )   
}

export function giftDeleteItem(id, setGiftCollection) {
    fetch(`http://localhost:3003/${id}`, {
        method: "DELETE",
    })
    .then( response => console.log(response.status) )
    .then( () => giftGetAll(setGiftCollection))
    .catch( error => console.log(error) )   
}

export function giftDeleteAll(setGiftCollection) {
    fetch(`http://localhost:3003/deleteall`, {
        method: "DELETE",
    })
    .then( response => console.log(response.status) )
    .then( () => giftGetAll(setGiftCollection))
    .catch( error => console.log(error) )   
}

export function giftPostItem(item, setGiftCollection) {
    fetch(`http://localhost:3003/new`, {
        method: "POST",
        body: JSON.stringify(item),
        headers: {"Content-type": "application/json; charset=UTF-8"}
    })
    .then( response => console.log(response.status) )
    .then( () => giftGetAll(setGiftCollection))
    .catch( error => console.log(error) )   
}