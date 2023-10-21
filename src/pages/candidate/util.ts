export const GRAPHQL_API = {
   SAVE: `
    query($queryName: String!, $payload: String!)
    {
        graphqlClient{
            save(
                requestForm: {
                    apiName: $queryName
                    payload: $payload
                }
            ){
                status {
                    code
                    message
                }
                data
            }
    
        }
    }
    `,
};
