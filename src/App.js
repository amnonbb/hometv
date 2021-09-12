import React, { Component } from 'react';
import {Segment, Grid, Table, Container, Menu, Select, Label} from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import './App.css';
import {getData, REST_URL, WEB_URL} from "./tools";

class App extends Component {

  state = {
      dir_options: [],
      files: [],
      current_file: null,
      current_dir: null,
  };

    componentDidMount() {
        getData(`${WEB_URL}/options.json`, dir_options => {
            this.setState({dir_options})
        })
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
        video.src = `${REST_URL}/data/video/${current_dir}/` + current_file;
        video.play()
    };

    selectDir = (current_dir) => {
        this.setState({current_dir});
        this.getFiles(current_dir);
    }

  render() {
      const {files, current_file, dir_options} = this.state;

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
                                <Label size='big'>{current_file}</Label>
                            </Menu.Item>
                            <Menu.Menu position='right'>
                                <Menu.Item>
                                    <Select options={dir_options}
                                            placeholder='Dir options'
                                            onChange={(e, {value}) => this.selectDir(value)} />
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
