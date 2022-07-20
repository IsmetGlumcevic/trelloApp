import React from "react";
import { View, Dimensions, SafeAreaView } from "react-native";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";

export default function LoaderBoards() {
    return (
        <View style={{ margin: 15 }}>
            {Array.from({ length: 10 }).map((_, index) => (
                <View key={index} style={{ marginBottom: 12, backgroundColor: '#eee' }}>
                    <SkeletonPlaceholder>
                        <SkeletonPlaceholder.Item flexDirection="row"
                            alignItems={'center'}
                        >
                            <SkeletonPlaceholder.Item width={80} height={80} borderRadius={4} />
                            <SkeletonPlaceholder.Item
                                flex={1}
                                justifyContent={'space-between'}
                                marginLeft={16}
                            >
                                <SkeletonPlaceholder.Item
                                    width="50%"
                                    height={20}
                                    borderRadius={4}
                                />
                            </SkeletonPlaceholder.Item>
                        </SkeletonPlaceholder.Item>
                    </SkeletonPlaceholder>
                </View>))}
        </View>

    )
};