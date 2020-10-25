export const initialState = {
    basket: [],
};

// Selector
export const getBasketTotal = (basket) => 
    basket?.reduce((amount, item) => item.price + amount, 0);


const reducer = (state, action) => {
    // console.log(action);
    switch(action.type) {
        case 'ADD_TO_BASKET':
            return {
                ...state,
                basket: [...state.basket, action.item]
            }
        
        case 'REMOVE_FROM_BASKET':
            /*
                Pega o indice atual de qual foi clicado ID
                coloca state atual em outra var
                se existir indice, vai cortar o array daquele item que foi selecionado
                    e criar um novo tipo de array sem aquele item
                caso não exista mais o id, exception
                
            */
            const index = state.basket.findIndex(
                (basketItem) => basketItem.id === action.id
            );

            let newBasket = [...state.basket];

            if (index >= 0) {
                newBasket.splice(index, 1);
            } else {
                console.warn(
                    `Cant remove product (id: ${action.id}) as its not in basket!`
                )
            }

            return {
                ...state,
                basket: newBasket
            }
        
        default:
            return state;
    }
};

export default reducer;