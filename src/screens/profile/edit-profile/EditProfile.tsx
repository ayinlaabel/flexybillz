import React, { useState } from "react";
import { TouchableOpacity, ScrollView } from "react-native";
import {
  Container,
  ImageTag,
  Paragraph,
} from "@utils/shared/styled-components";
import { colors } from "@utils/index";
import { backIcon, countryIcon } from "@assets/icons";
import { SafeAreaView } from "react-native-safe-area-context";
import Octicons from "react-native-vector-icons/Octicons";
import Feather from "react-native-vector-icons/Feather";
import { images } from "@assets/images";
import DefaultInput from "@components/input/DefaultInput";
import { SCREEN_HEIGHT } from "@constants/index";
import { SoildButton } from "@components/button";
import { useSelector } from "react-redux";
import { selectToken, selectUser } from "@redux/index";
import { useFormik } from "formik";
import * as ImagePicker from "expo-image-picker";
import {
  updateUserProfile,
  updateUserProfilePhoto,
} from "@networking/getQuery";
import { useToast } from "react-native-toast-notifications";
import { useNavigation } from "@react-navigation/core";
import { StackNavigationProp } from "@react-navigation/stack";
import { AppStackParamsList } from "@navigation/app-navigation/appRoutes";

const EditProfile = () => {
  const [image, setImage] = useState<any>();
  const [uploadImage, setUploadImage] = useState<any>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { replace, goBack } =
    useNavigation<StackNavigationProp<AppStackParamsList>>();

  const handleGoBack = () => {
    goBack();
  };

  const token = useSelector(selectToken);

  const handleUploadImage = async () => {
    const { status } = await ImagePicker.getMediaLibraryPermissionsAsync();
    switch (status) {
      case "undetermined":
        const { status: newStatus } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (newStatus === "granted") {
          let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 4],
            quality: 1,
          });

          if (!result.canceled) {
            setImage(result.assets[0].uri);
            setUploadImage(result.assets[0]);
          }
        }
        break;
      case "granted":
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [4, 4],
          quality: 1,
        });
        if (!result.canceled) {
          setImage(result.assets[0].uri);
          setUploadImage(result.assets[0]);
        }
        break;
      case "denied":
        const { status: deniedStatus } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (deniedStatus === "granted") {
          let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 4],
            quality: 1,
          });
          if (!result.canceled) {
            setImage(result.assets[0].uri);
            setUploadImage(result.assets[0]);
          }
        }
        break;

      default:
        break;
    }
    console.log(status);
  };

  const user = useSelector(selectUser);
  const toast = useToast();
  const formik = useFormik({
    initialValues: {
      userName: user.userName,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      phoneNumber: user.phoneNumber,
      address: user.address,
      gender: user.gender,
      state: user.state,
    },
    onSubmit: async (values) => {
      const photoFile = uploadImage;

      setIsLoading(true);
      const { data } = await updateUserProfile(values, photoFile, token);

      if (!data.success) {
        toast.show(data.message, { type: "custom_danger" });
        setIsLoading(false);
      } else {
        toast.show(data.message, { type: "custom_success" });
        setIsLoading(false);
        replace("Dashboard");
      }
    },
  });

  // useEffect(() => {
  //   const clearImageCache = async () => {
  //     // await CacheManager.clearCache();
  //     // Force a re-render to reflect the changes
  //     // You might need to refresh the state or re-fetch the data
  //   };

  //   clearImageCache();
  // }, []);
  return (
    <Container>
      <SafeAreaView />

      <Container
        position="absolute"
        width="100%"
        top="0"
        background={colors.brandColor}
        height={300}
      />
      <Container
        flexDirection="row"
        justify="space-between"
        items="center"
        pr="20px"
        pl="20px"
        pt="20px"
        pb="20px"
      >
        <TouchableOpacity onPress={handleGoBack}>
          <Octicons name="arrow-left" color={colors.whiteColor} size={30} />
        </TouchableOpacity>
        <Paragraph
          size="18px"
          fontFamily="PoppinMedium"
          color={colors.whiteColor}
        >
          Edit Profile
        </Paragraph>
        <Container width={40} height={20}>
          {/* <ImageTag source={countryIcon} resizeMode="contain" /> */}
        </Container>
      </Container>
      <Container
        items="center"
        width="100%"
        height="100%"
        background={colors.whiteColor}
        rightTopRadius="20px"
        leftTopRadius="20px"
        pt="20px"
        pb="20px"
      >
        <Container pb="20px" background={colors.whiteColor}>
          <Container
            height={100}
            width={90}
            rightBottomRadius="100"
            rightTopRadius="100"
            leftBottomRadius="100"
            leftTopRadius="100"
          >
            <Container
              height={100}
              width={90}
              rightBottomRadius="100"
              rightTopRadius="100"
              leftBottomRadius="100"
              leftTopRadius="100"
              overflow="hidden"
            >
              <ImageTag
                source={
                  image
                    ? { uri: image, cache: "only-if-cached" }
                    : user.photoFile
                    ? images.avatar
                    : { uri: user.photoUrl, cache: "only-if-cached" }
                }
              />
            </Container>

            <TouchableOpacity activeOpacity={0.9} onPress={handleUploadImage}>
              <Container
                height={40}
                width={37}
                rightBottomRadius="100"
                rightTopRadius="100"
                leftBottomRadius="100"
                leftTopRadius="100"
                background={colors.brandColor}
                position="absolute"
                bottom="0"
                right="0"
                items="center"
                justify="center"
                border="2px"
                borderColor={colors.whiteColor}
              >
                <Feather name="camera" size={15} color={colors.whiteColor} />
              </Container>
            </TouchableOpacity>
          </Container>
        </Container>
        <ScrollView>
          <Container
            height={JSON.stringify(SCREEN_HEIGHT)}
            pr="20px"
            pl="20px"
            mb="180px"
            mt="50px"
            gap="20"
          >
            <Container>
              <Paragraph>Username</Paragraph>
              <DefaultInput
                height={55}
                px="10px"
                defaultValue={formik.values.userName}
                rightBottomRadius="10px"
                rightTopRadius="10px"
                leftTopRadius="10px"
                leftBottomRadius="10px"
                props={{ editable: false }}
              />
            </Container>
            <Container>
              <Paragraph>First Name</Paragraph>
              <DefaultInput
                height={55}
                defaultValue={formik.values.firstName}
                px="10px"
                rightBottomRadius="10px"
                rightTopRadius="10px"
                leftTopRadius="10px"
                leftBottomRadius="10px"
                onChangeText={formik.handleChange("firstName")}
              />
            </Container>
            <Container>
              <Paragraph>Last Name</Paragraph>
              <DefaultInput
                height={55}
                px="10px"
                defaultValue={formik.values.lastName}
                rightBottomRadius="10px"
                rightTopRadius="10px"
                leftTopRadius="10px"
                leftBottomRadius="10px"
                onChangeText={formik.handleChange("lastName")}
              />
            </Container>
            <Container>
              <Paragraph>Email</Paragraph>
              <Container flexDirection="row">
                <DefaultInput
                  height={55}
                  px="10px"
                  defaultValue={formik.values.email}
                  rightBottomRadius="10px"
                  rightTopRadius="10px"
                  leftTopRadius="10px"
                  leftBottomRadius="10px"
                  props={{ editable: false }}
                />
                <Container
                  height="100%"
                  position="absolute"
                  right="20"
                  items="center"
                  justify="center"
                >
                  {user.isVerifiedEmail ? (
                    <Paragraph
                      size="12px"
                      color={colors.successColor50}
                      fontFamily="PoppinBold"
                    >
                      Verified
                    </Paragraph>
                  ) : (
                    <Paragraph
                      size="12px"
                      color={colors.dangerColor50}
                      fontFamily="PoppinBold"
                    >
                      not verify
                    </Paragraph>
                  )}
                </Container>
              </Container>
            </Container>
            <Container>
              <Paragraph>Phone Number</Paragraph>
              <Container>
                <DefaultInput
                  height={55}
                  px="10px"
                  defaultValue={"+234" + formik.values.phoneNumber}
                  rightBottomRadius="10px"
                  rightTopRadius="10px"
                  leftTopRadius="10px"
                  leftBottomRadius="10px"
                  props={{ editable: false }}
                />
                <Container
                  height="100%"
                  position="absolute"
                  right="20"
                  items="center"
                  justify="center"
                >
                  {user.isVerifiedPhone ? (
                    <Paragraph
                      size="12px"
                      color={colors.successColor50}
                      fontFamily="PoppinBold"
                    >
                      Verified
                    </Paragraph>
                  ) : (
                    <Paragraph
                      size="12px"
                      color={colors.dangerColor50}
                      fontFamily="PoppinBold"
                    >
                      not verify
                    </Paragraph>
                  )}
                </Container>
              </Container>
            </Container>
            <Container>
              <Paragraph>Address</Paragraph>
              <DefaultInput
                height={55}
                px="10px"
                defaultValue={formik.values.address}
                rightBottomRadius="10px"
                rightTopRadius="10px"
                leftTopRadius="10px"
                leftBottomRadius="10px"
                onChangeText={formik.handleChange("address")}
              />
            </Container>
            <Container>
              <Paragraph>State</Paragraph>
              <DefaultInput
                height={55}
                px="10px"
                defaultValue={formik.values.state}
                rightBottomRadius="10px"
                rightTopRadius="10px"
                leftTopRadius="10px"
                leftBottomRadius="10px"
                onChangeText={formik.handleChange("state")}
              />
            </Container>
            <Container>
              <Paragraph>Gender</Paragraph>
              <DefaultInput
                height={55}
                px="10px"
                defaultValue={formik.values.gender}
                rightBottomRadius="10px"
                rightTopRadius="10px"
                leftTopRadius="10px"
                leftBottomRadius="10px"
              />
            </Container>
            <Container width="100%">
              <SoildButton
                items="center"
                justify="center"
                height={60}
                size="16px"
                fontFamily="PoppinMedium"
                color={colors.whiteColor}
                rightBottomRadius="10px"
                rightTopRadius="10px"
                leftBottomRadius="10px"
                leftTopRadius="10px"
                background={colors.brandColor}
                onPress={formik.handleSubmit}
                isLoading={isLoading}
              >
                Update
              </SoildButton>
            </Container>
          </Container>
        </ScrollView>
      </Container>
    </Container>
  );
};

export default EditProfile;
