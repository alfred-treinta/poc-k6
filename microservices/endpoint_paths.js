export const PATHS = {
    STORES: {
        CREATE_PRODUCT: '/product/create'
    },
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
