


const saleController = async (imports,data) => {
  const { quantity, subItems } = data

  let qty = quantity
  let subs = subItems
  let sum = subItems.map(m => m.quantity).reduce((a,b) => a+b)


  for(let i in imports){
    if(qty === 0 && sum === 0){
      break;
    }
    // Quantity exporting from imports
    if(qty > 0){
      if(imports[i].quantity >= qty){
        imports[i].quantity -= qty
        imports[i].exports += qty
        qty = 0
      }else{
        qty = qty - imports[i].quantity
        const q = imports[i].quantity
        imports[i].quantity = 0
        imports[i].exports = imports[i].exports + q
      }
    }
    // SubQuantity exporting from subImports
    if(sum > 0){
      imports[i].subItems = imports[i].subItems.map(j => {
        const fx = subs.find(k => k.item == j.item )
        if(fx){
          if(j.quantity > fx.quantity){
            j.quantity = j.quantity - fx.quantity
            j.exports += fx.quantity
            sum -= fx.quantity
            fx.quantity = 0
          }else{
            fx.quantity = fx.quantity - j.quantity
            sum -= j.quantity
            const q = j.quantity
            j.quantity = 0
            j.exports += q
          }
        }
        return j
      })
    }

    const result = await imports[i].save()
  }


}

module.exports = saleController
