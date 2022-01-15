import React, { Component } from 'react';
import {Segment, Grid, Table, Checkbox, Menu, Select, Label} from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import './App.css';
import {getData, REST_URL} from "./tools";

class App extends Component {

  state = {
      dir_options: [],
      files: [],
      current_file: null,
      current_dir: null,
      i: 0,
      loop: false,

  };

    componentDidMount() {
        getData(`options.json`, dir_options => {
            this.setState({dir_options})
        })
    };

    getFiles = (dir) => {
        getData(`${REST_URL}/${dir}/list`, files => {
            this.setState({files})
        })
    }

    selectFiles = (current_file, i) => {
        const {current_dir, loop} = this.state;
        this.setState({current_file, i});
        let video = this.refs.video;
        video.src = `${REST_URL}/data/video/${current_dir}/` + current_file;
        video.play();
        if(loop) {
            video.onended = () => {
                let {files, i} = this.state;
                let c = i === files.length-1 ? 0 : i+1;
                this.selectFiles(files[c], c)
            }
        }
    };

    selectDir = (current_dir) => {
        this.setState({current_dir});
        this.getFiles(current_dir);
    }

  render() {
      let {files, current_file, dir_options, loop} = this.state;

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

        <Segment basic attached>
            <Label size='big' attached>{current_file?.split('.')[0]}</Label>
            <Grid columns={2} stretched textAlign='center' doubling>
                <Grid.Row verticalAlign='middle'>
                    <Grid.Column>
                        <video ref="video" controls playsInline={true} />
                    </Grid.Column>
                    <Grid.Column>
                        <Menu secondary>
                            <Menu.Item>
                                <Select options={dir_options}
                                        placeholder='Dir options'
                                        onChange={(e, {value}) => this.selectDir(value)} />
                            </Menu.Item>
                            <Menu.Item>
                                <Checkbox label='Auto Play' onChange={() => this.setState({loop: !loop})}
                                          checked={loop} />
                            </Menu.Item>
                        </Menu>
                        <Segment textAlign='center' className="group_list" >
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

    );
  }
}

export default App;
