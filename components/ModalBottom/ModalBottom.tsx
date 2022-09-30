import React, { Dispatch, SetStateAction } from "react";
import { SafeAreaView, TouchableWithoutFeedback, View } from "react-native";
import Modal from "react-native-modal";

export const ModalBottom: React.FC<{
  children: JSX.Element;
  isModalVisible: boolean;
  setModalIsVisible: Dispatch<SetStateAction<boolean>>;
  showSwipeBar?: boolean;
  height?: number | string;
  backgroundColor?: string;
}> = ({
  children,
  isModalVisible,
  setModalIsVisible,
  showSwipeBar = false,
  height,
  backgroundColor,
}) => {
  const borderTopRadius = 16;

  return (
    <View>
      <Modal
        style={{ margin: 0, justifyContent: "flex-end", marginTop: 16 }}
        isVisible={isModalVisible}
        swipeDirection="down"
        onSwipeComplete={() => setModalIsVisible(false)}
        avoidKeyboard
        onBackdropPress={() => setModalIsVisible(false)}
        scrollOffset={10}
        propagateSwipe
      >
        <SafeAreaView
          style={{
            backgroundColor: backgroundColor ?? "#FFF",
            borderTopRightRadius: borderTopRadius,
            borderTopLeftRadius: borderTopRadius,
            height: height ?? "auto",
          }}
        >
          <TouchableWithoutFeedback onPress={() => setModalIsVisible(false)}>
            <View
              style={{
                display: showSwipeBar ? undefined : "none",
                height: 50,
                width: 40,
                marginTop: -16,
                backgroundColor: "#EDF1F2",
                alignSelf: "center",
                borderRadius: 16,
              }}
            />
          </TouchableWithoutFeedback>
          {children}
        </SafeAreaView>
      </Modal>
    </View>
  );
};
