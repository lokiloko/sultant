
function shopSuggestion (data) {
  let sugestion = {}
  let donePriority=[]
  let needPriority=[]
  let keepSugest = []
  let removeSugest = []

  data.items.forEach(item=>{
    data.priority.forEach(list=>{
      if (item.category==list){
        keepSugest.push(item.name)
        donePriority.push(list)
      }
    })
  })

  let uniqKeepSugest = Array.from(new Set(keepSugest))
  let uniqDonePriority = Array.from(new Set(donePriority))

  data.priority.forEach(list=>{
    uniqDonePriority.forEach(item=>{
      if(list!=item){
        needPriority.push(list)
      }
    })
  })

  data.items.forEach(item=>{
    uniqDonePriority.forEach(list=>{
      if(item.category!=list){
        removeSugest.push(item.name)
      }
    })
  })

  let uniqNeedPriority = Array.from(new Set(needPriority))
  let uniqRemoveSugest = Array.from(new Set(removeSugest))

  sugestion={
    done: uniqDonePriority,
    need: uniqNeedPriority,
    suggest_keep:uniqKeepSugest,
    suggest_remove: uniqRemoveSugest
  }
  return sugestion

};




module.exports = {
  shopSuggestion
}
