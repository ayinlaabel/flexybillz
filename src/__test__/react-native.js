// __mocks__/react-native.js

import mockComponent from './mockComponent'; // Create a mockComponent.js file

// Mocking TouchableOpacity
jest.mock('react-native/Libraries/Components/Touchable/TouchableOpacity', () => mockComponent('TouchableOpacity'));

// Mocking ScrollView
jest.mock('react-native/Libraries/Components/ScrollView/ScrollView', () => mockComponent('ScrollView'));
