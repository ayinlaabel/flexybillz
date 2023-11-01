import React from "react";
import { Dimensions, TouchableOpacity } from "react-native";
import {
  Container,
  ImageContainer,
  ImageTag,
  Paragraph,
} from "../../../utils/shared/styled-components";
import Carousel, { Pagination } from "react-native-snap-carousel";
import { carouselItems } from "./data";
import { CarouselItemsProps } from "./interface";
import { colors } from "../../../utils";
import { SoildButton } from "../../button";
import { useNavigation } from "@react-navigation/core";
import { StackNavigationProp } from "@react-navigation/stack";
import { AppStackParamsList } from "../../../navigation/app-navigation/appRoutes";
interface Props {
  item: CarouselItemsProps;
  index: any;
}
const GetStartedCarousel = () => {
  const [index, setIndex] = React.useState(0);
  let isCarousel = React.useRef(null);

  const { navigate } = useNavigation<StackNavigationProp<AppStackParamsList>>();

  const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } =
    Dimensions.get("window");

  const renderCarouselItem = ({ item }: any) => {
    return (
      <Container px="10px" width={JSON.stringify(SCREEN_WIDTH)} items="center">
        <Container width="82%" my="30px">
          <Paragraph
            size="26px"
            textAlign="center"
            fontFamily={"PoppinBold"}
            color={colors.brandColor}
          >
            {item.title}
          </Paragraph>
        </Container>
        <ImageContainer height={300}>
          <ImageTag source={item.image} resizeMode="contain" />
        </ImageContainer>
        <Container width={"89%"} mt="40px">
          <Paragraph size="13px" textAlign="center">
            {item.desc}
          </Paragraph>
        </Container>
      </Container>
    );
  };
  return (
    <Container
      height={JSON.stringify(SCREEN_HEIGHT)}
      background={colors.whiteColor}
    >
      <Carousel
        layout={"default"}
        layoutCardOffset={9}
        ref={isCarousel}
        data={carouselItems}
        renderItem={renderCarouselItem}
        sliderWidth={SCREEN_WIDTH}
        sliderHeight={200}
        itemWidth={SCREEN_WIDTH}
        itemHeight={200}
        autoplay
        loop={true}
        decelerationRate={9}
        autoplayDelay={3000}
        autoplayInterval={3000}
        inactiveSlideShift={0}
        onSnapToItem={(index: any) => setIndex(index)}
      />
      <Container position="absolute" left="0" right="0" bottom="25">
        <Pagination
          dotsLength={carouselItems.length}
          activeDotIndex={index}
          carouselRef={isCarousel}
          dotStyle={{
            width: 10,
            height: 10,
            borderRadius: 5,
            marginHorizontal: 0,
            backgroundColor: colors.brandColor,
            marginBottom: 0,
            padding: 0,
            marginTop: 90,
          }}
          inactiveDotOpacity={0.4}
          inactiveDotScale={0.6}
          tappableDots={true}
        />
        <Container px="20px">
          <SoildButton
            background={colors.brandColor}
            height={60}
            onPress={() => {}}
            items="center"
            justify="center"
            size="18px"
            color={colors.whiteColor}
            rightBottomRadius="22px"
            rightTopRadius="22px"
            leftBottomRadius="22px"
            leftTopRadius="22px"
          >
            Create a new account
          </SoildButton>
          <Container flexDirection="row" mt="6px" justify="center">
            <Paragraph fontFamily="PoppinSemiBold">
              Already have an account?
            </Paragraph>
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={() => navigate("Login")}
            >
              <Paragraph
                color={colors.brandColor}
                ml="5px"
                fontFamily="PoppinSemiBold"
              >
                Sign in
              </Paragraph>
            </TouchableOpacity>
          </Container>
        </Container>
      </Container>
    </Container>
  );
};

export default GetStartedCarousel;
