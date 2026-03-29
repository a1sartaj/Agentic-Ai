export const format = (resultObj) => {

    console.log('resultObj : ', resultObj)

    return { finalResponse: `AI Assistant : ${resultObj.result}` }
}