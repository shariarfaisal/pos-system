

const imports = [
  {
    quantity: 10,
    subItems:[{item: 2,quantity: 10,exports: 2},{item: 4,quantity: 30,exports: 0},{item: 5,quantity: 20,exports: 5},]
  },
  {
    quantity: 6,
    subItems:[{item: 1,quantity: 14,exports: 1},{item: 2,quantity: 15,exports: 5},{item: 4,quantity: 20,exports: 0},]
  },
  {
    quantity: 0,
    subItems:[{item: 5,quantity: 3,exports: 2},{item: 2,quantity: 10,exports: 10},{item: 3,quantity: 20,exports: 0},]
  },
]

const d = Date.now()
const {quantity,subItems } = {quantity: 25,subItems:[{item:2,quantity: 22},{item:3,quantity: 15},{item:4,quantity: 35}]}


let h = quantity
let subs = subItems
let sum = subItems.map(m => m.quantity).reduce((a,b) => a+b)

for(let i in imports){
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

}

console.log(JSON.stringify(imports));
console.log(Date.now() - d);
