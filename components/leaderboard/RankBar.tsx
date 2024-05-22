import { IUserState } from "@/types";
import { ThemedText } from "../ThemedText";
import { styles } from "@/styles/common";
import { ThemedView } from "../ThemedView";

export function RankBar({ name, score }: IUserState) {
  return (
    <ThemedView style={(styles.rankListItem, styles.rankListItem)}>
      <ThemedText>{name}</ThemedText>
      <ThemedText>{score}</ThemedText>
    </ThemedView>
  );
}
