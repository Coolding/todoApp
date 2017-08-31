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
  ScrollView,
} from 'react-native';
 
//本文件作用：主界面点击月度计划时，不显示下面的分类，直接跳转显示每一项具体的计划任务
//因月度计划数量不多，故直接显示即可

var w=Dimensions.get('window').width;
var h=Dimensions.get('window').height;  //获得屏幕的宽高

PlanItem=[]

export default class ShowMonthPlanDetail extends Component {

  constructor(props) {  
    super(props); 
     this.state = {
        
    }; 
  }  


 
 static navigationOptions = {
     header:null
  };

  componentWillMount() {  
       
        let url="http://todoapp.applinzi.com/uqwoeirqljlzcuvoq/ShowMonthPlanDetail/";
        let formData=new FormData();        
        fetch(url,{method:"GET",headers:{}}).then(response => response.json())
        .then(data =>{          
              PlanItem=data;
              this.forceUpdate();
       })
    
}

modifyIfYearChildPlan=(index)=>{
    Item=PlanItem[index]
     if(Item['ChildPlan'] ) {   //子计划非空，则将子计划设为近期计划
        let url="http://todoapp.applinzi.com/zuoewlzhflnqcur/modifyIfRecentChildPlan/";
        let formData=new FormData();      
        formData.append("ChildID",Item['ChildID']); 
        fetch(url,{method:"POST",headers:{},body:formData}).then(response => response)
        .then(data =>{               
            Item['ifRecentChildPlan']=Math.abs(Item['ifRecentChildPlan']-1)
            this.forceUpdate();
        })
     } 
     else{   //若子计划为空，则将父计划标记为近期计划
         let url="http://todoapp.applinzi.com/zuoewlzhflnqcur/modifyIfRecentPlan/";
         let formData=new FormData();      
         formData.append("ID",Item['ID']); 
         fetch(url,{method:"POST",headers:{},body:formData}).then(response => response)
         .then(data =>{               
            Item['ifRecentPlan']=Math.abs(Item['ifRecentPlan']-1)
            this.forceUpdate();
        })
     }


  }

  render() {
    return (
        <View  style={styles.container}>  
            <View style={styles.header}>  
                  <Text style={styles.headtitle}>月度计划</Text> 
            </View>  
         <ScrollView>
             {
                PlanItem.map(
                      (Item,index)=>{ 
                          return(
                                <View key={index} style={{backgroundColor:'white',flexDirection:'row', justifyContent: 'flex-start', alignItems: 'center',  width:0.88*w,height:60,marginLeft:0.06*w,marginBottom:0.06*w,borderTopRightRadius:5,borderBottomRightRadius:5,}}>
                                    <View style={{backgroundColor:'#BEB3F7',borderTopLeftRadius:5,borderBottomLeftRadius:5,width:10,height:60}}></View>
                                    <TouchableOpacity 
                                        style={{flexDirection: 'row',justifyContent: 'flex-start',alignItems:'center',width:0.85*w,height:60}}
                                         onPress={()=>alert('ok')}>
                                        <Text style={{width:0.68*w,marginLeft:5}}>{Item['Plan']}：{Item['ChildPlan']}</Text>
                                        <TouchableOpacity 
                                           style={{backgroundColor:'#BEB3F7',justifyContent: 'center',alignItems:'center',marginLeft:5,width:30,height:30,borderRadius:5,}}
                                            onPress={()=>this.modifyIfYearChildPlan(index)}>
                                           <Text style={{color:'white',fontSize:20}}>{( ((Item['ChildPlan']) && Item['ifRecentChildPlan']==1) || (!Item['ChildPlan'] && Item['ifRecentPlan']==1)    )?"一":"+"}</Text>
                                       </TouchableOpacity>
                                    </TouchableOpacity>
                                    
                                </View>  
                          )
                      }
                )
            }
            </ScrollView>
        </View>

    )
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

