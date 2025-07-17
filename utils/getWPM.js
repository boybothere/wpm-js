export function getWPM(lengthOfSubmission, acc){
    return Math.round((lengthOfSubmission / 5) * (acc /100))
}
