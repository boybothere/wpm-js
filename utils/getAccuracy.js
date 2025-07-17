export function getAccuracy(msg, submission){
    let i = 0, j = 0, correct = 0;
    while(i<msg.length && j<submission.length) {
        if(msg[i] === submission[j]) correct++;
        i++;j++;
    }
    let acc = correct/msg.length;
    
    return Math.round(acc*100);
}