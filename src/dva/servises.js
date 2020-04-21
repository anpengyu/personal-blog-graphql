let client = null;
export function setClient(propsClient) {
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
        return null;
    }
}

/**
 * 
 * @param {*添加方法的目标} api 
 * @param {*参数} params 
 * @param {*添加成功后刷新} refetch 
 */
export async function mutateRquestRefetch(api, params, refetch) {
    console.log('params....', params)
    try {
        await client.mutate({
            mutation: api,
            variables: {
                ...params
            },
            refetchQueries: refetch
        })
        return true;
    } catch (e) {
        return null;
    }
}

/**
 * 
 * @param {*添加方法的目标} api 
 * @param {*参数} params 
 * @param {*添加成功后刷新} refetch 
 */
export async function mutateRquestRefetchVariables(api, params, refetch, refetchVariables) {
    console.log('client', client)
    try {
        let data = client.mutate({
            mutation: api,
            variables: {
                ...params
            },
            refetchQueries: [{ query: refetch, variables: { ...refetchVariables } }]
        })
        return true;
    } catch (e) {
        return null;
    }
}

export async function query(api, params) {
    try {
        const result = await client.query({
            query: api,
            variables: {
                ...params
            },
        });
        console.log('result', result.data)
        return result.data;
    } catch (e) {
        return null;
    }

}