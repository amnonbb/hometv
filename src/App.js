import React, { Component } from 'react';
import { Container, Header, Content, Table, Col, Divider, FlexboxGrid, Panel, Toggle, SelectPicker } from 'rsuite';
import 'rsuite/dist/rsuite.min.css';
import './App.css';
import {getData, REST_URL} from "./tools";

class App extends Component {

  state = {
      dir_options: [{"key":"0","label":"Interesno (Russian)","value":"interesno"},{"key":"1","label":"Dlinnie (Russian)","value":"long"},{"key":"2","label":"Obuchalki (Russian)","value":"obuchalki"},{"key":"3","label":"A-NyamNyam (Russian)","value":"anyamnyam"},{"key":"4","label":"Sami (Russian)","value":"sami"},{"key":"5","label":"Drakoni (Russian)","value":"drakoni"},{"key":"6","label":"Fixiki (Russian)","value":"fixiki"},{"key":"7","label":"Shalosh-arba (Hebrew)","value":"34"},{"key":"8","label":"Sid-scince kid (Russian)","value":"sid"},{"key":"9","label":"Nuture (Russian)","value":"priroda"},{"key":"10","label":"Space (Russian)","value":"kosmos"},{"key":"11","label":"Clips (Mixed)","value":"clips"},{"key":"12","label":"Postman-Pat (English)","value":"pat"},{"key":"13","label":"Agada HaKosem (Hebrew)","value":"volshebnik"},{"key":"14","label":"Moi jivotnie (Russian)","value":"animals_friends"},{"key":"15","label":"Pepe (Russian)","value":"pepe"},{"key":"16","label":"Tut i Tam 1 (Russian)","value":"tut1"},{"key":"17","label":"Tut i Tam 2 (Russian)","value":"tut2"}],
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

    selectFiles = (file, i) => {
        const {name} = file;
        let index = i.detail
        //console.log(file, i)
        const {current_dir, loop} = this.state;
        this.setState({current_file: name, i: index});
        let video = this.refs.video;
        video.src = `${REST_URL}/data/video/${current_dir}/` + name;
        video.play();
        if(loop) {
            video.onended = (index) => {
                let {files} = this.state;
                let c = index === files.length-1 ? 0 : index+1;
                this.selectFiles(files[c], c)
            }
        }
    };

    selectDir = (current_dir) => {
        console.log(current_dir)
        this.setState({current_dir});
        this.getFiles(current_dir);
    }

  render() {
      let {files, current_file, dir_options, loop} = this.state;
      const styles = { width: 224, fontSize: 18 };

      const rowClassName = rowData => {
          if (rowData && rowData.name === current_file) {
              return "active-row";
          }
          return "";
      };

    return (

        <Container>
            <Header align="middle">
                <Panel header={current_file?.split('.')[0] || "HomeTV"}  defaultExpanded style={{fontSize: 18, cursor: 'pointer'}}>
                </Panel>
            </Header>
            <Content>
                <FlexboxGrid justify="space-around" align="middle">
                    <FlexboxGrid.Item as={Col} colspan={20} md={12}>
                        <Panel bordered>
                            <video ref="video" width={640} height={360} controls playsInline={true} />
                        </Panel>
                    </FlexboxGrid.Item>
                    <FlexboxGrid.Item as={Col} colspan={20} md={12}>
                        <Table virtualized height={400} headerHeight={100} hover data={files} bordered
                               onRowClick={this.selectFiles} rowClassName={rowClassName} style={{fontSize: 18, cursor: 'pointer'}}>
                            <Table.Column width={700} verticalAlign='middle'>
                                <Table.HeaderCell>
                                    <SelectPicker size="lg" data={dir_options} placeholder='Dir options' style={styles}
                                                  onChange={(value, e) => this.selectDir(value)} />
                                    <Divider vertical />
                                    <Toggle onChange={() => this.setState({loop: !loop})}
                                              checked={loop} />
                                </Table.HeaderCell>
                                <Table.Cell dataKey="name" >

                                </Table.Cell>
                            </Table.Column>
                        </Table>
                    </FlexboxGrid.Item>
                </FlexboxGrid>
            </Content>
        </Container>

    );
  }
}

export default App;
