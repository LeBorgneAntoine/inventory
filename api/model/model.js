function setter(data, attribute, newValue, notifyFunc, object){
    let oldValue = data[attribute];
    data[attribute] = newValue;
    if(notifyFunc)notifyFunc({
        attribute,
        oldValue,
        newValue,
        object
    })
}

let listeners = []

function modelListener(func){
    listeners.push(func)
}

function notify(sharedValue){
    for (const func of listeners) func(sharedValue)
}


module.exports = {
    setter,
    modelListener,
    notify
}