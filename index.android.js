/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import TabNavigator from 'react-native-tab-navigator';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Button,
  Image,
  TouchableOpacity,
  Dimensions,
  AsyncStorage,
  BackHandler,
  ToastAndroid,
} from 'react-native';
import {
  StackNavigator,
} from 'react-navigation';

import PlanManage from './PlanManage';
import PlanCategory from './PlanCategory';
import RecentPlan from './RecentPlan';
import ShowPlan from './ShowPlan';
import ShowChildPlan from './ShowChildPlan';
import ShowYearChildPlan from './ShowYearChildPlan';
import ShowMonthPlanDetail from './ShowMonthPlanDetail';
import TimeLine from './TimeLine';



var w=Dimensions.get('window').width;
var h=Dimensions.get('window').height;  //获得屏幕的宽高



export default class HomeScreen extends Component {
  constructor(props) {  
    super(props); 
     this.state = {
      selectedTab:'Browse',
    };   
  }  

static navigationOptions = {
     header:null
  };


 

  render() {
    return (
  <View style={{flex: 1}}>
        <TabNavigator   Style={styles.tab} >

            <TabNavigator.Item
            selected={this.state.selectedTab === 'Browse'}
            title="浏览"
            renderIcon={() => <Image source={require('./assets/1.png')} style={styles.iconStyle}/>}
            renderSelectedIcon={() => <Image source={require('./assets/12.png')} style={styles.iconStyle}/>}
            badgeText=""
            onPress={() => this.setState({ selectedTab: 'Browse' })}>    
            <RecentPlan {...this.props}  />
            </TabNavigator.Item>


            
            <TabNavigator.Item                    
            selected={this.state.selectedTab === 'Search'}
            title="计划管理"
            renderIcon={() => <Image source={require('./assets/2.png')} style={styles.iconStyle}/>}
            renderSelectedIcon={() => <Image source={require('./assets/22.png')}  style={styles.iconStyle}/>}            
            onPress={() => this.setState({ selectedTab: 'Search' })}>     
            <PlanManage {...this.props}  />            
            </TabNavigator.Item>
 
             <TabNavigator.Item                    
            selected={this.state.selectedTab === 'Time'}
            title="日志"
            renderIcon={() => <Image source={require('./assets/3.png')} style={styles.iconStyle}/>}
            renderSelectedIcon={() => <Image source={require('./assets/32.png')}  style={styles.iconStyle}/>}            
            onPress={() => this.setState({ selectedTab: 'Time' })}>     
            <TimeLine {...this.props}  />            
            </TabNavigator.Item>
 
          </TabNavigator>
      </View>
    );
  }
}


 

 


const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    position:'absolute',
    width:w,
    bottom:0,
    
  },
  icon: {
    width: 26,
    height: 26,
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  tab: {
        height: 100,
        backgroundColor: '#eee',
        alignItems: 'center'
    },
    iconStyle:{                  //底部tab导航栏样式
       width:26,
       height:26,
   },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

const todoAPP = StackNavigator({
  HomeScreen: { screen: HomeScreen },
  PlanManage: { screen: PlanManage },
  PlanCategory: { screen: PlanCategory },
  RecentPlan: { screen: RecentPlan },
  ShowPlan: { screen: ShowPlan },
  ShowChildPlan: { screen: ShowChildPlan },
  ShowYearChildPlan: { screen: ShowYearChildPlan },
  ShowMonthPlanDetail: { screen: ShowMonthPlanDetail },
  
});

AppRegistry.registerComponent('todoAPP', () => todoAPP);

