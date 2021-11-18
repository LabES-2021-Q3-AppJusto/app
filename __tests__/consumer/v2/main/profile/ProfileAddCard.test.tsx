import React from 'react';
import renderer from 'react-test-renderer';
// const createTestProps = (props: object) => ({
import ProfileAddCard from '../../../../../consumer/v2/main/profile/ProfileAddCard';

let props: any;

// https://reactnative.dev/docs/asyncstorage?redirected

// https://stackoverflow.com/questions/52569447/how-to-mock-react-navigations-navigation-prop-for-unit-tests-with-typescript-in

// describe('<ProfileAddCard />', () => {
//   it('has 1 child', () => {
//     const result = renderer.create(<ProfileAddCard {...props} />).toJSON();
//     // const input = result?.children.;
//     expect(result).toMatchSnapshot();
//     //console.log(result);
//   });
// });

// beforeAll(() => {
//   jest.mock('@react-native-community/async-storage');
// });

it('renders correctly', () => {
  renderer.create(<ProfileAddCard {...props} />);
  // const tree = renderer.create(<App />);
  //expect(tree).toMatchSnapshot();
});

// https://react-native-async-storage.github.io/async-storage/docs/advanced/jest/
// https://github.com/react-native-async-storage/async-storage/issues/202
