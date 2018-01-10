import {replaceVueWithDiv} from "./Helper";

// FIXME #9 fix any param
export const injectResult = (id: string, players: any[]) => {
    // FIXME #8 create vue component instead?

    replaceVueWithDiv();
    const resultDiv = document.getElementById(id);

    if (resultDiv) {
        players.forEach((p) => {
            let textDiv = document.createElement("p");
            textDiv.innerText = "Player: '" + p.name + "':";
            resultDiv.appendChild(textDiv);

            textDiv = document.createElement("p");
            textDiv.innerText = "Points: " + p.points;
            resultDiv.appendChild(textDiv);

            textDiv = document.createElement("p");
            textDiv.innerText = "Correct answers: ";

            p.correctAnswers.forEach((q: any) => {
                const answerDiv = document.createElement("div");
                answerDiv.innerText = q.text;
                textDiv.appendChild(answerDiv);

            });
            resultDiv.appendChild(textDiv);

            textDiv = document.createElement("p");
            textDiv.innerText = "Wrong answers: ";

            p.wrongAnswers.forEach((q: any) => {
                const answerDiv = document.createElement("div");
                console.log(q.answers);
                const correctAnswer = q.answers.find((a: any) => a.id == q.correctAnswer).text;
                answerDiv.innerText = q.text + " (Correct answer: " + correctAnswer + ")";
                textDiv.appendChild(answerDiv);
            });
            resultDiv.appendChild(textDiv);
        });
    }
};
