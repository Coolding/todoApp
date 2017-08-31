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
 
//本文件作用：显示长期任务下每一个目标任务的目标，方法，各项子目标等详细内容

var w=Dimensions.get('window').width;
var h=Dimensions.get('window').height;  //获得屏幕的宽高
var PlanDetail=[]


export default class ShowChildPlan extends Component {

 constructor(props) {  
    super(props); 
     this.state = { 
        target:'',
        method:'',
        ParentPlan:'',
    }; 
  }  

 static navigationOptions = {
     header:null
  };

componentWillMount() {
    const { params } = this.props.navigation.state;    
    let url="http://todoapp.applinzi.com/zljeurlzhdlqieut/getChildPlans/";
    let formData=new FormData();        
    formData.append("PlanID",params.ParentPlanID); 
    fetch(url,{method:"POST",headers:{},body:formData}).then(response => response.json())
          .then(data =>{               
             PlanDetail=data
             this.setState({target:data[0]['target']})
             this.setState({method:data[0]['method']})
             this.setState({ParentPlan:data[0]['Plan']})
            })
    
  }


  modifyIfYearChildPlan=(index)=>{
    let url="http://todoapp.applinzi.com/zuoewlzhflnqcur/modifyIfYearChildPlan/";
    let formData=new FormData();      
    formData.append("ChildID",PlanDetail[index]['ChildID']); 
    fetch(url,{method:"POST",headers:{},body:formData}).then(response => response)
          .then(data =>{               
                PlanDetail[index]['ifYearChildPlan']=Math.abs(PlanDetail[index]['ifYearChildPlan']-1)
                this.forceUpdate();
            })

  }
 



  render() {
    return (
       <View  style={styles.container}>  
            <View style={styles.header}>  
                  <Text style={styles.headtitle}>长期：{this.state.ParentPlan}</Text> 
            </View>  
            <View style={{backgroundColor: '#FAFFFF',justifyContent: 'center',width:w,height:80,marginBottom:2 }}>  
                   <Text style={{marginLeft:10,marginRight:10}}>目标：{this.state.target}</Text>
            </View>  
            <View style={{backgroundColor: '#FAFFFF',justifyContent: 'center',width:w,height:80,marginBottom:w*0.06,}}>  
                   <Text  style={{marginLeft:10,marginRight:10}}>方法：{this.state.method}</Text>
            </View>  
           
            <ScrollView>
             {
                PlanDetail.map(
                      (Item,index)=>{ 
                          return(
                                <View key={index} style={{backgroundColor:'white',flexDirection:'row', justifyContent: 'flex-start', alignItems: 'center',  width:0.88*w,height:60,marginLeft:0.06*w,marginBottom:0.06*w,borderTopRightRadius:5,borderBottomRightRadius:5,}}>
                                    <View style={{backgroundColor:'#BEB3F7',borderTopLeftRadius:5,borderBottomLeftRadius:5,width:10,height:60}}></View>
                                    <TouchableOpacity 
                                        style={{flexDirection: 'row',justifyContent: 'flex-start',alignItems:'center',width:0.85*w,height:60}}
                                         onPress={()=>alert('ok')}>
                                        <Text style={{width:0.68*w,marginLeft:5}}>{Item['ChildPlan']}</Text>
                                        <TouchableOpacity 
                                           style={{backgroundColor:'#BEB3F7',justifyContent: 'center',alignItems:'center',marginLeft:5,width:30,height:30,borderRadius:5,}}
                                            onPress={()=>this.modifyIfYearChildPlan(index)}>
                                           <Text style={{color:'white',fontSize:20}}>{Item['ifYearChildPlan']==1?"一":"+"}</Text>
                                       </TouchableOpacity>
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
    justifyContent: 'center', 
    width:w,
    
}, 
 
headtitle: { 
    textAlign:'center',
    alignSelf: 'center', 
    fontSize: 20, 
    color: '#FFFFFF', 
}, 
});

