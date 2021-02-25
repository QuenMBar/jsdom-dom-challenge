document.addEventListener("DOMContentLoaded", () => {
    let counter = document.getElementById("counter");
    let pauseButton = document.getElementById("pause");
    let minusButton = document.getElementById("minus");
    let plusButton = document.getElementById("plus");
    let heartButton = document.getElementById("heart");
    let heartList = document.querySelector(".likes");
    let commentForm = document.getElementById("comment-form");
    let commentList = document.getElementById("list");
    let heartArray = new Map();
    let paused = false;
    let timer;

    function startTimer() {
        timer = setInterval(() => {
            counter.innerHTML++;
        }, 1000);
    }

    startTimer();

    pauseButton.addEventListener("click", (e) => {
        if (paused === false) {
            clearInterval(timer);
            e.target.innerHTML = "resume";
            minusButton.disabled = true;
            plusButton.disabled = true;
            heartButton.disabled = true;
            paused = !paused;
        } else {
            startTimer();
            e.target.innerHTML = "pause";
            minusButton.disabled = false;
            plusButton.disabled = false;
            heartButton.disabled = false;
            paused = !paused;
        }
    });

    minusButton.addEventListener("click", (e) => {
        counter.innerHTML--;
    });
    plusButton.addEventListener("click", (e) => {
        counter.innerHTML++;
    });

    heartButton.addEventListener("click", (e) => {
        // If it has the key
        if (heartArray.has(counter.innerHTML)) {
            let valueToInc = heartArray.get(counter.innerHTML);
            valueToInc++;
            heartArray.set(counter.innerHTML, valueToInc);
        } else {
            // If it doesnt
            heartArray.set(counter.innerHTML, 1);
        }
        // console.log(heartArray);
        heartList.innerHTML = "";
        heartArray.forEach((value, key) => {
            let newItem = document.createElement("li");
            newItem.append(`${key} has been liked ${value} time`);
            heartList.appendChild(newItem);
        });
    });

    commentForm.addEventListener("submit", (e) => {
        e.preventDefault();
        let newComment = document.createElement("li");
        if (e.target.comment.value !== "") {
            newComment.innerHTML = e.target.comment.value;
            e.target.comment.value = "";
            commentList.append(newComment);
        }
    });
});
