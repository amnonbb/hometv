import React, { Component } from 'react';
import { Container, Header, FlexboxGrid, Table, Col, Divider, Grid, Button, Row, SelectPicker } from 'rsuite';
import 'rsuite/dist/rsuite.min.css';
import './App.css';
import {getData, LANGS, putData, REST_URL, WEB_URL, WF_LANGUAGES} from "./tools";
import ReactJWPlayer from "react-jw-player";

class App extends Component {

    state = {
        disabled: false,
        loading: false,
        dir_options: [],
        files: [],
        name: null,
        current_dir: null,
        i: 0,
        lang: null,
        hls_url: "",
        dash_url: "",
        type: "",
        url: "",
        video: 2
    };

    componentDidMount() {
        getData(`${REST_URL}/chunks/list`, data => {
            let dir_options = data.map((d,key) => {return({key,label: d.name, value: d.name})})
            this.setState({dir_options})
        });
        this.getFiles()
    };

    getFiles = () => {
        getData(`${REST_URL}/dl/list`, data => {
            let files = data.map(f => {
                let mhref = `${WEB_URL}/dl/${f.name}`;
                f.link = (<a target="_blank" rel="noopener noreferrer" href={mhref}>{f.name}</a>)
                return f
            })
            console.log(" :: get files: ", files);
            this.setState({files})
        })
    };

    putRemux = () => {
        this.setState({disabled: true, loading: true });
        const {lang, name, video} = this.state;
        const data = {language: lang, lang: WF_LANGUAGES[lang], name, video}
        console.log(" :: Edit Meta: ", data);
        putData(`${REST_URL}/exec/remux`, data, (cb) => {
            console.log(":: PUT Respond: ",cb);
            this.setState({disabled: false, loading: false });
            this.getFiles()
        });
    };

    selectLang = (lang) => {
        console.log(lang)
        this.setState({lang});
    };

    selectDir = (name) => {
        console.log(name)
        const {type} = this.state;
        let hls_url = `${WEB_URL}/chunks/${name}/master.m3u8`;
        let dash_url = `${WEB_URL}/chunks/${name}/manifest.mpd`;
        const url = type === "dash" ? dash_url : hls_url;
        this.setState({name, hls_url, dash_url, url});
        //this.getFiles(current_dir);
    };

    selectType = (type) => {
        this.setState({type, url: ""});
    };

    selectVideo = (video) => {
        this.setState({video});
    };

    getFile = () => {
        console.log("get file")
    };

    onPlaybackReady = () => {
        // ...
    };

    render() {
        let {files, video, lang, name, dir_options, url, loading, disabled} = this.state;
        const styles = { width: 550, fontSize: 18 };

        const rowClassName = rowData => {
            if (rowData && rowData.name === name) {
                return "active-row";
            }
            return "";
        };

        return (

            <Container>
                <Header align="middle">
                    <h2>KMedia</h2>
                    <Divider horizontal />
                </Header>

                <div className="show-grid">
                    <FlexboxGrid justify="center">
                        <FlexboxGrid.Item colspan={10}>
                            <SelectPicker data={[
                                {key:0, label:"HLS", value:"hls"},
                                {key:1, label:"DASH", value:"dash"}
                            ]} placeholder='Type' onChange={(value, e) => this.selectType(value)} />
                            <Divider vertical />
                            <SelectPicker size="lg" data={dir_options} placeholder='Stream' style={styles}
                                          onChange={(value, e) => this.selectDir(value)} />
                            <Divider horizontal />

                            <ReactJWPlayer className="player"
                                           customProps={{height: 360, width: 640}}
                                           playerId='jSMsfFL2'
                                           playerScript='https://cdn.jwplayer.com/libraries/RN2MAIg3.js'
                                           playlist={[{
                                               image: "",
                                               sources: [{file: url}]
                                           }]}
                            />
                        </FlexboxGrid.Item>
                        <FlexboxGrid.Item colspan={10}>
                            <SelectPicker data={[
                                {key:0, label:"1080p", value:0},
                                {key:1, label:"720p", value:1},
                                {key:2, label:"360p", value:2},
                                {key:3, label:"audio", value:3}
                            ]} placeholder='Type' onChange={(value, e) => this.selectVideo(value)} value={video} />
                            <Divider vertical />
                            <SelectPicker size="lg" data={LANGS} placeholder='Stream' style={styles}
                                          onChange={(value, e) => this.selectLang(value)} />
                            <Divider horizontal />
                            <Table bordered virtualized width={700} height={360} headerHeight={100} hover data={files}
                                   onRowClick={this.getFile} rowClassName={rowClassName} style={{ cursor: 'pointer'}}>
                                <Table.Column width={700} verticalAlign='middle'>
                                    <Table.HeaderCell>
                                        <Button block appearance="primary" loading={loading} disabled={disabled || !name || !lang} onClick={this.putRemux}>Remux</Button>
                                    </Table.HeaderCell>
                                    <Table.Cell dataKey="link" >

                                    </Table.Cell>
                                </Table.Column>
                            </Table>
                        </FlexboxGrid.Item>
                    </FlexboxGrid>
                </div>
            </Container>

        );
    }
}

export default App;
