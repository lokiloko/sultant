exports.shopSuggestion = function shopSuggestion (req,res) {
  if(req.body.priority==undefined || req.body.items==undefined ){
    res.status(400).json({message:'Please ensure your data has object Items and Priority'})
  }else{
    let sugestion = {}
    let donePriority=[]
    let needPriority=[]
    let keepSugest = []
    let removeSugest = []

    req.body.items.forEach(item=>{
      if(req.body.priority.indexOf(item.category)>-1){
        keepSugest.push(item.name)
        donePriority.push(item.category)
      }else{
        removeSugest.push(item.name)
      }
    })

    req.body.priority.forEach(must=>{
      if(donePriority.indexOf(must)==-1){
        needPriority.push(must)
      }
    })

    let uniqKeepSugest = Array.from(new Set(keepSugest))
    let uniqDonePriority = Array.from(new Set(donePriority))

    let uniqNeedPriority = Array.from(new Set(needPriority))
    let uniqRemoveSugest = Array.from(new Set(removeSugest))

    sugestion={
      done: uniqDonePriority,
      need: uniqNeedPriority,
      suggest_keep:uniqKeepSugest,
      suggest_remove: uniqRemoveSugest
    }
    res.status(200).json(sugestion)
  }


};
