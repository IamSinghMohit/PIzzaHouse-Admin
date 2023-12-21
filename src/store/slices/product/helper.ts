export function calculateProductPrice(state:any) {
    let price = 0;
    for (let key in state.default_prices) {
        const id = state.default_prices[key].id;
        const val = parseInt(state.product_price_section_attribute[id].value);
        if (val >= 0) price += val;
    }
    return price
}
