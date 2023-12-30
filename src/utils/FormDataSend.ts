export function FormDataSend(
    data: Record<string, any>,
    func: (d: FormData) => void,
    extraArgs?: Record<string, string>,
) {
    const form = new FormData();
    for (let key in data) {
        form.append(key, data[key]);
    }
    const obj: any = {};
    if (extraArgs) {
        for (let key in extraArgs) {
            obj[key] = extraArgs[key];
        }
    }
    func(extraArgs ? { data: form, ...obj } : form);
}

