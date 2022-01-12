import React, { Component } from 'react';
import {Segment, Grid, Table, Container, Menu, Input, Button} from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import './App.css';
import {getData, putData, REST_URL, WEB_URL} from "./tools";

class App extends Component {

  state = {
      dir_options: [{key: 1, text: "Data", value: "data"}],
      files: [],
      current_file: null,
      current_dir: "data",
      uid: "",
      inp: "",
      oup: "",
      trimming: false
  };

    componentDidMount() {
        // getData(`${WEB_URL}/options.json`, dir_options => {
        //     this.setState({dir_options})
        // })
        this.getFiles("data");
    };

    getFiles = (dir) => {
        getData(`${REST_URL}/${dir}/list`, files => {
            this.setState({files})
        })
    }

    selectFiles = (current_file) => {
        const {current_dir} = this.state;
        this.setState({current_file});
        let video = this.refs.video;
        video.src = `${REST_URL}/${current_dir}/` + current_file;
        video.play()
    };

    selectDir = (current_dir) => {
        this.setState({current_dir});
        this.getFiles(current_dir);
    }

    startTrim = () => {
        this.setState({trimming: true, uid: "", inp: "", oup: ""});
        const {uid, inp, oup} = this.state;
        getData(`${REST_URL}/trim?uid=${uid}&sstart=${inp}&send=${oup}`, (cb) => {
            console.log(":: startTrim respond: ", cb);
            this.setState({trimming: false});
            this.getFiles("data")
        });
    }

  render() {
      const {files, current_file, uid, inp, oup, trimming} = this.state;

      const action = uid === "" || inp === "" || oup === ""

      let files_list = files.map((file,i) => {
          return (
              <Table.Row active={current_file === file}
                         key={i} onClick={() => this.selectFiles(file, i)}>
                  <Table.Cell width={1}>{i}</Table.Cell>
                  <Table.Cell>{file}</Table.Cell>
              </Table.Row>
          )
      });

    return (
        <Container fluid>
            <br />
        <Segment placeholder>
            <Grid columns={2} stretched textAlign='center' doubling>
                <Grid.Row verticalAlign='middle'>
                    <Grid.Column>
                        <video ref="video" controls playsInline={true} />
                    </Grid.Column>

                    <Grid.Column>
                        <Menu secondary>
                            <Menu.Item>
                                <Input type='text' placeholder='File UID' value={uid}
                                       onChange={(e, { value }) => this.setState({uid: value})}>
                                </Input>
                            </Menu.Item>
                            <Menu.Item>
                                <Input type='text' placeholder='In Point' value={inp}
                                       onChange={(e, { value }) => this.setState({inp: value})}>
                                </Input>
                            </Menu.Item>
                            <Menu.Item>
                                <Input type='text' placeholder='Out Point' value={oup}
                                       onChange={(e, { value }) => this.setState({oup: value})}>
                                </Input>
                            </Menu.Item>
                            <Menu.Menu position='right'>
                                <Menu.Item>
                                    <Button type='submit' color='blue' disabled={action} loading={trimming}
                                            onClick={() => this.startTrim()}>GO</Button>
                                </Menu.Item>
                            </Menu.Menu>
                        </Menu>
                        <Segment textAlign='center' className="group_list" raised>
                            <Table selectable compact='very' basic structured className="admin_table" unstackable>
                                <Table.Body>
                                    {files_list}
                                </Table.Body>
                            </Table>
                        </Segment>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </Segment>
        </Container>
    );
  }
}

export default App;
