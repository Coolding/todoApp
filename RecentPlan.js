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
  ScrollView
} from 'react-native';
 

var w=Dimensions.get('window').width;
var h=Dimensions.get('window').height;  //获得屏幕的宽高
var PlanItem=[];
var PlanCount=0
var LeftColor=['#7CBEFD','#BEB3F7','#95C550']

export default class RecentPlan extends Component {
  constructor(props) {  
    super(props); 
     this.state = {
    }; 
  }  

 static navigationOptions = {
     header:null
  };

componentWillMount() {
      this.update()
  }
 

 update=()=>{
      let url="http://todoapp.applinzi.com/oiuqerjlauvlznwtruo/ShowRecentPlanDetail/";
      let formData=new FormData();        
      fetch(url,{method:"GET",headers:{}}).then(response => response.json())
      .then(data =>{          
      PlanItem=data.slice(0,6);   //最多只显示三条近期计划，以利于集中火力！
      PlanCount=data.length
      this.forceUpdate();
      })
 }
 
 
  render() {
    return (
     
       <View  style={styles.container}>  
            <View style={styles.header}>  
                  <Text style={styles.leftitle}>    </Text>
                  <Text style={styles.headtitle}>近期计划</Text> 
                   <TouchableOpacity   
                    style={{alignSelf:'center',}}            
                    onPress={()=>this.update()}>
                          <Text style={styles.leftitle}>刷新  </Text> 
                    </TouchableOpacity>
            </View>  
            <Text style={{alignSelf: 'center',fontSize: 17,marginBottom:10}}>显示{PlanCount}条计划中的{Math.min(PlanCount,3)}条</Text> 
         <ScrollView>
             {
                PlanItem.map(
                      (Item,index)=>{ 
                           
                          return(
                                <View key={index} style={{backgroundColor:'white',flexDirection:'row', justifyContent: 'flex-start', alignItems: 'center',  width:0.88*w,height:60,marginLeft:0.06*w,marginBottom:0.06*w,borderTopRightRadius:5,borderBottomRightRadius:5,}}>
                                    <View style={{backgroundColor:LeftColor[index % 3],borderTopLeftRadius:5,borderBottomLeftRadius:5,width:10,height:60}}></View>
                                    <TouchableOpacity 
                                        style={{flexDirection: 'column',justifyContent: 'center',alignItems:'flex-start',width:0.85*w,height:70}}
                                         onPress={()=>this.props.navigation.navigate('RecordPlanExeInfo',{ID:Item['ID'],ChildID:Item['ChildID']})}>
                                        <Text style={{width:0.8*w,marginLeft:8,lineHeight:22,}}>{Item['Plan']}：{Item['ChildPlan']}</Text>
                                        <Text style={{width:0.8*w,marginLeft:8,lineHeight:22,}}>截止：{!Item['ChildID']?Item['expectCompleteTime'].substring(0,10):Item['ChildExpectCompleteTime'].substring(0,10)}</Text>
                                    </TouchableOpacity>
                                    
                                </View>  
                          )
                      }
                )
            }
            </ScrollView>
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
    justifyContent: 'space-between', 
    width:w,
    marginBottom:w*0.06,
}, 
 
headtitle: { 
    textAlign:'center',
    alignSelf: 'center', 
    fontSize: 20, 
    color: '#FFFFFF', 
}, leftitle: { 
    alignSelf: 'center', 
    fontSize: 20, 
    color: '#ffffff', 
}, 
});

