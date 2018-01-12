interface GameState {
    action: string;
    players: Player[];
    currentQuestion?: Question;
    currentQuestionTime?: number;
    helpText: string;
    errorMessage: string;
}
