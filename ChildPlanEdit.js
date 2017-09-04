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
  TextInput,
  Switch,
  DatePickerAndroid
} from 'react-native';
 
//本文件作用：设置子计划是否年度，月度，近期，每天计划
//编辑子计划内容（该功能待开发）

var w=Dimensions.get('window').width;
var h=Dimensions.get('window').height;  //获得屏幕的宽高
var ChildPlanInfo={}

export default class ChildPlanEdit extends Component {

 constructor(props) {  
    super(props); 
     this.state = { 
        ChildPlan:'',
        ifYearChildPlanSwitch:false,
        ifMonthChildPlanSwitch:false,
        ifRecentChildPlanSwitch:false,
        ifDayChildPlanSwitch:false,
        ChildExpectCompleteTime:"",
    }; 
  }  

 static navigationOptions = {
     header:null
  };

componentWillMount() {
    const { params } = this.props.navigation.state;    
    ChildPlanInfo=params.ChildPlanInfo    
    this.setState({ChildPlan:ChildPlanInfo['ChildPlan']})
    this.setState({ifYearChildPlanSwitch:!!ChildPlanInfo['ifYearChildPlan']})
    this.setState({ifMonthChildPlanSwitch:!!ChildPlanInfo['ifMonthChildPlan']})
    this.setState({ifRecentChildPlanSwitch:!!ChildPlanInfo['ifRecentChildPlan']})
    this.setState({ifDayChildPlanSwitch:!!ChildPlanInfo['ifEverydayChildPlan']})
    this.setState({ChildExpectCompleteTime:ChildPlanInfo['ChildExpectCompleteTime']})


  }

 
 //计划是否年度、月度、近期、每日计划修改
  modifyIfChildPlan=(ChildID,value,PlanType)=>{ 
    let url="http://todoapp.applinzi.com/zuoewlzhflnqcur/modifyIfChildPlan/";
    let formData=new FormData();      
    formData.append("ChildID",ChildID); 
    formData.append("PlanType",PlanType); 
    formData.append("value",value); 
    fetch(url,{method:"POST",headers:{},body:formData}).then(response => response)
          .then(data =>{     
              if(PlanType=='ifYearChildPlan') { 
                            if(value==1)        
                                this.setState({ifYearChildPlanSwitch: true})
                            else if(value==0){
                                this.setState({ifYearChildPlanSwitch: false})
                                this.setState({ifMonthChildPlanSwitch: false})
                                this.setState({ifRecentChildPlanSwitch: false})

                        }}
              else if(PlanType=='ifMonthChildPlan')
                            { 
                              if(value==1)   
                            {     
                                this.setState({ifYearChildPlanSwitch: true})
                                this.setState({ifMonthChildPlanSwitch: true})

                            }
                              else if(value==0){
                                this.setState({ifMonthChildPlanSwitch: false})
                                this.setState({ifRecentChildPlanSwitch: false})

                          }}
             else if(PlanType=='ifRecentChildPlan')
                        { 
                              if(value==1)   
                            {     
                                this.setState({ifYearChildPlanSwitch: true})
                                this.setState({ifMonthChildPlanSwitch: true})
                                this.setState({ifRecentChildPlanSwitch: true})


                            }
                              else if(value==0){
                                this.setState({ifRecentChildPlanSwitch: false})

                          }}
            else if(PlanType=='ifEverydayChildPlan')          
                 this.setState({ifDayChildPlanSwitch: value})

               
            })

  }
 
 
 //修改子计划相关信息：计划内容
 modifyChildPlan=()=>{
    const { params } = this.props.navigation.state;    
    ChildPlanInfo=params.ChildPlanInfo
    let url="http://todoapp.applinzi.com/zjclqauotlncvljqoud/modifyChildPlan/";
    let formData=new FormData();      
    formData.append("ChildPlan",this.state.ChildPlan); 
    formData.append("ChildPlanID",ChildPlanInfo['ChildID']); 
    formData.append("ChildExpectCompleteTime",this.state.ChildExpectCompleteTime);     
    fetch(url,{method:"POST",headers:{},body:formData}).then(response => response)
          .then(data =>{  alert("修改成功")   }
          )


 }

deleteChildPlan=()=>{

  const { params } = this.props.navigation.state;    
    ChildPlanInfo=params.ChildPlanInfo
    let url="http://todoapp.applinzi.com/zjclqauotlncvljqoud/deleteChildPlan/";
    let formData=new FormData();      
    formData.append("ChildPlanID",ChildPlanInfo['ChildID']); 
    fetch(url,{method:"POST",headers:{},body:formData}).then(response => response)
          .then(data =>{  this.props.navigation.goBack();   }
          )


 }

 

