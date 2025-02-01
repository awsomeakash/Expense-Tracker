import { StyleSheet, View, TouchableOpacity, Image } from "react-native";
import React from "react";
import Typo from "@/components/Typo";
import ScreenWrapper from "@/components/ScreenWrapper";
import { colors, spacingX, spacingY } from "@/constants/theme";
import { verticalScale } from "@/utils/styling";
import Button from "@/components/Button";
import Animated, { FadeIn } from "react-native-reanimated";

const Welcome = () => {
    return (
        <ScreenWrapper>
            <View style={styles.container}>
                {/*Login Button & Image*/}
                <View>
                    <TouchableOpacity style={styles.loginButton}>
                        <Typo fontWeight={"500"}>Sign In</Typo>
                    </TouchableOpacity>

                    <Animated.Image
                        entering={FadeIn.duration(2000)}
                        source={require("../../assets/images/welcome.png")}
                        style={styles.welcomeImage}
                        resizeMode="contain"
                    />
                </View>

                <Image
                    source={require("../../assets/images/welcome.png")}
                    style={styles.welcomeImage}
                    resizeMode="contain"
                />
            </View>
            {/*footer */}
            <View style={styles.footer}>
                <Animated.View
                    entering={FadeIn.duration(3000).springify().damping(12)}
                    style={{ alignItems: "center" }}
                >
                    <Typo size={30} fontWeight={"800"}>
                        Always take control
                    </Typo>
                    <Typo size={30} fontWeight={"800"}>
                        of your finances
                    </Typo>
                </Animated.View>
                <Animated.View
                    entering={FadeIn.duration(3000).springify().damping(12)}
                    style={{ alignItems: "center", gap: 2 }}
                >
                    <Typo size={17} color={colors.textLight}>
                        By the creator of Simplified Thoughts
                    </Typo>
                    <Typo size={17} color={colors.textLight}>
                        for my babe Swareena 😘😍
                    </Typo>
                </Animated.View>

                <View style={styles.buttonContainer}>
                    <Button>
                        <Typo
                            size={22}
                            color={colors.neutral900}
                            fontWeight={"800"}
                        >
                            Get Started
                        </Typo>
                    </Button>
                </View>
            </View>
        </ScreenWrapper>
    );
};

export default Welcome;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "space-between",
        paddingTop: spacingY._7,
    },
    welcomeImage: {
        width: "100%",
        height: verticalScale(300),
        alignSelf: "center",
        marginTop: verticalScale(100),
        marginBottom: verticalScale(200),
    },
    loginButton: {
        alignSelf: "flex-end",
        marginRight: spacingX._20,
    },
    footer: {
        backgroundColor: colors.neutral900,
        alignItems: "center",
        paddingTop: verticalScale(30),
        paddingBottom: verticalScale(45),
        gap: spacingY._20,
        shadowColor: "white",
        shadowOffset: { width: 0, height: -10 },
        elevation: 10,
        shadowRadius: 25,
        shadowOpacity: 0.15,
    },
    buttonContainer: {
        width: "100%",
        paddingHorizontal: spacingX._25,
    },
});
