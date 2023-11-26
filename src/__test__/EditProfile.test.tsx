import React from "react";
import renderer from "react-test-renderer";
import EditProfile from "../screens/profile/edit-profile/EditProfile";

describe("<EditProfile />", () => {
  it("EditProfile component renders correctly", () => {
    const tree = renderer.create(<EditProfile />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