  render() {
    return (
       <View  style={styles.container}>  
            <View style={styles.header}>  
                  <Text style={styles.headtitle}>子计划编辑</Text> 
            </View>  
             <View style={{backgroundColor: '#FAFFFF',justifyContent: 'flex-start',width:w,marginBottom:2 }}>  
                    <View style={{height:5}}/> 
                   <TextInput style={{marginLeft:10,marginRight:10,lineHeight:25,textAlignVertical:'bottom'}}
                              underlineColorAndroid="transparent"
                              multiline ={true}
                              onChangeText={(text) =>   this.setState({ChildPlan:text.substring(4)})  }
                   >子计划：{this.state.ChildPlan}</TextInput>
                   <View style={{height:5}}/> 
            </View>  
            <View style={{backgroundColor: '#FAFFFF',justifyContent: 'flex-start',width:w,marginBottom:2 }}>  
                    <View style={{height:5}}/> 
                    <View style={{flexDirection: 'row'}}>
                            <Text style={{marginLeft:10,marginRight:10,lineHeight:25,textAlignVertical:'top',width:0.7*w}}>
                                  计划完成时间：{this.state.ChildExpectCompleteTime.substring(0,10)}</Text>
                            <TouchableOpacity   
                                style={{alignSelf:'center',justifyContent: 'center',width:80,height:35,backgroundColor:"#12B7F5",borderRadius:5}}            
                                onPress={()=>{
                                        DatePickerAndroid.open(
                                        ).then(({action,  year, month, day})=>{
                                        if(action !== DatePickerAndroid.dismissedAction){
                                        this.setState({ChildExpectCompleteTime:year+'-'+(month+1)+'-'+day});
                                        }
                                        })
                                        }}>
                                    <Text style={{color:'white',textAlign:'center'}}>选择</Text> 
                            </TouchableOpacity>

                    </View>
                    <View style={{height:5}}/> 
            </View> 
            <View style={{flexDirection: 'row',justifyContent: 'flex-start',alignItems: 'center',}}>
                <Text>  年度 </Text>
                  <Switch
                    onValueChange={(value) => this.modifyIfChildPlan(ChildPlanInfo['ChildID'],value,'ifYearChildPlan')}
                    style={{marginBottom:10,marginTop:10}}
                    value={this.state.ifYearChildPlanSwitch}
                    onTintColor='#12B7F5' /><Text>  月度 </Text>
                    <Switch
                    onValueChange={(value)  => this.modifyIfChildPlan(ChildPlanInfo['ChildID'],value,'ifMonthChildPlan')}
                    style={{marginBottom:10,marginTop:10}}
                    value={this.state.ifMonthChildPlanSwitch}
                    onTintColor='#12B7F5' /><Text>  近期 </Text>
                    <Switch
                    onValueChange={(value)  => this.modifyIfChildPlan(ChildPlanInfo['ChildID'],value,'ifRecentChildPlan')}
                    style={{marginBottom:10,marginTop:10}}
                    value={this.state.ifRecentChildPlanSwitch}
                    onTintColor='#12B7F5' /><Text> 每日 </Text>
                    <Switch
                    onValueChange={(value) => this.modifyIfChildPlan(ChildPlanInfo['ChildID'],value,'ifEverydayChildPlan')}
                    style={{marginBottom:10,marginTop:10}}
                    value={this.state.ifDayChildPlanSwitch}
                    onTintColor='#12B7F5' />
            </View>
            <View style={{flexDirection: 'row',justifyContent: 'center',alignItems: 'center',}}>
                <TouchableOpacity   
                        style={{alignSelf:'center',justifyContent: 'center',width:80,height:35,backgroundColor:"#12B7F5",marginTop:10,marginLeft:80,borderRadius:5}}            
                        onPress={()=>this.deleteChildPlan()}>
                            <Text style={{color:'white',textAlign:'center'}}>删除</Text> 
              </TouchableOpacity>
              <View style={{width:0.2*w}}/>
                <TouchableOpacity   
                        style={{alignSelf:'center',justifyContent: 'center',width:80,height:35,backgroundColor:"#12B7F5",marginTop:10,borderRadius:5}}            
                        onPress={()=>this.modifyChildPlan()}>
                            <Text style={{color:'white',textAlign:'center'}}>保存修改</Text> 
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
    
}, 
 
headtitle: { 
    textAlign:'center',
    alignSelf: 'center', 
    fontSize: 20, 
    color: '#FFFFFF', 
}, 
});

