import React, {Component} from 'react';
import {Root} from 'native-base';

// import store from './src/Publics/store';
// import {Provider} from 'react-redux';
import AppContainer from './src/Route/AppNav';
// import GeneralStatusBarColor from './src/Components/StatusBar';

class App extends Component {
  render() {
    return (
      <>
        {/* <Provider store={store}> */}
        <Root>
          <AppContainer />
        </Root>
        {/* </Provider> */}
      </>
    );
  }
}
export default App;
