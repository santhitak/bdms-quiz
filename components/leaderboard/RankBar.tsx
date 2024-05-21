import { ILeaderboardRank } from "@/types";
import { View } from "react-native";
import { ThemedText } from "../ThemedText";
import { styles } from "@/styles/common";
import { ThemedView } from "../ThemedView";

export function RankBar({ name, score, ...rest }: ILeaderboardRank) {
  return (
    <ThemedView style={(styles.rankListItem, styles.rankListItem)}>
      <ThemedText>{name}</ThemedText>
      <ThemedText>{score}</ThemedText>
    </ThemedView>
  );
}
