import { Button, SafeAreaView, TextInput } from "react-native";

import { HelloWave } from "@/components/HelloWave";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { styles } from "@/styles/common";
import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import RenderHtml from "react-native-render-html";
import { GameState, ILeaderboardRank, IQuiz } from "@/types";
import { ScrollView, TouchableHighlight } from "react-native-gesture-handler";

function RandomQuiz() {
  const [data, setData] = useState<IQuiz[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://opentdb.com/api.php?amount=4&category=17&difficulty=easy&type=multiple"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const json = await response.json();
        setData(json.results);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <ScrollView>
      {isLoading ? (
        <ThemedText>Loading...</ThemedText>
      ) : (
        <ThemedView>
          {data.map((item: IQuiz, i) => (
            <ThemedView key={i}>
              <RenderHtml source={{ html: item.question }} />
            </ThemedView>
          ))}
        </ThemedView>
      )}
    </ScrollView>
  );
}

export default function HomeScreen() {
  const [gameState, setGameState] = useState<GameState>("start");
  const [userState, setUserState] = useState<ILeaderboardRank>({
    name: "",
    score: 0,
  });

  const handleNameChange = (name: string) => {
    setUserState((prevState) => ({
      ...prevState,
      name: name,
    }));
  };

  const handleScoreChange = (score: number) => {
    setUserState((prevState) => ({
      ...prevState,
      score: score,
    }));
  };

  const handleNext = () => {
    switch (gameState) {
      case "start":
        setGameState("play");
        break;
      case "play":
        setGameState("scored");
        break;
    }
  };

  const handleBack = () => {
    switch (gameState) {
      case "play":
        setGameState("start");
        break;
    }
  };

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
      headerImage={
        <Ionicons
          size={310}
          name="game-controller-outline"
          style={styles.headerMain}
        />
      }
    >
      <ThemedView style={styles.stepContainer}>
        {gameState === "start" && (
          <ThemedView>
            <ThemedView style={styles.titleContainer}>
              <ThemedText type="title">Welcome to quiz app!</ThemedText>
              <HelloWave />
            </ThemedView>
            <ThemedView>
              <ThemedText type="subtitle">Enter your name</ThemedText>
              <SafeAreaView>
                <TextInput
                  style={styles.textInput}
                  onChangeText={handleNameChange}
                  value={userState.name}
                />
              </SafeAreaView>
            </ThemedView>
          </ThemedView>
        )}
        {gameState === "play" && (
          <ThemedView>
            <ThemedText type="subtitle">
              Choose wisely for each question
            </ThemedText>
            <ScrollView>
              <RandomQuiz />
            </ScrollView>
          </ThemedView>
        )}
      </ThemedView>

      <ThemedView style={styles.flexContainerJustifyBetween}>
        {gameState !== "start" && gameState !== "scored" && (
          <TouchableHighlight onPress={handleBack}>
            <ThemedView style={styles.flexContainer}>
              <Ionicons size={20} name="arrow-back-outline" />
              <ThemedText>Back</ThemedText>
            </ThemedView>
          </TouchableHighlight>
        )}

        {gameState !== "scored" && (
          <TouchableHighlight onPress={handleNext}>
            <ThemedView style={styles.flexContainer}>
              <ThemedText>Next</ThemedText>
              <Ionicons size={20} name="arrow-forward-outline" />
            </ThemedView>
          </TouchableHighlight>
        )}

        {gameState === "finish" && (
          <TouchableHighlight onPress={handleBack}>
            <ThemedView style={styles.flexContainer}>
              <ThemedText>Visit Leaderboard</ThemedText>
            </ThemedView>
          </TouchableHighlight>
        )}
      </ThemedView>
    </ParallaxScrollView>
  );
}
