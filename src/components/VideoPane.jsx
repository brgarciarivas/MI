import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Base from './Base';

class VideoPane extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const socket = io();
        const videoEl = this.videoEl;
        const props = this.props;

        let isChannelReady = false;
        let isInitiator = false;
        let isStarted = false;
        let localStream;
        let pc;
        let remoteStream;
        let turnReady;

        this.pcConfig = {
            'iceServers': [{
                'urls': 'stun:stun.l.google.com:19302'
            }]
        };

        // Set up audio and video regardless of what devices are present.
        this.sdpConstraints = {
            offerToReceiveAudio: true,
            offerToReceiveVideo: true
        };

        /////////////////////////////////////////////

        const room = this.props.roomName;
        const self = this;
        // Could prompt for room name:
        // room = prompt('Enter room name:');

        if (room !== '') {
            socket.emit('create or join', room);
            console.log('Attempted to create or  join room', room);
        }

        socket.on('created', function(room) {
            console.log('Created room ' + room);
            isInitiator = true;
        });

        socket.on('full', function(room) {
            console.log('Room ' + room + ' is full');
        });

        socket.on('join', function (room){
            console.log('Another peer made a request to join room ' + room);
            console.log('This peer is the initiator of room ' + room + '!');
            isChannelReady = true;
        });

        socket.on('joined', function(room) {
            console.log('joined: ' + room);
            isChannelReady = true;
        });

        socket.on('log', function(array) {
            console.log.apply(console, array);
        });

        ////////////////////////////////////////////////

        function sendMessage(message) {
            console.log('Client sending message: ', message);
            socket.emit('message', message);
        }

        // This client receives a message
        socket.on('message', function(message) {
            console.log('Client received message:', message);
            if (message === 'got user media') {
                maybeStart();
            } else if (message.type === 'offer') {
                if (!isInitiator && !isStarted) {
                    maybeStart();
                }
                pc.setRemoteDescription(new RTCSessionDescription(message));
                doAnswer();
            } else if (message.type === 'answer' && isStarted) {
                pc.setRemoteDescription(new RTCSessionDescription(message));
            } else if (message.type === 'candidate' && isStarted) {
                var candidate = new RTCIceCandidate({
                    sdpMLineIndex: message.label,
                    candidate: message.candidate
                });
                pc.addIceCandidate(candidate);
            } else if (message === 'bye' && isStarted) {
                handleRemoteHangup();
            }
        });


        function gotStream(stream) {
            console.log('Adding local stream.');
            localStream = stream;
            videoEl.srcObject = stream;
            sendMessage('got user media');
            if (isInitiator) {
                maybeStart();
            }
        }

        function maybeStart() {
            console.log('>>>>>>> maybeStart() ', isStarted, localStream, isChannelReady);
            if (!isStarted && typeof localStream !== 'undefined' && isChannelReady) {
                console.log('>>>>>> creating peer connection');
                console.log('props maybeStart', props);
                createPeerConnection();
                if (props.isJournalist) {
                    pc.addStream(localStream);
                }
                isStarted = true;
                console.log('isInitiator', isInitiator);
                if (isInitiator) {
                    doCall();
                }
            }
        }

        /////////////////////////////////////////////////////////

        function createPeerConnection() {
            try {
                pc = new RTCPeerConnection(null);
                pc.onicecandidate = handleIceCandidate;
                pc.onaddstream = handleRemoteStreamAdded;
                pc.onremovestream = handleRemoteStreamRemoved;
                console.log('Created RTCPeerConnnection');
            } catch (e) {
                console.log('Failed to create PeerConnection, exception: ' + e.message);
                alert('Cannot create RTCPeerConnection object.');
                return;
            }
        }

        function handleIceCandidate(event) {
            console.log('icecandidate event: ', event);
            if (event.candidate) {
                sendMessage({
                    type: 'candidate',
                    label: event.candidate.sdpMLineIndex,
                    id: event.candidate.sdpMid,
                    candidate: event.candidate.candidate
                });
            } else {
                console.log('End of candidates.');
            }
        }

        function handleCreateOfferError(event) {
            console.log('createOffer() error: ', event);
        }

        function doCall() {
            console.log('Sending offer to peer');

            let offerOptions;

            if (props.isJournalist) {
                console.log('YES Journalist', props);
                offerOptions = {offerToReceiveVideo: false, offerToReceiveAudio: false};
            } else {
                console.log('NOT Journalist', props);
                offerOptions = {offerToReceiveVideo: true, offerToReceiveAudio: true};
            }


            pc.createOffer(setLocalAndSendMessage, handleCreateOfferError, offerOptions);
        }

        function doAnswer() {
            console.log('Sending answer to peer.');
            pc.createAnswer().then(
                setLocalAndSendMessage,
                onCreateSessionDescriptionError
            );
        }

        function setLocalAndSendMessage(sessionDescription) {
            pc.setLocalDescription(sessionDescription);
            console.log('setLocalAndSendMessage sending message', sessionDescription);
            sendMessage(sessionDescription);
        }

        function onCreateSessionDescriptionError(error) {
            trace('Failed to create session description: ' + error.toString());
        }

        function handleRemoteStreamAdded(event) {
            console.log('Remote stream added.');
            remoteStream = event.stream;
            videoEl.srcObject = remoteStream;
        }

        function handleRemoteStreamRemoved(event) {
            console.log('Remote stream removed. Event: ', event);
        }

        function hangup() {
            console.log('Hanging up.');
            stop();
            sendMessage('bye');
        }

        function handleRemoteHangup() {
            console.log('Session terminated.');
            stop();
            isInitiator = false;
        }

        function stop() {
            isStarted = false;
            pc.close();
            pc = null;
        }

        this.handleRecordClick = hangup;


        if (this.props.isJournalist) {
            navigator.mediaDevices.getUserMedia({video: true, audio: true})
                .then(gotStream);
        } else {
            gotStream(null);
        }
    }

    render() {
        return (
            <div>
                {this.props.isJournalist && <div className='record-button' onClick={() => this.handleRecordClick()}/>}
                <video autoPlay style={{width: '100%', 'max-height': '100%', 'max-width': '100%'}} ref={videoEl => this.videoEl = videoEl}></video>
            </div>
        );
    }
}

VideoPane.propTypes = {
    isJournalist: PropTypes.bool,
    roomName: PropTypes.string.required
}

export default VideoPane = VideoPane;
