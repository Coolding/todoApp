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
  Switch,
  TextInput
} from 'react-native';
 
//本文件作用：显示长期任务下每一个目标任务的目标，方法，各项子目标等详细内容

var w=Dimensions.get('window').width;
var h=Dimensions.get('window').height;  //获得屏幕的宽高
var PlanDetail=[]
var ChildPlanCount=0

export default class ShowPlanInfo extends Component {

 constructor(props) {  
    super(props); 
     this.state = { 
        target:'',
        method:'',
        ParentPlan:'',
        ifYearPlanSwitch:false,
        ifMonthPlanSwitch:false,
        ifRecentPlanSwitch:false,
        ifDayPlanSwitch:false,
        ParentID:0,
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
             this.setState({ParentID:data[0]['ID']})
            this.setState({ifYearPlanSwitch:!!data[0]['ifYearPlan']})
            this.setState({ifMonthPlanSwitch:!!data[0]['ifMonthPlan']})
            this.setState({ifRecentPlanSwitch:!!data[0]['ifRecentPlan']})
            this.setState({ifDayPlanSwitch:!!data[0]['ifEverydayPlan']})


             if(data.length==1 && !data[0]['ChildPlan'])    //没有子计划
                ChildPlanCount=0
             else{
                ChildPlanCount=data.length
                
                this.forceUpdate()
             }
            })
    
  }

 
 //计划是否年度、月度、近期、每日计划修改
  modifyIfPlan=(ID,value,PlanType)=>{
 
    let url="http://todoapp.applinzi.com/zuoewlzhflnqcur/modifyIfPlan/";
    let formData=new FormData();      
    formData.append("ID",ID); 
    formData.append("PlanType",PlanType); 
    formData.append("value",value); 
    fetch(url,{method:"POST",headers:{},body:formData}).then(response => response)
          .then(data =>{     
              if(PlanType=='ifYearPlan') { 
                            if(value==1)        
                                this.setState({ifYearPlanSwitch: true})
                            else if(value==0){
                                this.setState({ifYearPlanSwitch: false})
                                this.setState({ifMonthPlanSwitch: false})
                                this.setState({ifRecentPlanSwitch: false})

                        }}
              else if(PlanType=='ifMonthPlan')
                            { 
                              if(value==1)   
                            {     
                                this.setState({ifYearPlanSwitch: true})
                                this.setState({ifMonthPlanSwitch: true})

                            }
                              else if(value==0){
                                this.setState({ifMonthPlanSwitch: false})
                                this.setState({ifRecentPlanSwitch: false})

                          }}
             else if(PlanType=='ifRecentPlan')
                        { 
                              if(value==1)   
                            {     
                                this.setState({ifYearPlanSwitch: true})
                                this.setState({ifMonthPlanSwitch: true})
                                this.setState({ifRecentPlanSwitch: true})


                            }
                              else if(value==0){
                                this.setState({ifRecentPlanSwitch: false})

                          }}
            else if(PlanType=='ifEverydayPlan')          
                 this.setState({ifDayPlanSwitch: value})

               
            })

  }
 
 //修改计划相关信息：计划内容，目标，方法

 modifyPlan=()=>{
    let url="http://todoapp.applinzi.com/zjclqauotlncvljqoud/modifyPlan/";
    let formData=new FormData();      
    formData.append("target",this.state.target); 
    formData.append("method",this.state.method); 
    formData.append("ParentPlan",this.state.ParentPlan); 
    formData.append("ParentID",this.state.ParentID);     
    fetch(url,{method:"POST",headers:{},body:formData}).then(response => response)
          .then(data =>{  alert("修改成功")   }
          )


 }
