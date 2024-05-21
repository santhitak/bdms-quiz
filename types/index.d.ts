export interface ILeaderboardRank {
  name: string;
  score: int;
}

export type GameState = "start" | "play" | "scored" | "finish";

export interface IQuiz {
  type: string;
  difficulty: string;
  category: string;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
}
