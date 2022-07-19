export const PATHS = {
    STORES: {},
    SYNC: {},
    TRANSACTIONS: {
        GET_TRANSACTION: (id) => {
            return `/transaction/${id}`
        },
        CREATE_TRANSACTION: '/transaction/create-multiple',
        UPDATE_TRANSACTION: '/transaction/update-multiple',
        DELETE_TRANSACTION: '/transaction/delete-multiple'

    }
}
