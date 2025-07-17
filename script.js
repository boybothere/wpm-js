import {getAccuracy} from './utils/getAccuracy.js'
import {getWPM} from './utils/getWPM.js'

let msg = "", startTimer = false, timerId, bestWPM = Number(localStorage.getItem("bestWPM")) || 0;

window.addEventListener('load', () => {
    document.getElementById("retryBtn").disabled = true
    document.getElementById("newQuote").addEventListener('click', reload)
    reload()
    document.getElementById("retryBtn").addEventListener('click', () => {
        document.getElementById("inputBox").disabled = false;
        document.getElementById("inputBox").value = ""
        document.getElementById("wpm").innerHTML = "WPM: Will be displayed here"
        document.getElementById("accuracy").innerHTML = "Accuracy: Will be displayed here"
        document.getElementById("timer-line").innerHTML = 'Time in seconds: <strong id="timer">60</strong>';
    })


    document.getElementById("inputBox").addEventListener('keydown', (e) => {
        let inputMaxLength = msg.length
        const allowedKeys = ["Backspace", "ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"]
        if(inputBox.value.length > inputMaxLength && !allowedKeys.includes(e.key)) {
            document.getElementById("exceedMsg").style.display = "block"
            e.preventDefault()
            return;
        }else{
            document.getElementById("exceedMsg").style.display = "none"
        }
    })

    document.getElementById("inputBox").addEventListener('input', () => {
    let count = 60;
    if(!startTimer){
        startTimer = true;
        timerId = setInterval(()=>{
        --count;
        console.log(count)
        document.getElementById("timer").textContent = count;
        if(count === 0) {
            clearInterval(timerId)
            document.getElementById("inputBox").disabled = true 
            document.getElementById("timer-line").textContent = "Time's Up!"
            document.getElementById("retryBtn").disabled = false;
            let submission = document.getElementById("inputBox").value
            console.log("Original Text:", msg);
            console.log("User Typed:", document.getElementById("inputBox").value);
            let accuracyInPercent = getAccuracy(msg, submission)
            document.getElementById("accuracy").innerHTML = `Accuracy: ${accuracyInPercent} %`
            let wpmScore = getWPM(submission.length, accuracyInPercent)
            document.getElementById("wpm").innerHTML = `WPM: ${wpmScore}`
            if(wpmScore > bestWPM){
                bestWPM = wpmScore
                localStorage.setItem("bestWPM", bestWPM )
                document.getElementById("bestScore").innerHTML = `Best Score : ${bestWPM}`
            }else{
                document.getElementById("bestScore").innerHTML = `Best Score : ${bestWPM}`
            }
        }
        }, 1000)
    } 
    })
})

function reload() {
    fetch('paragraphs.json')
    .then(res => res.json())
    .then(data => {
        msg = data.paras[Math.floor(Math.random() * 5)]
        document.getElementById("quote").textContent = msg
        document.getElementById("inputBox").disabled = false
        document.getElementById("inputBox").value = ""
        document.getElementById("bestScore").innerHTML = `Best Score : ${bestWPM}`
        if(startTimer) {
            clearInterval(timerId)
            startTimer = false;
        }   
    })
    .catch(err => {
        console.error(err.message)
    })
}
