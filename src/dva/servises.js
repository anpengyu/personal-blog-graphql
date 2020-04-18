let client = null;
export function setClient(propsClient){
    client = propsClient
}

export async function mutateRquest(api, params, mutate) {
    try {
        let data = await mutate({
            mutation: api,
            variables: {
                ...params
            }
        })
        return data;
    } catch (e) {
        return false;
    }
}

/**
 * 
 * @param {*} api 添加方法的目标
 * @param {*} params 参数
 * @param {*} mutate 添加
 * @param {*} refetch 添加成功后刷新
 */
export async function mutateRquestRefetch(api, params, refetch){
    console.log('client',client)
    try {
        let data =  client.mutate({
            mutation: api,
            variables: {
                ...params
            },
            refetchQueries: [{ query: refetch }]
        })
        return true;
    } catch (e) {
        return false;
    }
}