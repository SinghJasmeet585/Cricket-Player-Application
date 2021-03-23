import React from 'react'
import { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Slide from '@material-ui/core/Slide';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Loading from '../Loading/Loading';



const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'relative',
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
  large: {
    width: theme.spacing(35),
    height: theme.spacing(35)
  },
  playerStatContainer: {
    width: '90%',
    margin: '0 auto',
  }
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function Card(props) {
  // const[description,setdescription]=useState('');
  // const[id,setid]=useState('');
  // useEffect(() => {
  //  setdescription(props.description);
  //  setid(props.id);
  //     });
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [playerDetails, setPlayerDetails] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [playerBatting, setPlayerBatting] = useState([]);
  const [playerBowling, setPlayerBowling] = useState([]);
  useEffect(() => {
    axios.get(`https://cricapi.com/api/playerStats?apikey=BOBBPOtyxcZsIuxBBpJtj9bJ0843&pid=${props.pid}`)
      .then((res) => {
        // console.log(props.pid);
        // console.log(res.data);
        setPlayerDetails(res.data);
        setPlayerBatting(res.data.data.batting);
        setPlayerBowling(res.data.data.bowling);
        //console.log(res.data.data.batting.ODIs);
      }).finally(() => {
        setIsLoading(false);
      })
  }, []);

  //console.log(playerDetails.data);

  const saveFav = () => {
    //for adding user fav's in the database
    const data = {
      username: localStorage.getItem('username'),
      fav: { pid: props.pid, name: props.name }
    }

    // console.log("card pid", props.pid)
    // console.log(" localStorage.getItem('username')", localStorage.getItem('username'))

    axios.post('http://localhost:5000/favPlayers/add', data)
      .then((res) => {
        // console.log(res)
      })
      .catch(err => {
        // console.log(err)
      })
   
  };

  return (
 

    <div className="card grid-item shadow">
      {isLoading && <Loading type="Grid" color="#E2E2E2" height={200} width={200} />}
      {isLoading === false &&
        <>
          <div className="img-container">
            <img src={playerDetails.imageURL} alt={playerDetails.name} className="card-img-top rounded-circle" />
          </div>
          <div className="card-body">
            <div className="card-title">{playerDetails.name}</div>
            <div className="card-text-country">{playerDetails.country}</div>
            <div className="card-text">{playerDetails.born}</div>
            <div className="card-text">{playerDetails.battingStyle}</div>
            <div className="card-text">{playerDetails.bowlingStyle}</div>
            <div className="button-container">
              <button className="btn btn-outline-danger btn-sm" onClick={saveFav}><i className="far fa-heart"></i></button>
              <button className="btn btn-outline-success btn-sm" onClick={handleClickOpen} >Player Stats</button>
            </div>
          </div>
          <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
            <AppBar className={classes.appBar}>
              <Toolbar>
                <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
                  <CloseIcon />
                </IconButton>
                <Typography variant="h6" className={classes.title}>
                  {playerDetails.name}
                </Typography>
                <Button autoFocus onClick={() => { saveFav(); handleClose(); }} >
                  <span className="btn btn-outline-danger btn-sm">Add <i style={{ marginLeft: '5px' }} className="far fa-heart"></i></span>
                </Button>
              </Toolbar>
            </AppBar>
            <div className="dialog-body">
              <div className="container container-ours">
                <div className="page-heading">
                  <div className="media clearfix">
                    <div className="media-left pr30">
                      <img src={playerDetails.imageURL} alt="..." className="media-object mw150" />
                    </div>
                    <div className="media-body va-m">
                      <h2 className="media-heading">{playerDetails.name}
                        <small>- {playerDetails.country}</small></h2>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-4">
                    <div className="panel">
                      <div className="panel-heading">
                        <span className="panel-icon">
                          <i className="fa fa-star"></i>
                        </span>
                        <span className="panel-title">Personal Information</span>
                      </div>
                      <div className="panel-body pn">
                        <table className="table mbn tc-icon-1 tc-med-2 tc-bold-last">
                          <thead>
                            <tr className="visually-hidden">
                              <th className="mw30">#</th>
                              <th>Attributes</th>
                              <th>Data</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>
                                <span className="fa fa-birthday-cake text-warning"></span>
                              </td>
                              <td>
                                Born
                          </td>
                              <td>
                                {playerDetails.born}
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <img src="/assets/icons/cricket-age.svg" alt="..." className="cricket-bat-logo" />
                              </td>
                              <td>Age</td>
                              <td>{playerDetails.currentAge}</td>
                            </tr>
                            <tr>
                              <td><img src="/assets/icons/cricket-role.svg" alt="..." className="cricket-bat-logo" /></td>
                              <td>Playing Role</td>
                              <td>{playerDetails.playingRole}</td>
                            </tr>
                            <tr>
                              <td>
                                <img src="/assets/icons/cricket-bat1.svg" alt="..." className="cricket-bat-logo" />
                                {/* <CricketBat /> */}
                              </td>
                              <td>
                                Batting Style
                          </td>
                              <td>
                                {playerDetails.battingStyle}
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <img src="/assets/icons/cricket-ball.svg" alt="..." className="cricket-bat-logo" />
                              </td>
                              <td>
                                Bowling Style
                          </td>
                              <td>
                                {playerDetails.bowlingStyle}
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-8">
                    <div className="panel">
                      <div className="panel-body">
                        <div className="profile-details">
                          {playerDetails.profile}
                        </div>
                        <div className="table-bowling-container">
                          <h5>Batting Career Summary</h5>
                          <div style={{ overflowX: 'auto' }}>
                            <table className="table table-striped table-bordered table-sm" cellSpacing="0"
                              width="100%" id="dtHorizontalExample" >
                              <thead>
                                <tr>
                                  <th>#</th>
                                  <th>50</th>
                                  <th>100</th>
                                  <th>St</th>
                                  <th>Ct</th>
                                  <th>Sixes</th>
                                  <th>Fours</th>
                                  <th>Strike Rate</th>
                                  <th>BF</th>
                                  <th>Avg</th>
                                  <th>HS</th>
                                  <th>Runs</th>
                                  <th>NO</th>
                                  <th>Inns</th>
                                  <th>Mats</th>
                                </tr>
                              </thead>
                              <tbody>
                                {playerBatting['listA'] &&
                                  <tr>
                                    <th>List A</th>
                                    <td>{playerBatting['listA']['50']}</td>
                                    <td>{playerBatting['listA']['100']}</td>
                                    <td>{playerBatting['listA'].St}</td>
                                    <td>{playerBatting['listA'].Ct}</td>
                                    <td>{playerBatting['listA']['6s']}</td>
                                    <td>{playerBatting['listA']['4s']}</td>
                                    <td>{playerBatting['listA'].SR}</td>
                                    <td>{playerBatting['listA'].BF}</td>
                                    <td>{playerBatting['listA'].Ave}</td>
                                    <td>{playerBatting['listA'].HS}</td>
                                    <td>{playerBatting['listA'].Runs}</td>
                                    <td>{playerBatting['listA'].NO}</td>
                                    <td>{playerBatting['listA'].Inns}</td>
                                    <td>{playerBatting['listA'].Mat}</td>
                                  </tr>}
                                {playerBatting['firstClass'] &&
                                  <tr>
                                    <th>First Class</th>
                                    <>
                                      <td>{playerBatting['firstClass']['50']}</td>
                                      <td>{playerBatting['firstClass']['100']}</td>
                                      <td>{playerBatting['firstClass'].St}</td>
                                      <td>{playerBatting['firstClass'].Ct}</td>
                                      <td>{playerBatting['firstClass']['6s']}</td>
                                      <td>{playerBatting['firstClass']['4s']}</td>
                                      <td>{playerBatting['firstClass'].SR}</td>
                                      <td>{playerBatting['firstClass'].BF}</td>
                                      <td>{playerBatting['firstClass'].Ave}</td>
                                      <td>{playerBatting['firstClass'].HS}</td>
                                      <td>{playerBatting['firstClass'].Runs}</td>
                                      <td>{playerBatting['firstClass'].NO}</td>
                                      <td>{playerBatting['firstClass'].Inns}</td>
                                      <td>{playerBatting['firstClass'].Mat}</td>
                                    </>
                                  </tr>}
                                {playerBatting['T20Is'] &&
                                  <tr>
                                    <th>T20</th>
                                    <>
                                      <td>{playerBatting['T20Is']['50']}</td>
                                      <td>{playerBatting['T20Is']['100']}</td>
                                      <td>{playerBatting['T20Is'].St}</td>
                                      <td>{playerBatting['T20Is'].Ct}</td>
                                      <td>{playerBatting['T20Is']['6s']}</td>
                                      <td>{playerBatting['T20Is']['4s']}</td>
                                      <td>{playerBatting['T20Is'].SR}</td>
                                      <td>{playerBatting['T20Is'].BF}</td>
                                      <td>{playerBatting['T20Is'].Ave}</td>
                                      <td>{playerBatting['T20Is'].HS}</td>
                                      <td>{playerBatting['T20Is'].Runs}</td>
                                      <td>{playerBatting['T20Is'].NO}</td>
                                      <td>{playerBatting['T20Is'].Inns}</td>
                                      <td>{playerBatting['T20Is'].Mat}</td>
                                    </>
                                  </tr>}

                                {playerBatting['ODIs'] &&
                                  <tr>
                                    <th>ODI</th>
                                    <>
                                      <td>{playerBatting['ODIs']['50']}</td>
                                      <td>{playerBatting['ODIs']['100']}</td>
                                      <td>{playerBatting['ODIs'].St}</td>
                                      <td>{playerBatting['ODIs'].Ct}</td>
                                      <td>{playerBatting['ODIs']['6s']}</td>
                                      <td>{playerBatting['ODIs']['4s']}</td>
                                      <td>{playerBatting['ODIs'].SR}</td>
                                      <td>{playerBatting['ODIs'].BF}</td>
                                      <td>{playerBatting['ODIs'].Ave}</td>
                                      <td>{playerBatting['ODIs'].HS}</td>
                                      <td>{playerBatting['ODIs'].Runs}</td>
                                      <td>{playerBatting['ODIs'].NO}</td>
                                      <td>{playerBatting['ODIs'].Inns}</td>
                                      <td>{playerBatting['ODIs'].Mat}</td>
                                    </>
                                  </tr>}

                                {playerBatting['tests'] &&
                                  <tr>
                                    <th>Tests</th>
                                    <>
                                      <td>{playerBatting['tests']['50']}</td>
                                      <td>{playerBatting['tests']['100']}</td>
                                      <td>{playerBatting['tests'].St}</td>
                                      <td>{playerBatting['tests'].Ct}</td>
                                      <td>{playerBatting['tests']['6s']}</td>
                                      <td>{playerBatting['tests']['4s']}</td>
                                      <td>{playerBatting['tests'].SR}</td>
                                      <td>{playerBatting['tests'].BF}</td>
                                      <td>{playerBatting['tests'].Ave}</td>
                                      <td>{playerBatting['tests'].HS}</td>
                                      <td>{playerBatting['tests'].Runs}</td>
                                      <td>{playerBatting['tests'].NO}</td>
                                      <td>{playerBatting['tests'].Inns}</td>
                                      <td>{playerBatting['tests'].Mat}</td>
                                    </>
                                  </tr>}
                              </tbody>
                            </table>
                          </div>
                        </div>
                        <div className="table-bowling-container">
                          <h5>Bowling Career Summary</h5>
                          <div style={{ overflowX: 'auto' }}>
                            <table className="table table-striped table-bordered table-sm" cellSpacing="0"
                              width="100%" id="dtHorizontalExample" >
                              <thead>
                                <tr>
                                  <th>#</th>
                                  <th>10</th>
                                  <th>5w</th>
                                  <th>4w</th>
                                  <th>SR</th>
                                  <th>Econ</th>
                                  <th>Ave</th>
                                  <th>BBM</th>
                                  <th>BBI</th>
                                  <th>Wkts</th>
                                  <th>Runs</th>
                                  <th>Balls</th>
                                  <th>Inns</th>
                                  <th>Mat</th>
                                </tr>
                              </thead>
                              <tbody>
                                {playerBowling['listA'] &&
                                  <tr>
                                    <th>List A</th>
                                    <>
                                      <td>{playerBowling['listA']['10']}</td>
                                      <td>{playerBowling['listA']['5w']}</td>
                                      <td>{playerBowling['listA']['4w']}</td>
                                      <td>{playerBowling['listA'].SR}</td>
                                      <td>{playerBowling['listA'].Econ}</td>
                                      <td>{playerBowling['listA'].Ave}</td>
                                      <td>{playerBowling['listA'].BBM}</td>
                                      <td>{playerBowling['listA'].BBI}</td>
                                      <td>{playerBowling['listA'].Wkts}</td>
                                      <td>{playerBowling['listA'].Runs}</td>
                                      <td>{playerBowling['listA'].Balls}</td>
                                      <td>{playerBowling['listA'].Inns}</td>
                                      <td>{playerBowling['listA'].Mat}</td>
                                    </>
                                  </tr>}
                                {playerBowling['firstClass'] &&
                                  <tr>
                                    <th>First Class</th>
                                    <>
                                      <td>{playerBowling['firstClass']['10']}</td>
                                      <td>{playerBowling['firstClass']['5w']}</td>
                                      <td>{playerBowling['firstClass']['4w']}</td>
                                      <td>{playerBowling['firstClass'].SR}</td>
                                      <td>{playerBowling['firstClass'].Econ}</td>
                                      <td>{playerBowling['firstClass'].Ave}</td>
                                      <td>{playerBowling['firstClass'].BBM}</td>
                                      <td>{playerBowling['firstClass'].BBI}</td>
                                      <td>{playerBowling['firstClass'].Wkts}</td>
                                      <td>{playerBowling['firstClass'].Runs}</td>
                                      <td>{playerBowling['firstClass'].Balls}</td>
                                      <td>{playerBowling['firstClass'].Inns}</td>
                                      <td>{playerBowling['firstClass'].Mat}</td>
                                    </>
                                  </tr>}

                                {playerBowling['T20Is'] &&
                                  <tr>
                                    <th>T20</th>
                                    <>
                                      <td>{playerBowling['T20Is']['10']}</td>
                                      <td>{playerBowling['T20Is']['5w']}</td>
                                      <td>{playerBowling['T20Is']['4w']}</td>
                                      <td>{playerBowling['T20Is'].SR}</td>
                                      <td>{playerBowling['T20Is'].Econ}</td>
                                      <td>{playerBowling['T20Is'].Ave}</td>
                                      <td>{playerBowling['T20Is'].BBM}</td>
                                      <td>{playerBowling['T20Is'].BBI}</td>
                                      <td>{playerBowling['T20Is'].Wkts}</td>
                                      <td>{playerBowling['T20Is'].Runs}</td>
                                      <td>{playerBowling['T20Is'].Balls}</td>
                                      <td>{playerBowling['T20Is'].Inns}</td>
                                      <td>{playerBowling['T20Is'].Mat}</td>
                                    </>
                                  </tr>}
                                {playerBowling['ODIs'] &&
                                  <tr>
                                    <th>ODI</th>
                                    <>
                                      <td>{playerBowling['ODIs']['10']}</td>
                                      <td>{playerBowling['ODIs']['5w']}</td>
                                      <td>{playerBowling['ODIs']['4w']}</td>
                                      <td>{playerBowling['ODIs'].SR}</td>
                                      <td>{playerBowling['ODIs'].Econ}</td>
                                      <td>{playerBowling['ODIs'].Ave}</td>
                                      <td>{playerBowling['ODIs'].BBM}</td>
                                      <td>{playerBowling['ODIs'].BBI}</td>
                                      <td>{playerBowling['ODIs'].Wkts}</td>
                                      <td>{playerBowling['ODIs'].Runs}</td>
                                      <td>{playerBowling['ODIs'].Balls}</td>
                                      <td>{playerBowling['ODIs'].Inns}</td>
                                      <td>{playerBowling['ODIs'].Mat}</td>
                                    </>
                                  </tr>}
                                {playerBowling['tests'] &&
                                  <tr>
                                    <th>Tests</th>
                                    <>
                                      <td>{playerBowling['tests']['10']}</td>
                                      <td>{playerBowling['tests']['5w']}</td>
                                      <td>{playerBowling['tests']['4w']}</td>
                                      <td>{playerBowling['tests'].SR}</td>
                                      <td>{playerBowling['tests'].Econ}</td>
                                      <td>{playerBowling['tests'].Ave}</td>
                                      <td>{playerBowling['tests'].BBM}</td>
                                      <td>{playerBowling['tests'].BBI}</td>
                                      <td>{playerBowling['tests'].Wkts}</td>
                                      <td>{playerBowling['tests'].Runs}</td>
                                      <td>{playerBowling['tests'].Balls}</td>
                                      <td>{playerBowling['tests'].Inns}</td>
                                      <td>{playerBowling['tests'].Mat}</td>
                                    </>
                                  </tr>}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Dialog>
        </>}
    </div >

  )
}
