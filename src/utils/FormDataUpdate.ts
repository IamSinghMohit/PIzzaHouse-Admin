export function FormDataUpdate(data:Record<string,any>,func:(d:FormData) => void){
    const form = new FormData()
    for(let key in data){
        form.append(key,data[key])
    }
    func(form)
}