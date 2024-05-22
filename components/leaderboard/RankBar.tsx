import { ILeaderboardRank } from "@/types";
import { ThemedText } from "../ThemedText";
import { styles } from "@/styles/common";
import { ThemedView } from "../ThemedView";

export function RankBar({ name, score }: ILeaderboardRank) {
  return (
    <ThemedView style={(styles.rankListItem, styles.rankListItem)}>
      <ThemedText>{name}</ThemedText>
      <ThemedText>{score}</ThemedText>
    </ThemedView>
  );
}
