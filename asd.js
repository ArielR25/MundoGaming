const array = [{name:"hola"},{name:"asdfasdf"}, {name:"bsdf"}, {name:"zsdfsd"}, {name:"dsdfds"}]
function ordenaStrings(array){
    for (let i = 0; i < array.length; i++) {
        for (let j = i+1; j < array.length; j++) {
            console.log(array[i],"----",array[j])
            if(array[i].name.localeCompare(array[j].name) > 0){
                let aux = array[i]
                array[i] = array[j]
                array[j] = aux
            }
            
        }
    }
    return array
}

console.log(ordenaStrings(array))
