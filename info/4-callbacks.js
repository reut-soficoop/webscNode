
/** NOT ASYNC CALLBACK: */
setTimeout(() => {
    console.log('Two seconds are up')
}, 2000)

const names = ['Andrew', 'Jen', 'Jess']
const shortNames = names.filter((name) => {
    return name.length <= 4
})
/** */






/** ASYNC CALLBACK - not working cause there is no return statement directly inside the geocode, there is a return statement inside the nested function */
// const geocode = (address, callback) => {
//     setTimeout(() => {
//         const data = {
//             latitude: 0,
//             longitude: 0
//         }
//         return data
//     }, 2000)
// }



// const data = geocode('Philadelphia') 
// console.log('data', data)
/** */


/** ASYNC CALLBACK: gets the value back to the code that needs it. */
const geocode = (address, callback) => {
    console.log(callback)
    setTimeout(() => {
        const data = {
            latitude: 0,
            longitude: 0
        }
        callback(true)
    }, 2000)
}

const callbackFunction = (data) => {
    console.log("data", data) // {latitude: 0, longitude: 0}
}

geocode('Philadelphia', callbackFunction)

/** */

/** CHAINING ASYNC CALLBACK */

// const geocode = (address, callback) => {
//     setTimeout(() => {
//         const data = {
//             latitude: 0,
//             longitude: 0
//         }
//         callback(data)
//     }, 2000)
// }

// geocode('Philadelphia', (data) => {
//     console.log(data) // {latitude: 0, longitude: 0}
//     geocode(data.latitude, (data2) => {
//         console.log(data2)
//         geocode(data2.latitude, (data3) => {
//             console.log(data3)
//         })
//     })
// })

/** */


/** ASYNC CALLBACK - WORKING WITH ERRORS */
const geocode = (address, callback) => {
    setTimeout(() => {
        const data = {
            latitude: 0,
            longitude: 0
        }
        // callback(new Error('data not found!'))
        callback(undefined, data)
    }, 2000)
}

geocode('Philadelphia', (error, data) => {
    if (error) {
        return console.error("error")
    }
    console.log(data) 
    geocode(data.latitude, () => console.log(data))
})

/** */
