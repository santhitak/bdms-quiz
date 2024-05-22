import { styles } from "@/styles/common";
import { GameState, IErrorList, IQuiz } from "@/types";
import React, { useState, useEffect, useMemo } from "react";
import { ScrollView } from "react-native";
import { RadioGroup } from "react-native-radio-buttons-group";
import { ThemedText } from "../ThemedText";
import { ThemedView } from "../ThemedView";
import RenderHtml from "react-native-render-html";
import { TouchableHighlight } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";

interface Props {
  setScore: (score: number) => void;
  setGameState: (state: GameState) => void;
  setError: (error: IErrorList) => void;
  error: IErrorList;
}

const RandomQuiz: React.FC<Props> = ({
  setScore,
  setGameState,
  setError,
  error,
}) => {
  const [data, setData] = useState<IQuiz[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedAnswers, setSelectedAnswers] = useState<{
    [key: number]: string;
  }>({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://opentdb.com/api.php?amount=4&category=17&difficulty=easy&type=multiple"
        );
        if (!response.ok) throw new Error("Failed to fetch data");

        const json = await response.json();
        setData(json.results);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const processedData = useMemo(() => {
    return data.map((item: IQuiz) => {
      const allAnswers = [...item.incorrect_answers, item.correct_answer].map(
        (answer: string) => ({
          id: answer,
          label: answer,
          selected: false,
        })
      );
      return { ...item, allAnswers };
    });
  }, [data]);

  const handleAnswerSelect = (questionIndex: number, selectedValue: string) => {
    setSelectedAnswers((prevState) => ({
      ...prevState,
      [questionIndex]: selectedValue,
    }));
  };

  const handleSubmit = () => {
    const allAnswered = processedData.every((item, index) =>
      selectedAnswers.hasOwnProperty(index)
    );

    if (allAnswered) {
      setError({ ...error, errorSelectAllAnswer: "" });
    } else {
      setError({
        ...error,
        errorSelectAllAnswer: "Please answer all questions",
      });
      return;
    }

    const newScore = processedData.reduce((score, item, index) => {
      return score + (selectedAnswers[index] === item.correct_answer ? 1 : 0);
    }, 0);

    setScore(newScore);
    setGameState("scored");
  };

  return (
    <ScrollView>
      {isLoading ? (
        <ThemedText>Loading...</ThemedText>
      ) : (
        <ThemedView>
          {processedData.map((item, i) => (
            <ThemedView
              key={i}
              style={[styles.radioChoice, styles.paddingVerticalContainer]}
            >
              <ThemedView style={styles.flexContainer}>
                <RenderHtml
                  source={{ html: `${i + 1})` }}
                  baseStyle={{
                    fontSize: 16,
                    fontWeight: "600",
                    alignContent: "flex-start",
                  }}
                />
                <RenderHtml
                  source={{ html: item.question }}
                  baseStyle={{
                    fontSize: 16,
                    fontWeight: "600",
                    flexShrink: 1,
                    alignContent: "flex-start",
                    paddingVertical: 10,
                  }}
                />
              </ThemedView>
              <RadioGroup
                radioButtons={item.allAnswers.map((answer) => ({
                  ...answer,
                  selected: selectedAnswers[i] === answer.id,
                }))}
                selectedId={selectedAnswers[i]}
                containerStyle={{ alignItems: "flex-start" }}
                onPress={(answerValue: string) =>
                  handleAnswerSelect(i, answerValue)
                }
              />
            </ThemedView>
          ))}
        </ThemedView>
      )}
      {error.errorSelectAllAnswer && (
        <ThemedText style={styles.errorText}>
          {error.errorSelectAllAnswer}
        </ThemedText>
      )}
      <ThemedView style={styles.paddingVerticalContainer}>
        <TouchableHighlight onPress={handleSubmit}>
          <ThemedView style={styles.button}>
            <ThemedText>Submit</ThemedText>
            <Ionicons size={20} name="send-outline" />
          </ThemedView>
        </TouchableHighlight>
      </ThemedView>
    </ScrollView>
  );
};

export default RandomQuiz;
