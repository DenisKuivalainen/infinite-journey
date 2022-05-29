import fs from "fs"

const envs = Object.fromEntries(
    fs.readFileSync(`${__filename.split("/dist/")[0]}/.env`).toString().split(/\n/).map((l: string) => {
        const [name, ...rest] = l.split("=")
        const data = rest.join("=")
    
        return [name, data]
    })
)

export default (key: string) => envs[key]