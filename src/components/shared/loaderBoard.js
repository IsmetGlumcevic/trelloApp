import React from "react";
import { View, Dimensions, SafeAreaView } from "react-native";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";

export default function LoaderBoard() {
    return (
        <View style={{ margin: 10, padding: 20 }}>
            {Array.from({ length: 1 }).map((_, index) => (
                <View key={index} style={{ marginBottom: 12, height: 350, borderRadius: 16 }}>
                    <SkeletonPlaceholder
                        backgroundColor={'#fff'}
                    >
                        <SkeletonPlaceholder.Item
                            flexDirection="column"
                            alignItems={'center'}
                            backgroundColor={'#fff'}
                            width="50%"
                        >
                            <SkeletonPlaceholder.Item
                                width="50%"
                                height={30}
                                borderRadius={4}
                                backgroundColor={'#fff'}
                            />
                        
                        </SkeletonPlaceholder.Item>
                        <SkeletonPlaceholder.Item
                            flexDirection="column"
                            alignItems={'center'}
                            backgroundColor={'#fff'}
                            marginTop={20}
                            width="80%"

                        >
                            <SkeletonPlaceholder.Item
                                width="50%"
                                height={40}
                                borderRadius={4}
                                backgroundColor={'#fff'}
                            />
                        
                        </SkeletonPlaceholder.Item>
                        <SkeletonPlaceholder.Item
                            flexDirection="column"
                            alignItems={'center'}
                            backgroundColor={'#fff'}
                            marginTop={20}
                            width="80%"

                        >
                            <SkeletonPlaceholder.Item
                                width="50%"
                                height={40}
                                borderRadius={4}
                                backgroundColor={'#fff'}
                            />
                        
                        </SkeletonPlaceholder.Item>
                        <SkeletonPlaceholder.Item
                            flexDirection="column"
                            alignItems={'center'}
                            backgroundColor={'#fff'}
                            marginTop={20}
                            width="80%"

                        >
                            <SkeletonPlaceholder.Item
                                width="50%"
                                height={40}
                                borderRadius={4}
                                backgroundColor={'#fff'}
                            />
                        
                        </SkeletonPlaceholder.Item>
                        <SkeletonPlaceholder.Item
                            flexDirection="column"
                            alignItems={'center'}
                            backgroundColor={'#fff'}
                            marginTop={20}
                            width="80%"

                        >
                            <SkeletonPlaceholder.Item
                                width="50%"
                                height={40}
                                borderRadius={4}
                                backgroundColor={'#fff'}
                            />
                        
                        </SkeletonPlaceholder.Item>
                    </SkeletonPlaceholder>
                </View>))}
        </View>

    )
};