interface Question {
    id: number;
    text: string;
    points: number;
    answers: Answer[];
    correctAnswer: number;
    time: number;
}
