const chai = require('chai');
const should = chai.should()
const assert = chai.assert;
const suggestion = require('../controllers/sugestion')


describe('suggestion',function(){
  let data = {
    "items":[
      {
        "name":"tali jemuran",
        "category":"Home Improvement/Hardware/Door Hardware/Door Hinges",
        "qty": 1,
        "price": 800000
      },
      {
        "name":"tali jemuran lux",
        "category":"Home Improvement/Hardware/Door Hardware/Door Hinges",
        "qty": 1,
        "price": 80
      },
      {
        "name":"sabun",
        "category":"Personal Care/Bath & Body/Body Wash & Cleansers",
        "qty": 1,
        "price": 20000
      },
      {
        "name":"sabun",
        "category":"Personal Care/Bath & Body/Body Wash & Cleansers",
        "qty": 1,
        "price": 20000
      }
    ],
    "priority":[
      "Food/Meal Solutions, Grains & Pasta/Grains & Rice",
      "Personal Care/Bath & Body/Body Wash & Cleansers",
      "Auto & Tires/Oils and Fluids/Motor Oil"
    ]
  }
  let result= {
    "done": [
      "Personal Care/Bath & Body/Body Wash & Cleansers"
    ],
    "need": [
      "Food/Meal Solutions, Grains & Pasta/Grains & Rice",
      "Auto & Tires/Oils and Fluids/Motor Oil"
    ],
    "suggest_keep": [
      "sabun"
    ],
    "suggest_remove": [
      "tali jemuran",
      "tali jemuran lux"
    ]
  }

  it('should return done suggestion',function(){
    assert.equal(suggestion.shopSuggestion(data).done[0],result.done[0])
  })

  it('should return need suggestion',function(){
    assert.equal(suggestion.shopSuggestion(data).need[0],result.need[0])
  })

  it('should return keep suggestion',function(){
    assert.equal(suggestion.shopSuggestion(data).suggest_keep[0],result.suggest_keep[0])
  })

  it('should return remove suggestion',function(){
    assert.equal(suggestion.shopSuggestion(data).suggest_remove[0],result.suggest_remove[0])
  })


})
