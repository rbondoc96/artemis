export function fetchData(url, options=null): Promise<any> {
    return new Promise((resolve: any, reject: any) => {
        let headers = {}
        if(options && options.headers) {
            let keys = Object.keys(options.headers)

            if(keys.length === 0) {
                headers = {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                }
            } 
            else {
                if(!keys.includes("Accept") || options.headers["Accept"] != "application/json") {
                    headers = {
                        ...headers,
                        "Accept": "application/json"
                    }
                }
                
                if(!keys.includes("Content-Type") || options.headers["Content-Type"] != "application/json") {
                    headers = {
                        ...headers,
                        "Content-Type": "application/json"
                    }
                }
            }
        } 
        else {
            headers = {
                "Accept": "application/json",
                "Content-Type": "application/json"
            }
        }
        
        fetch(url, {
            ...options,
            headers
        })
        .then((response: Response) => {
            if(response.ok) {
                resolve(response)
            } else {
                reject(response)
            }
        })
    })
}