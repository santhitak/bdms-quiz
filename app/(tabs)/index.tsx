import { SafeAreaView, TextInput } from "react-native";
import { HelloWave } from "@/components/HelloWave";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { styles } from "@/styles/common";
import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useState, useCallback } from "react";
import { GameState, IErrorList, ILeaderboardRank } from "@/types";
import { ScrollView, TouchableHighlight } from "react-native-gesture-handler";
import RandomQuiz from "@/components/quiz/quiz";
import GameScore from "@/components/quiz/score";
import { useRouter } from "expo-router";

export default function HomeScreen() {
  const [gameState, setGameState] = useState<GameState>("start");
  const [userState, setUserState] = useState<ILeaderboardRank>({
    name: "",
    score: 0,
  });
  const [error, setError] = useState<IErrorList>({
    errorName: "",
    errorSelectAllAnswer: "",
  });
  const router = useRouter();

  useEffect(() => {
    if (gameState === "finish") {
      router.push("/leaderboard");
      setGameState("start");
    }
  }, [gameState, router]);

  const handleNameChange = useCallback((name: string) => {
    setUserState((prevState) => ({ ...prevState, name }));
  }, []);

  const handleScoreChange = useCallback((score: number) => {
    setUserState((prevState) => ({ ...prevState, score }));
  }, []);

  const handleNext = useCallback(() => {
    switch (gameState) {
      case "start":
        if (userState.name) {
          setGameState("play");
          setError((prevState) => ({ ...prevState, errorName: "" }));
        } else {
          setError((prevState) => ({
            ...prevState,
            errorName: "Please enter your name",
          }));
        }
        break;
      case "play":
        setGameState("scored");
        break;
      case "scored":
        setGameState("finish");
        break;
      default:
        break;
    }
  }, [gameState, userState.name]);

  const handleBack = useCallback(() => {
    if (gameState === "play") {
      setGameState("start");
    }
  }, [gameState]);

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
            <ThemedView style={styles.paddingVerticalContainer}>
              <ThemedText type="subtitle">Enter your name</ThemedText>
              <SafeAreaView>
                <TextInput
                  style={styles.textInput}
                  onChangeText={handleNameChange}
                  value={userState.name}
                />
              </SafeAreaView>
              {error.errorName && (
                <ThemedText style={styles.errorText}>
                  {error.errorName}
                </ThemedText>
              )}
            </ThemedView>
          </ThemedView>
        )}

        {gameState === "play" && (
          <ThemedView>
            <ThemedText type="subtitle">
              Choose wisely for each question
            </ThemedText>
            <ScrollView style={styles.paddingVerticalContainer}>
              <RandomQuiz
                setScore={handleScoreChange}
                setGameState={setGameState}
                setError={setError}
                error={error}
              />
            </ScrollView>
          </ThemedView>
        )}

        {gameState === "scored" && (
          <ThemedView>
            <GameScore score={userState.score} />
            <ThemedView style={styles.paddingVerticalContainer}>
              <TouchableHighlight onPress={handleNext}>
                <ThemedView style={styles.button}>
                  <ThemedText>View Leaderboard</ThemedText>
                </ThemedView>
              </TouchableHighlight>
            </ThemedView>
          </ThemedView>
        )}
      </ThemedView>

      <ThemedView style={styles.flexContainerJustifyBetween}>
        {gameState === "play" && (
          <TouchableHighlight onPress={handleBack}>
            <ThemedView style={styles.flexContainer}>
              <Ionicons size={20} name="arrow-back-outline" />
              <ThemedText>Back</ThemedText>
            </ThemedView>
          </TouchableHighlight>
        )}

        {gameState === "start" && (
          <TouchableHighlight onPress={handleNext}>
            <ThemedView style={styles.flexContainer}>
              <ThemedText>Next</ThemedText>
              <Ionicons size={20} name="arrow-forward-outline" />
            </ThemedView>
          </TouchableHighlight>
        )}
      </ThemedView>
    </ParallaxScrollView>
  );
}