renderChildPlan() {
    if(ChildPlanCount>0){    //有子计划，则逐条显示  
        ChildPlanCount=0
    return(
       PlanDetail.map(
                      (Item,index)=>{ 
                          return(
                                <View key={index} style={{backgroundColor:'white',flexDirection:'row', justifyContent: 'flex-start', alignItems: 'center',  width:0.88*w,height:60,marginLeft:0.06*w,marginBottom:0.06*w,borderTopRightRadius:5,borderBottomRightRadius:5,}}>
                                    <View style={{backgroundColor:'#BEB3F7',borderTopLeftRadius:5,borderBottomLeftRadius:5,width:10,height:60}}></View>
                                    <TouchableOpacity 
                                        style={{flexDirection: 'row',justifyContent: 'flex-start',alignItems:'center',width:0.85*w,height:60}}
                                         onPress={()=>this.props.navigation.navigate('ChildPlanEdit',{ChildPlan: Item['ChildPlan'],ChildID:Item['ChildPlan'],ChildPlanInfo:Item})}>
                                        <Text style={{width:0.68*w,marginLeft:5}}>{Item['ChildPlan']}</Text>
                                    </TouchableOpacity>
                                    
                                </View>  
                          )
                      }
        )
        (
           
        )
        )
        
    }else{    //没有子计划，则不显示
         
    }
  } 

  render() {
    return (
       <View  style={styles.container}>  
             <View style={styles.header}>  
                   <Text style={styles.leftitle}>     </Text>
                  <Text style={styles.headtitle}>计划浏览</Text> 
                   <TouchableOpacity   
                    style={{alignSelf:'center',}}            
                    onPress={()=>this.props.navigation.navigate('AddPlan')}>
                          <Text style={styles.leftitle}>编辑  </Text> 
                    </TouchableOpacity>
            </View>  


            <View style={{backgroundColor: '#FAFFFF',justifyContent: 'center',width:w,marginBottom:2 }}>  
                    <View style={{height:10}}/> 
                   <TextInput style={{marginLeft:10,marginRight:10,lineHeight:25}}
                              underlineColorAndroid="transparent"
                              multiline ={true}
                              onChangeText={(text) =>   this.setState({ParentPlan:text.substring(3)})  }
                   >任务：{this.state.ParentPlan}</TextInput>
                   <View style={{height:10}}/> 
            </View>  
            <View style={{backgroundColor: '#FAFFFF',justifyContent: 'flex-start',width:w,marginBottom:2 }}>  
                    <View style={{height:10}}/> 
                   <TextInput style={{marginLeft:10,marginRight:10,lineHeight:25,textAlignVertical:'bottom'}}
                              underlineColorAndroid="transparent"
                              multiline ={true}
                              numberOfLines={ Math.ceil(this.state.target.length/20)}
                              onChangeText={(text) =>   this.setState({target:text.substring(3)})  }
                   >目标：{this.state.target}</TextInput>
                   <View style={{height:10}}/> 
            </View>  
            <View style={{backgroundColor: '#FAFFFF',justifyContent: 'flex-start',width:w,marginBottom:2 }}>  
                    <View style={{height:10}}/> 
                   <TextInput style={{marginLeft:10,marginRight:10,lineHeight:25,textAlignVertical:'top'}}
                              underlineColorAndroid="transparent"
                              multiline ={true}
                              onChangeText={(text) =>   this.setState({method:text.substring(3)})  }
                   >方法：{this.state.method}</TextInput>
                   <View style={{height:10}}/> 
            </View> 


            <View style={{flexDirection: 'row',justifyContent: 'flex-start',alignItems: 'center',}}>
              <Text>  年度 </Text>
              <Switch
                onValueChange={(value) => this.modifyIfPlan(this.state.ParentID,value,'ifYearPlan')}
                style={{marginBottom:10,marginTop:10}}
                value={this.state.ifYearPlanSwitch}
                onTintColor='#12B7F5' /><Text>  月度 </Text>
                <Switch
                onValueChange={(value)  => this.modifyIfPlan(this.state.ParentID,value,'ifMonthPlan')}
                style={{marginBottom:10,marginTop:10}}
                value={this.state.ifMonthPlanSwitch}
                onTintColor='#12B7F5' /><Text>  近期 </Text>
                <Switch
                onValueChange={(value)  => this.modifyIfPlan(this.state.ParentID,value,'ifRecentPlan')}
                style={{marginBottom:10,marginTop:10}}
                value={this.state.ifRecentPlanSwitch}
                onTintColor='#12B7F5' /><Text>  每日 </Text>
                <Switch
                onValueChange={(value) => this.modifyIfPlan(this.state.ParentID,value,'ifEverydayPlan')}
                style={{marginBottom:10,marginTop:10}}
                value={this.state.ifDayPlanSwitch}
                onTintColor='#12B7F5' />
            </View>
            <ScrollView>
             {
                this.renderChildPlan()
                
            }
            <View style={{ flexDirection: 'row',alignSelf:'center',justifyContent: 'center',width:w}}>

            <TouchableOpacity   
                    style={{alignSelf:'center',justifyContent: 'center',width:80,height:35,backgroundColor:"#12B7F5",marginTop:10,borderRadius:5}}            
                    onPress={()=>this.modifyPlan()}>
                        <Text style={{color:'white',textAlign:'center'}}>保存修改</Text> 
           </TouchableOpacity>
           <View style={{ width:80}}/>
             <TouchableOpacity   
                    style={{alignSelf:'center',justifyContent: 'center',width:80,height:35,backgroundColor:"#12B7F5",marginTop:10,borderRadius:5}}            
                    onPress={()=>this.AddChildPlan()}>
                        <Text style={{color:'white',textAlign:'center'}}>添加子计划</Text> 
           </TouchableOpacity>
           </View>
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
    
},  
headtitle: { 
    textAlign:'center',
    alignSelf: 'center', 
    fontSize: 20, 
    color: '#FFFFFF', 
}, 
leftitle: { 
    alignSelf: 'center', 
    fontSize: 20, 
    color: '#ffffff', 
}
});

