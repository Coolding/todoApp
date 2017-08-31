/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Button,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
 
//本文件作用：显示长期计划，年度计划，月度计划分类，供进一步点击查询

var w=Dimensions.get('window').width;
var h=Dimensions.get('window').height;  //获得屏幕的宽高



export default class PlanManage extends Component {
 
 static navigationOptions = {
     header:null
  };

  render() {
    return (
       <View  style={styles.container}>  
            <View style={styles.header}>  
                  <Text style={styles.headtitle}>计划管理</Text> 
            </View>  
              <View style={{backgroundColor:'white',flexDirection:'row', justifyContent: 'flex-start', alignItems: 'center',  width:0.88*w,height:60,marginLeft:0.06*w,marginBottom:0.06*w,borderTopRightRadius:5,borderBottomRightRadius:5,}}>
                        <View style={{backgroundColor:'#BEB3F7',borderTopLeftRadius:5,borderBottomLeftRadius:5,width:10,height:60}}></View>
                        <TouchableOpacity 
                            style={{flexDirection: 'row',justifyContent: 'flex-start',alignItems:'center',width:0.85*w,height:60}}
                             onPress={()=>this.props.navigation.navigate('PlanCategory',{PlanType: '远期计划'})}>
                            <Text>   远期计划</Text>
                        </TouchableOpacity>
              </View>  
              <View style={{backgroundColor:'white',flexDirection:'row', justifyContent: 'flex-start', alignItems: 'center',  width:0.88*w,height:60,marginLeft:0.06*w,marginBottom:0.06*w,borderTopRightRadius:5,borderBottomRightRadius:5,}}>
                        <View style={{backgroundColor:'#7ABFFD',borderTopLeftRadius:5,borderBottomLeftRadius:5,width:10,height:60}}></View>
                        <TouchableOpacity style={{flexDirection: 'row',justifyContent: 'flex-start',alignItems:'center',width:0.85*w,height:60}}
                            onPress={()=>this.props.navigation.navigate('PlanCategory',{PlanType: '年度计划'})}>
                            <Text>   年度计划</Text>
                        </TouchableOpacity>
              </View>  
              <View style={{backgroundColor:'white',flexDirection:'row', justifyContent: 'flex-start', alignItems: 'center',  width:0.88*w,height:60,marginLeft:0.06*w,marginBottom:0.06*w,borderTopRightRadius:5,borderBottomRightRadius:5,}}>
                        <View style={{backgroundColor:'#92C34F',borderTopLeftRadius:5,borderBottomLeftRadius:5,width:10,height:60}}></View>
                        <TouchableOpacity style={{flexDirection: 'row',justifyContent: 'flex-start',alignItems:'center',width:0.85*w,height:60}}
                            onPress={()=>this.props.navigation.navigate('ShowMonthPlanDetail')}>
                            <Text>   月度计划</Text>
                        </TouchableOpacity>
              </View>  
       </View>   
     
    );
  }
}


const styles = StyleSheet.create({
   container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    backgroundColor: '#f4f6f6',
    //marginBottom: 100,
  },
    header: { 
    flexDirection: 'row',
    height: 40, 
    backgroundColor: '#12B7F5', 
    justifyContent: 'center', 
    width:w,
    marginBottom:w*0.06,
}, 
 
headtitle: { 
    textAlign:'center',
    alignSelf: 'center', 
    fontSize: 20, 
    color: '#FFFFFF', 
}, 
});

