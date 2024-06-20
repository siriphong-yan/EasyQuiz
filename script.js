let answerResultList = [];
const answerList = [
    {
        question: 1,
        answerValue: "a",
        answerText: "ถูกต้อง PIM ย่อมาจาก PIM"
    },
    {
        question: 2,
        answerValue: "c",
        answerText: "ถูกต้อง Gosoft อยู่ในเครือบริษัท CPALL"
    }
];

myObject.onmessage = function(event) {
    // prints "Got it!" when we receive the app's response.
    console.log(event.data);
    const resutlTitle = document.getElementById(`result-title`);
    resutlTitle.textContent = `title frow webView : ${event.data}`;
}
myObject.postMessage("I'm ready!");

myObject.addEventListener('load', listener);

function listener(event){
    const resutlTitle = document.getElementById(`result-body`);
    resutlTitle.textContent = `ftabeck`;
}

function checkAnswer(e, answer, numOfQues) {
    const buttonSelected = e.parentElement.querySelectorAll('.button-selected');
    if(buttonSelected.length){
        for(let element of buttonSelected){
            element.classList.remove('button-selected'); 
        } 
    }
    e.classList.add('button-selected');

    const indexOfAnswerResult = answerResultList.findIndex(i=>i['question'] === numOfQues);
    if(indexOfAnswerResult >= 0){
        answerResultList.splice(indexOfAnswerResult, 1);
    }

    answerResultList.push({ answer: answer, question: numOfQues });

    const sendAnswerButton = document.getElementById('sendAnswerButton');
    if(answerResultList.length == 2){
        sendAnswerButton.removeAttribute('disabled');
    }else{
        sendAnswerButton.setAttribute('disabled', true);
    }
 }

 function sendAnswer(){
    let resultScore = 0;
    let resultTitle = "";
    for(let item of answerResultList){
        const answer = answerList.find(i=>i['question'] === item['question'] && i['answerValue'] === item['answer']);
        const result = document.getElementById(`result${item['question']}`);
        if(answer != null){
            if(result != null){
                result.style.color = 'green';
                result.textContent = answer['answerText'];
            }
            ++resultScore;
        }else{
            if(result != null){
                result.style.color = 'red';
                result.textContent = "!!ข้อนี้คุณตอบผิด เอาใหม่น่ะ สู้ๆ";
            }
        }
    }

    const resulSummary = document.getElementById("result-summary");
    const summary = document.getElementById("summary");
    switch(resultScore){
        case 2:
            resultTitle = "สุดยอดเลย!!";
            resulSummary.style.color = 'green';
            break;
        case 1:
            resultTitle = "โอเคพอได้!!";
            resulSummary.style.color = 'green';
            break;
        case 0:
            resultTitle = "สู้ต่อไปน่ะ!!";
            resulSummary.style.color = 'red';
            break;
    }
    resulSummary.innerHTML = `${resultTitle} <br>คุณตอบถูก ${resultScore} ข้อ`;
    summary.classList.add('show');

    const sendAnswer = document.getElementById("sendAnswer");
    sendAnswer.classList.add('hide');

    const resetForm = document.getElementById("reset-form");
    resetForm.classList.add('show');

    const buttonUnSelectedList = document.querySelectorAll('.quiz-card .button:not(.button-selected)');
    for(let buttonUnSelected of buttonUnSelectedList){
        buttonUnSelected.setAttribute('disabled', true);
    }
 }

 function resetForm(){
    const buttonUnSelectedList = document.querySelectorAll('.quiz-card .button:not(.button-selected)');
    for(let buttonUnSelected of buttonUnSelectedList){
        buttonUnSelected.removeAttribute('disabled');
    }

    sendAnswerButton.setAttribute('disabled', true);

    answerResultList = [];

    const buttonSelected = document.querySelectorAll('.button-selected');
    if(buttonSelected.length){
        for(let element of buttonSelected){
            element.classList.remove('button-selected'); 
        } 
    }

    const resulSummary = document.getElementById("result-summary");
    resulSummary.removeAttribute('style');
    resulSummary.innerHTML = "";

    const summary = document.getElementById("summary");
    summary.classList.remove('show');

    const sendAnswer = document.getElementById("sendAnswer");
    sendAnswer.classList.remove('hide');

    const resetForm = document.getElementById("reset-form");
    resetForm.classList.remove('show');

    for(let answerItem of answerList){
        const result = document.getElementById(`result${answerItem['question']}`);
        if(result != null){
            result.removeAttribute("style");
            result.textContent = "";
        }
    }
 }


 