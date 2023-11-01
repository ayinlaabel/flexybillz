import React from "react";
import { Dimensions, TouchableOpacity } from "react-native";
import {
  Container,
  ImageContainer,
  ImageTag,
  Paragraph,
} from "../../../utils/shared/styled-components";
import { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";
import Carousel, { Pagination } from "react-native-snap-carousel";
import { carouselItems } from "./data";
import { CarouselItemsProps } from "./interface";
import { colors } from "../../../utils";
import { customFonts } from "../../../assets/fonts";
import { SoildButton } from "../../button";
import { AppStackParamsList } from "../../../navigation/app-navigation/appRoutes";
interface Props {
  item: CarouselItemsProps;
  index: any;
}
const LoginCarousel = () => {
  const [index, setIndex] = React.useState(0);
  let isCarousel = React.useRef(null);
  const { navigate } = useNavigation<StackNavigationProp<AppStackParamsList>>();

  const { width: SCREEN_WIDTH } = Dimensions.get("screen");

  const renderCarouselItem = ({ item }: any) => {
    return (
      <Container width={"100%"}>
        <ImageContainer height={250}>
          <ImageTag source={item.image} resizeMode="contain" />
        </ImageContainer>
      </Container>
    );
  };
  return (
    <Container my="20px" width={JSON.stringify(SCREEN_WIDTH)}>
      <Carousel
        layout={"default"}
        layoutCardOffset={9}
        data={carouselItems}
        renderItem={renderCarouselItem}
        ref={isCarousel}
        sliderWidth={SCREEN_WIDTH}
        sliderHeight={200}
        itemWidth={320}
        itemHeight={200}
        autoplay
        loop={true}
        lockScrollWhileSnapping={true}
        useScrollView={true}
        autoplayDelay={3000}
        autoplayInterval={3000}
        inactiveSlideShift={0}
        onSnapToItem={(index: any) => setIndex(index)}
        decelerationRate={5}
      />
      <Pagination
        dotsLength={carouselItems.length}
        activeDotIndex={index}
        carouselRef={isCarousel}
        dotStyle={{
          width: 20,
          height: 5,
          borderRadius: 5,
          marginHorizontal: 0,
          backgroundColor: colors.brandColor,
          marginBottom: 0,
        }}
        inactiveDotOpacity={0.4}
        // inactiveDotScale={0.6}
        tappableDots={true}
      />
    </Container>
  );
};

export default LoginCarousel;
