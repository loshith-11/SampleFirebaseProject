/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import RootStack from './src/navigation/RootStack';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () =>App);
