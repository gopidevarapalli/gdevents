import axios from 'axios';
import api_url from '../../Config/Config';
import {GET_COMMONICLIST,GET_NEWSDETAILS,GET_DEALSDETAILS,GET_REPORTSDETAILS} from '../action/types'

 


  // export const commonListAction = (api_url) => dispatch => {
  //   //  dispatch(setICLoading());
  //     axios
  //       .get(`${api_url}&pagesize=10`)
  //       .then(res => {
  //         return dispatch({
  //           type: GET_COMMONICLIST,
  //           payload: res.data
  //         })
  //       }
  //       ).catch(err =>
  //         dispatch({
  //           type: GET_COMMONICLIST,
  //           payload: {}
  //         })
  //       );
       
  //   };
    

   


  export const loginAction= (api_url,username, password) => dispatch => { 
    console.log(api_url)
    console.log(username)
    console.log(password);
    let formData = new FormData();
    formData.append('username', username);
    formData.append('password',password); 
    axios
      .post(`${api_url}`, formData)
      .then(res =>{ console.log(res.data)
       return dispatch({
          type: 'GET_LOGIN',
          payload: res.data
        })
      }
      )
      .catch(err =>{ console.log(err)
       return dispatch({
          type: 'GET_LOGIN',
          payload: {}
        })}
      );



  };

  export const profileAction= (cookie) => dispatch => { 

    // alert()
    // console.log(api_url)
    // console.log(cookie) 
    let formData = new FormData(); 
    formData.append('cookie',cookie); 
    axios
      .post(`${api_url.currentUserInfo}`, formData)
      .then(res =>{ 
       return dispatch({
          type: 'GET_PROFILE',
          payload: res.data
        })
      }
      )
      .catch(err =>{ console.log(err)
       return dispatch({
          type: 'GET_PROFILE',
          payload: {}
        })}
      );



  };

  export const KeyStatisticsAction= (cookie, event) => dispatch => { 

    // alert()
    // console.log(api_url)
    // console.log(cookie) 
    let formData = new FormData(); 
    formData.append('cookie',cookie); 
    formData.append('event_id',event); 
    axios
      .post(`${api_url.keyStats}`, formData)
      .then(res =>{ 
        // console.log(res.data)
       return dispatch({
          type: 'GET_Statistics',
          payload: res.data
        })
      }
      )
      .catch(err =>{ console.log(err)
       return dispatch({
          type: 'GET_Statistics',
          payload: {}
        })}
      );



  };
  export const LatestMembersAction= (cookie, event_id) => dispatch => { 

    // alert() 
    // console.log(cookie) 
    let formData = new FormData(); 
    formData.append('cookie',cookie); 
    formData.append('event_id', event_id);
    
    axios
      .post(`${api_url.latestMembers}`, formData)
      .then(res =>{ 
        // console.log(res.data)
       return dispatch({
          type: 'GET_LatestMembers',
          payload: res.data
        })
      }
      )
      .catch(err =>{ console.log(err)
       return dispatch({
          type: 'GET_LatestMembers',
          payload: {}
        })}
      );



  };  
  export const AttendeesAction= (cookie, event_id) => dispatch => { 

    let formData = new FormData(); 
    formData.append('cookie',cookie); 
    
    if(event_id){
      // alert()
      formData.append('event_id',event_id); 
    }
    console.log('attendee action event id')
    console.log(event_id)
    axios
      .post(`${api_url.attendeesList}`, formData)
      .then(res =>{  
        // console.log(res.data)
       return dispatch({
          type: 'GET_Attendees',
          payload: res.data
        })
      }
      )
      .catch(err =>{ console.log(err)
       return dispatch({
          type: 'GET_Attendees',
          payload: {}
        })}
      );
  };

  export const SpeakersAction= (cookie,event_id) => dispatch => { 

    let formData = new FormData(); 
    formData.append('cookie',cookie); 
    formData.append('event_id',event_id); 

    axios
      .post(`${api_url.speakersList}`, formData)
      .then(res =>{  
        console.log('=======================')
        console.log(res.data)
        console.log('=======================')
       return dispatch({
          type: 'GET_Speakers',
          payload: res.data
        })
      }
      )
      .catch(err =>{ console.log(err)
       return dispatch({
          type: 'GET_Speakers',
          payload: {}
        })}
      );
  };

  
  export const SponsorsAction= (cookie, event_id) => dispatch => { 

    let formData = new FormData(); 
    formData.append('cookie',cookie); 
    formData.append('event_id',event_id); 
    
    if(event_id){
      // alert(event_id)
      axios
      .post(`${api_url.sponsorsList}`, formData)
      .then(res =>{  
        // alert('sponsor action')
        // alert(event_id)
       return dispatch({
          type: 'GET_Sponsors',
          payload: res.data
        })
      }
      )
      .catch(err =>{ console.log(err)
       return dispatch({
          type: 'GET_Sponsors',
          payload: {}
        })}
      );
    }
  };

  export const ProductsAction= (cookie,event_id) => dispatch => { 
    // console.log(cookie) 
    let formData = new FormData(); 
    formData.append('cookie',cookie); 
    formData.append('event_id',event_id);
    formData.append('spage',1);
    axios
      .post(`${api_url.productList}`, formData)
      .then(res =>{
        //  console.log(res.data)
       return dispatch({
          type: 'GET_Products',
          payload: res.data
        })
      }
      )
      .catch(err =>{ console.log(err)
       return dispatch({
          type: 'GET_Products',
          payload: {}
        })}
      );
  };


  export const CompanyAction= (cookie, event_id) => dispatch => { 
    // console.log(cookie) 
    let formData = new FormData(); 
    formData.append('cookie',cookie); 
    formData.append('event_id',event_id); 
    axios
      .post(`${api_url.companies}`, formData)
      .then(res =>{
        //  console.log(res.data)
       return dispatch({
          type: 'GET_Companies',
          payload: res.data
        })
      }
      )
      .catch(err =>{ console.log(err)
       return dispatch({
          type: 'GET_Companies',
          payload: {}
        })}
      );
  };

  export const ExhibitorAction= (cookie, event_id) => dispatch => { 
    // console.log(cookie) 
    let formData = new FormData(); 
    formData.append('cookie',cookie); 
    if(event_id){
      formData.append('event_id',event_id); 

    }
    axios
      .post(`${api_url.exhibitors}`, formData)
      .then(res =>{
        //  console.log(res.data)
       return dispatch({
          type: 'GET_Exhibitors',
          payload: res.data
        })
      }
      )
      .catch(err =>{ console.log(err)
       return dispatch({
          type: 'GET_Exhibitors',
          payload: []
        })}
      );
  };

  
  export const MyMeetingsAction= (cookie) => dispatch => { 
    // console.log(cookie) 
    let formData = new FormData(); 
    formData.append('cookie',cookie); 
    axios
      .post(`${api_url.meetingList}`, formData)
      .then(res =>{
        //  console.log(res.data)
       return dispatch({
          type: 'GET_MyMeetings',
          payload: res.data
        })
      }
      )
      .catch(err =>{ console.log(err)
       return dispatch({
          type: 'GET_MyMeetings',
          payload: {}
        })}
      );
  };

  export const GetUserInfoAction= (cookie,user_id, event_id) => dispatch => { 
    // console.log(cookie) 
    let formData = new FormData(); 
    formData.append('cookie',cookie); 
    formData.append('user_id',user_id); 
    if(event_id){
      formData.append('event_id',event_id); 

    }
    axios
      .post(`${api_url.userDetails}`, formData)
      .then(res =>{
        //  console.log(res.data)
       return dispatch({
          type: 'GET_UserDetail',
          payload: res.data
        })
      }
      )
      .catch(err =>{ console.log(err)
       return dispatch({
          type: 'GET_UserDetail',
          payload: {}
        })}
      );
  };


  export const GetRefreshAction= (status) => dispatch => { 
    try{
       return dispatch({
          type: 'GET_Refresh',
          payload: status
        })
      }
      
      catch(err){ console.log(err)
       return dispatch({
          type: 'GET_Refresh',
          payload: false
        })}
      
  };





