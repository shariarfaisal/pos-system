
class Validator{
  constructor(data){
    this.data = data
    this.error = {}
  }

  objectId(name){
    if(!this.data[name]) this.error[name] = `${name[0].toUpperCase()+name.slice(1)} ID is required!`
    else if(!mongoose.Types.ObjectId.isValid(this.data[name])) this.error[name] = `${name[0].toUpperCase()+name.slice(1)} ID isn't valid!`
  }

  checkErrors(obj){
  // Name validation ...
    if(obj['name']){
      if(!this.data.name) this.error.name = "Name required!"
      else{
        if(obj.name['min']){
          if(obj.name.min > this.data.name.length){
            this.error.name = `Name must be at least ${obj.name.min} character!`
          }
        }
        if('max' in obj.name){
          if(obj.name.max < this.data.name.length){
            this.error.name = `Name must be in ${obj.name.max} character!`
          }
        }
      }
    }

    // Email validation ...
    if('email' in obj){
      if(!this.data.email) this.error.email = "Email required!"
      else if(!vldr.isEmail(this.data.email)) this.error.email = "Email is not valid!"
    }

    // Username validation ...
    if(obj['username']){
      if(!this.data.username) this.error.username = "Username required!"
      else{
        if(obj.username['max']){
          if(obj.username.max < this.data.username.length){
            this.error.username = `Username must be in ${obj.username.max} character!`
          }
        }
        if(obj.username['min']){
          if(obj.username.min > this.data.username.length){
            this.error.username = `Username must be at least ${obj.name.min} character!`
          }
        }
      }
    }

    // Phone validation ...
    if(obj['phone']){
      if(!this.data.phone) this.error.phone = "Phone number reqired!"
      else if(this.data.phone.length > 25) this.error.phone = "Invalid phone number!"
    }

    // Password validation ...
    if('password' in obj){
      if(!this.data.password) this.error.password = "Password required!"
      else{
        if(obj.password['min']){
          if(obj.password.min > this.data.password.length){
            this.error.password = `Password must be at least ${obj.password.min} character!`
          }
        }
        if(obj.password['max']){
          if(obj.password.max < this.data.password.length){
            this.error.password = `Password must be in ${obj.password.max} character!`
          }
        }
      }
    }

// Object Id validation ...
    if(obj['ids']){
      obj['ids'].forEach(i => {
        this.objectId(i)
      })
    }

    return this.error
  }
// Ended error method ...



}

var a = Date.now()
const validator = new Validator({name: 'Faisal',email: 'faisalgmail.com',phone: '01822531439',type: '098sfjgsfsf9f8ff',password:'12345'})

const x = validator.checkErrors({name:{min:10,max:25},email:{},phone:{},password:{min:6,max:10},ids:['type','user']})

console.log(x);
