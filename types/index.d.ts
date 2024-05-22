import { RadioButtonProps } from "react-native-radio-buttons-group";

export interface ILeaderboardRank {
  name: string;
  score: int;
}

export type GameState = "start" | "play" | "scored" | "finish";

interface IAnswer {
  label: string;
  id: string;
}
export interface IQuiz {
  type: string;
  difficulty: string;
  category: string;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
  allAnswers: IAnswer[];
}

export interface IErrorList {
  errorName: string;
  errorSelectAllAnswer: string;
}
