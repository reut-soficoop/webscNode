const doWorkCallback = (callback) => {
  setTimeout(() => {
      callback('This is my error!', undefined)
      callback(undefined, [1, 4, 7])
      callback(undefined, [1, 2, 7])
      callback(undefined, [1, 4, 4])
      callback(undefined, [1, 4, 2])
  }, 2000)
}

doWorkCallback(
  (error, result) => {
  if (error) {
      return console.log("error:", error)
  }
  console.log(result)
})