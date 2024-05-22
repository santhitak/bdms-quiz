import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    gap: 8,
  },
  rankListItem: {
    flexDirection: "row",
    paddingVertical: 6,
    paddingHorizontal: 10,
    justifyContent: "space-between",
    width: "100%",
    backgroundColor: "#f2f2f2",
    color: "#383838",
    borderRadius: 10,
    marginVertical: 4,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  headerImage: {
    color: "#808080",
    bottom: -90,
    left: -35,
    position: "absolute",
  },
  headerLeaderboard: {
    color: "#e69b00",
    bottom: -90,
    left: -35,
    position: "absolute",
  },
  headerMain: {
    color: "#3693b5",
    bottom: -90,
    left: -35,
    position: "absolute",
  },
  flexContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: "transparent",
  },
  flexContainerJustifyBetween: {
    flexDirection: "row",
    backgroundColor: "transparent",
    justifyContent: "space-between",
  },
  flexContainerVertical: {
    flexDirection: "column",
    justifyContent: "space-between",
    width: "100%",
    height: "100%",
    alignItems: "center",
  },
  flexContainerVerticalScore: {
    flexDirection: "column",
    justifyContent: "space-around",
    width: "100%",
    height: 400,
    alignItems: "center",
  },
  textInput: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  radioChoice: {
    display: "flex",
    alignItems: "flex-start",
    paddingVertical: 4,
  },
  errorText: {
    color: "red",
    paddingVertical: 4,
  },
  paddingVerticalContainer: {
    paddingVertical: 10,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    backgroundColor: "#90d2de",
    width: "100%",
    gap: 8,
    borderRadius: 10,
  },
});
