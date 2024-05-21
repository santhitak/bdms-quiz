import Ionicons from "@expo/vector-icons/Ionicons";
import { StyleSheet, Image, Platform, View } from "react-native";

import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { ILeaderboardRank } from "@/types";
import { RankBar } from "@/components/leaderboard/RankBar";
import { styles } from "@/styles/common";

const mockData: ILeaderboardRank[] = [
  {
    name: "Sarah",
    score: 30,
  },
  {
    name: "Edward",
    score: 53,
  },
  {
    name: "Emma",
    score: 12,
  },
];

interface Props {
  userData: ILeaderboardRank[];
}

export default function LeaderboardScreen({ userData }: Props) {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#f7f5bc", dark: "#f7f5bc" }}
      headerImage={
        <Ionicons
          size={310}
          name="trophy-outline"
          style={styles.headerLeaderboard}
        />
      }
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Leaderboard</ThemedText>
      </ThemedView>
      <ThemedText>Correct more quiz to move up your rank!</ThemedText>
      {userData && (
        <ThemedView>
          {mockData.map((dataItem: ILeaderboardRank, i) => (
            <RankBar key={i} name={dataItem.name} score={dataItem.score} />
          ))}
        </ThemedView>
      )}

      {!userData && (
        <ThemedView>
          <ThemedText>No player data, back to play a game</ThemedText>
        </ThemedView>
      )}
    </ParallaxScrollView>
  );
}
