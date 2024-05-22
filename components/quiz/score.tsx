import { styles } from "@/styles/common";
import React from "react";
import { ThemedText } from "../ThemedText";
import { ThemedView } from "../ThemedView";

interface Props {
  score: number;
}

export default function GameScore({ score }: Props) {
  return (
    <ThemedView
      style={
        (styles.paddingVerticalContainer, styles.flexContainerVerticalScore)
      }
    >
      <ThemedText style={{ fontSize: 20, fontWeight: 600 }}>
        You scored
      </ThemedText>
      <ThemedText style={{ fontSize: 180, fontWeight: 800 }}>
        {score}
      </ThemedText>
      <ThemedText style={{ fontSize: 20, fontWeight: 600 }}>
        out of 4
      </ThemedText>
    </ThemedView>
  );
}
